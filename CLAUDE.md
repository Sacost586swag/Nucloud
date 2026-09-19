# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NUCLOUD corporate website — a Vite + React 18 + TypeScript + Tailwind site for an AI/automation/cloud agency. Spanish-language content (es-EC). Deployed via Docker (Nginx) on Dokploy at `nucloudai.com`.

**Status**: the v2 visual/content redesign is implemented. `BRANDING.md` (voice/visual tokens) is versioned and is the brand source of truth — read it rather than repeating it from memory. The spec-kit docs (`specs/`, `.specify/`), the business source docs (`Catalogo_Servicios_Nucloud.docx`, `NUCLOUD Speech.docx`) and the Meta SDK reference (`CodigoSDK_Meta`) are **gitignored and live only on the owner's machine** — if they're missing, ask the user; don't reconstruct them.

## Commands

```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # tsc -b && vite build  -> dist/
npm run preview   # serve the production build locally
npm run lint      # tsc --noEmit (type-check only; there is no ESLint)
npm test          # vitest run (pure-logic tests only: booking, SEO/copy coherence — no component tests)
```

## Architecture

- **Entry**: [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx), which defines all routes via `react-router-dom` (`BrowserRouter`). Routes: `/`, `/servicios`, `/proceso`, `/beneficios`, `/nosotros`, `/faq`, `/contacto`, `*` (404) — all nested inside `<Layout/>` (Navbar/SideDrawer/Footer/FloatingWhatsApp chrome) — **plus `embedded-whatsapp`, which is a sibling route OUTSIDE `<Layout/>`** (no site chrome, `noindex`, not in the nav or sitemap).
- **`/embedded-whatsapp` is a hands-off page.** It implements Meta's WhatsApp Embedded Signup (`?client=<slug>` personalized links) and is explicitly out of scope for redesign work unless a task says otherwise. Its file ([src/pages/EmbeddedWhatsAppPage.tsx](src/pages/EmbeddedWhatsAppPage.tsx)) must keep compiling against: `components/ui/{GlowBackground,Button,WhatsAppIcon,Wordmark}`, `utils/cn`, `hooks/{useDocumentTitle,useNoIndex,useReveal,useWhatsAppEmbeddedSignup}`, `constants/embeddedWhatsapp.ts`, and `constants/site.ts`'s `BRAND.logo`/`WHATSAPP_LINK`. It's the one place in the app that still uses Framer Motion directly alongside the shared `useReveal` variants — don't migrate it to GSAP.
- **Sections vs UI primitives**: `src/components/sections/*` are page-level blocks (one per landing section, e.g. `Hero`, `Services`, `Process`, `Benefits`, `About`, `FAQ`, `FinalCTA`, `Contact`, `Navbar`, `Footer`). `src/components/ui/*` are reusable primitives (`Button`, `SectionHeading`, `GlowBackground`, `FloatingWhatsApp`, `WhatsAppIcon`, `Wordmark`). `src/components/layout/*` is site chrome (`Layout`, `Navbar`/`SideDrawer` wiring, `PageHero`/`PageCTA` for subpages). `src/components/forms/*` holds the lead/booking form.
- **`detailTo` pattern (load-bearing — keep it)**: most business sections accept an optional `detailTo?: string`. On `Home` they're passed their subpage route and render a "ver más" CTA; on their own subpage they're rendered without that prop. This avoids duplicating content between the Home summary and the dedicated subpage — follow it for any new section with list-shaped content.
- **Path alias**: `@/*` → `src/*` (configured in both [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)). Always import via `@/...`.
- **Content/config single source of truth**:
  - [src/constants/site.ts](src/constants/site.ts) — WhatsApp numbers/links, contact webhook URL(s), `PRIVACY_POLICY_URL`, `BRAND`, `NAV_LINKS`, social links. Change a phone number, webhook, or social URL here, not in components.
  - `src/constants/content.ts` (or its per-topic split under `src/constants/content/` once the v2 redesign lands) — typed copy for Services / Process / Benefits / FAQ / About arrays consumed by the matching sections.
  - `src/constants/embeddedWhatsapp.ts` — Meta app/config IDs and n8n webhook URLs for `/embedded-whatsapp` only.
