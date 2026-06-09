import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import {
  CONTACT_WEBHOOK_URL,
  PRIVACY_POLICY_URL,
  WHATSAPP_LINK,
} from "@/constants/site";
import { cn } from "@/utils/cn";

/** Opciones del campo "servicio de interés". */
const SERVICES = [
  "Agentes de IA / Chatbots",
  "Automatización de procesos",
  "Desarrollo web / aplicaciones",
  "Integraciones & APIs",
  "Infraestructura Cloud",
  "Otro / No estoy seguro",
] as const;

/** Estado del formulario. */
interface FormState {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  servicio: string;
  mensaje: string;
}

const EMPTY: FormState = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  servicio: "",
  mensaje: "",
};

type Errors = Partial<Record<keyof FormState | "politica", string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valida un único campo y devuelve el mensaje de error (o undefined). */
function validateField(name: keyof FormState, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "nombre":
      if (!v) return "Escribe tu nombre.";
      if (v.length < 2) return "El nombre es demasiado corto.";
      return;
    case "email":
      if (!v) return "Escribe tu correo electrónico.";
      if (!EMAIL_RE.test(v)) return "Introduce un correo válido (ej. nombre@empresa.com).";
      return;
    case "telefono":
      if (!v) return "Escribe un teléfono o WhatsApp de contacto.";
      if (v.replace(/[^\d]/g, "").length < 7) return "El número parece incompleto.";
      return;
    case "servicio":
      if (!v) return "Selecciona el servicio que te interesa.";
      return;
    case "mensaje":
      if (!v) return "Cuéntanos brevemente qué necesitas.";
      if (v.length < 10) return "Añade un poco más de detalle (mín. 10 caracteres).";
      return;
    default:
      return;
  }
}

/**
 * Sección de contacto: formulario de captación de clientes que envía todos
 * los datos al webhook de n8n. Incluye casilla obligatoria de aceptación de la
 * política de privacidad antes de poder enviar.
 *
 * Envío: se intenta primero un POST JSON normal (respuesta legible si el webhook
 * de n8n tiene CORS habilitado); si el navegador lo bloquea por CORS, se reintenta
 * en modo `no-cors` para que los datos lleguen igualmente.
 */
