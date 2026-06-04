import { motion } from "framer-motion";
import { CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { NeuralMockup } from "./NeuralMockup";
import { WHATSAPP_LINK } from "@/constants/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pb-28">
      <GlowBackground position="top" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-60" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Columna de texto */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start">
            <motion.span variants={item} className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              IA · Automatización · Cloud
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tightest text-fog sm:text-6xl lg:text-[4.4rem]"
            >
              Automatiza tu negocio con{" "}
              <span className="text-flame">Inteligencia Artificial</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted"
            >
              Creamos sistemas inteligentes que optimizan procesos, mejoran la atención al
              cliente y ayudan a las empresas a crecer.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={WHATSAPP_LINK} external size="lg" aria-label="Agendar consultoría por WhatsApp">
                <CalendarCheck className="h-[18px] w-[18px]" />
                Agendar Consultoría
              </Button>
              <Button href={WHATSAPP_LINK} external variant="secondary" size="lg">
                <WhatsAppIcon className="h-[18px] w-[18px] text-flame" />
                Contactar por WhatsApp
              </Button>
            </motion.div>

            {/* Prueba social mínima */}
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
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
            </motion.div>
          </motion.div>

          {/* Columna del mockup */}
          <div className="relative lg:pl-4">
            <NeuralMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
