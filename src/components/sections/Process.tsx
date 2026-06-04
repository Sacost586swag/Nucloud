import { motion } from "framer-motion";
import { Instagram, Webhook, BrainCircuit, Database, LayoutDashboard, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/constants/content";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";

const FLOW = [
  { icon: Instagram, label: "Instagram · WhatsApp", sub: "Canales de entrada" },
  { icon: Webhook, label: "API Gateway", sub: "Ingesta y enrutado" },
  { icon: BrainCircuit, label: "n8n + IA", sub: "Orquestación inteligente" },
  { icon: Database, label: "PostgreSQL", sub: "Memoria y datos" },
  { icon: LayoutDashboard, label: "Dashboard SaaS", sub: "Control y métricas" },
];

export function Process() {
  return (
    <section id="proceso" className="relative scroll-mt-24 border-y border-white/[0.05] bg-ink-soft/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title={<>De la idea al sistema, <span className="text-flame">paso a paso</span></>}
          description="Un método claro y probado que convierte tus procesos manuales en infraestructura inteligente."
        />

        {/* Línea de pasos */}
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.index}
              variants={fadeUp}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-flame">{step.index}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-flame/40 to-transparent" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-fog">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-muted">{step.description}</p>
              {i < PROCESS_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 place-items-center text-flame/50 lg:grid"
                >
                  →
                </span>
              )}
            </motion.li>
          ))}
        </motion.ol>

        {/* Diagrama de arquitectura */}
        <div className="mt-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="eyebrow">Arquitectura tipo</span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-fog sm:text-3xl">
              Un flujo de datos conectado de extremo a extremo
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mt-12 flex max-w-xl flex-col items-center"
          >
            {FLOW.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className="flex w-full flex-col items-center">
                  <motion.div
                    variants={fadeUp}
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
                  </motion.div>

                  {i < FLOW.length - 1 && (
                    <motion.div variants={fadeUp} className="flex h-9 items-center justify-center">
                      <ChevronDown className="h-5 w-5 animate-pulse-node text-flame/70" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
