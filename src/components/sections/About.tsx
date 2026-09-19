import { ArrowRight } from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { MISION, ABOUT_PILLARS } from "@/constants/content/about";
import { useSectionReveal } from "@/motion/useSectionReveal";
import { BRAND } from "@/constants/site";

interface SectionProps {
  /** Si se indica, muestra un CTA "Ver más" hacia la subpágina (solo en Home). */
  detailTo?: string;
}

export function About({ detailTo }: SectionProps = {}) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      id="nosotros"
      className="relative scroll-mt-24 border-y border-white/[0.05] bg-ink-soft/60 py-24 sm:py-32"
    >
      <GlowBackground position="center" />
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Texto */}
          <div>
            <span data-reveal="up" className="eyebrow">
              Sobre NUCLOUD
            </span>
            <h2
              data-reveal="up"
              data-reveal-delay={0.05}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-fog sm:text-5xl"
            >
              Tecnología avanzada al servicio de tu <span className="text-flame">crecimiento</span>
            </h2>
            <p
              data-reveal="up"
              data-reveal-delay={0.1}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted"
            >
              {MISION}
            </p>

            <div data-reveal="up" data-reveal-delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
              <WhatsAppCTA size="lg">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Hablemos de tu proyecto
              </WhatsAppCTA>
              {detailTo && (
                <Button to={detailTo} variant="secondary" size="lg">
                  Conócenos más
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Pilares */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {ABOUT_PILLARS.map((pillar, i) => (
              <li
                key={pillar.title}
                data-reveal="up"
                data-reveal-delay={i * 0.06}
                className="group rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 transition-colors hover:border-flame/25"
              >
                <h3 className="font-display text-lg font-semibold text-fog">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-muted">{pillar.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Banda de marca sutil */}
        <div data-reveal="up" className="mt-16 flex items-center justify-center gap-4 opacity-70">
          <img src={BRAND.mark} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-sm tracking-[0.25em] text-fog-muted">
            {BRAND.tagline.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  );
}
