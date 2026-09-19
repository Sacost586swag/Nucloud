/**
 * Fechas/horas de la agenda como texto (`YYYY-MM-DD` / `HH:mm`), nunca como
 * `Date` con conversión implícita de zona horaria — ver research.md §4.
 * Ecuador no observa horario de verano, así que el offset `-05:00` es fijo
 * todo el año.
 */

export const BOOKING_TZ = "America/Guayaquil";
export const BOOKING_UTC_OFFSET = "-05:00";

export type LocalDate = string; // "YYYY-MM-DD"
export type LocalTime = string; // "HH:mm"

/** Fecha de hoy en la zona horaria de Ecuador, como texto YYYY-MM-DD. */
export function todayInZone(now: Date = new Date(), tz: string = BOOKING_TZ): LocalDate {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Suma (o resta) días a una fecha calendario, vía aritmética UTC pura (sin zona horaria local). */
export function addDays(date: LocalDate, days: number): LocalDate {
  const [y, m, d] = date.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  utc.setUTCDate(utc.getUTCDate() + days);
  return utc.toISOString().slice(0, 10);
}

/** Día de la semana de una fecha calendario: 0 = domingo … 6 = sábado. */
export function weekdayOf(date: LocalDate): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** `Date` → `LocalDate`, usando los getters LOCALES (nunca `toISOString`, que es UTC). */
export function toLocalDate(date: Date): LocalDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** `LocalDate` → `Date` a medianoche LOCAL (constructor de 3 argumentos, no `Date.parse`). */
export function fromLocalDate(date: LocalDate): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Combina fecha + hora en un ISO 8601 con el offset fijo de Ecuador. */
export function toZonedISO(date: LocalDate, time: LocalTime): string {
  return `${date}T${time}:00${BOOKING_UTC_OFFSET}`;
}
