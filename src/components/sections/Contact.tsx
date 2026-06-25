import { motion } from "framer-motion";
import { CheckCircle2, Clock, Send, ShieldCheck } from "lucide-react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

/**
 * Sección de contacto de la Home: columna informativa + formulario compartido
 * (<ContactForm/>). El formulario y su lógica de envío al webhook de n8n viven
 * en `@/components/forms/ContactForm` y se reutilizan también en /contacto.
 */
export function Contact() {
  return (
    <section id="contacto" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowBackground position="bottom" intensity="strong" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines mask-fade-b opacity-50" />

      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Columna informativa */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:sticky lg:top-28"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <Send className="h-3.5 w-3.5" />
              Contacto
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-fog sm:text-5xl"
            >
              Hablemos de tu <span className="text-flame">próximo sistema</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-fog-muted"
            >
              Cuéntanos qué quieres automatizar y te respondemos con una propuesta clara,
              sin compromiso. Cuantos más detalles nos des, mejor te orientamos.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-9 flex flex-col gap-4">
              {[
                { icon: Clock, title: "Respuesta en menos de 24 h", sub: "Días laborables" },
                { icon: ShieldCheck, title: "Consultoría inicial gratuita", sub: "Sin compromiso" },
                { icon: CheckCircle2, title: "Propuesta a medida", sub: "Adaptada a tu negocio" },
              ].map((it) => (
                <li key={it.title} className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                    <it.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[15px] font-medium text-fog">{it.title}</span>
                    <span className="text-sm text-fog-muted">{it.sub}</span>
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                ¿Prefieres algo directo?
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[15px] font-medium text-flame transition-colors hover:text-flame-glow"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Escríbenos por WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Columna del formulario (compartido) */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
