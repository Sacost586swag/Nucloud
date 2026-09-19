/**
 * Geometría determinista de "El Núcleo Digital" — sin Math.random, para que
 * el grafo sea siempre el mismo (evoca el árbol de red del logo: un arco de
 * nodos "copa" arriba del núcleo + un "tallo" de nodos abajo).
 */

export interface NucleoNode {
  id: string;
  /** Grados desde "arriba" (0°), sentido horario. */
  angle: number;
  /** Distancia al núcleo, en unidades del viewBox. */
  radius: number;
  /** 1 = visible también en móvil; 2 = solo escritorio. */
  priority: 1 | 2;
}

export interface NucleoLink {
  from: string;
  to: string;
}

export const VIEWBOX = "0 0 480 480";
export const CORE = { x: 240, y: 270 };

/** 7 nodos: 5 en el arco superior ("copa") + 2 en el "tallo" inferior. */
export const NODES: NucleoNode[] = [
  { id: "cap-center", angle: 0, radius: 150, priority: 1 },
  { id: "cap-left", angle: -45, radius: 155, priority: 1 },
  { id: "cap-right", angle: 45, radius: 155, priority: 1 },
  { id: "cap-far-left", angle: -85, radius: 145, priority: 2 },
  { id: "cap-far-right", angle: 85, radius: 145, priority: 2 },
  { id: "stem-left", angle: 150, radius: 90, priority: 1 },
  { id: "stem-right", angle: 210, radius: 90, priority: 2 },
];

/** Enlaces nodo-nodo adicionales (además de núcleo→cada nodo) — refuerzan la lectura de red, no de estrella. */
export const CROSS_LINKS: NucleoLink[] = [
  { from: "cap-left", to: "cap-center" },
  { from: "cap-center", to: "cap-right" },
  { from: "stem-left", to: "cap-left" },
];

function polarToPoint(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CORE.x + radius * Math.sin(rad),
    y: CORE.y - radius * Math.cos(rad),
  };
}

export function getNodePoint(node: NucleoNode): { x: number; y: number } {
  return polarToPoint(node.angle, node.radius);
}

/** Móvil = solo los nodos de prioridad 1 (3-4 según la lista de arriba). */
export function getVisibleNodes(mobile: boolean): NucleoNode[] {
  return mobile ? NODES.filter((n) => n.priority === 1) : NODES;
}

export function getVisibleCrossLinks(nodes: NucleoNode[]): NucleoLink[] {
  const ids = new Set(nodes.map((n) => n.id));
  return CROSS_LINKS.filter((l) => ids.has(l.from) && ids.has(l.to));
}

/** Curva Bézier cuadrática con el punto de control desviado perpendicularmente. */
function quadPath(x1: number, y1: number, x2: number, y2: number, bend: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/** Rama núcleo→nodo; el signo de la curvatura alterna por índice. */
export function getCoreToNodePath(node: NucleoNode, index: number): string {
  const { x, y } = getNodePoint(node);
  const bend = index % 2 === 0 ? 24 : -24;
  return quadPath(CORE.x, CORE.y, x, y, bend);
}

/** Enlace nodo-nodo; null si alguno de los dos extremos no está visible. */
export function getCrossLinkPath(link: NucleoLink, nodes: NucleoNode[], index: number): string | null {
  const from = nodes.find((n) => n.id === link.from);
  const to = nodes.find((n) => n.id === link.to);
  if (!from || !to) return null;
  const p1 = getNodePoint(from);
  const p2 = getNodePoint(to);
  const bend = index % 2 === 0 ? 14 : -14;
  return quadPath(p1.x, p1.y, p2.x, p2.y, bend);
}
