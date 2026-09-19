import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, X } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { NAV_LINKS, SOCIAL_LINKS, EMAIL_LINK, CONTACT_EMAIL } from "@/constants/site";
import { cn } from "@/utils/cn";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { useSmoothScroll } from "@/motion/SmoothScroll";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Menú lateral deslizante desde la izquierda. Siempre montado (no vía
 * AnimatePresence/unmount): la visibilidad real la da la posición del panel
 * (`-translate-x-full` por defecto) y la opacidad del overlay, ambas con un
 * valor estático de Tailwind coherente con "cerrado" para que no haya
 * parpadeo antes de que GSAP tome el control.
 */
export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      start();
    };
  }, [open, onClose, stop, start]);

  useGSAP(
    () => {
      const items = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>("[data-drawer-item]"))
        : [];

      const mm = gsap.matchMedia();

      mm.add(MQ.reduce, () => {
        gsap.set(overlayRef.current, { autoAlpha: open ? 1 : 0 });
        gsap.set(panelRef.current, { x: open ? "0%" : "-100%" });
      });

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline();
        if (open) {
          tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0)
            .fromTo(panelRef.current, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "brand" }, 0)
            .fromTo(items, { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.05 }, 0.12);
        } else {
          tl.to(panelRef.current, { x: "-100%", duration: 0.35, ease: "brand" }, 0).to(
            overlayRef.current,
            { autoAlpha: 0, duration: 0.3 },
            0
          );
        }
        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { dependencies: [open], scope: panelRef }
  );

  return (
    <div
      className={cn("fixed inset-0 z-[80]", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-ink/80 opacity-0 backdrop-blur-sm" />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="glass absolute inset-y-0 left-0 flex w-[20rem] max-w-[85vw] -translate-x-full flex-col border-r border-white/[0.08] px-6 py-6"
      >
        {/* Resplandor superior del borde */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-flame/40 to-transparent"
        />

        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <NavLink to="/" onClick={onClose}>
            <BrandMark variant="mark" size={32} />
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
            <div key={link.to} data-drawer-item>
              <NavLink
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium transition-colors",
                    isActive ? "bg-flame/[0.08] text-flame" : "text-fog hover:bg-white/[0.04]"
                  )
                }
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-fog-muted">0{i + 1}</span>
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 -translate-x-1 text-fog-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Pie: contacto directo */}
        <div data-drawer-item className="mt-auto flex flex-col gap-3 pt-8">
          <WhatsAppCTA className="w-full" aria-label="Hablar por WhatsApp">
            <WhatsAppIcon className="h-4 w-4" />
            Hablar por WhatsApp
          </WhatsAppCTA>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de NUCLOUD"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de NUCLOUD"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de NUCLOUD"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de NUCLOUD"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href={EMAIL_LINK}
              aria-label={`Escribir a ${CONTACT_EMAIL}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-fog-muted transition-colors hover:border-flame/30 hover:text-fog"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
