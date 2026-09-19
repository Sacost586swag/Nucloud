import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { Benefits } from "@/components/sections/Benefits";
import { GUARANTEE_STATS } from "@/constants/content/guarantees";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSectionReveal } from "@/motion/useSectionReveal";

/** "Cómo lo cumplimos" por cada garantía — sin nombrar herramientas internas (FR-020). */
const GUARANTEE_HOW: Record<string, string> = {
  "Tiempo de respuesta":
    "Cada canal —WhatsApp, Instagram, formulario web— llega a un mismo agente que responde de inmediato, sin depender de que haya alguien disponible en ese momento.",
  "Disponibilidad total":
    "Tus sistemas operan en infraestructura cloud que nunca duerme: atienden, procesan y responden a cualquier hora, también fines de semana y festivos.",
  "Contactos sin registrar":
    "Todo contacto que entra por cualquier canal queda guardado automáticamente, con seguimiento programado si no hay respuesta.",
  "Reporte periódico":
    "Recibes un reporte con los contactos entrados, respondidos y agendados, para que veas el impacto real sin tener que pedirlo.",
};

export function BeneficiosPage() {
  useDocumentTitle("Garantías — NUCLOUD | Compromisos reales, no promesas");
  const scope = useSectionReveal<HTMLElement>();

  return (
    <>
      <PageHero
        eyebrow="Garantías"
        title={
          <>
            Compromisos reales, no promesas <span className="text-flame">al aire</span>
          </>
        }
        description="Automatizar con IA no es una promesa abstracta: esto es exactamente lo que garantizamos en cada sistema que entregamos, verificable desde el primer reporte."
      >
        <WhatsAppCTA size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Hablar de mi caso
        </WhatsAppCTA>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Tokens de garantía (reutiliza la sección) */}
      <Benefits />

      {/* Detalle: cómo cumplimos cada garantía */}
      <section ref={scope} className="relative py-8 sm:py-12">
        <div className="container-x">
          <MediaFrame
            ratio="21/9"
            label="El reporte que recibes"
            caption="Captura de un reporte o panel real con contactos entrados, respondidos y agendados."
            className="mb-10"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {GUARANTEE_STATS.map((stat, i) => (
              <article
                key={stat.label}
                data-reveal="blur"
                data-reveal-from={i % 2 === 0 ? "left" : "right"}
                data-reveal-delay={i * 0.06}
                className="group rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-3xl font-semibold tracking-tightest text-flame">
                    {stat.value}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-fog">{stat.label}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fog-muted">
                  {GUARANTEE_HOW[stat.label] ?? stat.description}
                </p>
              </article>
            ))}
          </div>

          <MediaFrame
            ratio="16/9"
            label="Lo que dicen nuestros clientes"
            caption="Testimonio en vídeo de un cliente real."
            kind="video"
            controls
            className="mx-auto mt-10 max-w-4xl"
          />

          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Quiero estas garantías
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Convierte estas garantías en <span className="text-flame">tu realidad</span>
          </>
        }
        description="Analizamos tu operación y te mostramos dónde está el mayor impacto. Sin compromiso."
      />
    </>
  );
}
