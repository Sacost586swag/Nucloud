import { motion } from "framer-motion";
import { Home as HomeIcon } from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

export function NotFoundPage() {
  useDocumentTitle("Página no encontrada — NUCLOUD");

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-32">
      <GlowBackground position="center" intensity="strong" />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-30 mask-fade-b" />
      <div className="container-x relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-display text-7xl font-semibold tracking-tightest text-flame sm:text-8xl"
          >
            404
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-semibold text-fog sm:text-4xl"
          >
            Esta página no existe
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-fog-muted"
          >
            El enlace puede estar roto o la página se movió. Volvamos a un lugar conocido.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">
              <HomeIcon className="h-[18px] w-[18px]" />
              Volver al inicio
            </Button>
            <Button href={WHATSAPP_LINK} external variant="secondary" size="lg">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Escríbenos
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
