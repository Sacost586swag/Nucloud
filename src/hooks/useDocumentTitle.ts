import { useEffect } from "react";

/**
 * Fija el <title> del documento por página (SEO ligero, sin dependencias).
 * Restaura el título previo al desmontar para no dejar estados colgados.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
