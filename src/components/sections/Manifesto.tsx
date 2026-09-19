import { useSectionReveal } from "@/motion/useSectionReveal";

/** Afirmación de posicionamiento de marca (FR-019), única función de esta sección. */
export function Manifesto() {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative py-20 sm:py-28">
      <div className="container-x">
        <p
          data-reveal="words"
          className="mx-auto max-w-4xl text-balance text-center font-display text-3xl font-semibold leading-tight text-fog sm:text-4xl lg:text-5xl"
        >
          No vendemos simples bots. <span className="text-flame">Creamos Agentes Inteligentes para Negocios.</span>
        </p>
      </div>
    </section>
  );
}
