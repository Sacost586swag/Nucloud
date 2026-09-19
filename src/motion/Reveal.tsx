import type { ElementType, ReactNode } from "react";
import type { RevealFrom, RevealType } from "@/motion/useSectionReveal";

interface RevealProps {
  as?: ElementType;
  type?: RevealType;
  /** Lado de entrada — solo aplica a `type="blur"`. */
  from?: RevealFrom;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Envoltorio JSX ergonómico sobre la primitiva `data-reveal` de
 * useSectionReveal.ts — equivalente a escribir el atributo a mano.
 */
export function Reveal({ as: Tag = "div", type = "up", from, delay, className, children }: RevealProps) {
  return (
    <Tag data-reveal={type} data-reveal-from={from} data-reveal-delay={delay} className={className}>
      {children}
    </Tag>
  );
}
