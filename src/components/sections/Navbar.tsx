import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { NAV_LINKS } from "@/constants/site";
import { cn } from "@/utils/cn";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

interface NavbarProps {
  /** Abre el menú lateral (drawer). Lo gestiona Layout. */
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(headerRef.current, { y: -80, autoAlpha: 0, duration: 0.6, ease: "brand" });
      });
      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
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
            <Link to="/" aria-label="NUCLOUD — inicio">
              <BrandMark variant="mark" size={32} />
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
            <WhatsAppCTA size="md" className="hidden sm:inline-flex" aria-label="Contactar por WhatsApp">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </WhatsAppCTA>
          </div>
        </nav>
      </div>
    </header>
  );
}
