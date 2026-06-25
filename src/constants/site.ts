/**
 * Datos centrales del sitio: enlaces de contacto y metadatos de marca.
 * Cambiar aquí un número o URL lo actualiza en toda la web.
 */

export const WHATSAPP_NUMBER = "593963322355";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Mensaje precargado para la conversación de WhatsApp. */
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola NUCLOUD 👋, quiero automatizar mi negocio con IA. ¿Podemos hablar?"
);

export const WHATSAPP_LINK = `${WHATSAPP_URL}?text=${WHATSAPP_MESSAGE}`;

/**
 * Webhook de n8n que recibe los envíos del formulario de contacto.
 * Todos los datos del formulario se envían aquí por POST.
 */
export const CONTACT_WEBHOOK_URL =
  "https://n8n.nucloudai.cloud/webhook/afad80a4-573b-4bd0-8a88-f62ebe5e4856";

export const PRIVACY_POLICY_URL =
  "https://docs.google.com/document/d/e/2PACX-1vQaj5a8hESVUWImPBvmY-jElDw8EF1NW9qWMppZvrKTq1YAtJWvl_Q4o5bQi9YleoQ75NJAO6vwX1Ii/pub";

/** Perfil de Instagram de NUCLOUD. */
export const INSTAGRAM_URL = "https://www.instagram.com/nucloud_ai.ec/";

/** Correo de contacto y su enlace mailto. */
export const CONTACT_EMAIL = "nucloudai@gmail.com";
export const EMAIL_LINK = `mailto:${CONTACT_EMAIL}`;

export const BRAND = {
  name: "NUCLOUD",
  tagline: "Sistemas inteligentes para empresas que crecen.",
  logo: "/nucloud-logo.png",
  wordmark: "/nucloud-wordmark.png",
} as const;

/**
 * Fecha de última actualización de contenido (ISO, YYYY-MM-DD).
 * Actualízala al publicar cambios de contenido para mantener la señal de
 * frescura coherente con sitemap.xml y el dateModified del JSON-LD.
 */
export const SITE_LAST_UPDATED = "2026-06-24";

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
