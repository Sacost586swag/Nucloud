import { SERVICE_FAMILIES } from "@/constants/content/services";
import { toZonedISO, BOOKING_TZ } from "./time";
import type { BookingFormValues } from "./validation";

/** Ver contracts/booking-webhook.md para el contrato exacto de este payload. */
export interface BookingPayload {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  servicio_id: string;
  fecha: string;
  hora: string;
  zona_horaria: string;
  fecha_hora_iso: string;
  estado: "Agendado";
  acepta_politica: boolean;
  origen: string;
  enviado_en: string;
  pagina: string;
  user_agent: string;
}

export interface BuildPayloadContext {
  now: Date;
  href: string;
  userAgent: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** `servicio_id` estable para que n8n filtre sin depender del texto exacto del label. */
function resolveServiceId(servicioTitulo: string): string {
  const match = SERVICE_FAMILIES.find((f) => f.titulo === servicioTitulo);
  return match ? match.id : slugify(servicioTitulo);
}

/** Construye el payload exacto del webhook a partir de un formulario ya validado. */
export function buildBookingPayload(values: BookingFormValues, ctx: BuildPayloadContext): BookingPayload {
  if (!values.fecha || !values.hora) {
    throw new Error("buildBookingPayload requiere fecha y hora ya validadas.");
  }
  return {
    nombre: values.nombre.trim(),
    email: values.email.trim(),
    telefono: values.telefono.trim(),
    servicio: values.servicio,
    servicio_id: resolveServiceId(values.servicio),
    fecha: values.fecha,
    hora: values.hora,
    zona_horaria: BOOKING_TZ,
    fecha_hora_iso: toZonedISO(values.fecha, values.hora),
    estado: "Agendado",
    acepta_politica: values.aceptaPolitica,
    origen: "Formulario web · nucloudai",
    enviado_en: ctx.now.toISOString(),
    pagina: ctx.href,
    user_agent: ctx.userAgent,
  };
}

/**
 * Milisegundos que faltan para llegar al mínimo de tiempo de envío desde el
 * montaje del formulario (mitigación antibot, igual que MIN_SUBMIT_MS del
 * ContactForm anterior) — 0 si ya se cumplió.
 */
export function computeSubmitDelay(mountedAt: number, now: number, min = 1200): number {
  return Math.max(0, min - (now - mountedAt));
}
