import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Benefits } from "@/components/sections/Benefits";
import { BENEFITS } from "@/constants/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

/** "Cómo lo conseguimos" por cada métrica de beneficio. */
const BENEFIT_HOW: Record<string, string> = {
  "Disponibilidad total":
    "Los agentes de IA y las automatizaciones operan en infraestructura cloud que nunca duerme: atienden, procesan y responden a cualquier hora, también fines de semana y festivos.",
  "Más eficiencia":
    "Sustituimos pasos manuales por flujos automáticos en n8n e IA. Tareas que antes encadenaban varias personas y herramientas ahora se resuelven en segundos y sin errores de transcripción.",
  "Menos trabajo manual":
    "Identificamos la operación repetitiva y la delegamos a sistemas: captura de datos, respuestas, seguimientos y reportes. Tu equipo deja el copia-pega y se enfoca en lo que aporta valor.",
  "Mejor experiencia":
    "Respuestas inmediatas, consistentes y personalizadas en cada canal. El cliente recibe atención de calidad al instante, lo que eleva la satisfacción y la conversión.",
};

export function BeneficiosPage() {
  useDocumentTitle("Beneficios — NUCLOUD | Eficiencia, ahorro y mejor experiencia");

  return (
    <>
      <PageHero
        eyebrow="Beneficios"
        title={
          <>
            Resultados medibles que se <span className="text-flame">notan</span>
          </>
        }
        description="Automatizar con IA no es una promesa abstracta: es más velocidad, menos trabajo manual, menores costes operativos y una experiencia de cliente que marca la diferencia. Esto es lo que puedes esperar."
      >
        <Button href={WHATSAPP_LINK} external size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Calcular mi impacto
        </Button>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Métricas animadas (reutiliza la sección con useCountUp) */}
      <Benefits />

      {/* Detalle: cómo conseguimos cada resultado */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-5 lg:grid-cols-2"
          >
            {BENEFITS.map((b) => (
              <motion.article
                key={b.label}
                variants={fadeUp}
                className="group rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-9"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
                    <TrendingUp className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-3xl font-semibold tracking-tightest text-flame">
                    {b.value}
                    {b.suffix}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-fog">{b.label}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fog-muted">
                  {BENEFIT_HOW[b.label] ?? b.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          {/* Espacios para imágenes de referencia (assets futuros) */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <ImagePlaceholder label="Gráfico de eficiencia antes/después" ratio="16/9" />
            <ImagePlaceholder label="Caso de éxito (captura)" ratio="16/9" />
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Quiero estos resultados
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            Convierte estos números en <span className="text-flame">tu realidad</span>
          </>
        }
        description="Analizamos tu operación y te mostramos dónde está el mayor impacto. Sin compromiso."
      />
    </>
  );
}
