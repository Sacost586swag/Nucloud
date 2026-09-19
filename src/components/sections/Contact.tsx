import { CheckCircle2, Clock, Send, ShieldCheck } from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppPicker } from "@/components/whatsapp/WhatsAppPicker";
import { useWhatsAppPicker } from "@/components/whatsapp/useWhatsAppPicker";
import { BookingFormLazy } from "@/components/forms/booking";
import { useSectionReveal } from "@/motion/useSectionReveal";

const HIGHLIGHTS = [
  { icon: Clock, title: "Respuesta en menos de 24 h", sub: "Días laborables" },
  { icon: ShieldCheck, title: "Consultoría inicial gratuita", sub: "Sin compromiso" },
  { icon: CheckCircle2, title: "Propuesta a medida", sub: "Adaptada a tu negocio" },
];

/**
 * Sección de contacto/agenda de la Home: columna informativa + formulario de
 * agendamiento compartido (BookingFormLazy). La lógica de agenda vive en
 * `@/lib/booking/*` y `@/components/forms/booking/*`; se reutiliza en /contacto.
 */
export function Contact() {
  const scope = useSectionReveal<HTMLElement>();
  const { open, toggle, close, rootRef, menuId } = useWhatsAppPicker();

  return (
    <section ref={scope} id="contacto" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="bottom" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-50" />

      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Columna informativa */}
          <div className="lg:sticky lg:top-28">
            <span data-reveal="up" className="eyebrow">
              <Send className="h-3.5 w-3.5" />
              Contacto
            </span>

            <h2
              data-reveal="up"
              data-reveal-delay={0.05}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-fog sm:text-5xl"
            >
              Hablemos de tu <span className="text-flame">próximo sistema</span>
            </h2>

            <p
              data-reveal="up"
              data-reveal-delay={0.1}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-fog-muted"
            >
              Cuéntanos qué quieres automatizar y agenda una cita directamente en el
              horario que prefieras. Cuantos más detalles nos des, mejor te orientamos.
            </p>

            <ul data-reveal="up" data-reveal-delay={0.15} className="mt-9 flex flex-col gap-4">
              {HIGHLIGHTS.map((it) => (
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
            </ul>

            <div data-reveal="up" data-reveal-delay={0.2} className="mt-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                ¿Prefieres algo directo?
              </p>
              <div ref={rootRef} className="relative mt-3 inline-block">
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-controls={menuId}
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-flame transition-colors hover:text-flame-glow"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Escríbenos por WhatsApp
                </button>
                {open && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <WhatsAppPicker id={menuId} onSelect={close} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna del formulario (compartido) */}
          <div data-reveal="up" data-reveal-delay={0.1}>
            <BookingFormLazy />
          </div>
        </div>
      </div>
    </section>
  );
}
