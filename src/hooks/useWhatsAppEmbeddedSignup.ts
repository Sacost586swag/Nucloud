import { useCallback, useEffect, useRef, useState } from "react";
import {
  FB_APP_ID,
  FB_CONFIG_ID,
  FB_GRAPH_VERSION,
  N8N_CODE_WEBHOOK,
  N8N_ONBOARDING_WEBHOOK,
  WEBHOOK_HEADER_NAME,
  WEBHOOK_HEADER_VALUE,
} from "@/constants/embeddedWhatsapp";

export type SignupStatus = "idle" | "connecting" | "success" | "error";

/** Superficie mínima del SDK de Facebook que usamos (no hay @types oficiales). */
interface FacebookLoginResponse {
  authResponse?: { code?: string } | null;
  status?: string;
}

interface FacebookSdk {
  init(params: {
    appId: string;
    autoLogAppEvents?: boolean;
    xfbml?: boolean;
    version: string;
  }): void;
  login(
    callback: (response: FacebookLoginResponse) => void,
    params: Record<string, unknown>
  ): void;
}

declare global {
  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}

const SDK_SCRIPT_ID = "facebook-jssdk";
const SDK_SRC = "https://connect.facebook.net/en_US/sdk.js";

/** Envía un payload a n8n; intenta JSON+CORS primero, cae a no-cors si el navegador lo bloquea. */
async function postToN8n(url: string, payload: unknown): Promise<void> {
  const body = JSON.stringify(payload);
  const headers = {
    "Content-Type": "application/json",
    [WEBHOOK_HEADER_NAME]: WEBHOOK_HEADER_VALUE,
  };
  try {
    const res = await fetch(url, { method: "POST", headers, body });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch {
    try {
      await fetch(url, { method: "POST", mode: "no-cors", headers, body });
    } catch (err) {
      console.error("Error enviando a n8n:", err);
    }
  }
}

/**
 * Encapsula toda la integración del Embedded Signup de WhatsApp (Meta):
 * carga del SDK de Facebook, listener de eventos `WA_EMBEDDED_SIGNUP` y el
 * flujo de `FB.login` con la configuración de coexistencia. La página que
 * consume este hook solo necesita `status` y `connect()`.
 */
export function useWhatsAppEmbeddedSignup(client: string | null) {
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [sdkReady, setSdkReady] = useState(false);
  const clientRef = useRef(client);
  clientRef.current = client;

  // Carga del SDK de Facebook (una sola vez, con guarda contra doble montaje en StrictMode).
  useEffect(() => {
    if (window.FB) {
      setSdkReady(true);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB!.init({
        appId: FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: FB_GRAPH_VERSION,
      });
      setSdkReady(true);
    };

    if (document.getElementById(SDK_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SDK_SCRIPT_ID;
    script.src = SDK_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  // Eventos que Meta manda al navegador durante el flujo (coexistencia, progreso, etc.).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== "string" || !event.origin.endsWith("facebook.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "WA_EMBEDDED_SIGNUP") {
          void postToN8n(N8N_ONBOARDING_WEBHOOK, {
            client: clientRef.current,
            embedded_event: data,
            received_at: new Date().toISOString(),
          });
        }
      } catch {
        // Mensajes que no son JSON del embedded signup: se ignoran.
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const connect = useCallback(() => {
    if (!sdkReady || !window.FB) {
      setStatus("error");
      return;
    }

    setStatus("connecting");

    window.FB.login(
      (response) => {
        const code = response.authResponse?.code;
        const payload = code
          ? { client: clientRef.current, code, received_at: new Date().toISOString() }
          : { client: clientRef.current, error: response, received_at: new Date().toISOString() };

        void postToN8n(N8N_CODE_WEBHOOK, payload).finally(() => {
          setStatus(code ? "success" : "error");
        });
      },
      {
        config_id: FB_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3",
        },
      }
    );
  }, [sdkReady]);

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, sdkReady, connect, reset };
}
