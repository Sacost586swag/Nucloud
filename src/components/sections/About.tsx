import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ABOUT_PILLARS } from "@/constants/content";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK, BRAND } from "@/constants/site";

export function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-24 border-y border-white/[0.05] bg-ink-soft/60 py-24 sm:py-32">
      <GlowBackground position="center" />
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Texto */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.span variants={fadeUp} className="eyebrow">
              Sobre NUCLOUD
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-fog sm:text-5xl"
            >
              Tecnología avanzada al servicio de tu <span className="text-flame">crecimiento</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted">
              En NUCLOUD diseñamos y construimos sistemas inteligentes que resuelven problemas
              reales. Unimos inteligencia artificial, automatización e infraestructura cloud para
              que tu empresa opere con la potencia de una compañía tecnológica de primer nivel.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9">
              <Button href={WHATSAPP_LINK} external size="lg">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Hablemos de tu proyecto
              </Button>
            </motion.div>
          </motion.div>

          {/* Pilares */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-2"
          >
            {ABOUT_PILLARS.map((pillar) => (
              <motion.li
                key={pillar.title}
                variants={fadeUp}
                className="group rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 transition-colors hover:border-flame/25"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                  <Check className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-fog">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-muted">{pillar.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Banda de marca sutil */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 flex items-center justify-center gap-4 opacity-70"
        >
          <img src={BRAND.logo} alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-sm tracking-[0.25em] text-fog-muted">
            {BRAND.tagline.toUpperCase()}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
