import type { BookingPayload } from "./payload";

export type SubmitResult = "cors" | "opaque";

/**
 * Envía el payload replicando el patrón ya probado en producción del
 * ContactForm anterior: primero JSON con CORS (permite leer la respuesta
 * real); si el navegador lo bloquea o la respuesta no es 2xx, reintenta en
 * `no-cors` (la respuesta queda opaca, pero los datos llegan igual).
 */
export async function postWithNoCorsFallback(
  url: string,
  body: BookingPayload,
  fetchImpl: typeof fetch = fetch
): Promise<SubmitResult> {
  const json = JSON.stringify(body);

  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return "cors";
  } catch {
    await fetchImpl(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: json,
    });
    return "opaque";
  }
}