export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [acepta, setAcepta] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (name: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [name]: e.target.value }));
    // Limpia el error del campo en cuanto el usuario corrige.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (name: keyof FormState) => () => {
    const msg = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  /** Valida todo el formulario; devuelve el primer campo inválido si lo hay. */
  function validateAll(): { ok: boolean; firstInvalid?: string } {
    const next: Errors = {};
    let firstInvalid: string | undefined;
    (Object.keys(EMPTY) as Array<keyof FormState>).forEach((key) => {
      const msg = validateField(key, form[key]);
      if (msg) {
        next[key] = msg;
        if (!firstInvalid) firstInvalid = key;
      }
    });
    if (!acepta) {
      next.politica = "Debes aceptar la Política de Privacidad para continuar.";
      if (!firstInvalid) firstInvalid = "politica";
    }
    setErrors(next);
    return { ok: Object.keys(next).length === 0, firstInvalid };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const { ok, firstInvalid } = validateAll();
    if (!ok) {
      if (firstInvalid) document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    const payload = {
      ...form,
      acepta_politica: acepta,
      origen: "Formulario web · nucloudai",
      fecha: new Date().toISOString(),
      pagina: typeof window !== "undefined" ? window.location.href : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    try {
      let delivered = false;
      try {
        // Preferido: JSON con CORS → permite leer la respuesta real.
        const res = await fetch(CONTACT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        delivered = true;
      } catch {
        // Reserva: el navegador bloqueó CORS. Reenviamos en modo no-cors
        // (la respuesta es opaca, pero los datos llegan al webhook).
        await fetch(CONTACT_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        delivered = true;
      }

      if (delivered) {
        setStatus("success");
        setForm(EMPTY);
        setAcepta(false);
        setErrors({});
      }
    } catch {
      // Fallo real de red: ni siquiera el reintento llegó al servidor.
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="bottom" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-50" />

      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Columna informativa */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:sticky lg:top-28"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <Send className="h-3.5 w-3.5" />
              Contacto
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-fog sm:text-5xl"
            >
              Hablemos de tu <span className="text-flame">próximo sistema</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-fog-muted"
            >
              Cuéntanos qué quieres automatizar y te respondemos con una propuesta clara,
              sin compromiso. Cuantos más detalles nos des, mejor te orientamos.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-9 flex flex-col gap-4">
              {[
                { icon: Clock, title: "Respuesta en menos de 24 h", sub: "Días laborables" },
                { icon: ShieldCheck, title: "Consultoría inicial gratuita", sub: "Sin compromiso" },
                { icon: CheckCircle2, title: "Propuesta a medida", sub: "Adaptada a tu negocio" },
              ].map((it) => (
                <li key={it.title} className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                    <it.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[15px] font-medium text-fog">{it.title}</span>
                    <span className="text-sm text-fog-muted">{it.sub}</span>
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                ¿Prefieres algo directo?
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[15px] font-medium text-flame transition-colors hover:text-flame-glow"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Escríbenos por WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Columna del formulario */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-glow sm:p-9"
          >
            {/* Brillo superior del marco */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
            />

            {status === "success" ? (
              <SuccessPanel onReset={() => setStatus("idle")} />
            ) : (
              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    name="nombre"
                    label="Nombre completo"
                    placeholder="Ej. Ana Pérez"
                    autoComplete="name"
                    value={form.nombre}
                    error={errors.nombre}
                    onChange={update("nombre")}
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
                    onChange={update("email")}
                    onBlur={handleBlur("email")}
                    required
                  />
                  <Field
                    name="telefono"
                    type="tel"
                    label="Teléfono / WhatsApp"
                    placeholder="+593 9..."
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.telefono}
                    error={errors.telefono}
                    onChange={update("telefono")}
                    onBlur={handleBlur("telefono")}
                    required
                  />
                  <Field
                    name="empresa"
                    label="Empresa"
                    hint="Opcional"
                    placeholder="Nombre de tu empresa"
                    autoComplete="organization"
                    value={form.empresa}
                    error={errors.empresa}
                    onChange={update("empresa")}
                    onBlur={handleBlur("empresa")}
                  />
                </div>

                {/* Servicio de interés */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="f-servicio" label="Servicio de interés" required />
                  <div className="relative">
                    <select
                      id="f-servicio"
                      name="servicio"
                      value={form.servicio}
                      onChange={update("servicio")}
                      onBlur={handleBlur("servicio")}
                      aria-invalid={!!errors.servicio}
                      aria-describedby={errors.servicio ? "e-servicio" : undefined}
                      className={cn(
                        inputBase,
                        "cursor-pointer appearance-none pr-11",
                        form.servicio ? "text-fog" : "text-fog-muted",
                        errors.servicio ? inputError : inputIdle
                      )}
                    >
                      <option value="" disabled>
                        Selecciona una opción…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-ink-raised text-fog">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog-muted"
                    />
                  </div>
                  <FieldError id="e-servicio" message={errors.servicio} />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="f-mensaje" label="¿Qué necesitas?" required />
                  <textarea
                    id="f-mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Cuéntanos sobre tu proyecto, procesos a automatizar, objetivos…"
                    value={form.mensaje}
                    onChange={update("mensaje")}
                    onBlur={handleBlur("mensaje")}
                    aria-invalid={!!errors.mensaje}
                    aria-describedby={errors.mensaje ? "e-mensaje" : undefined}
                    className={cn(
                      inputBase,
                      "min-h-[120px] resize-y",
                      errors.mensaje ? inputError : inputIdle
                    )}
                  />
                  <FieldError id="e-mensaje" message={errors.mensaje} />
                </div>

                {/* Casilla de política de privacidad */}
                <div className="flex flex-col gap-1.5">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input
                      id="f-politica"
                      type="checkbox"
                      className="peer sr-only"
                      checked={acepta}
                      aria-invalid={!!errors.politica}
                      aria-describedby={errors.politica ? "e-politica" : undefined}
                      onChange={(e) => {
                        setAcepta(e.target.checked);
                        if (e.target.checked) {
                          setErrors((prev) => ({ ...prev, politica: undefined }));
                        }
                      }}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flame-glow",
                        acepta
                          ? "border-flame bg-flame-gradient"
                          : errors.politica
                            ? "border-red-500/70 bg-white/[0.02]"
                            : "border-white/20 bg-white/[0.02] group-hover:border-white/40"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3.5 w-3.5 text-ink transition-transform duration-200",
                          acepta ? "scale-100" : "scale-0"
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
                  <FieldError id="e-politica" message={errors.politica} />
                </div>

                {/* Aviso de error de envío */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span>
                      No pudimos enviar el formulario. Revisa tu conexión e inténtalo de nuevo, o{" "}
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
                  </div>
                )}

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={!acepta || status === "sending"}
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
                      Enviar solicitud
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-fog-muted">
                  Tus datos se envían de forma segura y solo se usan para contactarte.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
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
  hint,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-medium text-fog">
      {label}
      {required && <span className="text-flame">*</span>}
      {hint && <span className="ml-1 text-xs font-normal text-fog-muted">{hint}</span>}
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
  name: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
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
  hint,
  autoComplete,
  inputMode,
}: FieldProps) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />
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

/** Panel mostrado tras un envío correcto. */
function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-10 text-center"
    >
      <span className="grid h-16 w-16 place-items-center rounded-full border border-flame/30 bg-flame/[0.1] text-flame shadow-glow-sm">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-fog">¡Mensaje enviado!</h3>
      <p className="mt-3 max-w-sm text-pretty text-fog-muted">
        Gracias por escribirnos. Hemos recibido tu solicitud y te responderemos en menos de
        24 horas.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-flame-gradient px-6 py-3 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(255,107,0,0.6)] transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Adelantar por WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-fog-muted transition-colors hover:text-fog"
        >
          Enviar otra solicitud
        </button>
      </div>
    </motion.div>
  );
}
