import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, Instagram, Mail, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  NAV_LINKS,
  WHATSAPP_LINK,
  INSTAGRAM_URL,
  EMAIL_LINK,
  CONTACT_EMAIL,
  BRAND,
} from "@/constants/site";
import { cn } from "@/utils/cn";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const panel = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.05, delayChildren: 0.12 },
  },
  exit: { x: "-100%", transition: { duration: 0.35, ease: EASE } },
};

const item = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/**
 * Menú lateral deslizante desde la izquierda. Navega a todas las subpáginas
 * y unifica la navegación móvil. Convive con la barra superior en escritorio.
 */
export function SideDrawer({ open, onClose }: SideDrawerProps) {
  // Cierre con Escape + bloqueo del scroll del body mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] lg:z-[80]">
          {/* Fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="glass absolute inset-y-0 left-0 flex w-[20rem] max-w-[85vw] flex-col border-r border-white/[0.08] px-6 py-6"
          >
            {/* Resplandor superior del borde */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-flame/40 to-transparent"
            />

            {/* Cabecera */}
            <div className="flex items-center justify-between">
              <NavLink to="/" onClick={onClose} className="flex items-center gap-2.5">
                <img src={BRAND.logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                <Wordmark className="text-lg" />
              </NavLink>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-fog-muted transition-colors hover:bg-white/[0.06] hover:text-fog"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navegación */}
            <nav className="mt-10 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.to} variants={item}>
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium transition-colors",
                        isActive
                          ? "bg-flame/[0.08] text-flame"
                          : "text-fog hover:bg-white/[0.04]"
                      )
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-fog-muted">
                        0{i + 1}
                      </span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 text-fog-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Pie: contacto directo */}
            <motion.div variants={item} className="mt-auto flex flex-col gap-3 pt-8">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-flame-gradient px-5 py-3 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(255,107,0,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={EMAIL_LINK}
                  aria-label={`Escribir a ${CONTACT_EMAIL}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
