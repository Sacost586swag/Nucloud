import { motion } from "framer-motion";
import { Activity, Cpu, Zap } from "lucide-react";

/**
 * Visual del hero: la animación neón del logo de NUCLOUD presentada dentro de
 * un marco "glass" tipo producto. El vídeo se reproduce en bucle, silenciado y
 * en línea para no penalizar el rendimiento ni requerir interacción del usuario.
 */
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Halo posterior */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-[2.5rem] blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,107,0,0.28), transparent 65%)" }}
      />

      <div className="glass relative overflow-hidden rounded-[2rem] p-1.5 shadow-glow">
        {/* Barra de ventana tipo producto */}
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
        <div className="relative aspect-square overflow-hidden bg-ink">
          <video
            className="h-full w-full object-cover"
            src="/nucloud-neon.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Animación del logo neón de NUCLOUD"
          />
          {/* Viñeta sutil para fundir el vídeo con el marco */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 55%, rgba(5,5,5,0.55) 100%)",
            }}
          />
          {/* Brillo superior */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent"
          />
        </div>

        {/* Pie de métricas */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-b-[1.6rem] border-t border-white/[0.06] bg-white/[0.02] text-center">
          <Stat icon={Cpu} label="Procesos" value="auto" />
          <Stat icon={Zap} label="Latencia" value="42ms" />
          <Stat icon={Activity} label="Uptime" value="99.9%" />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-3 py-4">
      <Icon className="h-4 w-4 text-flame" strokeWidth={1.8} />
      <span className="font-mono text-sm font-medium text-fog">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog-muted">{label}</span>
    </div>
  );
}
