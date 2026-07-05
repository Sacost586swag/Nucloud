# Auditoría de seguridad — NUCLOUD Web

Fecha: 2026-07-05
Alcance: repositorio `NucloudAI` (rama `main`, working tree con cambios locales de UI sin commitear).
Metodología: revisión estática de código + configuración de despliegue + `npm audit`. No se ejecutaron exploits ni peticiones contra el sitio en producción ni contra el webhook de n8n.

---

## 1. Inventario (Fase 1 — Reconocimiento)

### Stack tecnológico
- **Frontend**: React 18 + TypeScript + Vite 5 + Tailwind CSS 3, `react-router-dom` v6 (SPA con rutas cliente), `framer-motion`, `lucide-react`.
- **Backend propio**: **ninguno.** No hay servidor de aplicación, API REST/GraphQL, ORM ni base de datos en este repositorio.
- **Persistencia**: ninguna en el cliente (no `localStorage`/`cookies` de sesión; no hay estado de usuario).
- **Servicio externo integrado**: un único webhook de **n8n** (`CONTACT_WEBHOOK_URL` en [src/constants/site.ts](src/constants/site.ts)) que recibe el formulario de contacto. Su lógica interna no está en este repo (fuera de alcance de la auditoría de código, pero se documentan implicaciones).
- **Despliegue**: build estático (`vite build` → `dist/`) servido por **Nginx** (`nginx:alpine`) en un contenedor Docker (build multi-stage, [Dockerfile](Dockerfile)), orquestado por Dokploy/Traefik detrás de Cloudflare (proxy, SSL "Full").

### Puntos de entrada
| Punto de entrada | Archivo | Naturaleza |
|---|---|---|
| Rutas SPA (`/`, `/servicios`, `/proceso`, `/beneficios`, `/nosotros`, `/faq`, `/contacto`, `*`) | [src/App.tsx](src/App.tsx) | Client-side routing, sin datos de servidor por ruta |
| Formulario de contacto (POST JSON) | [src/components/forms/ContactForm.tsx](src/components/forms/ContactForm.tsx) → `CONTACT_WEBHOOK_URL` | Único punto donde datos de usuario salen del navegador hacia un tercero |
| Enlaces salientes (WhatsApp, Instagram, email, política de privacidad) | [src/constants/site.ts](src/constants/site.ts) | Enlaces estáticos, sin lógica de servidor |
| Recursos estáticos servidos por Nginx (`/assets/*`, vídeos, imágenes, `robots.txt`, `sitemap.xml`, `llms.txt`) | [nginx.conf](nginx.conf) | Archivos del build, sin generación dinámica |

### Autenticación, autorización y sesiones
**No aplica.** No existen cuentas de usuario, login, tokens de sesión, JWT ni roles en esta aplicación. Todo el sitio es contenido público de marketing.

### Uploads, estáticos y tareas en segundo plano
- No hay endpoint de subida de archivos en este repo.
- Estáticos (vídeos `.mp4`, imágenes `.png/.jpg`, `robots.txt`, `sitemap.xml`, `llms.txt`) se sirven directamente desde `public/` vía Nginx; no hay generación ni procesamiento dinámico de archivos en el servidor.
- No hay colas, cron jobs ni workers en este repo. El único procesamiento "en background" ocurre del lado de n8n, fuera de este código.

### Consecuencia para el resto de la auditoría
Al no existir backend propio, base de datos, autenticación ni sesiones, **la mayoría de categorías clásicas del OWASP Top 10 no aplican a este repositorio** (SQLi/NoSQLi/SSTI, IDOR, JWT, CSRF clásico, SSRF, deserialización insegura, mass assignment, path traversal en endpoints dinámicos, race conditions en pagos, etc.). Esto se documenta explícitamente en la sección 4 en lugar de omitirse. El análisis se centró en lo que sí aplica: el único flujo de datos saliente (el webhook), la configuración del servidor Nginx que sí expone la app a internet, y la cadena de dependencias.