- **Styling**: Tailwind only. Custom design tokens live in [tailwind.config.js](tailwind.config.js): brand palette (`ink`, `flame`, `fog` — see `BRANDING.md` for the exact hex values in force), fonts (`display`/`sans`/`mono`), brand gradients/glows, and custom keyframes. Reuse these tokens instead of hardcoding hex/animations. `src/utils/cn.ts` is the className combiner.
- **Business rules baked into copy** (source: `Catalogo_Servicios_Nucloud.docx`, local only): never show prices on the site (pricing is calculated case-by-case internally); never name the underlying tools/vendors in commercial copy (sell the result, not n8n/PostgreSQL/etc.) — the one deliberate exception is a dedicated "Herramientas y Tecnologías" section that lists the stack by design.
- **Motion**: the v2 redesign standardizes on GSAP + ScrollTrigger + Lenis for site-wide scroll/reveal motion; Framer Motion is scoped to the `NucleoDigital` SVG component (now only used by `RouteLoader`, no longer in the Hero) and to `/embedded-whatsapp`'s inherited dependencies only — don't mix the two engines inside one component tree. The single reveal primitive is `useSectionReveal` + `data-reveal="up|fade|lines|words|blur|scramble|draw"` (`blur` takes `data-reveal-from="left|right|top|bottom"`; `words` is a scrubbed word-by-word reveal for one statement block). Extend that hook instead of adding a parallel one; elements only animate if they sit inside a section that owns the returned `ref`.
- **Hero + backgrounds**: the Hero shows the slogan (H1, compressed with `scale-x-90`, never hidden/animated on load) next to `HeroVisual` (framed `nucloud-neon.mp4`). `Atmosphere` plays `Embers_drifting_in_black_void_*.mp4` as the global background only at ≥768px and without `prefers-reduced-motion`; otherwise the CSS glow/grid/grain remains. Both videos are served from `public/` (CSP `media-src 'self'`).
- **Trust media**: `components/ui/MediaFrame` reserves space for images/videos on the subpages (`Nosotros`, `Servicios`, `Proceso`, `Beneficios`). Without `src` it renders a marked placeholder; pass `src` (a file in `public/`) to fill it. `expandOnScroll` opens the frame with the scroll.
- **Tech logos** (`TechStack`) always render at their real brand color on a white plate (so dark logos stay legible). Prefer the *light-theme* variant of a logo; a white/`_dark` variant is invisible on the plate.
- **Contact/booking form**: shared between the Home `Contact` section and `/contacto`, posts JSON to a webhook in `site.ts`. Includes a required privacy-policy checkbox linking to `PRIVACY_POLICY_URL`, a honeypot field, and a minimum-submit-time anti-bot check; falls back to a `no-cors` POST if the CORS request fails.

## Deployment

- [Dockerfile](Dockerfile) is a two-stage build: `node:20-alpine` runs `npm ci && npm run build`, then `nginx:alpine` serves `/dist`. A `CACHEBUST` ARG before `COPY . .` forces every Dokploy deploy to be a fresh build — keep this pattern when editing the Dockerfile.
- [nginx.conf](nginx.conf) provides SPA fallback (`try_files ... /index.html`), long-cache for `/assets/` (hashed), `no-cache` for `index.html`, security headers (CSP, HSTS, etc.) repeated per `location` block, and a Content-Security-Policy that allow-lists `connect.facebook.net`/`graph.facebook.com` for the Meta SDK used by `/embedded-whatsapp`. All images/fonts/scripts must be servable from `'self'` or an already-allow-listed origin — no ad-hoc remote assets or iframes.
- Repo: https://github.com/Sacost586swag/Nucloud.git. `.claude/`, `.agents/`, `.remember/`, `.impeccable/`, `.specify/`, `specs/`, `.mcp.json`, `*.docx` and `Assets Nucloud/` are gitignored. **`src/assets/` is tracked** — `src/assets/tech/` holds the logos imported by `constants/techStack.ts`, so the build breaks without it. Static production assets live in `public/` (never delete or rename existing files there without checking `terminos.html`/`eliminar-datos.html`, which Meta references directly, and `llms.txt`/`sitemap.xml`, which are part of the SEO/GEO setup).

## Conventions

- All UI copy is Spanish (es-EC), "tú" register for the business owner — match tone when editing. See `BRANDING.md` for voice rules (sentence case, no emoji in UI, FAQ answers 40–60 words, never fabricate stats).
- WhatsApp CTAs must use the constants from `site.ts` (never hardcode a number or build a `wa.me` URL inline).
- New sections: create in `src/components/sections/`, export a named component, register in `Home.tsx` (and the matching subpage if it has one), and pull copy from `constants/content*` rather than inlining strings when the section has list-shaped data.
- Never commit or push unless the user explicitly asks — this repo has had commits blocked by the credential-leak classifier before (a hardcoded webhook auth header is an accepted, documented trade-off in `constants/embeddedWhatsapp.ts`, not an oversight).
