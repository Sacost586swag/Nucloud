import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Process } from "@/components/sections/Process";
import { PROCESS_STEPS } from "@/constants/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

/** Detalle ampliado por fase: entregables, duración y herramientas. */
const PHASE_DETAIL: Record<
  string,
  { deliverables: string[]; duration: string; tools: string }
> = {
  Análisis: {
    deliverables: [
      "Mapa de procesos y cuellos de botella",
      "Objetivos medibles (KPIs)",
      "Alcance y prioridades acordadas",
    ],
    duration: "3 – 5 días",
    tools: "Entrevistas, auditoría de herramientas, diagramas de flujo",
  },
  Diseño: {
    deliverables: [
      "Arquitectura técnica del sistema",
      "Diseño de flujos y experiencia",
      "Plan de integración de datos",
    ],
    duration: "1 – 2 semanas",
    tools: "Diagramas de arquitectura, prototipos, esquema de datos",
  },
  Desarrollo: {
    deliverables: [
      "Software limpio y escalable",
      "Entornos de prueba y staging",
      "Revisiones funcionales por iteración",
    ],
    duration: "2 – 6 semanas",
    tools: "React / Next.js, Node, PostgreSQL, control de versiones",
  },
  Automatización: {
    deliverables: [
      "Workflows n8n en producción",
      "Agentes de IA conectados",
      "Manejo de errores y reintentos",
    ],
    duration: "1 – 3 semanas",
    tools: "n8n, modelos de IA, webhooks, colas",
  },
  Optimización: {
    deliverables: [
      "Tablero de métricas en vivo",
      "Ajustes de rendimiento y coste",
      "Plan de mejora continua",
    ],
    duration: "Continuo",
    tools: "Monitorización, analítica, alertas",
  },
};

export function ProcesoPage() {
  useDocumentTitle("Proceso — NUCLOUD | De la idea al sistema en producción");

  return (
    <>
      <PageHero
        eyebrow="Proceso de trabajo"
        title={
          <>
            De la idea al sistema, <span className="text-flame">paso a paso</span>
          </>
        }
        description="Un método claro y probado en cinco fases que convierte tus procesos manuales en infraestructura inteligente, con entregas funcionales desde el inicio y visibilidad en cada etapa."
      >
        <Button href={WHATSAPP_LINK} external size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Empezar mi proyecto
        </Button>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Vista general + diagrama de arquitectura (reutiliza la sección) */}
      <Process />

      {/* Detalle ampliado por fase */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5"
          >
            {PROCESS_STEPS.map((step) => {
              const detail = PHASE_DETAIL[step.title];
              return (
                <motion.article
                  key={step.index}
                  variants={fadeUp}
                  className="grid gap-6 rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9 lg:grid-cols-[0.4fr_1.6fr] lg:items-center"
                >
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="font-display text-5xl font-semibold tracking-tightest text-flame">
                      {step.index}
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-fog">
                      {step.title}
                    </h2>
                  </div>

                  <div>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-fog-muted">
                      {step.description}
                    </p>
                    {detail && (
                      <div className="mt-5 grid gap-5 sm:grid-cols-[1.4fr_1fr]">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                            Entregables
                          </p>
                          <ul className="mt-3 flex flex-col gap-2">
                            {detail.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2.5 text-sm text-fog">
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-flame/30 bg-flame/[0.08] text-flame">
                                  <Check className="h-3 w-3" strokeWidth={3} />
                                </span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div>
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                              Duración
                            </p>
                            <p className="mt-2 text-sm font-medium text-fog">{detail.duration}</p>
                          </div>
                          <div>
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                              Herramientas
                            </p>
                            <p className="mt-2 text-sm text-fog-muted">{detail.tools}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Espacios para imágenes de referencia (assets futuros) */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <ImagePlaceholder label="Timeline del proyecto" ratio="3/2" />
            <ImagePlaceholder label="Tablero de fases" ratio="3/2" />
            <ImagePlaceholder label="Diagrama de flujo de datos" ratio="3/2" />
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Agendar la fase de análisis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Empecemos por el <span className="text-flame">análisis</span>
          </>
        }
        description="La consultoría inicial es gratuita y sin compromiso. Te decimos qué automatizar primero y cómo."
      />
    </>
  );
}
