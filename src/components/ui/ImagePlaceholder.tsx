import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { fadeUp, viewportOnce } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

type Ratio = "16/9" | "4/3" | "1/1" | "3/2" | "21/9";

interface ImagePlaceholderProps {
  /** Etiqueta que describe qué imagen irá aquí (asset futuro). */
  label: string;
  ratio?: Ratio;
  caption?: string;
  className?: string;
}

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "21/9": "aspect-[21/9]",
};

/**
 * Hueco marcado para una imagen de referencia futura. Brand-styled,
 * animado y con borde discontinuo para distinguirlo de contenido real.
 */
export function ImagePlaceholder({
  label,
  ratio = "16/9",
  caption,
  className,
}: ImagePlaceholderProps) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border border-dashed border-flame/25 bg-white/[0.015]",
        ratioClass[ratio],
        className
      )}
    >
      {/* Textura de rejilla + barrido shimmer en hover */}
      <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-flame/[0.06] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />

      {/* Contenido */}
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/25 bg-flame/[0.06] text-flame transition-transform duration-300 group-hover:scale-110">
          <ImagePlus className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-fog">
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-fog-muted/70">
          Imagen de referencia
        </span>
        {caption && (
          <span className="mt-1 max-w-xs text-sm text-fog-muted">{caption}</span>
        )}
      </figcaption>
    </motion.figure>
  );
}
