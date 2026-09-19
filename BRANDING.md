---
tipo: nota
titulo: Branding NUCLOUD — marca, voz y sistema visual
estado: activo
areas: [marca, marketing, diseno, producto]
entidades: ["NUCLOUD", "Sebastián Acosta", "Claude Design"]
vigencia: permanente
actualizado: 2026-08-23
fuente: manual
---

# Branding NUCLOUD — marca, voz y sistema visual

> **Documento único de marca.** Consolida dos fuentes que antes vivían separadas — `marca-nucloud.md` (concepto, voz, posicionamiento) y `design-system-nucloud.md` (tokens visuales exactos) — en un solo lugar, para que la marca tenga una sola fuente de verdad en vez de dos notas que se citaban entre sí.
>
> **Fuentes:** `Conocimiento para Arthur/NUCLOUD Speech.docx` (branding conceptual) + proyecto **NUCLOUD Design System** en Claude Design (`projectId 7f57368d-7b19-49db-bf80-f373af4e96ff`, leído vía **DesignSync**, re-verificado sin cambios el 2026-08-23) + skill `NucloudTemplate` (sistema de propuestas).
>
> **Reemplaza a:** `marca-nucloud.md` y `design-system-nucloud.md` (eliminados — ver bitácora del 2026-08-23).

---

## 1. Quién es NUCLOUD

### Origen del nombre

| Parte | Significado |
|---|---|
| **NU** | Energía nuclear · reacción en cadena · potencia · crecimiento explosivo |
| **CLOUD** | Infraestructura en la nube · software moderno · escalabilidad · disponibilidad 24/7 |

### Concepto central

> **"Provocar una reacción en cadena de crecimiento para los negocios mediante automatización e inteligencia artificial."**

### Promesa de marca

> **"NUCLOUD convierte procesos manuales en sistemas inteligentes que generan crecimiento automático para las empresas."**

### Misión y visión

- **Misión:** ayudar a empresas a automatizar su crecimiento mediante software inteligente, infraestructura cloud e IA.
- **Visión:** ser la empresa líder de automatización e IA empresarial en Latinoamérica, con soluciones SaaS escalables para miles de negocios.

### Personalidad de marca

**Tecnológica · Poderosa · Confiable · Premium · Innovadora · Elegante.**

> **"No compite por ser la opción más barata. Compite por generar resultados."**
>
> Es una frase de la propia marca y el argumento interno más fuerte contra el patrón de subvalorar el precio detectado en Sebastián. Ver [[ADR-007-politica-de-precio]].

### Arquetipos

- **Principal — El Mago:** transforma procesos complejos en resultados automáticos.
- **Secundario — El Creador:** construye soluciones tecnológicas personalizadas.

### Producto principal declarado

**Sistema Automático de Captación y Seguimiento de Clientes™**

```
Instagram / WhatsApp
        ↓
ManyChat / WhatsApp API
        ↓
n8n + Inteligencia Artificial
        ↓
Base de datos PostgreSQL
        ↓
Dashboard Web NUCLOUD
```

---

## 2. Qué compra el cliente — la regla de copy más importante

| NO compra | SÍ compra |
|---|---|
| n8n · ManyChat · PostgreSQL · VPS · "IA" | Más clientes · más ventas · más tiempo libre · procesos ordenados · seguimiento automático · escalabilidad |

> **Regla dura: nunca se nombra la herramienta en material comercial.** Se nombra el resultado. Confirmada de forma independiente por dos fuentes — el `NUCLOUD Speech.docx` y el `readme.md` del design system — así que no es una preferencia de estilo, es una regla de marca consolidada.

---

## 3. Voz y contenido

> Autoridad: `readme.md` del proyecto Design System, sección **CONTENT FUNDAMENTALS**.

**Idioma:** español latino **(es-EC). Siempre.**

**Persona:** segunda persona informal **"tú"** al dueño del negocio (*tu negocio, tu equipo, para ti*). Primera del plural **"nosotros"** para NUCLOUD (*Creamos…, Diseñamos…, Construimos…, Medimos…*). Cálido pero profesional — **nunca "usted"** en este canal.

> 📌 **Distinción de canal, no contradicción.** Esta regla del "tú" gobierna **web, producto y material publicado**. Los guiones de venta telefónica de [[guion-ventas-telefonico-nucloud]] usan **"usted"**, que es lo correcto al llamar en frío a un dueño de negocio en Ecuador. **Web = tú. Llamada = usted.**

