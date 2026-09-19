import { Clock, ShieldCheck, CheckCircle2, Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppPicker } from "@/components/whatsapp/WhatsAppPicker";
import { useWhatsAppPicker } from "@/components/whatsapp/useWhatsAppPicker";
import { BookingFormLazy } from "@/components/forms/booking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSectionReveal } from "@/motion/useSectionReveal";
import { SOCIAL_LINKS, EMAIL_LINK, CONTACT_EMAIL } from "@/constants/site";

const HIGHLIGHTS = [
  { icon: Clock, title: "Respuesta en menos de 24 h", sub: "Días laborables" },
  { icon: ShieldCheck, title: "Consultoría inicial gratuita", sub: "Sin compromiso" },
  { icon: CheckCircle2, title: "Propuesta a medida", sub: "Adaptada a tu negocio" },
];

export function ContactoPage() {
  useDocumentTitle("Contacto — NUCLOUD | Automatiza tu negocio con IA");
  const scope = useSectionReveal<HTMLElement>();
  const { open, toggle, close, rootRef, menuId } = useWhatsAppPicker();

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Hablemos de tu <span className="text-flame">próximo sistema</span>
          </>
        }
        description="Cuéntanos qué quieres automatizar y agenda una cita en el horario que prefieras, o escríbenos directamente por el canal que más te acomode."
      />

      <section ref={scope} className="relative pb-8 pt-2 sm:pb-12">
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Columna de canales de contacto */}
            <div className="lg:sticky lg:top-28">
              <ul data-reveal="up" className="flex flex-col gap-4">
                {HIGHLIGHTS.map((it) => (
                  <li key={it.title} className="flex items-center gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <it.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">{it.title}</span>
                      <span className="text-sm text-fog-muted">{it.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Canales directos */}
              <div data-reveal="up" data-reveal-delay={0.1} className="mt-9">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">Canales directos</p>
                <div className="mt-4 flex flex-col gap-3">
                  <div ref={rootRef} className="relative">
                    <button
                      type="button"
                      onClick={toggle}
                      aria-haspopup="menu"
                      aria-expanded={open}
                      aria-controls={menuId}
                      className="group flex w-full items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 text-left transition-colors hover:border-flame/30"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame-gradient text-ink">
                        <WhatsAppIcon className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[15px] font-medium text-fog">WhatsApp</span>
                        <span className="text-sm text-fog-muted">Respuesta inmediata</span>
                      </span>
                    </button>
                    {open && (
                      <div className="absolute left-0 top-full z-50 w-full pt-2">
                        <WhatsAppPicker id={menuId} onSelect={close} className="w-full" />
                      </div>
                    )}
                  </div>

                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Instagram className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">Instagram</span>
                      <span className="text-sm text-fog-muted">@nucloud_ai.ec</span>
                    </span>
                  </a>

                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Linkedin className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">LinkedIn</span>
                      <span className="text-sm text-fog-muted">NUCLOUD</span>
                    </span>
                  </a>

                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <TikTokIcon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">TikTok</span>
                      <span className="text-sm text-fog-muted">@nucloud.ai</span>
                    </span>
                  </a>

                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Facebook className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">Facebook</span>
                      <span className="text-sm text-fog-muted">NUCLOUD</span>
                    </span>
                  </a>

                  <a
                    href={EMAIL_LINK}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Mail className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">Correo</span>
                      <span className="text-sm text-fog-muted">{CONTACT_EMAIL}</span>
                    </span>
                  </a>
                </div>
              </div>

              <div data-reveal="up" data-reveal-delay={0.2} className="mt-9 flex items-center gap-3 text-fog-muted">
                <MapPin className="h-5 w-5 text-flame" />
                <span className="text-sm">Cuenca, Azuay — Ecuador · Atención remota en LATAM</span>
              </div>
            </div>

            {/* Formulario de agendamiento (compartido) */}
            <div data-reveal="up" data-reveal-delay={0.1}>
              <BookingFormLazy />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
