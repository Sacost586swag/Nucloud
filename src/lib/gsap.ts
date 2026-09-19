import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

/**
 * Único punto de registro de GSAP (Principio III: un motor de animación por
 * dominio — GSAP en todo el sitio salvo NucleoDigital y las dependencias
 * heredadas de /embedded-whatsapp, que siguen en Framer Motion).
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase);

/** Ease de marca: cubic-bezier(0.16, 1, 0.3, 1) — BRANDING.md §5. */
CustomEase.create("brand", "0.16, 1, 0.3, 1");

/** Duraciones de marca (segundos) — BRANDING.md §5. */
export const DUR = {
  fast: 0.3,
  base: 0.4,
  slow: 0.7,
} as const;

/** Media queries compartidas para gsap.matchMedia(). */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
} as const;

ScrollTrigger.config({ ignoreMobileResize: true });

if (typeof document !== "undefined") {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase };
