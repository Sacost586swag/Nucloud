import { Target, Eye, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { MetaTechBadge } from "@/components/brand/MetaTechBadge";
import { About } from "@/components/sections/About";
import { MISION, VISION } from "@/constants/content/about";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSectionReveal } from "@/motion/useSectionReveal";

const MISION_VISION = [
  { icon: Target, title: "Nuestra misión", text: MISION },
  { icon: Eye, title: "Nuestra visión", text: VISION },
];

export function NosotrosPage() {
  useDocumentTitle("Nosotros — NUCLOUD | Agencia de IA y automatización en Cuenca");
  const scope = useSectionReveal<HTMLElement>();
  const sedeScope = useSectionReveal<HTMLElement>();

  return (
    <>
      <PageHero
        eyebrow="Sobre NUCLOUD"
        title={
          <>
            Tecnología avanzada al servicio de tu <span className="text-flame">crecimiento</span>
          </>
        }
        description="Somos NUCLOUD, una agencia tecnológica con sede en Cuenca (Ecuador) especializada en inteligencia artificial, automatización e infraestructura cloud. Diseñamos y construimos sistemas que resuelven problemas reales de negocio."
      >
        <WhatsAppCTA size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Hablemos de tu proyecto
        </WhatsAppCTA>
        <Button to="/contacto" variant="secondary" size="lg">
          Contactar
        </Button>
      </PageHero>

      {/* Misión y visión */}
      <section ref={scope} className="relative py-8 sm:py-12">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-2">
            {MISION_VISION.map((it, i) => (
              <article
                key={it.title}
                data-reveal="blur"
                data-reveal-from={i % 2 === 0 ? "left" : "right"}
                data-reveal-delay={i * 0.08}
                className="rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
                  <it.icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-fog">{it.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fog-muted">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares (reutiliza la sección de la Home) */}
      <About />

      {/* Espacio para material que genera confianza: equipo y forma de trabajar. */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <MediaFrame
            ratio="21/9"
            label="Nuestro equipo trabajando"
            caption="Foto o vídeo corto del equipo de NUCLOUD en acción."
            kind="video"
            expandOnScroll
          />
        </div>
      </section>

      {/* Sede + credencial */}
      <section ref={sedeScope} className="relative py-8 sm:py-12">
        <div className="container-x">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div data-reveal="up" className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3 text-fog-muted">
                <MapPin className="h-5 w-5 shrink-0 text-flame" />
                <span className="text-[15px]">
                  <span className="font-medium text-fog">Sede en Cuenca, Azuay — Ecuador.</span> Trabajamos con
                  empresas en todo el país y en Latinoamérica de forma remota.
                </span>
              </div>
              <MetaTechBadge size="medium" />
            </div>
            <MediaFrame ratio="4/3" label="Foto de la sede" />
          </div>

          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Conoce cómo trabajamos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Construyamos algo <span className="text-flame">inteligente</span> juntos
          </>
        }
        description="Cuéntanos tu reto y te proponemos el sistema que mejor encaja con tu negocio."
      />
    </>
  );
}
