import { NICHES } from "@/constants/content/niches";

/**
 * Tira en bucle de los nichos que atiende NUCLOUD (Catalogo_Servicios_Nucloud.docx
 * §1). Mismo mecanismo CSS que usaba TechMarquee (`animate-marquee`, contenido
 * duplicado para un bucle sin saltos) — sin JS, sin GSAP.
 */
export function Niches() {
  return (
    <section aria-label="Nichos que atendemos" className="relative border-y border-white/[0.05] bg-ink-soft/40 py-7">
      <div className="container-x">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fog-muted">
          Negocios con los que trabajamos
        </p>
      </div>

      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {[...NICHES, ...NICHES].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= NICHES.length}
              className="flex items-center gap-12 whitespace-nowrap font-display text-lg font-medium text-fog-muted/70 transition-colors hover:text-fog"
            >
              {name}
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-flame/40" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
