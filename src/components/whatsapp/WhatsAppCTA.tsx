import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppPicker } from "./WhatsAppPicker";
import { useWhatsAppPicker } from "./useWhatsAppPicker";

interface WhatsAppCTAProps {
  /** Contenido completo del botón disparador (icono + texto). */
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

/**
 * Botón de marca que abre el selector de WhatsApp (WhatsAppPicker) con
 * ambos números. Reemplaza los enlaces directos a WHATSAPP_LINK en toda la
 * navegación/CTAs del sitio rediseñado — NO se usa en
 * EmbeddedWhatsAppPage.tsx, que sigue usando WHATSAPP_LINK directo.
 */
export function WhatsAppCTA({ children, variant = "primary", size = "lg", className, ...rest }: WhatsAppCTAProps) {
  const { open, toggle, close, rootRef, menuId } = useWhatsAppPicker();

  return (
    // display:block (no inline-block) — así un `className="w-full"` en el
    // Button interno funciona sin ambigüedad de shrink-to-fit; en contextos
    // flex (Navbar, Hero) el tamaño lo sigue decidiendo el propio flex item.
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        {...rest}
      >
        {children}
      </Button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <WhatsAppPicker id={menuId} onSelect={close} />
        </div>
      )}
    </div>
  );
}
