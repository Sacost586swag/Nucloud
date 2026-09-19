import { describe, it, expect } from "vitest";
import { todayInZone, addDays, weekdayOf, toLocalDate, fromLocalDate, toZonedISO } from "./time";

describe("todayInZone", () => {
  it("formatea como YYYY-MM-DD en la zona horaria de Ecuador (GMT-5)", () => {
    // 2026-09-22T02:30:00Z corresponde a 2026-09-21 21:30 en GMT-5.
    const now = new Date("2026-09-22T02:30:00Z");
    expect(todayInZone(now)).toBe("2026-09-21");
  });
});

describe("addDays", () => {
  it("suma días sobre la fecha calendario sin depender de la zona horaria local", () => {
    expect(addDays("2026-09-28", 3)).toBe("2026-10-01");
  });

  it("resta días cruzando el límite de año", () => {
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
  });
});

describe("weekdayOf", () => {
  it("devuelve 0 para un domingo", () => {
    expect(weekdayOf("2026-09-20")).toBe(0);
  });

  it("devuelve el día correcto para un martes", () => {
    expect(weekdayOf("2026-09-22")).toBe(2);
  });
});

describe("toLocalDate / fromLocalDate", () => {
  it("son inversas sin corrimiento de día", () => {
    const d = new Date(2026, 8, 22); // 22 sept 2026, hora local
    expect(toLocalDate(d)).toBe("2026-09-22");

    const back = fromLocalDate("2026-09-22");
    expect(back.getFullYear()).toBe(2026);
    expect(back.getMonth()).toBe(8);
    expect(back.getDate()).toBe(22);
  });
});

describe("toZonedISO", () => {
  it("construye un ISO 8601 con el offset fijo -05:00", () => {
    expect(toZonedISO("2026-09-22", "10:30")).toBe("2026-09-22T10:30:00-05:00");
  });
});
