/**
 * Preguntas frecuentes — reescritas sin nombrar herramientas internas
 * (FR-020) ni estadísticas sin fuente (FR-018), a partir del catálogo real.
 * Respuestas autocontenidas de 40–60 palabras, extraíbles por crawlers de IA.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "¿Qué es la automatización con IA y cómo ayuda a mi negocio?",
    answer:
      "La automatización con IA usa agentes inteligentes para ejecutar tareas repetitivas sin intervención humana: atender clientes, calificar contactos, generar reportes o gestionar seguimientos. En NUCLOUD diseñamos sistemas a medida que responden en minutos y operan 24/7, sin que tengas que ampliar tu equipo.",
  },
  {
    question: "¿Cómo trabaja NUCLOUD, paso a paso?",
    answer:
      "Empezamos con un diagnóstico (días 1–3) para entender tu operación, seguimos con la construcción del sistema (días 3–14) conectando tus canales, y cerramos con una validación (días 14–21) probando el sistema con conversaciones reales antes de entregarlo con documentación y capacitación.",
  },
  {
    question: "¿Qué garantiza NUCLOUD y qué no?",
    answer:
      "Garantizamos el funcionamiento técnico del sistema: tiempo de respuesta menor a dos minutos, cero contactos sin registrar, seguimiento automático y reportes periódicos. No garantizamos un número específico de ventas cerradas, porque eso depende del equipo comercial de cada negocio, no del sistema.",
  },
  {
    question: "¿En qué países opera NUCLOUD?",
    answer:
      "NUCLOUD tiene sede en Cuenca, Ecuador, y trabaja con empresas en todo el país y en Latinoamérica de forma remota. Atendemos en español, con respuesta en menos de 24 horas en días laborables y soporte continuo durante toda la implementación.",
  },
  {
    question: "¿Cuánto tarda en estar listo un sistema?",
    answer:
      "Una automatización sencilla puede estar operativa en una o dos semanas. Los sistemas más completos — agentes conversacionales, integraciones múltiples — siguen el ciclo completo de 21 días dividido en diagnóstico, construcción y validación, con entregas funcionales desde el inicio.",
  },
  {
    question: "¿Mis datos están seguros con la automatización con IA?",
    answer:
      "Sí. Trabajamos con infraestructura cloud segura, separamos credenciales y datos sensibles, y solo usamos tu información para los procesos acordados contigo. Tus datos nunca se comparten con terceros sin tu autorización expresa.",
  },
];
