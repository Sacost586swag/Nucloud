import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { GUARANTEE_STATS, type GuaranteeStat } from "@/constants/content/guarantees";
import { useSectionReveal, type RevealFrom } from "@/motion/useSectionReveal";

interface SectionProps {
  /** Si se indica, muestra un CTA "Ver más" hacia la subpágina (solo en Home). */
  detailTo?: string;
}

/**
 * Sección de Garantías (antes "Beneficios", conserva id="beneficios" para no
 * romper anclas existentes) — compromisos reales y verificables (FR-018), no
 * estadísticas de mejora inventadas.
 */
export function Benefits({ detailTo }: SectionProps = {}) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} id="beneficios" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="bottom" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Garantías"
          title={<>Compromisos reales, no promesas <span className="text-flame">al aire</span></>}
          description="Esto es lo que garantizamos en cada sistema que entregamos — verificable desde el primer reporte."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEE_STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              delay={i * 0.08}
              from={(["left", "bottom", "bottom", "right"] as const)[i % 4]}
            />
          ))}
        </div>

        {detailTo && (
          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to={detailTo} variant="secondary" size="lg">
              Ver las garantías en detalle
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ stat, delay, from }: { stat: GuaranteeStat; delay: number; from: RevealFrom }) {
  return (
    <div
      data-reveal="blur"
      data-reveal-from={from}
      data-reveal-delay={delay}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <p data-reveal="scramble" className="font-display text-5xl font-semibold tracking-tightest text-flame">
        {stat.value}
      </p>
      <h3 className="mt-4 font-display text-lg font-semibold text-fog">{stat.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fog-muted">{stat.description}</p>
    </div>
  );
}
