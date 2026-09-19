import { addDays, todayInZone, weekdayOf, type LocalDate, type LocalTime } from "./time";

export interface BookingWindow {
  min: LocalDate;
  max: LocalDate;
}

/** Ventana reservable: desde mañana hasta 30 días después de hoy (zona Ecuador). */
export function getBookingWindow(now: Date = new Date()): BookingWindow {
  const today = todayInZone(now);
  return { min: addDays(today, 1), max: addDays(today, 30) };
}

/** Lunes a sábado (domingo excluido), dentro de la ventana de 30 días. */
export function isBookableDate(date: LocalDate, now: Date = new Date()): boolean {
  const { min, max } = getBookingWindow(now);
  if (date < min || date > max) return false;
  return weekdayOf(date) !== 0;
}

export interface GenerateSlotsOptions {
  start?: LocalTime;
  end?: LocalTime;
  stepMin?: number;
}

/** Bloques de horario dentro de [start, end) cada `stepMin` minutos. Por defecto: 09:00–18:00, 30 min → 18 bloques. */
export function generateSlots(options: GenerateSlotsOptions = {}): LocalTime[] {
  const { start = "09:00", end = "18:00", stepMin = 30 } = options;
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const slots: LocalTime[] = [];
  for (let m = startMinutes; m < endMinutes; m += stepMin) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

/**
 * Bloques disponibles para una fecha: vacío si la fecha no es agendable;
 * si no, todos los bloques generados menos los ya ocupados (`busy`, parámetro
 * reservado para una futura consulta de disponibilidad real — no se usa aún).
 */
export function getAvailableSlots(
  date: LocalDate,
  now: Date = new Date(),
  busy: LocalTime[] = []
): LocalTime[] {
  if (!isBookableDate(date, now)) return [];
  const busySet = new Set(busy);
  return generateSlots().filter((slot) => !busySet.has(slot));
}
