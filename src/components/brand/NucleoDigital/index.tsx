import { lazy, Suspense, useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { NucleoStatic } from "./NucleoStatic";
import type { NucleoDigitalProps } from "./NucleoDigital";

/**
 * Punto de entrada público de "El Núcleo Digital". Carga Framer Motion y el
 * componente animado de forma diferida (no bloquean el LCP del Hero); el
 * fallback de Suspense es NucleoStatic con la misma geometría y tamaño, así
 * que no hay salto de layout mientras carga el chunk.
 */
const LazyNucleoDigital = lazy(() =>
  import("./NucleoDigital").then((m) => ({ default: m.NucleoDigital }))
);

function useIsMobileFallback() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function NucleoDigitalLazy(props: NucleoDigitalProps) {
  const mobile = useIsMobileFallback();
  const fallback = (
    <NucleoStatic mobile={mobile} className={props.className} size={props.size} label={props.label} />
  );

  return (
    <Suspense fallback={fallback}>
      <LazyMotion features={domAnimation} strict>
        <LazyNucleoDigital {...props} />
      </LazyMotion>
    </Suspense>
  );
}

export { NucleoStatic } from "./NucleoStatic";
export type { NucleoDigitalProps } from "./NucleoDigital";
