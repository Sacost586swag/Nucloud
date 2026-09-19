import { CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { MetaTechBadge } from "@/components/brand/MetaTechBadge";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { useSectionReveal } from "@/motion/useSectionReveal";

const SOCIAL_PROOF = ["Disponibilidad 24/7", "Implementación a medida", "Resultados medibles"];

export function Hero() {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pb-28">
      <GlowBackground position="top" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-60" />

      <div className="container-x">
        <div className="grid w-full items-start gap-14 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex flex-col items-start">
            {/* Eslogan de marca — se pinta de inmediato, sin animación de
                entrada (FR-002/FR-006): nunca queda oculto por un estado
                inicial de reveal. `scale-x-90` lo angosta un 10% sin tocar
                el alto (Clash Display no tiene eje de anchura); el margen
                negativo en `em` devuelve el 10% de ancho que la
                transformación no libera del layout. */}
            <h1 className="flex origin-left scale-x-90 flex-col font-display text-display-hero font-bold uppercase text-fog -mr-[0.74em]">
              <span className="block text-outline">Automatiza.</span>
              <span className="block text-flame">Escala.</span>
              <span className="block text-flame">Crece.</span>
            </h1>

            <p data-reveal="up" className="mt-10 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted">
              Creamos sistemas inteligentes que optimizan procesos, mejoran la atención al
              cliente y ayudan a las empresas a crecer.
            </p>

            <div
              data-reveal="up"
              data-reveal-delay={0.1}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <WhatsAppCTA size="lg" aria-label="Agendar consultoría por WhatsApp">
                <CalendarCheck className="h-[18px] w-[18px]" />
                Agendar Consultoría
              </WhatsAppCTA>
              <WhatsAppCTA variant="secondary" size="lg">
                <WhatsAppIcon className="h-[18px] w-[18px] text-flame" />
                Contactar por WhatsApp
              </WhatsAppCTA>
            </div>

            <div
              data-reveal="up"
              data-reveal-delay={0.2}
              className="mt-10 flex max-w-xl flex-wrap items-center gap-x-7 gap-y-4"
            >
              {SOCIAL_PROOF.map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-fog-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-glow-sm" />
                  {t}
                </span>
              ))}
              <MetaTechBadge size="small" />
            </div>
          </div>

          {/* Marco de vídeo — al nivel del eslogan. */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
