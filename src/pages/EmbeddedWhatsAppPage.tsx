import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Link2Off,
  Loader2,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Wordmark } from "@/components/ui/Wordmark";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useNoIndex } from "@/hooks/useNoIndex";
import { useWhatsAppEmbeddedSignup } from "@/hooks/useWhatsAppEmbeddedSignup";
import { fadeUp, stagger } from "@/hooks/useReveal";
import { BRAND, WHATSAPP_LINK } from "@/constants/site";

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Conexión oficial y cifrada gestionada por Meta" },
  { icon: Lock, text: "Nunca vemos ni pedimos tu contraseña de WhatsApp" },
  { icon: Zap, text: "Tu número queda activo en pocos minutos" },
];

/**
 * Página oculta (sin Navbar/Footer, noindex) para el Embedded Signup de
 * WhatsApp Business de Meta. Cada cliente recibe su propio enlace con
 * `?client=<id>`; sin ese parámetro no se muestra el flujo de conexión.
 */
export function EmbeddedWhatsAppPage() {
  useDocumentTitle("Conectar WhatsApp — NUCLOUD");
  useNoIndex();

  const [searchParams] = useSearchParams();
  const client = searchParams.get("client");
  const { status, connect, reset } = useWhatsAppEmbeddedSignup(client);

  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-16">
      <GlowBackground position="center" intensity="strong" />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative w-full max-w-md overflow-hidden rounded-[2rem] p-8 text-center shadow-glow sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
        />

        <div className="flex flex-col items-center gap-2">
          <img
            src={BRAND.logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <Wordmark className="text-lg" />
        </div>

        {!client ? (
          <InvalidLinkPanel />
        ) : status === "success" ? (
          <SuccessPanel onReset={reset} />
        ) : (
          <ConnectPanel status={status} onConnect={connect} />
        )}
      </motion.div>
    </div>
  );
}

function ConnectPanel({
  status,
  onConnect,
}: {
  status: "idle" | "connecting" | "error";
  onConnect: () => void;
}) {
  const connecting = status === "connecting";

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-7">
      <motion.span variants={fadeUp} className="eyebrow">
        <ShieldCheck className="h-3.5 w-3.5" />
        Conexión segura · WhatsApp Business
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="mt-5 font-display text-2xl font-semibold leading-[1.15] text-fog sm:text-[1.75rem]"
      >
        Conecta tu WhatsApp con <span className="text-flame">NUCLOUD</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-3 text-pretty text-[15px] leading-relaxed text-fog-muted"
      >
        Solo te tomará un momento. Sigue los pasos de Meta para vincular tu número de
        WhatsApp Business y dejar tu sistema funcionando.
      </motion.p>

      <motion.ul variants={fadeUp} className="mt-7 flex flex-col gap-3 text-left">
        {TRUST_POINTS.map((point) => (
          <li key={point.text} className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
              <point.icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="text-sm text-fog-muted">{point.text}</span>
          </li>
        ))}
      </motion.ul>

      {status === "error" && (
        <motion.div
          variants={fadeUp}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-left text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <span>
            No pudimos completar la conexión. Intenta de nuevo o{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-flame hover:underline"
            >
              escríbenos por WhatsApp
            </a>
            .
          </span>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="mt-8">
        <Button
          variant="whatsapp"
          size="lg"
          className="w-full"
          onClick={onConnect}
          disabled={connecting}
          aria-label="Conectar mi WhatsApp"
        >
          {connecting ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
              Conectando…
            </>
          ) : (
            <>
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Conectar mi WhatsApp
            </>
          )}
        </Button>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-5 text-xs leading-relaxed text-fog-muted/70">
        Al conectar, aceptas que Meta comparta la información de tu número de WhatsApp
        Business con NUCLOUD para configurar el servicio.
      </motion.p>
    </motion.div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 flex flex-col items-center"
    >
      <span className="grid h-16 w-16 place-items-center rounded-full border border-flame/30 bg-flame/[0.1] text-flame shadow-glow-sm">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
      </span>
      <h1 className="mt-6 font-display text-2xl font-semibold text-fog">
        ¡Conexión iniciada!
      </h1>
      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fog-muted">
        Recibimos los datos de tu WhatsApp Business. Nuestro equipo confirmará la
        activación y te contactará en breve.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-sm font-medium text-fog-muted transition-colors hover:text-fog"
      >
        Conectar otro número
      </button>
    </motion.div>
  );
}

function InvalidLinkPanel() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mt-8 flex flex-col items-center"
    >
      <motion.span
        variants={fadeUp}
        className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-fog-muted"
      >
        <Link2Off className="h-7 w-7" strokeWidth={1.8} />
      </motion.span>
      <motion.h1 variants={fadeUp} className="mt-6 font-display text-2xl font-semibold text-fog">
        Este enlace no es válido
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-3 text-pretty text-[15px] leading-relaxed text-fog-muted"
      >
        Cada enlace de conexión es personal. Revisa que copiaste la URL completa que te
        envió NUCLOUD, o escríbenos y te la reenviamos.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-7">
        <Button href={WHATSAPP_LINK} external variant="secondary" size="lg">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          Escríbenos por WhatsApp
        </Button>
      </motion.div>
    </motion.div>
  );
}
