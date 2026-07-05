import { cn } from "@/utils/cn";

interface WordmarkProps {
  className?: string;
}

/**
 * Logotipo de texto "NUCLOUD." — un solo peso/color más el punto final en
 * naranja, el mismo motivo tipográfico del titular del hero (declaraciones
 * cortas rematadas en punto). Sustituye el reparto NU/CLOUD de dos colores,
 * un patrón genérico de logotipo.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display font-bold uppercase tracking-tight text-fog",
        className
      )}
    >
      Nucloud<span className="text-flame">.</span>
    </span>
  );
}
