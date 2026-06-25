import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { fadeUp, stagger } from "@/hooks/useReveal";

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
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      <GlowBackground position="top" intensity="strong" />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />

      <div className="container-x relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col items-start gap-5"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-[1.04] tracking-tightest text-fog sm:text-5xl lg:text-[3.6rem]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-pretty text-lg leading-relaxed text-fog-muted"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-3">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