**Casing:** sentence case en cuerpo y casi todos los titulares. El nombre siempre en mayúsculas: **NUCLOUD**, a menudo NU + **CLOUD** en flame. Eyebrows y micro-labels en MAYÚSCULAS con tracking amplio, en mono. Los títulos de sección resaltan **una sola palabra clave en flame** — *"Resultados que se **notan** en tu operación"*.

**Ritmo:** frases cortas, declarativas, orientadas al beneficio. Imperativos con verbo primero en CTAs.

**Respuestas de FAQ: 40–60 palabras, autocontenidas y extraíbles** — escritas para ser citadas por crawlers de IA.

**Números:** como stat tokens compactos — `24/7` · `+70%` · `-80%` · `+90%` · `99.9%` · `42ms` · "menos de 24 horas".

> ⚠️ El propio design system advierte: **"úsalos con moderación y solo cuando sean ciertos para la marca; no inventes métricas."** Es la misma regla que SOUL.md le exige a Arthur — *nunca inventar cifras* — aplicada al copy de marca. Respalda la observación de [[web-y-dominios-nucloud]] sobre el `-80%` publicado sin fuente en la web actual.

**Emoji:** prácticamente ninguno. Solo un 👋 en el mensaje precargado de WhatsApp. **No decorar la interfaz con emoji.**

**Vocabulario recurrente:** sistemas inteligentes · automatización · inteligencia artificial · infraestructura cloud · escalar · a medida · en tiempo real · sin intervención humana · 24/7 · flujo de datos · orquestación.

---

## 4. Slogans y pitch

**Principal:** *"Automatiza. Escala. Crece."*

**Secundarios (usar textuales donde encaje una tagline):**
*"La inteligencia detrás de tu crecimiento."* · *"Sistemas que trabajan mientras descansas."* · *"Automatización sin límites."* · *"Transformando negocios con IA."* · *"El motor digital de tu empresa."* · *"Tu crecimiento, en piloto automático."* · *"Potencia nuclear para tus ventas."* · *"Sistemas inteligentes para empresas que crecen."*

**Elevator pitch oficial:**
> NUCLOUD es una empresa especializada en automatización empresarial e inteligencia artificial que transforma Instagram, WhatsApp y páginas web en sistemas inteligentes de captación y seguimiento de clientes. Mediante infraestructura cloud propia, IA y software personalizado, ayuda a las empresas a vender más, responder más rápido y crecer de forma escalable.

**Frases de posicionamiento reutilizables:**
- *"La IA no es el futuro. Es el presente. Y los negocios que automaticen primero serán los que más rápido crezcan."*
- *"No vendemos simples bots. Creamos Agentes Inteligentes para Negocios."*
- *"Empleados virtuales inteligentes que trabajan 24/7."*
- *"La idea no es reemplazar al negocio o a las personas. Es que el negocio nunca pierda oportunidades por falta de tiempo."*

---

## 5. Sistema visual — tokens exactos

