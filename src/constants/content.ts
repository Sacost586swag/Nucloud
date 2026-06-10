/**
 * Contenido de las secciones (servicios, proceso, beneficios).
 * Tipado fuerte para mantener la coherencia y facilitar la edición.
 */
import {
  Bot,
  Code2,
  Plug,
  Cloud,
  Workflow,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "Automatización con IA",
    description:
      "Agentes y asistentes inteligentes que atienden clientes, califican leads y ejecutan tareas 24/7 sin intervención humana.",
  },
  {
    icon: Code2,
    title: "Desarrollo Web",
    description:
      "Webs y aplicaciones rápidas, escalables y de diseño premium, construidas con tecnología moderna y orientadas a conversión.",
  },
  {
    icon: Plug,
    title: "Integraciones API",
    description:
      "Conectamos tus herramientas —CRM, ERP, mensajería, pagos— en un único flujo de datos coherente y en tiempo real.",
  },
  {
    icon: Cloud,
    title: "Infraestructura Cloud",
    description:
      "Arquitecturas cloud seguras, monitorizadas y preparadas para escalar contigo, sin sobrecostes ni complejidad.",
  },
  {
    icon: Workflow,
    title: "Automatizaciones n8n",
    description:
      "Orquestamos procesos completos con n8n: disparadores, lógica, IA y bases de datos enlazados de extremo a extremo.",
  },
  {
    icon: Building2,
    title: "Soluciones Empresariales",
    description:
      "Sistemas a medida que digitalizan operaciones, eliminan trabajo manual y dan visibilidad total de tu negocio.",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Análisis",
    description: "Entendemos tu operación, detectamos cuellos de botella y definimos objetivos medibles.",
  },
  {
    index: "02",
    title: "Diseño",
    description: "Diseñamos la arquitectura, los flujos y la experiencia de cada sistema antes de escribir código.",
  },
  {
    index: "03",
    title: "Desarrollo",
    description: "Construimos software robusto, limpio y escalable con tecnología de última generación.",
  },
  {
    index: "04",
    title: "Automatización",
    description: "Integramos IA y n8n para que los procesos se ejecuten solos, con precisión y sin descanso.",
  },
  {
    index: "05",
    title: "Optimización",
    description: "Medimos, refinamos y escalamos el sistema para que mejore de forma continua.",
  },
];

/** Nodos del diagrama de arquitectura del flujo de datos. */
export interface ArchNode {
  label: string;
  sub: string;
}

export const ARCHITECTURE_FLOW: ArchNode[] = [
  { label: "Instagram · WhatsApp", sub: "Canales de entrada" },
  { label: "API Gateway", sub: "Ingesta y enrutado" },
  { label: "n8n + IA", sub: "Orquestación inteligente" },
  { label: "PostgreSQL", sub: "Memoria y datos" },
  { label: "Dashboard SaaS", sub: "Control y métricas" },
];

export interface Benefit {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    value: "24/7",
    label: "Disponibilidad total",
    description: "Tus sistemas atienden y trabajan sin pausa, todos los días del año.",
  },
  {
    value: "+70",
    suffix: "%",
    label: "Más eficiencia",
    description: "Procesos que antes tomaban horas se resuelven en segundos.",
  },
  {
    value: "-80",
    suffix: "%",
    label: "Menos trabajo manual",
    description: "La operación repetitiva se automatiza y tu equipo se enfoca en crecer.",
  },
  {
    value: "+90",
    suffix: "%",
    label: "Mejor experiencia",
    description: "Respuestas inmediatas y consistentes que elevan la satisfacción del cliente.",
  },
];

/** Preguntas frecuentes — diseñadas como bloques de respuesta extractables por IA (40-60 palabras). */
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "¿Qué es la automatización con IA y cómo ayuda a mi empresa?",
    answer:
      "La automatización con IA usa agentes inteligentes y modelos de lenguaje para ejecutar tareas repetitivas sin intervención humana: atender clientes, calificar leads, generar reportes o gestionar pedidos. En NUCLOUD diseñamos sistemas a medida que reducen el trabajo manual hasta un 80% y operan 24/7.",
  },
  {
    question: "¿Cuánto cuesta implementar un agente de IA o una automatización?",
    answer:
      "El coste depende del alcance: un chatbot básico parte desde un proyecto puntual, mientras que un sistema integrado con CRM, WhatsApp y bases de datos requiere más trabajo. Ofrecemos una consultoría inicial gratuita y propuesta a medida en menos de 24 horas, sin compromiso.",
  },
  {
    question: "¿Cómo integran n8n con los sistemas que ya usa mi empresa?",
    answer:
      "n8n es una plataforma de automatización que conecta APIs, bases de datos y modelos de IA mediante workflows visuales. La usamos para orquestar procesos completos: capturar datos de WhatsApp o Instagram, procesarlos con IA, guardarlos en PostgreSQL y notificar a tu equipo, todo en tiempo real.",
  },
  {
    question: "¿En qué países opera NUCLOUD?",
    answer:
      "NUCLOUD tiene sede en Cuenca, Ecuador, y trabaja con empresas en todo el país y en Latinoamérica de forma remota. Atendemos clientes en español, con respuesta en menos de 24 horas en días laborables y soporte continuo durante la implementación.",
  },
  {
    question: "¿Cuánto tarda en estar listo un sistema con IA?",
    answer:
      "Una automatización sencilla puede estar operativa en una o dos semanas. Sistemas más complejos —agentes conversacionales con memoria, integraciones con CRM o ERP, infraestructura cloud— suelen entregarse entre cuatro y ocho semanas, divididos en fases con entregas funcionales desde el inicio.",
  },
  {
    question: "¿Mis datos están seguros con la automatización con IA?",
    answer:
      "Sí. Desplegamos en infraestructura cloud cifrada, separamos credenciales y datos sensibles, y respetamos la política de privacidad acordada con cada cliente. Tus datos se usan únicamente para los flujos definidos contigo y nunca se comparten con terceros sin autorización expresa.",
  },
];

export interface AboutPillar {
  title: string;
  description: string;
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "Experiencia tecnológica",
    description: "Dominamos IA, cloud y automatización aplicadas a problemas reales de negocio.",
  },
  {
    title: "Soluciones personalizadas",
    description: "Nada de plantillas: cada sistema se diseña a la medida de tu operación.",
  },
  {
    title: "Innovación constante",
    description: "Incorporamos lo último en modelos e infraestructura para mantenerte por delante.",
  },
  {
    title: "Orientación a resultados",
    description: "Medimos el impacto en eficiencia, costes y crecimiento, no solo en entregables.",
  },
];
