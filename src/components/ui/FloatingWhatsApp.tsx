import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppPicker } from "@/components/whatsapp/WhatsAppPicker";
import { useWhatsAppPicker } from "@/components/whatsapp/useWhatsAppPicker";
import { cn } from "@/utils/cn";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Botón flotante persistente para maximizar conversión. Aparece tras scroll
 * y abre el selector de WhatsApp (mismo mecanismo que WhatsAppCTA, con un
 * disparador circular propio en vez del pill de Button).
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { open, toggle, close, rootRef, menuId } = useWhatsAppPicker();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.reduce, () => {
        gsap.set(btnRef.current, { autoAlpha: visible ? 1 : 0 });
      });

      mm.add(MQ.motion, () => {
        if (visible) {
          gsap.fromTo(
            btnRef.current,
            { autoAlpha: 0, scale: 0.6, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
          );
        } else {
          gsap.to(btnRef.current, { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.3, ease: "brand" });
        }
      });

      return () => mm.revert();
    },
    { dependencies: [visible], scope: rootRef }
  );

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-50">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-label="Contactar por WhatsApp"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={cn(
          "group relative grid h-14 w-14 place-items-center rounded-full bg-flame-gradient text-ink opacity-0 shadow-[0_10px_40px_-8px_rgba(255,107,0,0.7)] transition-transform hover:scale-105",
          !visible && "pointer-events-none"
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-flame opacity-60 blur-md transition-opacity group-hover:opacity-90"
        />
        <span aria-hidden className="absolute -inset-1 animate-ping rounded-full bg-flame/30" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-50 pb-3">
          <WhatsAppPicker id={menuId} onSelect={close} />
        </div>
      )}
    </div>
  );
}
