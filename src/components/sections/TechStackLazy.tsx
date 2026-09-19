import { lazy, Suspense } from "react";

const LazyTechStack = lazy(() => import("./TechStack").then((m) => ({ default: m.TechStack })));

/** Esqueleto de altura equivalente — evita salto de layout mientras carga el chunk. */
function TechStackSkeleton() {
  return <div className="h-[640px]" aria-hidden />;
}

/**
 * TechStack cargado de forma diferida: está bien por debajo del pliegue en
 * la Home y arrastra ~39 logos (varios inlineados como base64 por ser
 * menores al umbral de Vite), que de otro modo engordarían el bundle inicial.
 */
export function TechStackLazy() {
  return (
    <Suspense fallback={<TechStackSkeleton />}>
      <LazyTechStack />
    </Suspense>
  );
}
