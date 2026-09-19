import { ChevronDown } from "lucide-react";
import { getServiceOptions } from "@/lib/booking/validation";
import { cn } from "@/utils/cn";

interface ServiceSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
}

const OPTIONS = getServiceOptions();

/** Desplegable de servicio: las 8 familias del catálogo + "Otro / No estoy seguro". */
export function ServiceSelect({ id, value, onChange, onBlur, error, className }: ServiceSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name="servicio"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full cursor-pointer appearance-none rounded-xl border px-4 py-3 pr-11 text-[15px] outline-none transition-all duration-200",
          value ? "text-fog" : "text-fog-muted",
          error
            ? "border-red-500/60 bg-red-500/[0.04] focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
            : "border-white/10 bg-white/[0.02] focus:border-flame/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(255,107,0,0.12)]",
          className
        )}
      >
        <option value="" disabled>
          Selecciona una opción…
        </option>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-raised text-fog">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog-muted"
      />
    </div>
  );
}
