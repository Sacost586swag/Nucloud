/**
 * Las 8 familias de servicio reales de NUCLOUD (Catalogo_Servicios_Nucloud.docx
 * §4) más 2 capacidades transversales. Sin precios (FR-021) y sin nombrar
 * herramientas internas (FR-020) — se describe el resultado, no la
 * implementación.
 */

export interface FamiliaDeServicio {
  id: string;
  /** "01"–"08" para las familias numeradas; ausente en las transversales. */
  numero?: string;
  titulo: string;
  descripcion: string;
  idealPara: string;
  incluye: string[];
  casosDeUso: string;
}

export const SERVICE_FAMILIES: FamiliaDeServicio[] = [
  {
    id: "webs-y-landings",
    numero: "01",
    titulo: "Webs y landings",
    descripcion:
      "Presencia digital profesional orientada a conversión: páginas que convierten visitas en contactos, no solo folletos digitales.",
    idealPara:
      "Negocios sin presencia digital o con una web que no genera contactos. Cualquier vertical que dependa de que lo encuentren en Google, Instagram o WhatsApp.",
    incluye: [
      "Diseño responsive orientado a conversión",
      "Formulario de contacto y botón de WhatsApp integrados",
      "SEO on-page",
      "Blog y analítica cuando aplica",
    ],
    casosDeUso:
      "Lanzamiento de marca, generación de contactos desde redes sociales, presencia profesional para negocios que dependen de que los encuentren en buscadores.",
  },
  {
    id: "apps-y-dashboards",
    numero: "02",
    titulo: "Apps y dashboards",
    descripcion:
      "Visibilidad en tiempo real del negocio: reemplaza el Excel disperso y el grupo de mensajería por un panel único con métricas en vivo.",
    idealPara:
      "Negocios que gestionan operación, ventas o inventario en hojas de cálculo y no tienen visibilidad centralizada para tomar decisiones.",
    incluye: [
      "KPIs y gráficas en tiempo real",
      "Múltiples fuentes de datos conectadas",
      "Alertas automáticas",
      "Exportación de reportes",
    ],
    casosDeUso:
      "Control de ventas, inventario o entregas para dueños de negocio que hoy dependen de reportes manuales.",
  },
  {
    id: "automatizaciones",
    numero: "03",
    titulo: "Automatizaciones",
    descripcion:
      "Elimina tareas manuales repetitivas — copiar datos, enviar correos, actualizar hojas — con flujos automáticos que no cometen errores ni se cansan.",
    idealPara:
      "Cualquier negocio con procesos administrativos repetitivos: gestorías, contabilidad, seguimiento de pedidos, reportes periódicos.",
    incluye: [
      "Flujos de trabajo automatizados de extremo a extremo",
      "Seguimiento y recordatorios automáticos",
      "Integración con formularios y mensajería",
      "Manejo de errores y reintentos",
    ],
    casosDeUso:
      "Seguimiento de pedidos, recordatorios de pago, reportes periódicos automáticos, embudos de seguimiento a clientes.",
  },
  {
    id: "agentes-ia-y-asistentes",
    numero: "04",
    titulo: "Agentes IA y asistentes",
    descripcion:
      "Responde, cualifica y agenda automáticamente, 24/7. El error más caro de cualquier negocio es el contacto que nadie responde a tiempo.",
    idealPara:
      "Negocios que reciben contactos por formulario, Instagram o WhatsApp y no pueden responder en menos de 2 minutos de forma constante. Clínicas, inmobiliarias, estudios legales.",
    incluye: [
      "Respuestas automáticas en menos de 2 minutos",
      "Calificación automática de contactos",
      "Agenda de citas integrada",
      "Seguimiento automático a quien no responde",
    ],
    casosDeUso:
      "Atención al cliente, ventas asistidas, soporte de primer nivel y seguimiento postventa sin ampliar el equipo.",
  },
  {
    id: "captacion-de-leads",
    numero: "05",
    titulo: "Captación de leads",
    descripcion:
      "Sistema activo de generación de contactos, en vez de depender solo del boca a boca. Sabes cuántos contactos entran, de dónde vienen y qué pasa con ellos.",
    idealPara: "Negocios que dependen de referidos y quieren un canal de captación predecible y medible.",
    incluye: [
      "Landing y formulario de captación",
      "Registro y seguimiento automático de contactos",
      "Panel de control de contactos",
      "Integración con campañas cuando aplica",
    ],
    casosDeUso:
      "Generar un flujo constante y medible de nuevos contactos en vez de depender solo de referidos.",
  },
  {
    id: "agentes-autonomos",
    numero: "06",
    titulo: "Agentes autónomos",
    descripcion:
      "Un sistema que toma decisiones dentro de un proceso: clasifica correos, gestiona tareas, resume documentos o busca información sin supervisión constante.",
    idealPara:
      "Negocios con procesos que requieren criterio, no solo respuestas automáticas: bandejas de entrada saturadas, gestión documental, investigación recurrente.",
    incluye: [
      "Automatización de tareas con criterio propio",
      "Integraciones con sistemas internos",
      "Memoria persistente del contexto del negocio",
      "Base de conocimiento propia del negocio",
    ],
    casosDeUso: "Clasificación de correos, gestión documental, investigación recurrente sin supervisión constante.",
  },
  {
    id: "asistentes-telefonicos",
    numero: "07",
    titulo: "Asistentes telefónicos",
    descripcion:
      "Cada llamada perdida es un ingreso perdido. Un asistente que responde, informa y agenda sin depender de que la recepción esté disponible.",
    idealPara: "Clínicas, consultorios y negocios donde la recepción pierde llamadas o tarda en confirmar citas.",
    incluye: [
      "Respuesta de llamadas 24/7",
      "Agenda de citas por voz",
      "Confirmaciones automáticas",
      "Integración con calendario",
    ],
    casosDeUso: "Confirmación de citas, respuesta a preguntas frecuentes por voz, reducción de llamadas perdidas.",
  },
  {
    id: "reporting-y-cmi",
    numero: "08",
    titulo: "Reporting y CMI",
    descripcion:
      "El dueño sabe cómo va el negocio en tiempo real, no el último día del mes. Un cuadro de mando integral que convierte datos dispersos en decisiones a tiempo.",
    idealPara:
      "Dueños de negocio sin visibilidad en tiempo real de ventas, contactos o métricas clave, que hoy dependen de reportes manuales de fin de mes.",
    incluye: [
      "Dashboard en vivo con métricas clave",
      "Alertas automáticas por WhatsApp",
      "Consolidación de múltiples fuentes de datos",
      "Reportes periódicos automáticos",
    ],
    casosDeUso:
      "Visibilidad de ventas y operación en tiempo real para tomar decisiones sin esperar al reporte de fin de mes.",
  },
];

