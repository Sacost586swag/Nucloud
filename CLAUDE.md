# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NUCLOUD corporate landing page — a single-page Vite + React 18 + TypeScript + Tailwind site for an AI/automation/cloud agency. Spanish-language content. Deployed via Docker (Nginx) on Dokploy.

## Commands

```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # tsc -b && vite build  -> dist/
npm run preview   # serve the production build locally
npm run lint      # tsc --noEmit (type-check only; there is no ESLint)
```

There is no test suite.

## Architecture

- **Entry**: [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx) → [src/pages/Home.tsx](src/pages/Home.tsx). `Home` is the only page and composes every section in order: `Navbar → Hero → TechMarquee → Services → Process → Benefits → About → FinalCTA → Contact → Footer + FloatingWhatsApp`. To add/remove/reorder a section, edit `Home.tsx`.
- **Sections vs UI primitives**: `src/components/sections/*` are page-level blocks (one per landing section). `src/components/ui/*` are reusable primitives (`Button`, `SectionHeading`, `GlowBackground`, `FloatingWhatsApp`, `WhatsAppIcon`).
- **Path alias**: `@/*` → `src/*` (configured in both [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)). Always import via `@/...`.
- **Content/config single source of truth**:
  - [src/constants/site.ts](src/constants/site.ts) — WhatsApp number/URL/prefilled message, `CONTACT_WEBHOOK_URL` (n8n endpoint that receives Contact form POSTs), `PRIVACY_POLICY_URL`, `BRAND`, `NAV_LINKS`. Change a phone number or webhook here, not in components.
  - [src/constants/content.ts](src/constants/content.ts) — typed copy for Services / Process / Benefits arrays consumed by the matching sections.
- **Styling**: Tailwind only. Custom design tokens live in [tailwind.config.js](tailwind.config.js): brand palette (`ink`, `flame`, `fog`), fonts (`display`/`sans`/`mono`), `flame-gradient`/`radial-glow` backgrounds, and custom keyframes (`pulse-node`, `dash-flow`, `float`, `shimmer`, `marquee`). Reuse these tokens instead of hardcoding hex/animations. `src/utils/cn.ts` is the className combiner.
- **Hooks**: `useReveal` (IntersectionObserver-based scroll-reveal) and `useCountUp` (animated number counter) — used by section components for entrance/stat animations.
- **Hero visual**: [HeroVisual.tsx](src/components/sections/HeroVisual.tsx) renders a neon background video (asset in `public/`); not the old `NeuralMockup`. Don't reintroduce the mockup.
- **Contact form**: [Contact.tsx](src/components/sections/Contact.tsx) POSTs JSON to `CONTACT_WEBHOOK_URL` (n8n). Includes a required privacy-policy checkbox linking to `PRIVACY_POLICY_URL`.

## Deployment

- [Dockerfile](Dockerfile) is a two-stage build: `node:20-alpine` runs `npm ci && npm run build`, then `nginx:alpine` serves `/dist`. A `CACHEBUST` ARG before `COPY . .` forces every Dokploy deploy to be a fresh build — keep this pattern when editing the Dockerfile.
- [nginx.conf](nginx.conf) provides SPA fallback (`try_files ... /index.html`), long-cache for `/assets/` (hashed), and `no-cache` for `index.html` so new deploys appear immediately.
- Repo: https://github.com/Sacost586swag/Nucloud.git. The `Assets Nucloud/` folder and `.claude/`, `.agents/` are gitignored — don't import from `Assets Nucloud/` at build time; production assets live in `public/` or `src/assets/`.

## Conventions

- All UI copy is Spanish — match tone when editing.
- WhatsApp CTAs must use `WHATSAPP_LINK` from `site.ts` (never hardcode the number or build the URL inline).
- New sections: create in `src/components/sections/`, export a named component, register in `Home.tsx`, and pull copy from `content.ts` rather than inlining strings when the section has list-shaped data.
