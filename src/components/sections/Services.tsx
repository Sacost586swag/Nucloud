import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Workflow,
  Bot,
  Magnet,
  Cpu,
  Phone,
  BarChart3,
  Plug,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { SERVICE_FAMILIES, TRANSVERSAL_CAPABILITIES, type FamiliaDeServicio } from "@/constants/content/services";
import { useSectionReveal, type RevealFrom } from "@/motion/useSectionReveal";

interface SectionProps {
  /** Si se indica, muestra un CTA "Ver más" hacia la subpágina (solo en Home). */
  detailTo?: string;
}

const ICONS: Record<string, LucideIcon> = {
  "webs-y-landings": Globe,
  "apps-y-dashboards": LayoutDashboard,
  automatizaciones: Workflow,
  "agentes-ia-y-asistentes": Bot,
  "captacion-de-leads": Magnet,
  "agentes-autonomos": Cpu,
  "asistentes-telefonicos": Phone,
  "reporting-y-cmi": BarChart3,
  "integraciones-y-apis": Plug,
  "infraestructura-cloud": Cloud,
};

export function Services({ detailTo }: SectionProps = {}) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} id="servicios" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="center" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Todo lo que tu empresa necesita para <span className="text-flame">escalar</span>
            </>
          }
          description="Ocho familias de servicio que combinamos según lo que tu operación necesite resolver primero."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_FAMILIES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={(i % 4) * 0.06}
              from={(["left", "bottom", "bottom", "right"] as const)[i % 4]}
            />
          ))}
        </div>

        <p data-reveal="up" className="mt-12 text-center font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
          Capacidades transversales
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {TRANSVERSAL_CAPABILITIES.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 0.06} from={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>

        {detailTo && (
          <div data-reveal="up" className="mt-12 flex justify-center">
            <Button to={detailTo} variant="secondary" size="lg">
              Ver servicios en detalle
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  delay,
  from,
}: {
  service: FamiliaDeServicio;
  delay: number;
  from: RevealFrom;
}) {
  const Icon = ICONS[service.id] ?? Workflow;
  return (
    <div
      data-reveal="blur"
      data-reveal-from={from}
      data-reveal-delay={delay}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-7 transition-all duration-400 hover:-translate-y-1 hover:border-flame/30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-flame/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame transition-all duration-400 group-hover:scale-105 group-hover:shadow-glow-sm">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
        </span>
        {service.numero && <span className="font-mono text-xs text-flame/60">{service.numero}</span>}
      </div>

      <h3 className="relative mt-6 font-display text-lg font-semibold text-fog">{service.titulo}</h3>
      <p className="relative mt-2.5 text-[15px] leading-relaxed text-fog-muted">{service.descripcion}</p>

      <span
        aria-hidden
        className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-flame-gradient transition-transform duration-500 group-hover:scale-x-100"
      />
    </div>
  );
}
