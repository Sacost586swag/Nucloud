import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-flame-gradient text-ink font-semibold shadow-[0_8px_30px_-8px_rgba(255,107,0,0.6)] hover:shadow-[0_12px_44px_-8px_rgba(255,140,26,0.75)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "text-fog hairline bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5",
  ghost: "text-fog-muted hover:text-fog",
};

/**
 * Botón / enlace de marca. Si recibe `href` se renderiza como <a>,
 * en caso contrario como <button>. Una única responsabilidad: la acción primaria.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  external,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, "overflow-hidden", sizes[size], variants[variant], className);

  // Barrido de luz (shimmer) en hover, solo para la acción primaria.
  const shimmer =
    variant === "primary" ? (
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    ) : null;

  const content = (
    <>
      {shimmer}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
