import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetaTechBadge } from "@/components/brand/MetaTechBadge";
import { TECH_CATEGORIES, getTechByCategory, type TechCategory, type TechItem } from "@/constants/techStack";
import { useSectionReveal } from "@/motion/useSectionReveal";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

/**
 * Sección "Herramientas y Tecnologías que usamos" — reemplaza a TechMarquee.
 * Pestañas por categoría (centradas) con un indicador deslizante. Cada logo se
 * muestra siempre a su color de marca real sobre una placa clara: así se leen
 * también los logos oscuros (Anthropic, Sentry, Let's Encrypt…) que sobre el
 * fondo negro del sitio desaparecerían.
 */
export function TechStack() {
  const scope = useSectionReveal<HTMLElement>();
  const [active, setActive] = useState<TechCategory>(TECH_CATEGORIES[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const activeRef = useRef(active);
  activeRef.current = active;

  // El track (`w-max`) se desplaza junto con su contenido dentro del contenedor
  // con scroll, así que la posición del botón respecto al track ya es la
  // posición correcta del indicador — no hay que sumar `scrollLeft`.
  const measure = () => {
    const btn = tabRefs.current[activeRef.current];
    const track = trackRef.current;
    if (!btn || !track) return null;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    return { x: btnRect.left - trackRect.left, width: btnRect.width };
  };

  useLayoutEffect(() => {
    const pos = measure();
    if (!pos || !indicatorRef.current) return;
    gsap.to(indicatorRef.current, { ...pos, duration: 0.4, ease: "brand" });
  }, [active]);

  // Reposiciona el indicador sin animar cuando cambia el tamaño del track
  // (breakpoints) o cuando termina de cargar la tipografía, que ensancha los
  // botones después del primer render. `activeRef` evita re-suscribirse (y
  // pisar la animación) en cada cambio de pestaña.
  useEffect(() => {
    const sync = () => {
      const pos = measure();
      if (pos && indicatorRef.current) gsap.set(indicatorRef.current, pos);
    };
    const ro = new ResizeObserver(sync);
    if (trackRef.current) ro.observe(trackRef.current);
    void document.fonts.ready.then(sync);
    return () => ro.disconnect();
  }, []);

  const items = getTechByCategory(active);

  return (
    <section ref={scope} id="tecnologias" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Stack tecnológico"
          title={
            <>
              Herramientas y <span className="text-flame">tecnologías</span> que usamos
            </>
          }
          description="Construimos con tecnología reconocida y de primer nivel — organizada por el papel que cumple en tu sistema."
        />

        <div data-reveal="up" className="mt-8 flex justify-center">
          <MetaTechBadge size="prominent" />
        </div>

        {/* Pestañas — `mx-auto w-max` centra la fila cuando cabe y la deja
            desplazable cuando no (justify-center sobre un contenedor con
            overflow recortaría las primeras pestañas). */}
        <div data-reveal="up" className="mt-12 overflow-x-auto">
          <div
            ref={trackRef}
            role="tablist"
            aria-label="Categorías de tecnología"
            className="relative mx-auto flex w-max gap-1 pb-2"
          >
            <span
              ref={indicatorRef}
              aria-hidden
              className="absolute bottom-0 left-0 h-[2px] rounded-full bg-flame-gradient"
            />
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                ref={(el) => {
                  tabRefs.current[cat] = el;
                }}
                type="button"
                role="tab"
                id={`tech-tab-${cat}`}
                aria-selected={active === cat}
                aria-controls={`tech-panel-${cat}`}
                onClick={() => setActive(cat)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors",
                  active === cat ? "text-flame" : "text-fog-muted hover:text-fog"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Logos de la categoría activa — flex centrado (una rejilla no puede
            centrar la última fila incompleta, y 7 de las 8 categorías la dejan). */}
        <div
          data-reveal="blur"
          data-reveal-from="bottom"
          data-reveal-delay={0.1}
          role="tabpanel"
          id={`tech-panel-${active}`}
          aria-labelledby={`tech-tab-${active}`}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {items.map((item) => (
            <TechTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechTile({ item }: { item: TechItem }) {
  return (
    <div
      title={item.nombre}
      className="flex basis-[calc((100%_-_1.5rem)/3)] shrink-0 grow-0 flex-col items-center gap-2.5 rounded-2xl bg-white p-4 shadow-card transition-transform duration-300 hover:-translate-y-0.5 sm:basis-[calc((100%_-_2.25rem)/4)] lg:basis-[calc((100%_-_3.75rem)/6)]"
    >
      {item.logo.tipo === "fallback" ? (
        <span className="grid h-10 w-10 place-items-center rounded-md border border-ink/20 font-mono text-xs text-ink/60">
          {item.nombre.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <img
          src={item.logo.ruta}
          alt={item.nombre}
          width={40}
          height={40}
          loading="lazy"
          className={cn("h-10 w-10 object-contain", item.logo.tipo === "png" && "rounded-lg")}
        />
      )}
      <span className="text-center text-[11px] font-medium leading-tight text-ink/70">{item.nombre}</span>
    </div>
  );
}
