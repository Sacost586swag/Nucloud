import { describe, it, expect } from "vitest";
import { getBookingWindow, isBookableDate, generateSlots, getAvailableSlots } from "./slots";

// "Hoy" fijo para todos los tests: 2026-09-22T02:30:00Z = 2026-09-21 (lunes) en Ecuador.
const NOW = new Date("2026-09-22T02:30:00Z");

describe("getBookingWindow", () => {
  it("va de mañana a +30 días respecto de hoy en Ecuador", () => {
    expect(getBookingWindow(NOW)).toEqual({ min: "2026-09-22", max: "2026-10-21" });
  });
});

describe("isBookableDate", () => {
  it("rechaza el día de hoy (la ventana empieza mañana)", () => {
    expect(isBookableDate("2026-09-21", NOW)).toBe(false);
  });

  it("acepta mañana (inicio de la ventana, martes)", () => {
    expect(isBookableDate("2026-09-22", NOW)).toBe(true);
  });

  it("rechaza un domingo dentro de la ventana", () => {
    expect(isBookableDate("2026-09-27", NOW)).toBe(false);
  });

  it("acepta el último día de la ventana si no es domingo", () => {
    expect(isBookableDate("2026-10-21", NOW)).toBe(true);
  });

  it("rechaza una fecha más allá de 30 días", () => {
    expect(isBookableDate("2026-10-22", NOW)).toBe(false);
  });
});

describe("generateSlots", () => {
  it("genera exactamente 18 bloques de 30 minutos entre 09:00 y 17:30", () => {
    const slots = generateSlots();
    expect(slots).toHaveLength(18);
    expect(slots[0]).toBe("09:00");
    expect(slots[slots.length - 1]).toBe("17:30");
    expect(slots).not.toContain("18:00");
  });
});

describe("getAvailableSlots", () => {
  it("devuelve vacío para una fecha no agendable (domingo)", () => {
    expect(getAvailableSlots("2026-09-27", NOW)).toEqual([]);
  });

  it("devuelve los 18 bloques para una fecha agendable sin ocupados", () => {
    expect(getAvailableSlots("2026-09-22", NOW)).toHaveLength(18);
  });

  it("excluye los bloques marcados como ocupados", () => {
    const slots = getAvailableSlots("2026-09-22", NOW, ["09:00", "09:30"]);
    expect(slots).toHaveLength(16);
    expect(slots).not.toContain("09:00");
  });
});
