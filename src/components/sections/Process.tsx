import { Instagram, Waypoints, BrainCircuit, Database, LayoutDashboard, ChevronDown, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PROCESS_PHASES } from "@/constants/content/process";
import { useSectionReveal } from "@/motion/useSectionReveal";

/** Diagrama de flujo genérico — sin nombrar herramientas internas (FR-020). */
const FLOW = [
  { icon: Instagram, label: "Instagram · WhatsApp", sub: "Canales de entrada" },
  { icon: Waypoints, label: "Punto único de entrada", sub: "Ingesta y enrutado" },
  { icon: BrainCircuit, label: "Orquestación con IA", sub: "Respuesta y calificación automática" },
  { icon: Database, label: "Memoria del negocio", sub: "Historial y datos guardados" },
  { icon: LayoutDashboard, label: "Panel de control", sub: "Métricas en tiempo real" },
];

interface SectionProps {
  /** Si se indica, muestra un CTA "Ver más" hacia la subpágina (solo en Home). */
  detailTo?: string;
}

export function Process({ detailTo }: SectionProps = {}) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      id="proceso"
      className="relative scroll-mt-24 border-y border-white/[0.05] bg-ink-soft/60 py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title={
            <>
              De la idea al sistema, <span className="text-flame">en 21 días</span>
            </>
          }
          description="Un método claro de 3 fases que convierte tus procesos manuales en infraestructura inteligente."
        />

        {/* Fases */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {PROCESS_PHASES.map((phase, i) => (
            <div
              key={phase.numero}
              data-reveal="blur"
              data-reveal-from={(["left", "bottom", "right"] as const)[i % 3]}
              data-reveal-delay={i * 0.08}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-flame">{phase.numero}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-flame/40 to-transparent" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-fog-muted">{phase.rango}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-fog">{phase.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-muted">{phase.descripcion}</p>
              {i < PROCESS_PHASES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 place-items-center text-flame/50 lg:grid"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Diagrama de flujo */}
        <div className="mt-20">
          <div data-reveal="up" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Arquitectura tipo</span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-fog sm:text-3xl">
              Un flujo de datos conectado de extremo a extremo
            </h3>
          </div>

          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center">
            {FLOW.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className="flex w-full flex-col items-center">
                  <div
                    data-reveal="up"
                    data-reveal-delay={i * 0.06}
                    className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-fog">{node.label}</p>
                      <p className="font-mono text-xs text-fog-muted">{node.sub}</p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-flame/60">{`0${i + 1}`}</span>
                  </div>

                  {i < FLOW.length - 1 && (
                    <div className="flex h-9 items-center justify-center">
                      <ChevronDown className="h-5 w-5 animate-pulse-node text-flame/70" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {detailTo && (
          <div data-reveal="up" className="mt-14 flex justify-center">
            <Button to={detailTo} variant="secondary" size="lg">
              Ver el proceso completo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
