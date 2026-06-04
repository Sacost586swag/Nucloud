import { motion } from "framer-motion";
import { Activity, Cpu, Zap } from "lucide-react";

/**
 * Mockup tecnológico del hero: un "motor neuronal" animado que reinterpreta
 * el logo de NUCLOUD (árbol neuronal de nodos y conexiones). SVG ligero,
 * todo el movimiento es CSS para no penalizar el render de React.
 */

// Nodos distribuidos como una copa neuronal sobre un tronco (eco del logo).
const NODES: Array<{ x: number; y: number; r: number; key: string }> = [
  { x: 150, y: 28, r: 5, key: "crown" },
  { x: 80, y: 70, r: 4, key: "l1" },
  { x: 150, y: 78, r: 4, key: "c1" },
  { x: 222, y: 70, r: 4, key: "r1" },
  { x: 44, y: 120, r: 3.5, key: "l2" },
  { x: 108, y: 128, r: 3.5, key: "lc" },
  { x: 192, y: 128, r: 3.5, key: "rc" },
  { x: 256, y: 120, r: 3.5, key: "r2" },
  { x: 150, y: 132, r: 7, key: "core" },
  { x: 150, y: 186, r: 4, key: "trunk" },
  { x: 95, y: 232, r: 3.5, key: "rootL" },
  { x: 150, y: 240, r: 4, key: "rootC" },
  { x: 205, y: 232, r: 3.5, key: "rootR" },
];

const byKey = Object.fromEntries(NODES.map((n) => [n.key, n]));

const EDGES: Array<[string, string]> = [
  ["crown", "c1"],
  ["crown", "l1"],
  ["crown", "r1"],
  ["l1", "l2"],
  ["l1", "lc"],
  ["r1", "r2"],
  ["r1", "rc"],
  ["c1", "lc"],
  ["c1", "rc"],
  ["c1", "core"],
  ["l2", "core"],
  ["r2", "core"],
  ["lc", "core"],
  ["rc", "core"],
  ["core", "trunk"],
  ["trunk", "rootL"],
  ["trunk", "rootC"],
  ["trunk", "rootR"],
];

export function NeuralMockup() {
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
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,107,0,0.22), transparent 65%)" }}
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

        {/* Lienzo neuronal */}
        <div className="relative px-6 pb-2 pt-6">
          <svg viewBox="0 0 300 270" className="mx-auto w-full max-w-[420px]" role="img" aria-label="Red neuronal NUCLOUD en funcionamiento">
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB347" />
                <stop offset="100%" stopColor="#FF6B00" />
              </linearGradient>
              <radialGradient id="node" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD9A8" />
                <stop offset="55%" stopColor="#FF8C1A" />
                <stop offset="100%" stopColor="#FF6B00" />
              </radialGradient>
              <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Conexiones */}
            <g stroke="url(#edge)" strokeWidth="1.4" opacity="0.55">
              {EDGES.map(([a, b], i) => (
                <line
                  key={`${a}-${b}`}
                  x1={byKey[a].x}
                  y1={byKey[a].y}
                  x2={byKey[b].x}
                  y2={byKey[b].y}
                  strokeDasharray="3 7"
                  className="animate-dash-flow"
                  style={{ animationDelay: `${(i % 6) * 0.18}s` }}
                />
              ))}
            </g>

            {/* Nodos */}
            <g filter="url(#soft)">
              {NODES.map((n, i) => (
                <circle
                  key={n.key}
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="url(#node)"
                  className="animate-pulse-node"
                  style={{ animationDelay: `${(i % 7) * 0.32}s`, transformOrigin: `${n.x}px ${n.y}px` }}
                />
              ))}
            </g>
          </svg>
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
