import { describe, it, expect } from "vitest";
import { buildBookingPayload, computeSubmitDelay } from "./payload";
import { getServiceOptions, type BookingFormValues } from "./validation";

describe("buildBookingPayload", () => {
  const values: BookingFormValues = {
    nombre: "Ana Pérez",
    email: "ana@empresa.com",
    telefono: "0991234567",
    servicio: getServiceOptions()[0], // "Webs y landings"
    fecha: "2026-09-22",
    hora: "10:30",
    aceptaPolitica: true,
  };
  const ctx = {
    now: new Date("2026-09-18T15:42:07.123Z"),
    href: "https://nucloudai.com/contacto",
    userAgent: "test-agent",
  };

  it("arma el payload exacto del contrato (contracts/booking-webhook.md)", () => {
    const payload = buildBookingPayload(values, ctx);
    expect(payload).toEqual({
      nombre: "Ana Pérez",
      email: "ana@empresa.com",
      telefono: "0991234567",
      servicio: "Webs y landings",
      servicio_id: "webs-y-landings",
      fecha: "2026-09-22",
      hora: "10:30",
      zona_horaria: "America/Guayaquil",
      fecha_hora_iso: "2026-09-22T10:30:00-05:00",
      estado: "Agendado",
      acepta_politica: true,
      origen: "Formulario web · nucloudai",
      enviado_en: "2026-09-18T15:42:07.123Z",
      pagina: "https://nucloudai.com/contacto",
      user_agent: "test-agent",
    });
  });

  it("enviado_en (marca de envío) es distinto de fecha (fecha de la cita)", () => {
    const payload = buildBookingPayload(values, ctx);
    expect(payload.enviado_en).not.toBe(payload.fecha);
  });

  it("resuelve servicio_id como slug de respaldo si el servicio no está en el catálogo", () => {
    const payload = buildBookingPayload({ ...values, servicio: "Otro / No estoy seguro" }, ctx);
    expect(payload.servicio_id).toBe("otro-no-estoy-seguro");
  });

  it("lanza si falta fecha u hora (no debería llamarse sin validar antes)", () => {
    expect(() => buildBookingPayload({ ...values, fecha: "" }, ctx)).toThrow();
    expect(() => buildBookingPayload({ ...values, hora: "" }, ctx)).toThrow();
  });
});

describe("computeSubmitDelay", () => {
  it("devuelve el tiempo restante si el envío fue más rápido que el mínimo", () => {
    expect(computeSubmitDelay(1000, 1300, 1200)).toBe(900);
  });

  it("devuelve 0 si ya pasó el mínimo", () => {
    expect(computeSubmitDelay(1000, 3000, 1200)).toBe(0);
  });
});
