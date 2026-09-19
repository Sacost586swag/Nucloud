import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { FAQS } from "@/constants/content/faq";
import { useSectionReveal } from "@/motion/useSectionReveal";
import { cn } from "@/utils/cn";

interface SectionProps {
  /** Si se indica, muestra un CTA "Ver más" hacia la subpágina (solo en Home). */
  detailTo?: string;
}

export function FAQ({ detailTo }: SectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="top" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que <span className="text-flame">más nos preguntan</span> antes de empezar
            </>
          }
          description="Respuestas directas sobre cómo trabajamos, plazos y seguridad. ¿Te falta alguna? Escríbenos."
        />

        <ul className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={faq.question}
                data-reveal="up"
                data-reveal-delay={Math.min(i, 4) * 0.05}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] transition-colors hover:border-flame/25"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="font-display text-base font-medium text-fog sm:text-lg">{faq.question}</h3>
                  <span
                    aria-hidden
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-flame/30 bg-flame/[0.06] text-flame transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </span>
                </button>
                {/* Truco grid-rows: anima a la altura intrínseca sin medir el DOM en JS. */}
                <div
                  id={`faq-panel-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-fog-muted">{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {detailTo && (
          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to={detailTo} variant="secondary" size="lg">
              Ver todas las preguntas
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
