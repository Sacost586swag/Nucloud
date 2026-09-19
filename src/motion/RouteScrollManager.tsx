import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/motion/SmoothScroll";

/**
 * Reemplaza a layout/ScrollToTop.tsx: al cambiar de ruta, sube al inicio (o
 * a un ancla si hay hash) y refresca ScrollTrigger tras el commit del nuevo
 * chunk. Vive dentro de Layout — /embedded-whatsapp no la monta.
 */
export function RouteScrollManager() {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hash) {
      // Espera a que el DOM de la nueva ruta exista antes de buscar el ancla.
      requestAnimationFrame(() => scrollTo(hash, { offset: -96, immediate: true }));
    } else {
      scrollTo(0, { immediate: true });
    }

    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}
