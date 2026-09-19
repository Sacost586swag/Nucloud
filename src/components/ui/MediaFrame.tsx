import { useRef } from "react";
import { ImagePlus, Video } from "lucide-react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type Ratio = "21/9" | "16/9" | "4/3" | "1/1";

const RATIO_CLASS: Record<Ratio, string> = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

interface MediaFrameProps {
  /** Qué material va aquí (se muestra en el hueco mientras no haya `src`). */
  label: string;
  ratio?: Ratio;
  caption?: string;
  /** Ruta del archivo (p. ej. "/equipo.jpg" en `public/`). Sin `src`, se muestra el hueco marcado. */
  src?: string;
  kind?: "image" | "video";
  alt?: string;
  poster?: string;
  /** Solo vídeo: muestra controles y sonido (para testimonios). Por defecto se reproduce mudo en bucle. */
  controls?: boolean;
  /** El marco se abre con el scroll: pasa de una ventana central al marco completo. */
  expandOnScroll?: boolean;
  className?: string;
}

/**
 * Espacio reservado para material que genera confianza (fotos del equipo,
 * demos, capturas de reportes, testimonios). Sin `src` es un hueco marcado con
 * la estética de marca; con `src` pinta el medio real — pasar el archivo basta
 * para convertir el hueco en contenido.
 *
 * `data-reveal` lo anima al entrar (hereda el scope GSAP de la sección donde se
 * coloque); `expandOnScroll` usa su propio ScrollTrigger y no lleva reveal.
 */
export function MediaFrame({
  label,
  ratio = "16/9",
  caption,
  src,
  kind = "image",
  alt = "",
  poster,
  controls = false,
  expandOnScroll = false,
  className,
}: MediaFrameProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!expandOnScroll) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const root = rootRef.current;
        if (!root) return;
        const frame = root.querySelector<HTMLElement>("[data-expand-frame]");
        const media = root.querySelector<HTMLElement>("[data-expand-media]");
        if (!frame || !media) return;
        const trigger = { trigger: root, start: "top 88%", end: "top 25%", scrub: true } as const;
        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 26% 18% 26% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none", scrollTrigger: trigger }
        );
        gsap.fromTo(media, { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: trigger });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [expandOnScroll] }
  );

  const Icon = kind === "video" ? Video : ImagePlus;

  const content = src ? (
    kind === "video" ? (
      <video
        data-expand-media
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        {...(controls ? { controls: true } : { autoPlay: true, loop: true, muted: true })}
        aria-label={alt || label}
      />
    ) : (
      <img data-expand-media src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    )
  ) : (
    <div data-expand-media className="absolute inset-0">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-flame/[0.06] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-flame/25 bg-flame/[0.06] text-flame transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-fog">{label}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-fog-muted/70">
          {kind === "video" ? "Vídeo de referencia" : "Imagen de referencia"}
        </span>
        {caption && <span className="mt-1 max-w-xs text-sm text-fog-muted">{caption}</span>}
      </div>
    </div>
  );

  return (
    <figure
      ref={rootRef}
      {...(expandOnScroll ? {} : { "data-reveal": "blur", "data-reveal-from": "bottom" })}
      className={cn("group relative w-full", RATIO_CLASS[ratio], className)}
    >
      {/* Borde y fondo viven en el elemento recortado: al abrirse con el scroll
          el marco completo aparece junto con su borde. */}
      <div
        data-expand-frame
        className={cn(
          "absolute inset-0 overflow-hidden rounded-3xl bg-white/[0.015]",
          !src && "border border-dashed border-flame/25 bg-gradient-to-br from-flame/[0.09] via-white/[0.02] to-transparent"
        )}
      >
        {content}
      </div>
      {src && caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-10 text-sm text-fog">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
