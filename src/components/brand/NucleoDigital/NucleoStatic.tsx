import {
  CORE,
  VIEWBOX,
  getVisibleNodes,
  getVisibleCrossLinks,
  getNodePoint,
  getCoreToNodePath,
  getCrossLinkPath,
} from "./geometry";

interface NucleoStaticProps {
  mobile?: boolean;
  className?: string;
  size?: number | string;
  label?: string;
}

/**
 * Estado idle final de "El Núcleo Digital" como SVG puro, sin Framer Motion.
 * Se usa como fallback de <Suspense> (mismo tamaño, sin salto de layout) y
 * como render completo bajo `prefers-reduced-motion` — nunca queda contenido
 * a medio dibujar.
 */
export function NucleoStatic({ mobile = false, className, size = "100%", label }: NucleoStaticProps) {
  const nodes = getVisibleNodes(mobile);
  const crossLinks = getVisibleCrossLinks(nodes);

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

      <circle cx={CORE.x} cy={CORE.y} r={72} fill="url(#nucleo-core-glow)" />

      {nodes.map((node, i) => (
        <path
          key={`branch-${node.id}`}
          d={getCoreToNodePath(node, i)}
          stroke="#FF6B00"
          strokeOpacity={0.55}
          strokeWidth={1.5}
          fill="none"
        />
      ))}

      {crossLinks.map((link, i) => {
        const d = getCrossLinkPath(link, nodes, i);
        if (!d) return null;
        return (
          <path
            key={`link-${link.from}-${link.to}`}
            d={d}
            stroke="#FF8A00"
            strokeOpacity={0.3}
            strokeWidth={1}
            fill="none"
          />
        );
      })}

      <circle cx={CORE.x} cy={CORE.y} r={9} fill="#FF8A00" />

      {nodes.map((node) => {
        const { x, y } = getNodePoint(node);
        return <circle key={`node-${node.id}`} cx={x} cy={y} r={5} fill="#FF6B00" />;
      })}
    </svg>
  );
}