---

## 2. Resumen ejecutivo

**No se hallaron vulnerabilidades Críticas ni Altas explotables directamente en este repositorio.** Es una SPA estática sin superficie de backend propia. Los hallazgos son de severidad Media/Baja, centrados en (a) el diseño del único punto de integración externo (webhook público sin controles anti-abuso) y (b) configuración de despliegue (cabeceras de seguridad HTTP ausentes en Nginx, dependencias de desarrollo desactualizadas).

| # | Hallazgo | Severidad | Categoría OWASP | Estado |
|---|---|---|---|---|
| 1 | Webhook de n8n público sin rate-limiting/anti-abuso | **Media** | A04:2021 Insecure Design | Mitigable parcialmente en repo + acción manual en Cloudflare/n8n |
| 2 | Cabeceras de seguridad HTTP ausentes en Nginx (CSP, X-Frame-Options, etc.) | **Media** | A05:2021 Security Misconfiguration | Corregible en `nginx.conf` |
| 3 | `server_tokens` no deshabilitado (fuga de versión de Nginx) | **Baja** | A05:2021 Security Misconfiguration | Corregible en `nginx.conf` |
| 4 | Dependencias de desarrollo vulnerables: `vite` ≤6.4.2 / `esbuild` ≤0.24.2 | **Baja** (contexto: solo dev server) | A06:2021 Vulnerable and Outdated Components | Requiere upgrade mayor (decisión pendiente) |
| 5 | Fuentes de terceros cargadas sin CSP que las restrinja | **Baja** | A05:2021 Security Misconfiguration | Se resuelve junto con el hallazgo 2 |
| 6 | Artefacto residual: carpeta vacía `nginx.conf;D` en el repo | Informativo | Higiene / no es vulnerabilidad | Limpieza recomendada |

**Buenas prácticas ya verificadas (sin acción requerida):**
- Cero secretos/API keys/credenciales hardcodeados en el código fuente ni en el historial de git (`git log --all` + `git grep` sobre patrones de secretos, ambos limpios).
- Cero vulnerabilidades en dependencias de **producción** (`npm audit --omit=dev` → 0 hallazgos).
- Todos los enlaces externos con `target="_blank"` incluyen `rel="noopener noreferrer"` (revisados los 13 usos en el código) — sin riesgo de tabnabbing.
- Sin `dangerouslySetInnerHTML`, `eval`, `innerHTML`, `document.write` ni `new Function` en todo `src/` — React escapa por defecto todo el texto renderizado; no hay sumideros de XSS conocidos.
- Sin datos de usuario reflejados de vuelta en el DOM (el formulario nunca muestra lo que el usuario escribió; tras el envío se muestra un panel estático).
- Sin recursos cargados por `http://` (no hay contenido mixto).
- Nginx sirve estáticos con `root` + `try_files` (sin `alias` ni rutas construidas desde input de usuario) — sin vector de path traversal.

---

## 3. Hallazgos detallados

