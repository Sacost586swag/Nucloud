import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Estado y comportamiento compartido del selector de WhatsApp: abre/cierra,
 * cierra con Escape, con clic fuera (el trigger vive dentro de `rootRef`, así
 * que pulsarlo no cuenta como "fuera") y al cambiar de ruta. Usado por
 * WhatsAppCTA (botón de marca) y por FloatingWhatsApp (botón circular),
 * cada uno con su propio disparador visual.
 */
export function useWhatsAppPicker() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return {
    open,
    toggle: () => setOpen((v) => !v),
    close: () => setOpen(false),
    rootRef,
    menuId,
  };
}
