import { NucleoDigitalLazy } from "@/components/brand/NucleoDigital";

/**
 * Fallback de <Suspense> para las subpáginas cargadas de forma diferida
 * (App.tsx) — reutiliza el Núcleo Digital en versión mini como indicador de
 * carga, en vez de un spinner genérico.
 */
export function RouteLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center py-24">
      <NucleoDigitalLazy variant="mini" mode="loader" size={72} className="opacity-80" />
    </div>
  );
}
