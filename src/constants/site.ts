/**
 * Datos centrales del sitio: enlaces de contacto y metadatos de marca.
 * Cambiar aquí un número o URL lo actualiza en toda la web.
 */

/** Mensaje precargado para la conversación de WhatsApp. */
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola NUCLOUD 👋, quiero automatizar mi negocio con IA. ¿Podemos hablar?"
);

export function buildWhatsAppLink(e164: string, message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${e164}?text=${message}`;
}

export interface CanalDeContacto {
  tipo: "whatsapp" | "instagram" | "facebook" | "linkedin" | "tiktok" | "email";
  valor: string;
  enlace: string;
  etiqueta: string;
}

/**
 * Los dos números de WhatsApp de NUCLOUD, presentados siempre como opciones
 * equivalentes (WhatsAppPicker) — ninguno lleva una etiqueta que distinga su
 * función.
 */
export const WHATSAPP_NUMBERS: CanalDeContacto[] = [
  {
    tipo: "whatsapp",
    valor: "593963912365",
    enlace: buildWhatsAppLink("593963912365"),
    etiqueta: "+593 96 391 2365",
  },
  {
    tipo: "whatsapp",
    valor: "593983773180",
    enlace: buildWhatsAppLink("593983773180"),
    etiqueta: "+593 98 377 3180",
  },
];

/**
 * Alias del primer número — se mantiene con este nombre porque
 * EmbeddedWhatsAppPage.tsx lo importa directamente (Principio V).
 */
export const WHATSAPP_LINK = WHATSAPP_NUMBERS[0].enlace;

/** Webhook de n8n que recibe las solicitudes de agendamiento (ver contracts/booking-webhook.md). */
export const BOOKING_WEBHOOK_URL = "https://n8n.nucloudai.cloud/webhook/nucloudai-website-webhook";

export const PRIVACY_POLICY_URL =
  "https://docs.google.com/document/d/e/2PACX-1vQaj5a8hESVUWImPBvmY-jElDw8EF1NW9qWMppZvrKTq1YAtJWvl_Q4o5bQi9YleoQ75NJAO6vwX1Ii/pub";

/** Perfil de Instagram de NUCLOUD. */
export const INSTAGRAM_URL = "https://www.instagram.com/nucloud_ai.ec/";

/** Redes sociales de NUCLOUD — fuente única para footer, drawer, /contacto y JSON-LD (`sameAs`). */
export const SOCIAL_LINKS = {
  instagram: INSTAGRAM_URL,
  facebook: "https://www.facebook.com/profile.php?id=61590267341001",
  linkedin: "https://www.linkedin.com/company/nucloudai",
  tiktok: "https://www.tiktok.com/@nucloud.ai",
} as const;

/** Correo de contacto y su enlace mailto. */
export const CONTACT_EMAIL = "nucloudai@gmail.com";
export const EMAIL_LINK = `mailto:${CONTACT_EMAIL}`;

export const BRAND = {
  name: "NUCLOUD",
  tagline: "Sistemas inteligentes para empresas que crecen.",
  /** No cambiar — EmbeddedWhatsAppPage.tsx usa BRAND.logo (Principio V). */
  logo: "/nucloud-logo.png",
  wordmark: "/nucloud-wordmark.png",
  /** Marca cobre sin texto — navbar/favicon/drawer (espacios pequeños). */
  mark: "/nucloud-icono.png",
  /** Lockup completo (marca + wordmark) — zonas grandes (footer, nosotros). */
  lockup: "/nucloud-logo.png",
} as const;

/**
 * Fecha de última actualización de contenido (ISO, YYYY-MM-DD).
 * Actualízala al publicar cambios de contenido para mantener la señal de
 * frescura coherente con sitemap.xml y el dateModified del JSON-LD.
 */
export const SITE_LAST_UPDATED = "2026-09-18";

/**
 * Enlaces de navegación. Cada item apunta a su subpágina dedicada
 * (rutas de React Router). El logo y las secciones de la Home conservan
 * sus `id` para anclas internas donde haga falta.
 */
export const NAV_LINKS = [
  { label: "Servicios", to: "/servicios" },
  { label: "Proceso", to: "/proceso" },
  { label: "Beneficios", to: "/beneficios" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "FAQ", to: "/faq" },
  { label: "Contacto", to: "/contacto" },
] as const;
