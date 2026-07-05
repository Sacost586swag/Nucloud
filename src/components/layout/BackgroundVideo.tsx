import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const VIDEO_SRC = "/nucloud-background.mp4";
const POSTER_SRC = "/nucloud-background-poster.jpg";

/**
 * Fondo de marca dirigido por SCROLL, fijo detrás de toda la app.
 *
 * El vídeo NO se autoreproduce: su fotograma se ata a la posición de scroll
 * (scrubbing). Bajar avanza la animación; subir la retrocede. El progreso se
 * suaviza con un `spring` para dar inercia y evitar saltos. El clip está
 * re-encodeado con keyframe en cada frame, así que buscar cualquier tiempo es
 * instantáneo y el scrub se siente fluido en ambos sentidos.
 *
 * Con `prefers-reduced-motion` no hay scrubbing: se muestra solo el póster.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const seekableRef = useRef(false);
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();

  // Progreso de scroll de toda la página (0 → 1), suavizado con inercia.
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  useMotionValueEvent(smooth, "change", (p) => {
    const video = videoRef.current;
    if (!video || !seekableRef.current || durationRef.current === 0) return;
    // Margen final para no aterrizar exactamente en la duración (frame negro/loop).
    const target = Math.min(Math.max(p, 0), 1) * (durationRef.current - 0.05);
    if (Math.abs(video.currentTime - target) > 0.001) {
      video.currentTime = target;
    }
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-ink">
      {prefersReduced ? (
        <img
          src={POSTER_SRC}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration || 0;
          }}
          onLoadedData={(e) => {
            // Pausado y listo para hacer seek; fija el primer fotograma.
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
            seekableRef.current = true;
            setReady(true);
          }}
        />
      )}

      {/* Scrim de legibilidad: oscurece bordes y zonas de texto sin tapar el
          brillo central de la animación (contraste de cuerpo ≥ 4.5:1). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.56) 32%, rgba(5,5,5,0.56) 64%, rgba(5,5,5,0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 42%, transparent 38%, rgba(5,5,5,0.66) 100%)",
        }}
      />
    </div>
  );
}
