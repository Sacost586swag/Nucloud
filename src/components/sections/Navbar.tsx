import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAV_LINKS, WHATSAPP_LINK, BRAND } from "@/constants/site";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x">
        <nav
          className={cn(
            "mt-4 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Marca */}
          <a href="#top" className="flex items-center gap-2.5" aria-label="NUCLOUD — inicio">
            <img src={BRAND.logo} alt="" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-semibold tracking-tight text-fog">
              NU<span className="text-flame">CLOUD</span>
            </span>
          </a>

          {/* Enlaces escritorio */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-fog-muted transition-colors hover:text-fog"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + menú móvil */}
          <div className="flex items-center gap-2">
            <Button
              href={WHATSAPP_LINK}
              external
              size="md"
              className="hidden sm:inline-flex"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-fog hairline bg-white/[0.03] lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="container-x lg:hidden"
          >
            <div className="glass mt-2 flex flex-col gap-1 rounded-3xl p-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[15px] text-fog-muted transition-colors hover:bg-white/[0.04] hover:text-fog"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={WHATSAPP_LINK}
                external
                size="md"
                className="mt-1 w-full"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Contactar por WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
