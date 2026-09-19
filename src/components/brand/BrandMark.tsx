import { BRAND } from "@/constants/site";
import { cn } from "@/utils/cn";

interface BrandMarkProps {
  /** "mark" = ícono cobre + wordmark de imagen (espacios chicos: nav/drawer).
   *  "lockup" = imagen completa con el wordmark ya integrado (zonas grandes). */
  variant?: "mark" | "lockup";
  className?: string;
  /** Alto del ícono y del wordmark en "mark"; en "lockup" solo controla el alto. */
  size?: number;
}

/**
 * public/nucloud-wordmark.png mide 480×267 pero las letras (con su halo) solo
 * ocupan la caja x:15–463, y:72–186 — el resto es margen transparente. Se
 * recorta por CSS (sin tocar el archivo) para que las letras tengan un tamaño
 * útil en la barra superior. Los márgenes en % se resuelven contra el ANCHO
 * del contenedor, de ahí que el top también se exprese sobre 449.
 */
const WM_BOX = { w: 449, h: 115, x: 15, y: 72, imgW: 480 } as const;

/**
 * Punto único para renderizar el logo de NUCLOUD — evita repetir el par
 * ícono + wordmark (o el lockup completo) en Navbar/SideDrawer/Footer con
 * markup ligeramente distinto en cada uno.
 */
export function BrandMark({ variant = "mark", className, size = 32 }: BrandMarkProps) {
  if (variant === "lockup") {
    return (
      <img
        src={BRAND.lockup}
        alt="NUCLOUD"
        style={{ height: size }}
        className={cn("w-auto object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <img
        src={BRAND.mark}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain"
      />
      <span
        className="block shrink-0 overflow-hidden"
        style={{ height: size, aspectRatio: `${WM_BOX.w} / ${WM_BOX.h}` }}
      >
        <img
          src={BRAND.wordmark}
          alt="NUCLOUD"
          width={480}
          height={267}
          className="max-w-none"
          style={{
            width: `${(WM_BOX.imgW / WM_BOX.w) * 100}%`,
            height: "auto",
            marginLeft: `${(-WM_BOX.x / WM_BOX.w) * 100}%`,
            marginTop: `${(-WM_BOX.y / WM_BOX.w) * 100}%`,
          }}
        />
      </span>
    </span>
  );
}