> Fuente y autoridad: proyecto **NUCLOUD Design System** en Claude Design, leído vía DesignSync. **El repositorio de producción** [github.com/Sacost586swag/Nucloud](https://github.com/Sacost586swag/Nucloud) (Vite + React 18 + TS + Tailwind) espeja estos mismos tokens en `tailwind.config.js` y es la autoridad para el sitio en vivo.

### Color — dark-first, un solo acento

**Ink (fondos)**

| Token | HEX | Uso |
|---|---|---|
| `--ink` | **`#0A0A0A`** | Fondo principal de página |
| `--ink-soft` | `#0B0B0B` | Secciones alternas / bandas |
| `--ink-raised` | `#111111` | Superficies elevadas, paneles |

**Flame (naranja nuclear) — el único acento cromático**

| Token | HEX | Uso |
|---|---|---|
| `--flame` | **`#FF6B00`** | Acento primario: acciones, resaltados |
| `--flame-glow` | `#FF8C1A` | Hover / focus / glow |
| `--flame-amber` | `#FFB347` | Eyebrows, acentos suaves |

**Fog (texto)**

| Token | HEX | Uso |
|---|---|---|
| `--fog` | `#FFFFFF` | Texto primario sobre oscuro |
| `--fog-muted` | `#A1A1AA` | Texto secundario |

**Hairlines y superficies translúcidas**

| Token | Valor |
|---|---|
| `--line` | `rgba(255,255,255,0.08)` — borde por defecto |
| `--line-strong` | `rgba(255,255,255,0.20)` — solo en hover |
| `--surface-glass` | `rgba(255,255,255,0.02)` — relleno de tarjeta glass |
| `--surface-glass-2` | `rgba(255,255,255,0.06)` |
| `--flame-tint` | `rgba(255,107,0,0.08)` — superficie lavada en flame |
| `--flame-ring` | `rgba(255,107,0,0.25)` — borde flame |
| `--selection` | `rgba(255,107,0,0.28)` |

**Gradientes de marca**

```css
--flame-gradient: linear-gradient(135deg, #ff6b00 0%, #ff8c1a 50%, #ffb347 100%);
--radial-glow:    radial-gradient(circle, rgba(255,107,0,0.18), transparent 70%);
```

> 🚫 **Regla dura: no hay segundo tono.** Nada de gradientes azules o morados — están fuera de marca por definición.

> ✅ **El documento de branding original (`NUCLOUD Speech.docx`) declaraba `#0A0A0A` para el negro.** El design system real usa **`#050505`**. Resuelto: **manda el branding original**, que es el que alimenta el repositorio de producción. `#0A0A0A` queda como referencia histórica, no se usa.

### Tipografía — tres familias

| Token | Familia | Para qué |
|---|---|---|
| `--font-display` | **Clash Display** (600) | Todos los titulares y display. Tracking muy cerrado (`-0.04em`) en tamaños grandes |
| `--font-sans` | **Satoshi** (400/500/700/900) | Cuerpo y UI. Interlineado generoso 1.6 |
| `--font-mono` | **JetBrains Mono** (400/500/600) | Eyebrows, métricas, etiquetas de estado, código, cualquier texto "técnico". Normalmente MAYÚSCULAS con tracking 0.18–0.22em |

**Carga:** Clash Display y Satoshi desde **Fontshare**; JetBrains Mono desde **Google Fonts**. No hay binarios vendorizados — uso sin internet requiere descargarlas. **No se sustituyen por otras.**

**Escala:** `--text-display-xl` 4.4rem (H1 hero) → `--text-display-lg` 3.4rem → `--text-display-md` 2.6rem → `--text-h3` 1.5rem → `--text-h4` 1.25rem → `--text-lg` 1.125rem → `--text-base` 1rem → `--text-sm` 0.9375rem → `--text-xs` 0.8125rem.

**Tracking:** `-0.04em` (display grande) · `-0.02em` (tight) · `0.18em` (eyebrows mono) · `0.22em` (micro-labels mono). **Interlineado:** 1.05 (display) · 1.1 (tight) · **1.6 (cuerpo)**.

### Espaciado, radios, sombras y movimiento

**Escala de espaciado (base 4px):** 0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 1.75 · 2 · 3 · 4 · **6rem (ritmo vertical de sección)** · 8rem.
**Contenedor:** `--container-max: 80rem` · `--container-pad: 2.5rem`.

**Radios:** `--radius-sm` 0.5rem (chips) · `--radius-md` 0.75rem (icon tiles) · `--radius-lg` 1rem (tarjetas) · `--radius-xl` 1.5rem (paneles) · `--radius-2xl` 2rem (hero) · `--radius-3xl` 2.5rem (CTA) · `--radius-pill` 999px (**botones, eyebrows, nav**).

**Sombras — cálidas, nunca grises:**
```css
--shadow-glow:         0 0 0 1px rgba(255,107,0,0.12), 0 18px 60px -20px rgba(255,107,0,0.45);
--shadow-button:       0 8px 30px -8px rgba(255,107,0,0.6);
--shadow-button-hover: 0 12px 44px -8px rgba(255,140,26,0.75);
--shadow-card:         0 8px 40px -12px rgba(0,0,0,0.8);
```

**Movimiento:** ease de marca `cubic-bezier(0.16, 1, 0.3, 1)` · duraciones 0.3s / 0.4s / 0.7s. Entrada: fade + subida de 24px, escalonada ~0.12s por hijo. Hover: elevación + borde cálido. Press: vuelve a 0, sin encogimiento. **Respetar `prefers-reduced-motion`.**

### Componentes core (React)

`Button` · `Eyebrow` · `IconTile` · `Card` · `Input` · `SectionHeading` · `WhatsAppIcon` — namespace `window.NUCLOUDDesignSystem_7f5736`.

- **Botones:** pill. Primary = gradiente flame + texto ink + shadow flame + destello en hover + elevación -2px. Secondary = hairline glass. Ghost = texto muted → blanco. **Una sola acción primaria por vista.**
- **Tarjetas "glass":** hairline blanco 7% sobre relleno blanco 1.5%, radio 16-24px. Hover: borde flame 30% + elevación 4px.
- **Icon tiles:** icono Lucide centrado en cuadrado redondeado ~44-48px, borde + tinte + icono en flame.

### Fondos y textura — nunca planos

Tres capas sobre ink: **radial flame glow** (blur 140px, 13-22% opacidad) · **grid-lines** (64px, blanco ~2.5%) · **film grain** (~3.5%). Glass con `backdrop-blur` 12-24px en nav, hero, contacto.

### Iconografía

**Lucide, stroke 1.7** (2.2 para checks). Recurrentes: `Bot, Code2, Plug, Cloud, Workflow, Building2` (servicios) · `Instagram, Webhook, BrainCircuit, Database, LayoutDashboard` (flujo) · `Sparkles, CalendarCheck, Check, MessageCircle` (acciones). WhatsApp no existe en Lucide → SVG propio, coloreado en flame.

🚫 **Nada de emoji como iconos de UI. Nada de glifos unicode. Nunca dibujar SVG a mano** — se usa Lucide.

### Logo — reglas de uso

| Archivo | Cuándo |
|---|---|
| **`assets/nucloud-lockup.png`** | **Logo primario.** Árbol de red nuclear (silueta de hongo como grafo de nodos) sobre wordmark **NUCLOUD** en cobre. Hero, portadas, tarjeta de marca |
| **`assets/nucloud-mark.png`** | Solo la marca. Nav, footer, favicon, avatares. Se acompaña del wordmark en texto (NU + CLOUD en flame, Clash Display 600) |
| `nucloud-logo.png` · `nucloud-full.png` · `nucloud-wordmark.png` | **Legacy.** Solo referencia |

> 🚫 **El render cobre/metal es el tratamiento real del logo. NO se recolorea a naranja plano.**
>
> 📌 Los logos en `Conocimiento para Arthur/` (`NUCLOUD LOGO_PNG.png` y variantes) son las versiones **legacy**. Para cualquier pieza nueva se usan los del design system. Catálogo completo en [[assets-visuales]].

---

## 6. El sistema de propuestas comerciales — deliberadamente distinto

`Skill NucloudTemplate` — sistema **editorial oscuro**, no el mismo del producto:

| | Design System (producto/web) | Sistema de propuestas (`NucloudTemplate`) |
|---|---|---|
| Fondo | `#050505` | `#050505` |
| Acento | `#FF6B00` | `#FF6B00` |
| Titulares | **Clash Display** | **Bodoni Moda** (serif editorial) |
| Cuerpo | **Satoshi** | **Spectral** |
| Formato | Web responsive | A4 imprimible, 9 páginas |

Comparten negro y naranja. **Divergen en tipografía a propósito:** producto = tecnológico; propuesta = editorial. No se mezclan.

---

## 7. Estilo visual — inspiración

**Referencias:** datacenters · cloud computing · redes neuronales · circuitos digitales · arquitectura SaaS · energía nuclear estilizada · interfaces futuristas.
**Sensación:** premium · oscuro · tecnológico · minimalista · potente.
**En video** (guiones de marca personal): expansión de luz tipo *Oppenheimer* sobre negro, con destello ámbar.

---

## 8. Cómo se usa este documento

**Para artefactos estáticos** (slides, mockups, prototipos, propuestas): fondo ink, acento flame, titulares en Clash Display (producto) o Bodoni Moda (propuestas), tarjetas glass + glow.

**Para producción:** el repositorio de GitHub manda. Sus convenciones — copy en español, CTAs a WhatsApp — son las reales.

**Para llamadas de venta:** este documento gobierna la *marca*, no el guion de venta. El guion vive en [[guion-ventas-telefonico-nucloud]] y usa "usted", no "tú".
