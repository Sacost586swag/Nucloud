/** Proceso real de trabajo de NUCLOUD (Catalogo_Servicios_Nucloud.docx §2). */

export interface ProcessPhase {
  numero: string;
  titulo: string;
  rango: string;
  descripcion: string;
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    rango: "Días 1–3",
    descripcion:
      "Levantamos la información operativa de tu negocio — horarios, servicios, preguntas frecuentes y qué debe (y no debe) responder la IA — y conectamos los accesos necesarios.",
  },
  {
    numero: "02",
    titulo: "Construcción",
    rango: "Días 3–14",
    descripcion:
      "Conectamos WhatsApp, Instagram y tu formulario web a un solo punto de entrada. Configuramos el agente para responder en minutos, calificar contactos y ofrecer agenda con tu equipo.",
  },
  {
    numero: "03",
    titulo: "Validación",
    rango: "Días 14–21",
    descripcion:
      "Probamos el sistema completo con conversaciones reales, ajustamos su comportamiento y entregamos documentación completa más capacitación a tu equipo.",
  },
];

/** Bonificaciones incluidas en toda implementación. */
export const BONUSES: string[] = [
  "Agenda automática de citas (cuando aplica)",
  "Panel de seguimiento",
  "Documentación completa del sistema",
  "Formación al equipo del cliente",
  "Soporte durante los primeros 30 días",
  "Mantenimiento incluido los primeros dos meses",
];