### Hallazgo 1 — Webhook de n8n público sin rate-limiting ni protección anti-abuso
- **Severidad**: Media
- **Categoría**: OWASP A04:2021 (Insecure Design) / CWE-799 (Improper Control of Interaction Frequency)
- **Archivos**: [src/constants/site.ts:21-22](src/constants/site.ts#L21-L22) (`CONTACT_WEBHOOK_URL`), [src/components/forms/ContactForm.tsx:141-171](src/components/forms/ContactForm.tsx#L141-L171)
- **Descripción del riesgo**: La URL del webhook de n8n queda embebida tal cual en el bundle JS público (`https://n8n.nucloudai.cloud/webhook/afad80a4-...`). Esto es inherente a una SPA sin backend propio — no es un "secreto filtrado", es una URL que el navegador necesita conocer para funcionar. El problema real es que **nada impide que alguien la invoque directamente**, sin pasar por el formulario ni por sus validaciones (regex de email, longitud mínima de mensaje, checkbox de política de privacidad). No hay evidencia en este repo de CAPTCHA, honeypot, rate limiting ni validación server-side adicional.
- **Vector de explotación**: un script fuera del navegador puede hacer `POST` directo y masivo al webhook con payloads arbitrarios (JSON con campos falsos o maliciosos), sin restricción de frecuencia.
- **Impacto potencial**:
  - Saturación del workflow de n8n / spam masivo en el buzón o CRM que reciba estos leads.
  - Si el workflow de n8n usa alguno de los campos (`nombre`, `email`, `mensaje`, etc.) para componer correos, mensajes o registros **sin sanitizar**, existe riesgo de inyección aguas abajo (p. ej. inyección de cabeceras de correo si el campo `email` contiene `\r\n`, o HTML/script si el mensaje se inserta sin escapar en una plantilla de email o dashboard). Este riesgo depende del workflow de n8n, que está **fuera del código de este repositorio**.
- **PoC conceptual** (no ejecutado):
  ```
  # Ilustrativo, no ejecutado contra el servicio real.
  for i in $(seq 1 5000); do
    curl -s -X POST "https://n8n.nucloudai.cloud/webhook/afad80a4-..." \
      -H "Content-Type: application/json" \
      -d '{"nombre":"x","email":"a@a.com\r\nBcc: victima@ejemplo.com","mensaje":"..."}' &
  done
  ```
- **Fix propuesto**:
  1. **En este repo**: añadir un honeypot invisible (campo oculto que un bot rellena pero un humano no ve) y una comprobación mínima de "tiempo hasta envío" en `ContactForm.tsx`, para reducir el ruido de bots simples. No detiene abuso dirigido, pero es gratis y no requiere backend.
  2. **ACCIÓN MANUAL REQUERIDA (fuera de este repo)**:
     - Configurar **Cloudflare Turnstile** (o hCaptcha/reCAPTCHA) delante del formulario, o una **regla de Rate Limiting de Cloudflare** sobre la ruta del webhook si Cloudflare está delante de n8n.
     - En el workflow de **n8n**: validar/whitelistear los campos recibidos y **escapar** cualquier valor antes de interpolarlo en emails, mensajes o consultas; nunca construir cabeceras de email concatenando el campo `email`/`nombre` sin sanitizar.

### Hallazgo 2 — Cabeceras de seguridad HTTP ausentes en Nginx
- **Severidad**: Media
- **Categoría**: OWASP A05:2021 (Security Misconfiguration)
- **Archivo**: [nginx.conf](nginx.conf) (bloque `server` único, líneas 5-46 aprox.)
- **Descripción del riesgo**: La configuración actual no añade ninguna cabecera de seguridad. Faltan:
  - `Content-Security-Policy` — sin política que restrinja de dónde puede cargarse script/estilo/frame; es la mitigación de fondo (defense-in-depth) si en el futuro se introdujera algún sumidero de XSS.
  - `X-Frame-Options` / `Content-Security-Policy: frame-ancestors` — el sitio puede ser embebido en un `<iframe>` de un dominio malicioso (clickjacking): un atacante podría superponer el formulario de contacto de forma invisible para inducir envíos no deseados.
  - `X-Content-Type-Options: nosniff` — sin esta cabecera, navegadores antiguos pueden hacer MIME-sniffing de una respuesta y ejecutarla con un tipo distinto al declarado.
  - `Referrer-Policy` — sin ella, la URL completa (incluyendo query strings) puede filtrarse como referrer a terceros (fuentes externas, enlaces salientes).
  - `Permissions-Policy` — sin restringir APIs sensibles del navegador (cámara, micrófono, geolocalización) que este sitio no usa.
  - `Strict-Transport-Security` — puede estar gestionada en el borde de Cloudflare, pero no está reforzada también en origen (defensa en profundidad si el origen quedara alguna vez expuesto directamente).
- **Vector de explotación**: clickjacking vía iframe malicioso apuntando a `/contacto`; ausencia de defensa en profundidad ante un XSS futuro.
- **PoC conceptual**:
  ```html
  <!-- Página de un atacante -->
  <iframe src="https://nucloudai.com/contacto" style="opacity:0.001;position:absolute;top:0;left:0;width:100%;height:100%"></iframe>
  <!-- superpone botones falsos para inducir clics sobre el formulario real -->
  ```
- **Fix propuesto**: añadir un bloque `add_header` en `nginx.conf` con CSP + cabeceras estándar (ver commit de la Fase 4). Se documentará caso por caso qué dominios necesita permitir la CSP (Fontshare, Google Fonts, el webhook de n8n vía `connect-src`, Cloudflare, etc.) para no romper la carga de fuentes ni el envío del formulario.

### Hallazgo 3 — `server_tokens` no deshabilitado
- **Severidad**: Baja
- **Categoría**: OWASP A05:2021 (Security Misconfiguration) / CWE-200 (Information Exposure)
- **Archivo**: [nginx.conf](nginx.conf)
- **Descripción del riesgo**: Por defecto Nginx expone su número de versión exacto en la cabecera `Server` y en las páginas de error por defecto (404/500). Esto facilita a un atacante identificar CVEs conocidos aplicables a esa versión concreta.
- **Fix propuesto**: añadir `server_tokens off;` al bloque `server` (o `http`).

### Hallazgo 4 — Dependencias de desarrollo vulnerables (`vite` ≤6.4.2, `esbuild` ≤0.24.2)
- **Severidad**: Baja en este despliegue concreto (contexto: solo afecta al servidor de desarrollo local, no a producción); Moderada/Alta según el advisory original.
- **Categoría**: OWASP A06:2021 (Vulnerable and Outdated Components)
- **Archivo**: `package.json` (`"vite": "^5.4.3"`), `package-lock.json`
- **Descripción del riesgo**: `npm audit` reporta:
  - `esbuild` ≤0.24.2 — GHSA-67mh-4wv8-2f99: cualquier sitio web puede enviar peticiones al dev server de esbuild/Vite y leer la respuesta (CWE-346, moderado).
  - `vite` ≤6.4.2 — GHSA-fx2h-pf6j-xcff: bypass de `server.fs.deny` en rutas alternativas de Windows (alto); GHSA-v6wh-96g9-6wx3: exposición de hash NTLMv2 vía rutas UNC en Windows; GHSA-4w7w-66w2-5vf9: path traversal en el manejo de `.map` de dependencias optimizadas.
- **Contexto de riesgo real**: estas vulnerabilidades afectan **exclusivamente a `npm run dev` / `vite preview`** ejecutados localmente; **no se ejecuta ni se expone ningún servidor Vite en producción** (Nginx sirve el build estático de `dist/`). El vector requiere que el dev server esté corriendo y accesible (misma red o que la víctima visite una página maliciosa mientras el dev server está activo).
- **Ya verificado**: la versión instalada (`5.4.21`) ya es la última release del rango 5.4.x — **no existe parche dentro de la misma major**; el fix disponible es un salto a Vite 8.x (tres versiones mayores), lo que puede requerir cambios de configuración y de Node, y no hay suite de tests que detecte regresiones automáticamente.
- **Fix propuesto**: **decisión pendiente del usuario** (ver Fase 4, hallazgo marcado para discusión): opción A) programar el upgrade mayor a Vite 8 en una rama aparte con verificación manual completa (`npm run dev`, `npm run build`, `npm run preview`, smoke test de rutas); opción B) aceptar el riesgo dado que es dev-only y añadir la mitigación gratuita de no exponer el puerto del dev server fuera de `localhost` (ya es el comportamiento por defecto).