/** Capacidades transversales — no forman parte de la numeración 01–08. */
export const TRANSVERSAL_CAPABILITIES: FamiliaDeServicio[] = [
  {
    id: "integraciones-y-apis",
    titulo: "Integraciones & APIs",
    descripcion:
      "Conectamos tus herramientas — CRM, mensajería, pagos — en un único flujo de datos coherente y en tiempo real.",
    idealPara: "Negocios que ya usan varias herramientas dispersas y necesitan que se hablen entre sí sin trabajo manual.",
    incluye: [
      "Conexión entre CRM, pagos y mensajería",
      "Sincronización de datos en tiempo real",
      "Automatización de flujos entre sistemas",
      "Mapeo y normalización de datos",
    ],
    casosDeUso: "Unificar herramientas dispersas en un único flujo coherente y eliminar el trabajo manual entre plataformas.",
  },
  {
    id: "infraestructura-cloud",
    titulo: "Infraestructura Cloud",
    descripcion:
      "Arquitecturas cloud seguras, monitorizadas y preparadas para escalar contigo, sin sobrecostes ni complejidad.",
    idealPara: "Negocios que necesitan que sus sistemas estén siempre disponibles y listos para crecer sin sobresaltos técnicos.",
    incluye: [
      "Despliegues seguros y monitorizados",
      "Bases de datos gestionadas",
      "Copias de seguridad y alertas",
      "Arquitectura preparada para escalar",
    ],
    casosDeUso: "Soportar el crecimiento del negocio con sistemas estables y vigilados, sin sobrecostes.",
  },
];
