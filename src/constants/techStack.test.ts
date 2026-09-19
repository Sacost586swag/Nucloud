import { describe, it, expect } from "vitest";
import { TECH_ITEMS, TECH_CATEGORIES } from "./techStack";

describe("TECH_ITEMS", () => {
  it("cada tecnología tiene logo.tipo definido (nunca undefined)", () => {
    for (const item of TECH_ITEMS) {
      expect(item.logo).toBeDefined();
      expect(item.logo.tipo).toBeDefined();
      if (item.logo.tipo !== "fallback") {
        expect(typeof item.logo.ruta).toBe("string");
        expect(item.logo.ruta.length).toBeGreaterThan(0);
      }
    }
  });

  it("cada tecnología pertenece a una de las 8 categorías válidas", () => {
    for (const item of TECH_ITEMS) {
      expect(TECH_CATEGORIES).toContain(item.categoria);
    }
  });

  it("no hay ids duplicados", () => {
    const ids = TECH_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
