import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import { PRIVACY_POLICY_URL, BOOKING_WEBHOOK_URL, WHATSAPP_LINK } from "@/constants/site";
import {
  validateField,
  validateBooking,
  type BookingFormValues,
  type BookingFieldName,
} from "@/lib/booking/validation";
import { buildBookingPayload, computeSubmitDelay } from "@/lib/booking/payload";
import { postWithNoCorsFallback } from "@/lib/booking/submit";
import { ServiceSelect } from "./ServiceSelect";
import { BookingCalendar } from "./BookingCalendar";
import { TimeSlotGrid } from "./TimeSlotGrid";
import { BookingSuccess } from "./BookingSuccess";

const EMPTY: BookingFormValues = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "",
  fecha: "",
  hora: "",
  aceptaPolitica: false,
};

/** Igual mitigación anti-bot que el ContactForm anterior (ver SECURITY_AUDIT.md). */
const MIN_SUBMIT_MS = 1200;

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulario de agendamiento — reemplaza a ContactForm. Nombre, correo,
 * teléfono, servicio (8 familias + Otro) y fecha+hora reales en calendario;
 * conserva honeypot, retraso mínimo de envío y el patrón CORS→no-cors.
 * Compartido entre la sección de contacto de la Home y /contacto.
 */
export function BookingForm() {
  const [form, setForm] = useState<BookingFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<BookingFieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const mountedAtRef = useRef(Date.now());

  function update<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleTextChange(name: "nombre" | "email" | "telefono") {
    return (e: ChangeEvent<HTMLInputElement>) => update(name, e.target.value);
  }

  function handleBlur(name: BookingFieldName) {
    return () => setErrors((prev) => ({ ...prev, [name]: validateField(name, form) }));
  }

  function handleDateChange(fecha: string) {
    setForm((f) => ({ ...f, fecha, hora: "" })); // FR-010: cambiar de fecha limpia la hora elegida
    setErrors((prev) => ({ ...prev, fecha: undefined, hora: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (honeypot.trim() !== "") {
      // Un humano nunca ve ni rellena este campo — aparentamos éxito sin enviar nada.
      setStatus("success");
      setForm(EMPTY);
      setErrors({});
      return;
    }

    const result = validateBooking(form);
    if (!result.ok) {
      setErrors(result.errors);
      if (result.firstInvalid) document.getElementById(`f-${result.firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    const delay = computeSubmitDelay(mountedAtRef.current, Date.now(), MIN_SUBMIT_MS);
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

    try {
      const payload = buildBookingPayload(form, {
        now: new Date(),
        href: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      await postWithNoCorsFallback(BOOKING_WEBHOOK_URL, payload);
      setStatus("success");
      setForm(EMPTY);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-glow sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
      />

      {status === "success" ? (
        <BookingSuccess onReset={() => setStatus("idle")} />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Señuelo anti-bot invisible para personas. */}
          <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
            <label htmlFor="f-website">No completar este campo</label>
            <input
              id="f-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              name="nombre"
              label="Nombre completo"
              placeholder="Ej. Ana Pérez"
              autoComplete="name"
              value={form.nombre}
              error={errors.nombre}
              onChange={handleTextChange("nombre")}
              onBlur={handleBlur("nombre")}
              required
            />
            <Field
              name="email"
              type="email"
              label="Correo electrónico"
              placeholder="nombre@empresa.com"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              error={errors.email}
              onChange={handleTextChange("email")}
              onBlur={handleBlur("email")}
              required
            />
            <Field
              name="telefono"
              type="tel"
              label="Teléfono"
              placeholder="+593 9..."
              autoComplete="tel"
              inputMode="tel"
              value={form.telefono}
              error={errors.telefono}
              onChange={handleTextChange("telefono")}
              onBlur={handleBlur("telefono")}
              required
            />
            <div className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="f-servicio" label="Servicio de interés" required />
              <ServiceSelect
                id="f-servicio"
                value={form.servicio}
                onChange={(v) => update("servicio", v)}
                onBlur={handleBlur("servicio")}
                error={errors.servicio}
              />
              <FieldError id="e-servicio" message={errors.servicio} />
            </div>
          </div>

          {/* Fecha y hora */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div id="f-fecha" className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="f-fecha" label="Fecha de la cita" required />
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <BookingCalendar value={form.fecha} onChange={handleDateChange} />
              </div>
              <FieldError id="e-fecha" message={errors.fecha} />
            </div>
            <div id="f-hora" className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="f-hora" label="Hora de la cita" required />
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <TimeSlotGrid
                  name="hora"
                  date={form.fecha}
                  value={form.hora}
                  onChange={(hora) => {
                    update("hora", hora);
                  }}
                />
              </div>
              <FieldError id="e-hora" message={errors.hora} />
            </div>
          </div>

          {/* Casilla de política de privacidad */}
          <div className="flex flex-col gap-1.5">
            <label className="group flex cursor-pointer items-start gap-3">
              <input
                id="f-aceptaPolitica"
                type="checkbox"
                className="peer sr-only"
                checked={form.aceptaPolitica}
                aria-invalid={!!errors.aceptaPolitica}
                aria-describedby={errors.aceptaPolitica ? "e-aceptaPolitica" : undefined}
                onChange={(e) => update("aceptaPolitica", e.target.checked)}
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flame-glow",
                  form.aceptaPolitica
                    ? "border-flame bg-flame-gradient"
                    : errors.aceptaPolitica
                      ? "border-red-500/70 bg-white/[0.02]"
                      : "border-white/20 bg-white/[0.02] group-hover:border-white/40"
                )}
              >
                <Check
                  className={cn(
                    "h-3.5 w-3.5 text-ink transition-transform duration-200",
                    form.aceptaPolitica ? "scale-100" : "scale-0"
                  )}
                  strokeWidth={3}
                />
              </span>
              <span className="text-sm leading-relaxed text-fog-muted">
                He leído y acepto la{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-flame underline-offset-2 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Política de Privacidad
                </a>
                .
              </span>
            </label>
            <FieldError id="e-aceptaPolitica" message={errors.aceptaPolitica} />
          </div>

          {status === "error" && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <span>
                No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-medium text-flame hover:underline">
                  escríbenos por WhatsApp
                </a>
                .
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={!form.aceptaPolitica || status === "sending"}
            className={cn(
              "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all duration-300",
              "bg-flame-gradient text-ink shadow-[0_8px_30px_-8px_rgba(255,107,0,0.6)]",
              "enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_12px_44px_-8px_rgba(255,140,26,0.75)]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-[18px] w-[18px] animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send className="h-[18px] w-[18px]" />
                Agendar mi cita
              </>
            )}
          </button>

          <p className="text-center text-xs text-fog-muted">
            Tus datos se envían de forma segura y solo se usan para confirmar tu cita.
          </p>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────  Subcomponentes  ───────────────────────── */

const inputBase =
  "w-full rounded-xl px-4 py-3 text-[15px] text-fog placeholder:text-fog-muted/70 outline-none transition-all duration-200";
const inputIdle =
  "border border-white/10 bg-white/[0.02] focus:border-flame/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(255,107,0,0.12)]";
const inputError =
  "border border-red-500/60 bg-red-500/[0.04] focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]";

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-medium text-fog">
      {label}
      {required && <span className="text-flame">*</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs text-red-300">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

interface FieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

function Field({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  required,
  autoComplete,
  inputMode,
}: FieldProps) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `e-${name}` : undefined}
        className={cn(inputBase, error ? inputError : inputIdle)}
      />
      <FieldError id={`e-${name}`} message={error} />
    </div>
  );
}
