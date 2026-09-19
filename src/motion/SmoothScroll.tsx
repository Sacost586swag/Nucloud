import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";

interface SmoothScrollContextValue {
  scrollTo: (target: number | string | HTMLElement, opts?: Parameters<Lenis["scrollTo"]>[1]) => void;
  stop: () => void;
  start: () => void;
}

function nativeScrollTo(target: number | string | HTMLElement) {
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView();
  } else {
    target.scrollIntoView();
  }
}

const fallback: SmoothScrollContextValue = {
  scrollTo: nativeScrollTo,
  stop: () => {},
  start: () => {},
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>(fallback);

/**
 * Fuera de <SmoothScroll/> (p. ej. /embedded-whatsapp, que nunca la monta —
 * Principio V) devuelve un fallback de scroll nativo en vez de lanzar error.
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/**
 * Proveedor de scroll suave (Lenis). Se monta únicamente dentro de
 * Layout.tsx. Bajo prefers-reduced-motion no se instancia Lenis en absoluto
 * (scroll nativo del navegador).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia(MQ.reduce).matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, syncTouch: false });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value: SmoothScrollContextValue = {
    scrollTo: (target, opts) => {
      if (lenisRef.current) lenisRef.current.scrollTo(target, opts);
      else nativeScrollTo(target);
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
