import { cn } from "@/utils/cn";

interface MetaTechBadgeProps {
  size?: "small" | "medium" | "prominent";
  className?: string;
}

const SIZE_MAP: Record<NonNullable<MetaTechBadgeProps["size"]>, string> = {
  small: "w-28",
  medium: "w-36",
  prominent: "w-56",
};

/**
 * Insignia oficial "Meta Tech Provider" (public/METATechProviderLogoPNG.png,
 * 400×280, texto oscuro sobre fondo claro). Se recorta por CSS el margen
 * sobrante (caja útil x:29–370, y:87–186) sobre una placa clara tipo
 * credencial para que se lea con claridad sobre el fondo oscuro del sitio —
 * el archivo original no se modifica ni se recolorea.
 */
export function MetaTechBadge({ size = "medium", className }: MetaTechBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 shadow-card",
        SIZE_MAP[size],
        className
      )}
    >
      <span className="block w-full overflow-hidden" style={{ aspectRatio: "341 / 99" }}>
        <img
          src="/METATechProviderLogoPNG.png"
          alt="Meta Tech Provider — proveedor tecnológico oficial de Meta"
          width={400}
          height={280}
          loading="lazy"
          className="max-w-none"
          style={{ width: "117.3%", margin: "-25.5% 0 0 -8.5%" }}
        />
      </span>
    </div>
  );
}
