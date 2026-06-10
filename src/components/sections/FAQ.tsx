import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { FAQS } from "@/constants/content";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="top" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que <span className="text-flame">más nos preguntan</span> antes de empezar
            </>
          }
          description="Respuestas directas sobre cómo trabajamos, plazos, costes y seguridad. ¿Te falta alguna? Escríbenos."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 flex max-w-3xl flex-col gap-3"
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.li
                key={faq.question}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] transition-colors hover:border-flame/25"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="font-display text-base font-medium text-fog sm:text-lg">
                    {faq.question}
                  </h3>
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
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-[15px] leading-relaxed text-fog-muted"
                >
                  {faq.answer}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
