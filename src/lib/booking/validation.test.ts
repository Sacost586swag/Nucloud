import { describe, it, expect } from "vitest";
import { validateBooking, getServiceOptions, type BookingFormValues } from "./validation";

const NOW = new Date("2026-09-22T02:30:00Z"); // "hoy" = 2026-09-21 (lunes) en Ecuador

function makeValid(overrides: Partial<BookingFormValues> = {}): BookingFormValues {
  return {
    nombre: "Ana Pérez",
    email: "ana@empresa.com",
    telefono: "0991234567",
    servicio: getServiceOptions()[0],
    fecha: "2026-09-22",
    hora: "10:30",
    aceptaPolitica: true,
    ...overrides,
  };
}

describe("validateBooking", () => {
  it("acepta un formulario completo y válido", () => {
    const result = validateBooking(makeValid(), NOW);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.firstInvalid).toBeUndefined();
  });

  it("rechaza un nombre vacío y lo marca como primer campo inválido", () => {
    const result = validateBooking(makeValid({ nombre: "" }), NOW);
    expect(result.ok).toBe(false);
    expect(result.errors.nombre).toBeDefined();
    expect(result.firstInvalid).toBe("nombre");
  });

  it("rechaza un correo con formato inválido", () => {
    const result = validateBooking(makeValid({ email: "no-es-un-correo" }), NOW);
    expect(result.errors.email).toBeDefined();
  });

  it("rechaza un teléfono demasiado corto", () => {
    const result = validateBooking(makeValid({ telefono: "123" }), NOW);
    expect(result.errors.telefono).toBeDefined();
  });

  it("rechaza un servicio que no está en la lista de 8 familias + Otro", () => {
    const result = validateBooking(makeValid({ servicio: "Servicio inventado" }), NOW);
    expect(result.errors.servicio).toBeDefined();
  });

  it("acepta la opción 'Otro / No estoy seguro'", () => {
    const result = validateBooking(makeValid({ servicio: "Otro / No estoy seguro" }), NOW);
    expect(result.errors.servicio).toBeUndefined();
  });

  it("rechaza una fecha fuera de la ventana agendable (domingo)", () => {
    const result = validateBooking(makeValid({ fecha: "2026-09-27" }), NOW);
    expect(result.errors.fecha).toBeDefined();
  });

  it("rechaza una hora que no está en los bloques generados", () => {
    const result = validateBooking(makeValid({ hora: "23:15" }), NOW);
    expect(result.errors.hora).toBeDefined();
  });

  it("rechaza el envío si no se acepta la política de privacidad", () => {
    const result = validateBooking(makeValid({ aceptaPolitica: false }), NOW);
    expect(result.ok).toBe(false);
    expect(result.errors.aceptaPolitica).toBeDefined();
  });

  it("firstInvalid es 'aceptaPolitica' si es el único problema", () => {
    const result = validateBooking(makeValid({ aceptaPolitica: false }), NOW);
    expect(result.firstInvalid).toBe("aceptaPolitica");
  });
});
