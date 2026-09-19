import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { Process } from "@/components/sections/Process";
import { PROCESS_PHASES, BONUSES } from "@/constants/content/process";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSectionReveal } from "@/motion/useSectionReveal";

/** Entregables por fase — sin nombrar herramientas internas (FR-020). */
const PHASE_DELIVERABLES: Record<string, string[]> = {
  Diagnóstico: [
    "Mapa de tu operación y cuellos de botella",
    "Objetivos medibles definidos",
    "Accesos y alcance acordados contigo",
  ],
  Construcción: [
    "Todos tus canales conectados en un solo punto de entrada",
    "Tu agente configurado y respondiendo",
    "Dashboard de reportes armado",
  ],
  Validación: [
    "Sistema probado con conversaciones reales",
    "Comportamiento ajustado y afinado",
    "Documentación y capacitación entregadas a tu equipo",
  ],
};

export function ProcesoPage() {
  useDocumentTitle("Proceso — NUCLOUD | De la idea al sistema en producción");
  const scope = useSectionReveal<HTMLElement>();

  return (
    <>
      <PageHero
        eyebrow="Proceso de trabajo"
        title={
          <>
            De la idea al sistema, <span className="text-flame">en 21 días</span>
          </>
        }
        description="Un método claro de 3 fases que convierte tus procesos manuales en infraestructura inteligente, con entregas funcionales desde el inicio y visibilidad en cada etapa."
      >
        <WhatsAppCTA size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Empezar mi proyecto
        </WhatsAppCTA>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Vista general + diagrama (reutiliza la sección) */}
      <Process />

      {/* Detalle ampliado por fase */}
      <section ref={scope} className="relative py-8 sm:py-12">
        <div className="container-x">
          <MediaFrame
            ratio="16/9"
            label="El proceso, paso a paso"
            caption="Vídeo corto que muestra cómo trabajamos de la idea al sistema en producción."
            kind="video"
            controls
            className="mx-auto mb-10 max-w-4xl"
          />

          <div className="flex flex-col gap-5">
            {PROCESS_PHASES.map((phase, i) => (
              <article
                key={phase.numero}
                data-reveal="blur"
                data-reveal-from={i % 2 === 0 ? "left" : "right"}
                data-reveal-delay={i * 0.06}
                className="grid gap-6 rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9 lg:grid-cols-[0.4fr_1.6fr] lg:items-center"
              >
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="font-display text-5xl font-semibold tracking-tightest text-flame">
                    {phase.numero}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-fog">{phase.titulo}</h2>
                    <p className="font-mono text-xs uppercase tracking-wider text-fog-muted">{phase.rango}</p>
                  </div>
                </div>

                <div>
                  <p className="max-w-2xl text-[15px] leading-relaxed text-fog-muted">{phase.descripcion}</p>
                  {PHASE_DELIVERABLES[phase.titulo] && (
                    <div className="mt-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">Entregables</p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {PHASE_DELIVERABLES[phase.titulo].map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-fog">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-flame/30 bg-flame/[0.08] text-flame">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Una imagen por fase: capturas reales de cada etapa. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {PROCESS_PHASES.map((phase) => (
              <MediaFrame key={phase.numero} ratio="4/3" label={`Fase ${phase.numero} · ${phase.titulo}`} />
            ))}
          </div>

          {/* Bonificaciones incluidas */}
          <div data-reveal="up" className="mt-10 rounded-[2rem] border border-flame/20 bg-flame/[0.05] p-7 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-flame-amber">
              Incluido en toda implementación
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {BONUSES.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-fog">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-flame/30 bg-flame/[0.08] text-flame">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Agendar la fase de diagnóstico
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Empecemos por el <span className="text-flame">diagnóstico</span>
          </>
        }
        description="La consultoría inicial es gratuita y sin compromiso. Te decimos qué automatizar primero y cómo."
      />
    </>
  );
}
