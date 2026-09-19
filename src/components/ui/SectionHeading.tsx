import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Encabezado de sección consistente: eyebrow + título + descripción.
 * Puramente presentacional — el reveal lo aporta el `data-reveal="up"` de
 * este wrapper, capturado por el useSectionReveal() de la sección que lo
 * contiene (no crea su propio scope de GSAP).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal="up"
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={cn(
          "font-display text-display-lg font-semibold text-fog",
          align === "center" ? "max-w-3xl text-balance" : "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed text-fog-muted sm:text-lg",
            align === "center" ? "max-w-2xl text-pretty" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
