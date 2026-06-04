import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { BENEFITS, type Benefit } from "@/constants/content";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";

export function Benefits() {
  return (
    <section id="beneficios" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="bottom" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Beneficios"
          title={<>Resultados que se <span className="text-flame">notan</span> en tu operación</>}
          description="Más velocidad, menos trabajo manual y una experiencia de cliente que marca la diferencia."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((b) => (
            <BenefitCard key={b.label} benefit={b} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  // Extrae el número del string ("+70" -> 70) para animarlo; conserva el prefijo (+/-).
  const numeric = parseInt(benefit.value.replace(/[^\d]/g, ""), 10);
  const isNumeric = !Number.isNaN(numeric);
  const prefix = benefit.value.replace(/[\d]/g, "").replace(benefit.suffix ?? "", "");
  const { value, ref } = useCountUp(isNumeric ? numeric : 0);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="font-display text-5xl font-semibold tracking-tightest text-flame"
      >
        {isNumeric ? (
          <>
            {prefix}
            {value}
            {benefit.suffix}
          </>
        ) : (
          benefit.value
        )}
      </p>
      <h3 className="mt-4 font-display text-lg font-semibold text-fog">{benefit.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fog-muted">{benefit.description}</p>
    </motion.div>
  );
}
