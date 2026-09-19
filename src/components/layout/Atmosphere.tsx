import { useEffect, useState } from "react";

/** El vídeo solo se monta en pantallas ≥768px y sin `prefers-reduced-motion`. */
const VIDEO_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Atmósfera de fondo del sitio. Capa fija y decorativa (z-0): brasas
 * flotando sobre negro (vídeo en bucle), resplandor de ascua naranja, líneas
 * finas de red/circuito y el grano de marca (`.grain`).
 *
 * El vídeo es un extra de escritorio: en móvil y con `prefers-reduced-motion`
 * no se descarga ni se reproduce, y queda la atmósfera CSS (resplandor +
 * rejilla + grano), que ya funciona por sí sola como fondo.
 */
export function Atmosphere() {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(VIDEO_QUERY);
    const sync = () => setShowVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
          src="/Embers_drifting_in_black_void_20260918154453.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
        />
      )}
      {/* Velo de legibilidad: mantiene el contraste del texto sobre las brasas. */}
      {showVideo && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.5) 100%)",
          }}
        />
      )}
      <div
        className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[160px]"
        style={{
          background: "radial-gradient(circle, #FF6B00 0%, #FF8A00 35%, transparent 70%)",
        }}
      />
      <div className="grid-lines absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
