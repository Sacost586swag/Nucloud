import { useEffect } from "react";

/**
 * Añade <meta name="robots" content="noindex,nofollow"> mientras el
 * componente está montado. Se deja rastreable en robots.txt a propósito:
 * si se bloqueara el crawl ahí, Google podría indexar la URL sin poder ver
 * esta etiqueta. Usado por páginas privadas/personalizadas por cliente que
 * nunca deben aparecer en buscadores (ej. /embedded-whatsapp).
 */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}
