import { useEffect, useRef } from "react";

/**
 * Visual del Hero: la animación neón del logo dentro de un marco "glass" tipo
 * ventana de producto. El vídeo va en bucle, silenciado y en línea; con
 * `prefers-reduced-motion` se pausa y queda el póster.
 */
export function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      data-reveal="up"
      data-reveal-delay={0.15}
      className="relative w-full max-w-md justify-self-center lg:justify-self-end"
    >
      {/* Halo posterior */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-[2.5rem] blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,107,0,0.28), transparent 65%)" }}
      />

      <div className="glass relative overflow-hidden rounded-[2rem] p-1.5 shadow-glow">
        {/* Barra de ventana */}
        <div className="flex items-center justify-between rounded-t-[1.6rem] border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-flame/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog-muted">
            nucloud · neural engine
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-flame-amber">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
            </span>
            live
          </span>
        </div>

        {/* Lienzo de vídeo */}
        <div className="relative aspect-square overflow-hidden rounded-b-[1.6rem] bg-ink">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/nucloud-neon.mp4"
            poster="/nucloud-logo.png"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Animación del logo neón de NUCLOUD"
          />
          {/* Viñeta para fundir el vídeo con el marco */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(10,10,10,0.55) 100%)" }}
          />
          {/* Brillo superior */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
