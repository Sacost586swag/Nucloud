/**
 * Une clases condicionalmente y descarta valores vacíos.
 * Ligero: sin dependencias externas.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
