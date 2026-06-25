import { motion } from "framer-motion";
import { Target, Eye, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { About } from "@/components/sections/About";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

const MISION_VISION = [
  {
    icon: Target,
    title: "Nuestra misión",
    text: "Llevar la potencia de la inteligencia artificial y la automatización a empresas de todos los tamaños, con sistemas a medida que eliminan el trabajo repetitivo y liberan a los equipos para crecer.",
  },
  {
    icon: Eye,
    title: "Nuestra visión",
    text: "Ser el aliado tecnológico de referencia en Latinoamérica para la transformación con IA, construyendo infraestructura inteligente que impulse negocios sostenibles y competitivos.",
  },
];

export function NosotrosPage() {
  useDocumentTitle("Nosotros — NUCLOUD | Agencia de IA y automatización en Cuenca");

  return (
    <>
      <PageHero
        eyebrow="Sobre NUCLOUD"
        title={
          <>
            Tecnología avanzada al servicio de tu{" "}
            <span className="text-flame">crecimiento</span>
          </>
        }
        description="Somos NUCLOUD, una agencia tecnológica con sede en Cuenca (Ecuador) especializada en inteligencia artificial, automatización e infraestructura cloud. Diseñamos y construimos sistemas que resuelven problemas reales de negocio."
      >
        <Button href={WHATSAPP_LINK} external size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Hablemos de tu proyecto
        </Button>
        <Button to="/contacto" variant="secondary" size="lg">
          Contactar
        </Button>
      </PageHero>

      {/* Misión y visión */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-5 lg:grid-cols-2"
          >
            {MISION_VISION.map((it) => (
              <motion.article
                key={it.title}
                variants={fadeUp}
                className="rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
                  <it.icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-fog">{it.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fog-muted">{it.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pilares (reutiliza la sección de la Home) */}
      <About />

      {/* Sede + espacios para imágenes */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex items-center gap-3 text-fog-muted"
          >
            <MapPin className="h-5 w-5 text-flame" />
            <span className="text-[15px]">
              <span className="font-medium text-fog">Sede en Cuenca, Azuay — Ecuador.</span>{" "}
              Trabajamos con empresas en todo el país y en Latinoamérica de forma remota.
            </span>
          </motion.div>

          {/* Espacios para imágenes de referencia (assets futuros) */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <ImagePlaceholder label="Foto del equipo" ratio="4/3" />
            <ImagePlaceholder label="Espacio de trabajo" ratio="4/3" />
            <ImagePlaceholder label="Branding / logo" ratio="4/3" />
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Conoce cómo trabajamos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Construyamos algo <span className="text-flame">inteligente</span> juntos
          </>
        }
        description="Cuéntanos tu reto y te proponemos el sistema que mejor encaja con tu negocio."
      />
    </>
  );
}
