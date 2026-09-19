import { useRef, type RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText, DUR, MQ } from "@/lib/gsap";

export type RevealType = "up" | "fade" | "lines" | "words" | "blur" | "scramble" | "draw";
/** Lado desde el que entra un elemento `blur`. */
export type RevealFrom = "left" | "right" | "top" | "bottom";

/** Desplazamiento de entrada de `blur`, en px. */
const BLUR_DISTANCE = 80;
const BLUR_ORIGIN: Record<RevealFrom, { x: number; y: number }> = {
  left: { x: -BLUR_DISTANCE, y: 0 },
  right: { x: BLUR_DISTANCE, y: 0 },
  top: { x: 0, y: -BLUR_DISTANCE },
  bottom: { x: 0, y: BLUR_DISTANCE },
};

/**
 * Primitiva única de reveal-on-scroll para todo el sitio (salvo NucleoDigital
 * y /embedded-whatsapp, que no la usan). Marca los elementos a animar con
 * `data-reveal="up|fade|lines|words|blur|scramble|draw"` (+ opcional
 * `data-reveal-delay` en segundos) dentro del elemento al que se asocia el
 * ref devuelto.
 *
 * - `blur`: entra desenfocado y desplazado desde `data-reveal-from`
 *   (left|right|top|bottom, por defecto bottom) hasta quedar nítido.
 * - `words`: revelado palabra por palabra atado al scroll (scrub) — pensado
 *   para un bloque de declaración, no para muchos elementos.
 *
 * Bajo prefers-reduced-motion, todo aparece en su estado final sin animar.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(): RefObject<T> {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.reduce, () => {
        gsap.set("[data-reveal]", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: "transform,filter",
        });
      });

      mm.add(MQ.motion, () => {
        const root = scope.current;
        if (!root) return;

        const byType = (type: RevealType) =>
          Array.from(root.querySelectorAll<HTMLElement>(`[data-reveal="${type}"]`));

        const delayOf = (el: Element) => Number((el as HTMLElement).dataset.revealDelay) || 0;
        const originOf = (el: Element) =>
          BLUR_ORIGIN[(el as HTMLElement).dataset.revealFrom as RevealFrom] ?? BLUR_ORIGIN.bottom;
        // El desenfoque es caro en GPU: solo en pantallas ≥768px. En móvil el
        // efecto conserva el desplazamiento direccional y la opacidad.
        const blurOn = window.matchMedia("(min-width: 768px)").matches;

        const up = byType("up");
        if (up.length) {
          gsap.set(up, { autoAlpha: 0, y: 24 });
          ScrollTrigger.batch(up, {
            start: "top 85%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: DUR.slow,
                ease: "brand",
                stagger: 0.12,
                delay: (_i, target) => delayOf(target),
                // Sin esto GSAP deja `transform: translate(0,0)` inline y anula
                // los transforms de hover definidos en las clases (p. ej. -translate-y-1).
                clearProps: "transform",
              }),
          });
        }

        const fade = byType("fade");
        if (fade.length) {
          gsap.set(fade, { autoAlpha: 0 });
          ScrollTrigger.batch(fade, {
            start: "top 85%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                duration: DUR.slow,
                ease: "brand",
                stagger: 0.12,
                delay: (_i, target) => delayOf(target),
              }),
          });
        }

        byType("lines").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 110,
                autoAlpha: 0,
                duration: DUR.slow,
                ease: "brand",
                stagger: 0.08,
                delay: delayOf(el),
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              });
            },
          });
        });

        const blur = byType("blur");
        if (blur.length) {
          gsap.set(blur, {
            autoAlpha: 0,
            x: (_i, el) => originOf(el).x,
            y: (_i, el) => originOf(el).y,
            ...(blurOn ? { filter: "blur(10px)" } : {}),
          });
          ScrollTrigger.batch(blur, {
            start: "top 85%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                ...(blurOn ? { filter: "blur(0px)" } : {}),
                duration: DUR.slow,
                ease: "brand",
                stagger: 0.1,
                delay: (_i, target) => delayOf(target),
                clearProps: "transform,filter",
              }),
          });
        }

        byType("words").forEach((el) => {
          // Giro sutil del bloque que se endereza mientras se ilumina el texto.
          gsap.fromTo(
            el,
            { rotate: 2, transformOrigin: "50% 50%" },
            {
              rotate: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 65%", scrub: true },
            }
          );
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.12, ...(blurOn ? { filter: "blur(4px)" } : {}) },
                {
                  opacity: 1,
                  ...(blurOn ? { filter: "blur(0px)" } : {}),
                  ease: "none",
                  stagger: 0.05,
                  scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 65%", scrub: true },
                }
              );
            },
          });
        });

        byType("scramble").forEach((el) => {
          const original = el.textContent || "";
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () =>
              gsap.to(el, {
                duration: DUR.slow,
                delay: delayOf(el),
                scrambleText: { text: original, chars: "upperCase", speed: 0.4 },
              }),
          });
        });

        byType("draw").forEach((el) => {
          gsap.set(el, { drawSVG: "0%" });
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () =>
              gsap.to(el, { drawSVG: "100%", duration: DUR.slow, ease: "brand", delay: delayOf(el) }),
          });
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return scope;
}
