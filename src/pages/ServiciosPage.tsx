import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/layout/PageCTA";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Services } from "@/components/sections/Services";
import { SERVICES } from "@/constants/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fadeUp, stagger, viewportOnce } from "@/hooks/useReveal";
import { WHATSAPP_LINK } from "@/constants/site";

/** Detalle ampliado por servicio: qué incluye + casos de uso. */
const SERVICE_DETAIL: Record<string, { includes: string[]; useCases: string }> = {
  "Automatización con IA": {
    includes: [
      "Agentes conversacionales con memoria y contexto",
      "Calificación y enrutado automático de leads",
      "Respuestas 24/7 en WhatsApp e Instagram",
      "Escalado a humano cuando hace falta",
    ],
    useCases:
      "Atención al cliente, ventas asistidas, soporte de primer nivel y seguimiento postventa sin ampliar tu equipo.",
  },
  "Desarrollo Web": {
    includes: [
      "Webs y landings orientadas a conversión",
      "Aplicaciones a medida (React / Next.js)",
      "Rendimiento, SEO técnico y accesibilidad",
      "Diseño premium fiel a tu marca",
    ],
    useCases:
      "Lanzamientos de producto, portales de cliente, paneles internos y experiencias digitales de alto nivel.",
  },
  "Integraciones API": {
    includes: [
      "Conexión de CRM, ERP, pagos y mensajería",
      "Sincronización de datos en tiempo real",
      "Webhooks y colas robustas con reintentos",
      "Mapeo y normalización de datos entre sistemas",
    ],
    useCases:
      "Unificar herramientas dispersas en un único flujo coherente y eliminar el copia-pega entre plataformas.",
  },
  "Infraestructura Cloud": {
    includes: [
      "Despliegues seguros y monitorizados",
      "Bases de datos gestionadas (PostgreSQL)",
      "Backups, alertas y observabilidad",
      "Arquitectura preparada para escalar",
    ],
    useCases:
      "Soportar crecimiento sin sobrecostes, con sistemas estables, vigilados y listos para picos de demanda.",
  },
  "Automatizaciones n8n": {
    includes: [
      "Workflows visuales de extremo a extremo",
      "Disparadores, lógica condicional e IA",
      "Enlace con bases de datos y notificaciones",
      "Manejo de errores y reintentos automáticos",
    ],
    useCases:
      "Orquestar procesos completos: capturar, procesar con IA, almacenar y notificar, todo sin intervención manual.",
  },
  "Soluciones Empresariales": {
    includes: [
      "Digitalización de operaciones a medida",
      "Paneles con métricas y control en vivo",
      "Eliminación de tareas manuales repetitivas",
      "Roles, permisos y trazabilidad",
    ],
    useCases:
      "Empresas que necesitan visibilidad total de su operación y sistemas a la medida de sus procesos reales.",
  },
};

export function ServiciosPage() {
  useDocumentTitle("Servicios — NUCLOUD | IA, automatización, web y cloud");

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Soluciones de IA, automatización y desarrollo{" "}
            <span className="text-flame">a tu medida</span>
          </>
        }
        description="Diseñamos y construimos sistemas inteligentes que trabajan por ti: desde agentes de IA y automatizaciones con n8n hasta desarrollo web e infraestructura cloud. Cada servicio se adapta a tu operación real."
      >
        <Button href={WHATSAPP_LINK} external size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          Agendar consultoría
        </Button>
        <Button to="/contacto" variant="secondary" size="lg">
          Solicitar propuesta
        </Button>
      </PageHero>

      {/* Vista general (reutiliza la sección de la Home) */}
      <Services />

      {/* Detalle ampliado por servicio */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {SERVICES.map((service, i) => {
              const detail = SERVICE_DETAIL[service.title];
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  variants={fadeUp}
                  className="group grid gap-8 rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 transition-colors hover:border-flame/25 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/20 bg-flame/[0.08] text-flame">
                        <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
                      </span>
                      <span className="font-mono text-sm text-flame/70">
                        0{i + 1}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-semibold text-fog sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fog-muted">
                      {service.description}
                    </p>
                    {detail && (
                      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog-muted">
                        <span className="font-medium text-fog">Casos de uso · </span>
                        {detail.useCases}
                      </p>
                    )}
                  </div>

                  {detail && (
                    <div className="rounded-3xl border border-white/[0.06] bg-ink/40 p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">
                        Qué incluye
                      </p>
                      <ul className="mt-4 flex flex-col gap-3">
                        {detail.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15px] text-fog">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-flame/30 bg-flame/[0.08] text-flame">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>

          {/* Espacios para imágenes de referencia (assets futuros) */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ImagePlaceholder label="Arquitectura de agente IA" ratio="4/3" />
            <ImagePlaceholder label="Captura de dashboard" ratio="4/3" />
            <ImagePlaceholder label="Flujo n8n de ejemplo" ratio="4/3" />
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/contacto" size="lg" className="px-8">
              Cuéntanos tu proyecto
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageCTA
        title={
          <>
            ¿Qué quieres <span className="text-flame">automatizar</span> primero?
          </>
        }
        description="Te respondemos en menos de 24 h con una propuesta clara y sin compromiso."
      />
    </>
  );
}
