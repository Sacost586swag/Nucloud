import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { SERVICES, type Service } from "@/constants/content";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";

export function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="center" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Servicios"
          title={<>Todo lo que tu empresa necesita para <span className="text-flame">escalar</span></>}
          description="Combinamos inteligencia artificial, automatización y desarrollo a medida para construir sistemas que trabajan por ti."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon, title, description } = service;
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-7 transition-all duration-400 hover:-translate-y-1 hover:border-flame/30"
    >
      {/* Resplandor que sigue al hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-flame/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame transition-all duration-400 group-hover:scale-105 group-hover:shadow-glow-sm">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
        </span>
      </div>

      <h3 className="relative mt-6 font-display text-xl font-semibold text-fog">{title}</h3>
      <p className="relative mt-2.5 text-[15px] leading-relaxed text-fog-muted">{description}</p>

      {/* Línea inferior que se ilumina */}
      <span
        aria-hidden
        className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-flame-gradient transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );
}