### Hallazgo 5 — Fuentes de terceros sin restricción de CSP
- **Severidad**: Baja
- **Categoría**: OWASP A05:2021 (Security Misconfiguration)
- **Archivo**: [index.html:40-66](index.html#L40-L66)
- **Descripción del riesgo**: se cargan hojas de estilo de Fontshare y Google Fonts vía `<link rel="preload">` sin ninguna `Content-Security-Policy` que restrinja `style-src`/`font-src`. Si alguno de esos CDN fuera comprometido, podría inyectarse CSS malicioso (exfiltración de datos vía selectores CSS de atributo, o desfiguración visual). Riesgo bajo (requiere compromiso del CDN de un tercero), pero se cierra de forma natural al implementar el Hallazgo 2.
- **Fix propuesto**: incluir `style-src`/`font-src` explícitos (Fontshare + Google Fonts) en la CSP del Hallazgo 2.

### Hallazgo 6 (informativo) — Artefacto residual `nginx.conf;D`
- **Severidad**: Informativo (no es una vulnerabilidad)
- **Archivo**: `./nginx.conf;D` (carpeta vacía en la raíz del repo, no rastreada por git)
- **Descripción**: carpeta vacía, aparentemente creada por un error de shell/redirección en una sesión anterior. No contiene archivos ni datos sensibles (verificado). No supone riesgo de seguridad, pero conviene eliminarla para evitar confusión con el `nginx.conf` real.
- **Fix propuesto**: `rm -rf "./nginx.conf;D"` (limpieza, no requiere commit ya que no está rastreada).

---

## 4. Categorías revisadas y descartadas (no aplican a este repositorio)

| Categoría | Motivo |
|---|---|
| Inyección SQL / NoSQL / LDAP / XPath / SSTI | No hay base de datos ni motor de plantillas server-side en este repo |
| Autenticación (hashing, MFA, fuerza bruta, recuperación de contraseña) | No hay sistema de cuentas/login |
| Autorización (IDOR, escalación de privilegios) | No hay recursos protegidos por usuario/rol |
| Sesiones / JWT | No se emiten ni verifican tokens de sesión |
| CSRF clásico (con cookies de sesión) | No hay sesión autenticada que un atacante pueda "montar"; el riesgo análogo (envíos no autorizados al webhook) se cubre como clickjacking en el Hallazgo 2 y como abuso de endpoint público en el Hallazgo 1 |
| SSRF | El código de este repo no realiza peticiones salientes desde un servidor; el único `fetch` corre en el navegador del usuario |
| Deserialización insegura / prototype pollution | No hay `JSON.parse` de datos no confiables ni merges de objetos externos |
| Path traversal / subida de archivos | No hay endpoint de upload; Nginx sirve estáticos con `root`+`try_files`, sin rutas construidas desde input de usuario |
| Race conditions en pagos/cupones | No hay pagos ni lógica transaccional |
| Mass assignment en ORMs | No hay ORM |

---

## 5. Próximos pasos

Este documento se entrega para revisión **antes de tocar código** (Fase 4 pendiente de tu confirmación). Al aprobar:
1. Se creará la rama `security/audit-fixes`.
2. Se corregirán los hallazgos en commits separados, en este orden: Hallazgo 2 (cabeceras Nginx + CSP) → Hallazgo 3 (`server_tokens off`) → Hallazgo 1 (honeypot + rate-limit básico en el formulario) → Hallazgo 6 (limpieza).
3. El Hallazgo 4 (upgrade mayor de Vite) queda **pendiente de tu decisión explícita** (opción A vs B arriba) antes de tocarlo, dado que puede romper el entorno de desarrollo.
4. Las acciones marcadas **"ACCIÓN MANUAL REQUERIDA"** (Cloudflare Turnstile/Rate Limiting, saneamiento en el workflow de n8n) no pueden resolverse solo con cambios en este repositorio y quedarán documentadas como pendientes para ti.
