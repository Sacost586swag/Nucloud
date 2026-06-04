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
