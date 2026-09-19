import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { useSectionReveal } from "@/motion/useSectionReveal";

interface PageCTAProps {
  title?: ReactNode;
  description?: string;
  /** Reemplaza el CTA por defecto (WhatsApp) por contenido propio. */
  children?: ReactNode;
}

/**
 * Banda de cierre reutilizable al pie de cada subpágina. Mismo lenguaje
 * visual que FinalCTA: tarjeta redondeada con resplandor naranja.
 */
export function PageCTA({ title, description, children }: PageCTAProps) {
  const scope = useSectionReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative py-20 sm:py-28">
      <div className="container-x">
        <div
          data-reveal="up"
          className="relative overflow-hidden rounded-[2.5rem] border border-flame/20 bg-ink-soft px-7 py-14 text-center sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255,107,0,0.22), transparent 60%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-fog text-balance sm:text-4xl lg:text-5xl">
              {title ?? (
                <>
                  ¿Listo para <span className="text-flame">empezar</span>?
                </>
              )}
            </h2>
            {description && (
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-fog-muted">
                {description}
              </p>
            )}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {children ?? (
                <>
                  <WhatsAppCTA size="lg" className="px-8">
                    <WhatsAppIcon className="h-5 w-5" />
                    Hablar por WhatsApp
                  </WhatsAppCTA>
                  <Button to="/contacto" variant="secondary" size="lg">
                    Enviar solicitud
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
