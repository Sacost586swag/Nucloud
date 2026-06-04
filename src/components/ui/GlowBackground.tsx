import { cn } from "@/utils/cn";

interface GlowBackgroundProps {
  /** Posición del resplandor naranja. */
  position?: "top" | "center" | "bottom";
  className?: string;
  intensity?: "soft" | "strong";
}

/**
 * Capa decorativa: malla radial naranja + cuadrícula sutil.
 * Puramente atmosférica (aria-hidden), sin coste de interacción.
 */
export function GlowBackground({
  position = "top",
  className,
  intensity = "soft",
}: GlowBackgroundProps) {
  const pos =
    position === "top"
      ? "top-[-20%]"
      : position === "bottom"
        ? "bottom-[-25%]"
        : "top-1/2 -translate-y-1/2";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[140px]",
          pos,
          intensity === "strong" ? "opacity-[0.22]" : "opacity-[0.13]"
        )}
        style={{
          background:
            "radial-gradient(circle, #FF6B00 0%, #FF8C1A 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
