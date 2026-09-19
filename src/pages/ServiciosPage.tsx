import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { Services } from "@/components/sections/Services";
import { SERVICE_FAMILIES, TRANSVERSAL_CAPABILITIES } from "@/constants/content/services";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSectionReveal } from "@/motion/useSectionReveal";

export function ServiciosPage() {
  useDocumentTitle("Servicios — NUCLOUD | IA, automatización, web y cloud");
  const scope = useSectionReveal<HTMLElement>();
  const allServices = [...SERVICE_FAMILIES, ...TRANSVERSAL_CAPABILITIES];

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Soluciones de IA, automatización y desarrollo <span className="text-flame">a tu medida</span>
          </>
        }
        description="Diseñamos y construimos sistemas inteligentes que trabajan por ti: desde agentes de IA hasta desarrollo web e infraestructura cloud. Cada servicio se adapta a tu operación real."
      >
        <WhatsAppCTA size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Agendar consultoría
        </WhatsAppCTA>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Vista general (reutiliza la sección de la Home) */}
      <Services />

      {/* Detalle ampliado por servicio */}
      <section ref={scope} className="relative py-8 sm:py-12">
        <div className="container-x">
          <MediaFrame
            ratio="16/9"
            label="Un sistema en funcionamiento"
            caption="Vídeo demo de un agente atendiendo a un cliente real."
            kind="video"
            controls
            className="mx-auto mb-10 max-w-4xl"
          />

          <div className="flex flex-col gap-6">
            {allServices.map((service, i) => (
              <article
                key={service.id}
                data-reveal="blur"
                data-reveal-from={i % 2 === 0 ? "left" : "right"}
                className="group grid gap-8 rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    {service.numero && (
                      <span className="font-mono text-sm text-flame/70">{service.numero}</span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-fog sm:text-3xl">
                    {service.titulo}
                  </h2>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fog-muted">
                    {service.descripcion}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog-muted">
                    <span className="font-medium text-fog">Ideal para · </span>
                    {service.idealPara}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog-muted">
                    <span className="font-medium text-fog">Casos de uso · </span>
                    {service.casosDeUso}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/[0.06] bg-ink/40 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">Qué incluye</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-fog">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-flame/30 bg-flame/[0.08] text-flame">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <MediaFrame
            ratio="21/9"
            label="Resultados de nuestros clientes"
            caption="Capturas de reportes, paneles o mensajes reales (con permiso del cliente)."
            className="mt-10"
          />

          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Cuéntanos tu proyecto
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            ¿Qué quieres <span className="text-flame">automatizar</span> primero?
          </>
        }
        description="Te respondemos en menos de 24 h con una propuesta clara y sin compromiso."
      />
    </>
  );
}
