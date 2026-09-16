/**
 * Configuración del Embedded Signup de WhatsApp (Meta) para /embedded-whatsapp.
 * Aislado de site.ts porque no es información de contacto de NUCLOUD, sino
 * credenciales de la integración de Meta + endpoints de n8n para el onboarding
 * de números de clientes.
 *
 * El header de abajo NO es un secreto real: cualquier valor usado por JS del
 * navegador es legible desde el bundle público (DevTools → Network/Sources).
 * Funciona como filtro anti-spam básico del lado de n8n, igual que el honeypot
 * de ContactForm — no como una credencial que deba protegerse.
 */

export const FB_APP_ID = "2236629896891521";
export const FB_GRAPH_VERSION = "v26.0";
export const FB_CONFIG_ID = "1309790781092976";

/** Webhooks de n8n que reciben los eventos del onboarding. */
export const N8N_ONBOARDING_WEBHOOK =
  "https://n8n.nucloudai.cloud/webhook/whatsapp-onboarding-Sacost160469$";
export const N8N_CODE_WEBHOOK =
  "https://n8n.nucloudai.cloud/webhook/whatsapp-login-Sacost160469$";

/** Header de autenticación (ver nota de seguridad arriba). */
export const WEBHOOK_HEADER_NAME = "x-nuclouai-secret";
export const WEBHOOK_HEADER_VALUE = "j75zIYyqOvWEPqhBeK9bPItUmnxtWj6b";
