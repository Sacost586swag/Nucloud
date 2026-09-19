import type { ReactNode } from "react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { useSectionReveal } from "@/motion/useSectionReveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** CTAs u otros elementos bajo la descripción. */
  children?: ReactNode;
}

/**
 * Banda superior consistente para cada subpágina. Compensa la navbar fija
 * y reutiliza el lenguaje visual (glow naranja + rejilla + display font).
 */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      <GlowBackground position="top" intensity="strong" />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />

      <div className="container-x relative">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <span data-reveal="up" className="eyebrow">
            {eyebrow}
          </span>
          {/* Título de página — visible de inmediato, sin animación de
              entrada (FR-006), igual criterio que el H1 del Hero. */}
          <h1 className="font-display text-display-lg font-semibold text-balance text-fog">{title}</h1>
          {description && (
            <p
              data-reveal="up"
              data-reveal-delay={0.1}
              className="max-w-2xl text-pretty text-lg leading-relaxed text-fog-muted"
            >
              {description}
            </p>
          )}
          {children && (
            <div data-reveal="up" data-reveal-delay={0.2} className="mt-4 flex flex-wrap items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
