import { Link } from "react-router-dom";
import { Wordmark } from "@/components/ui/Wordmark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  NAV_LINKS,
  WHATSAPP_LINK,
  INSTAGRAM_URL,
  EMAIL_LINK,
  CONTACT_EMAIL,
  PRIVACY_POLICY_URL,
  BRAND,
  SITE_LAST_UPDATED,
} from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();
  const lastUpdated = new Date(SITE_LAST_UPDATED).toLocaleDateString("es", {
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="container-x">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Marca */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Link to="/" className="flex items-center gap-2.5" aria-label="NUCLOUD — inicio">
              <img src={BRAND.logo} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <Wordmark className="text-xl" />
            </Link>
            <p className="max-w-xs text-center text-sm text-fog-muted sm:text-left">
              {BRAND.tagline}
            </p>
            <a
              href={EMAIL_LINK}
              className="text-sm text-fog-muted underline-offset-4 transition-colors hover:text-fog hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Navegación */}
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-fog-muted transition-colors hover:text-fog"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fog-muted transition-colors hover:text-fog"
            >
              Instagram
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-flame transition-colors hover:text-flame-glow"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </nav>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="font-mono text-xs text-fog-muted">
            © {year} {BRAND.name}. Todos los derechos reservados.{" "}
            <time dateTime={SITE_LAST_UPDATED}>· Actualizado: {lastUpdated}</time>
          </p>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-fog-muted underline-offset-4 transition-colors hover:text-fog hover:underline"
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
