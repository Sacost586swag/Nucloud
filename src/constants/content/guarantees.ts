/**
 * Reemplaza a los stat tokens inventados (+70%/-80%/+90%) del sitio anterior
 * por compromisos reales y verificables (FR-018) — se muestran como tokens
 * cortos que se decodifican con ScrambleText, no como contadores numéricos.
 */

export interface GuaranteeStat {
  value: string;
  label: string;
  description: string;
}

export const GUARANTEE_STATS: GuaranteeStat[] = [
  {
    value: "<2 min",
    label: "Tiempo de respuesta",
    description: "Atendemos cada contacto en menos de dos minutos, las 24 horas del día.",
  },
  {
    value: "24/7",
    label: "Disponibilidad total",
    description: "Tus sistemas trabajan sin pausa, todos los días del año.",
  },
  {
    value: "0",
    label: "Contactos sin registrar",
    description: "Ningún contacto se pierde: todo queda guardado y con seguimiento.",
  },
  {
    value: "100%",
    label: "Reporte periódico",
    description: "Recibes reportes con contactos entrados, respondidos y agendados.",
  },
];
