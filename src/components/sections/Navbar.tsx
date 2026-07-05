import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAV_LINKS, WHATSAPP_LINK, BRAND } from "@/constants/site";
import { cn } from "@/utils/cn";

interface NavbarProps {
  /** Abre el menú lateral (drawer). Lo gestiona Layout. */
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

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
          {/* Marca + disparador del menú lateral */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onMenuClick}
              className="grid h-10 w-10 place-items-center rounded-full text-fog transition-colors hover:bg-white/[0.05]"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2.5" aria-label="NUCLOUD — inicio">
              <img src={BRAND.logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              <Wordmark className="text-lg" />
            </Link>
          </div>

          {/* Enlaces escritorio */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      isActive ? "text-flame" : "text-fog-muted hover:text-fog"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
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
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
