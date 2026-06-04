import type { Variants } from "framer-motion";

/**
 * Variantes reutilizables para revelados al hacer scroll.
 * Se usan con `whileInView` de Framer Motion en cada sección.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

/** Contenedor que escalona la aparición de sus hijos. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Configuración común de viewport: anima una sola vez al entrar. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
