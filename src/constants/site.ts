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

export const BRAND = {
  name: "NUCLOUD",
  tagline: "Sistemas inteligentes para empresas que crecen.",
  logo: "/nucloud-logo.png",
  wordmark: "/nucloud-wordmark.png",
} as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
] as const;
