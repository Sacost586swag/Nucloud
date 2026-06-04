import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_LINK } from "@/constants/site";

/** Botón flotante persistente para maximizar conversión. Aparece tras scroll. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-flame-gradient text-ink shadow-[0_10px_40px_-8px_rgba(255,107,0,0.7)] transition-transform hover:scale-105"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-flame opacity-60 blur-md transition-opacity group-hover:opacity-90"
          />
          <span aria-hidden className="absolute -inset-1 animate-ping rounded-full bg-flame/30" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
