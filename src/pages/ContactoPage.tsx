import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import {
  WHATSAPP_LINK,
  INSTAGRAM_URL,
  EMAIL_LINK,
  CONTACT_EMAIL,
} from "@/constants/site";

const HIGHLIGHTS = [
  { icon: Clock, title: "Respuesta en menos de 24 h", sub: "Días laborables" },
  { icon: ShieldCheck, title: "Consultoría inicial gratuita", sub: "Sin compromiso" },
  { icon: CheckCircle2, title: "Propuesta a medida", sub: "Adaptada a tu negocio" },
];

export function ContactoPage() {
  useDocumentTitle("Contacto — NUCLOUD | Automatiza tu negocio con IA");

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Hablemos de tu <span className="text-flame">próximo sistema</span>
          </>
        }
        description="Cuéntanos qué quieres automatizar y te respondemos con una propuesta clara, sin compromiso. Rellena el formulario o escríbenos directamente por el canal que prefieras."
      />

      <section className="relative pb-8 pt-2 sm:pb-12">
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Columna de canales de contacto */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="lg:sticky lg:top-28"
            >
              <motion.ul variants={fadeUp} className="flex flex-col gap-4">
                {HIGHLIGHTS.map((it) => (
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

              {/* Canales directos */}
              <motion.div variants={fadeUp} className="mt-9">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                  Canales directos
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame-gradient text-ink">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">WhatsApp</span>
                      <span className="text-sm text-fog-muted">Respuesta inmediata</span>
                    </span>
                  </a>

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Instagram className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">Instagram</span>
                      <span className="text-sm text-fog-muted">@nucloud_ai.ec</span>
                    </span>
                  </a>

                  <a
                    href={EMAIL_LINK}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-flame/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-flame/20 bg-flame/[0.08] text-flame">
                      <Mail className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium text-fog">Correo</span>
                      <span className="text-sm text-fog-muted">{CONTACT_EMAIL}</span>
                    </span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex items-center gap-3 text-fog-muted"
              >
                <MapPin className="h-5 w-5 text-flame" />
                <span className="text-sm">Cuenca, Azuay — Ecuador · Atención remota en LATAM</span>
              </motion.div>
            </motion.div>

            {/* Formulario compartido (mismo webhook n8n) */}
            <ContactForm />
          </div>

          {/* Espacio para imagen de referencia (asset futuro) */}
          <div className="mt-14">
            <ImagePlaceholder label="Mapa / ubicación Cuenca" ratio="21/9" />
          </div>
        </div>
      </section>
    </>
  );
}
