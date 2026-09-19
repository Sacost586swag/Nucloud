import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import {
  CORE,
  VIEWBOX,
  getVisibleNodes,
  getVisibleCrossLinks,
  getNodePoint,
  getCoreToNodePath,
  getCrossLinkPath,
} from "./geometry";
import { NucleoStatic } from "./NucleoStatic";

export interface NucleoDigitalProps {
  /** "hero" = tamaño principal del Hero. "mini" = loader/watermark reutilizable. */
  variant?: "hero" | "mini";
  /** "sequence" = dormant→ignition→expansion→idle (una vez por carga).
   *  "idle" = entra directo en el estado final (revisitas SPA).
   *  "loader" = pulso continuo de reposo, sin ramas — indicador de carga. */
  mode?: "sequence" | "idle" | "loader";
  nodeCount?: number;
  mobileNodeCount?: number;
  size?: number | string;
  className?: string;
  /** Si se define, el SVG se anuncia como role="img" con este título. */
  label?: string;
  onIgnited?: () => void;
}

type Phase = "dormant" | "ignition" | "expansion" | "idle";

/** Módulo-scope: la ignición corre una sola vez por carga completa del sitio (no por SPA nav). */
let hasIgnitedThisLoad = false;

function useIsMobile() {
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

const coreVariants: Variants = {
  dormant: {
    opacity: [0.25, 0.55, 0.25],
    scale: [0.92, 1, 0.92],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
  ignition: {
    opacity: [0.55, 1, 0.8],
    scale: [1, 1.6, 1.15],
    transition: { duration: 0.45, ease: "easeOut" },
  },
  expansion: { opacity: 0.85, scale: 1.15, transition: { duration: 0.3 } },
  idle: { opacity: 0.85, scale: 1.15, transition: { duration: 0.3 } },
};

const branchVariants: Variants = {
  dormant: { pathLength: 0, opacity: 0 },
  ignition: { pathLength: 0, opacity: 0 },
  expansion: (i: number) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
  idle: { pathLength: 1, opacity: 0.6 },
};

const nodeVariants: Variants = {
  dormant: { scale: 0, opacity: 0 },
  ignition: { scale: 0, opacity: 0 },
  expansion: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.08 + 0.9 * 0.85, ease: "backOut" },
  }),
  idle: { scale: 1, opacity: 1 },
};

/**
 * "El Núcleo Digital" — pieza de identidad de marca del Hero (Principio III:
 * único componente del sitio en Framer Motion). Secuencia dormant→ignition→
 * expansion→idle en la primera carga; idle directo en revisitas SPA. Bajo
 * `prefers-reduced-motion` renderiza NucleoStatic sin ninguna secuencia.
 */
export function NucleoDigital({
  variant = "hero",
  mode = "sequence",
  nodeCount = 7,
  mobileNodeCount = 4,
  size = "100%",
  className,
  label,
  onIgnited,
}: NucleoDigitalProps) {
  const prefersReduced = useReducedMotion();
  const mobile = useIsMobile();
  const phaseRef = useRef<Phase>("dormant");

  const [phase, setPhase] = useState<Phase>(() => {
    if (mode === "idle") return "idle";
    if (mode === "loader") return "dormant";
    return hasIgnitedThisLoad ? "idle" : "dormant";
  });

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (mode !== "sequence" || hasIgnitedThisLoad || prefersReduced) return;
    const t1 = setTimeout(() => setPhase("ignition"), 900);
    const t2 = setTimeout(() => setPhase("expansion"), 1350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (prefersReduced) {
    return <NucleoStatic mobile={mobile} className={className} size={size} label={label} />;
  }

  const allNodes = getVisibleNodes(mobile).slice(0, mobile ? mobileNodeCount : nodeCount);
  const crossLinks = getVisibleCrossLinks(allNodes);
  const showBranches = mode !== "loader";
  const strokeScale = variant === "mini" ? 0.75 : 1;

  function handleExpansionComplete() {
    if (phaseRef.current !== "expansion") return;
    hasIgnitedThisLoad = true;
    setPhase("idle");
    onIgnited?.();
  }

  return (
    <svg
      viewBox={VIEWBOX}
      width={size}
      height={size}
      className={className}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label && <title>{label}</title>}
      <defs>
        <radialGradient id="nucleo-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#FF6B00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>

      <m.circle
        cx={CORE.x}
        cy={CORE.y}
        r={72}
        fill="url(#nucleo-core-glow)"
        variants={coreVariants}
        initial={false}
        animate={phase}
        style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
      />

      {showBranches &&
        allNodes.map((node, i) => (
          <m.path
            key={`branch-${node.id}`}
            custom={i}
            d={getCoreToNodePath(node, i)}
            stroke="#FF6B00"
            strokeWidth={1.5 * strokeScale}
            fill="none"
            variants={branchVariants}
            initial={false}
            animate={phase}
            onAnimationComplete={i === allNodes.length - 1 ? handleExpansionComplete : undefined}
          />
        ))}

      {showBranches &&
        crossLinks.map((link, i) => {
          const d = getCrossLinkPath(link, allNodes, i);
          if (!d) return null;
          return (
            <m.path
              key={`link-${link.from}-${link.to}`}
              custom={i}
              d={d}
              stroke="#FF8A00"
              strokeWidth={strokeScale}
              fill="none"
              variants={branchVariants}
              initial={false}
              animate={phase}
            />
          );
        })}

      {/* Punto sólido del núcleo — estático, sin variantes de fase. */}
      <circle cx={CORE.x} cy={CORE.y} r={9} fill="#FF8A00" />

      {showBranches &&
        allNodes.map((node, i) => {
          const { x, y } = getNodePoint(node);
          return (
            <m.circle
              key={`node-${node.id}`}
              custom={i}
              cx={x}
              cy={y}
              r={5 * strokeScale}
              fill="#FF6B00"
              variants={nodeVariants}
              initial={false}
              animate={phase}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          );
        })}

      {/* Pulsos de luz viajando por las conexiones en idle — máx. ~2 visibles a la vez
          gracias al repeatDelay escalonado por índice. */}
      {phase === "idle" &&
        showBranches &&
        allNodes.map((node, i) => (
          <m.path
            key={`pulse-${node.id}`}
            d={getCoreToNodePath(node, i)}
            stroke="#FF8A00"
            strokeWidth={2 * strokeScale}
            strokeLinecap="round"
            strokeDasharray="6 200"
            fill="none"
            initial={{ pathLength: 1, strokeDashoffset: 140 }}
            animate={{ strokeDashoffset: -140 }}
            transition={{
              duration: 2.2,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 3.5 + i * 1.7,
              delay: i * 0.6,
            }}
          />
        ))}
    </svg>
  );
}
