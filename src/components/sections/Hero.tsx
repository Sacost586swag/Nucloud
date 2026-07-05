import { motion } from "framer-motion";
import { CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { HeroVisual } from "./HeroVisual";
import { WHATSAPP_LINK } from "@/constants/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Titular en 3 líneas ("Automatiza. / Escala. / Crece.") con su propio
// coreografiado anidado: cada línea entra por separado tras el eyebrow.
const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const headlineLine = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pb-28">
      <GlowBackground position="top" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-60" />

      <div className="container-x">
        {/* Titular espectacular a ancho completo */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.span variants={item} className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            IA · Automatización · Cloud
          </motion.span>

          <motion.h1
            variants={headlineContainer}
            className="mt-6 flex flex-col font-display text-display-hero font-extrabold uppercase text-fog"
          >
            <motion.span variants={headlineLine} className="block text-outline">
              Automatiza.
            </motion.span>
            <motion.span variants={headlineLine} className="block text-flame">
              Escala.
            </motion.span>
            <motion.span variants={headlineLine} className="block text-flame">
              Crece.
            </motion.span>
          </motion.h1>

          {/* Fila secundaria: copy de apoyo + CTAs + prueba social, junto al visual */}
          <div className="mt-10 grid w-full items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <motion.div variants={item} className="flex flex-col items-start">
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-fog-muted">
                Creamos sistemas inteligentes que optimizan procesos, mejoran la atención al
                cliente y ayudan a las empresas a crecer.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={WHATSAPP_LINK} external size="lg" aria-label="Agendar consultoría por WhatsApp">
                  <CalendarCheck className="h-[18px] w-[18px]" />
                  Agendar Consultoría
                </Button>
                <Button href={WHATSAPP_LINK} external variant="secondary" size="lg">
                  <WhatsAppIcon className="h-[18px] w-[18px] text-flame" />
                  Contactar por WhatsApp
                </Button>
              </div>

              {/* Prueba social mínima */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                {[
                  "Disponibilidad 24/7",
                  "Implementación a medida",
                  "Resultados medibles",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-fog-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-glow-sm" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Columna del visual */}
            <div className="relative lg:pl-4">
              <HeroVisual />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
