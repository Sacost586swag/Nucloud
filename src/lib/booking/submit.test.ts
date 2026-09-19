import { describe, it, expect, vi } from "vitest";
import { postWithNoCorsFallback } from "./submit";
import type { BookingPayload } from "./payload";

const payload: BookingPayload = {
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
};

describe("postWithNoCorsFallback", () => {
  it("devuelve 'cors' cuando el POST con CORS responde 2xx", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    const result = await postWithNoCorsFallback("https://n8n.example/webhook", payload, fetchImpl);
    expect(result).toBe("cors");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("reintenta en no-cors si la respuesta CORS no es 2xx", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({ ok: true, type: "opaque" });
    const result = await postWithNoCorsFallback("https://n8n.example/webhook", payload, fetchImpl);
    expect(result).toBe("opaque");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl.mock.calls[1][1]).toMatchObject({ mode: "no-cors" });
  });

  it("reintenta en no-cors si el fetch con CORS lanza (bloqueado por el navegador)", async () => {
    const fetchImpl = vi.fn().mockRejectedValueOnce(new TypeError("Failed to fetch")).mockResolvedValueOnce({});
    const result = await postWithNoCorsFallback("https://n8n.example/webhook", payload, fetchImpl);
    expect(result).toBe("opaque");
  });
});
