import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { FAQ } from "@/components/sections/FAQ";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

export function FaqPage() {
  useDocumentTitle("Preguntas frecuentes — NUCLOUD | Automatización con IA");

  return (
    <>
      <PageHero
        eyebrow="Preguntas frecuentes"
        title={
          <>
            Lo que más nos preguntan antes de{" "}
            <span className="text-flame">empezar</span>
          </>
        }
        description="Respuestas directas sobre cómo trabajamos, plazos, costes, seguridad y dónde operamos. Si te falta alguna, escríbenos y te respondemos en menos de 24 horas."
      >
        <Button href={WHATSAPP_LINK} external size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Preguntar por WhatsApp
        </Button>
        <Button to="/contacto" variant="secondary" size="lg">
          Enviar consulta
        </Button>
      </PageHero>

      {/* Acordeón completo (reutiliza la sección de la Home) */}
      <FAQ />

      <section className="relative py-6 sm:py-10">
        <div className="container-x">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-[2rem] border border-flame/20 bg-ink-soft p-8 text-center sm:p-10"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
              <MessageCircleQuestion className="h-[22px] w-[22px]" strokeWidth={1.7} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-fog sm:text-3xl">
              ¿No está tu pregunta?
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-fog-muted">
              Escríbenos directamente: te resolvemos cualquier duda sobre tu caso concreto,
              sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={WHATSAPP_LINK} external size="lg">
                <WhatsAppIcon className="h-5 w-5" />
                Hablar por WhatsApp
              </Button>
              <Button to="/contacto" variant="secondary" size="lg">
                Ir al formulario
              </Button>
            </div>
          </motion.div>

          {/* Espacio para imagen de referencia (asset futuro) */}
          <div className="mx-auto mt-12 max-w-3xl">
            <ImagePlaceholder label="Infografía del proceso" ratio="21/9" />
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Resolvamos tus dudas y <span className="text-flame">empecemos</span>
          </>
        }
        description="Una consultoría inicial gratuita basta para saber qué automatizar primero."
      />
    </>
  );
}
