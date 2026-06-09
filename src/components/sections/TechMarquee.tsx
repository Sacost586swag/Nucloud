/**
 * Franja de tecnologías con desplazamiento infinito (marquee).
 * Refuerza credibilidad mostrando el stack con el que construimos los sistemas.
 * El contenido se duplica para que el bucle sea perfecto (la animación traslada -50%).
 */

const TECH = [
  "OpenAI",
  "n8n",
  "React",
  "PostgreSQL",
  "WhatsApp API",
  "Supabase",
  "LangChain",
  "Python",
  "Vercel",
  "Cloudflare",
  "Make",
  "TypeScript",
];

export function TechMarquee() {
  return (
    <section aria-label="Tecnologías que utilizamos" className="relative border-y border-white/[0.05] bg-ink-soft/40 py-7">
      <div className="container-x">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fog-muted">
          Construido con tecnología de primer nivel
        </p>
      </div>

      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Pista única con el contenido duplicado: la animación traslada -50%,
            es decir exactamente una copia, logrando un bucle sin saltos. */}
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {[...TECH, ...TECH].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= TECH.length}
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
