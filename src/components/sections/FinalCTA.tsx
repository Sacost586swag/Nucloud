import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { fadeUp, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2.5rem] border border-flame/20 bg-ink-soft px-7 py-16 text-center sm:px-12 sm:py-24"
        >
          {/* Atmósfera */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(255,107,0,0.22), transparent 60%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-fog text-balance sm:text-5xl lg:text-[3.6rem]">
              Convierte tu negocio en un{" "}
              <span className="text-flame">sistema inteligente</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted">
              Lleva tus procesos al siguiente nivel mediante automatización e inteligencia
              artificial.
            </p>
            <div className="mt-10 flex justify-center">
              <Button href={WHATSAPP_LINK} external size="lg" className="px-9">
                <WhatsAppIcon className="h-5 w-5" />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
