import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * FR-020/FR-021: la copy visible (secciones, páginas, contenido tipado) nunca
 * nombra herramientas internas de implementación ni "nucloudai.cloud", y
 * nunca muestra precios. `techStack.ts` está exento a propósito: es la única
 * sección donde el negocio decide mostrar el stack por su nombre.
 * `site.ts` también queda fuera del barrido porque `BOOKING_WEBHOOK_URL`
 * contiene, por necesidad técnica, el dominio real del webhook (no es copy
 * visible — nunca se renderiza al usuario).
 */

const SCAN_ROOTS = ["src/components", "src/pages", "src/constants/content"];
const EXCLUDED_FILES = new Set(["src/constants/techStack.ts", "src/constants/techStack.test.ts"]);

const BANNED_TOOLS = [
  "n8n",
  "PostgreSQL",
  "LangChain",
  "LangGraph",
  "Supabase",
  "ManyChat",
  "Qdrant",
  "HubSpot",
  "Dokploy",
  "FastAPI",
  "FastMCP",
];
const BANNED_DOMAIN = "nucloudai.cloud";
const PRICE_PATTERN = /\$\s?\d/;

function collectFiles(root: string): string[] {
  const results: string[] = [];
  const entries = readdirSync(root);
  for (const entry of entries) {
    const full = join(root, entry);
    const rel = full.replace(/\\/g, "/");
    if (EXCLUDED_FILES.has(rel)) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (/\.(tsx?|jsx?)$/.test(entry) && !entry.endsWith(".test.ts") && !entry.endsWith(".test.tsx")) {
      results.push(full);
    }
  }
  return results;
}

const files = SCAN_ROOTS.flatMap((root) => collectFiles(root));

describe("copy de negocio", () => {
  it("escanea al menos un archivo (evita falsos positivos por rutas rotas)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("no nombra herramientas internas ni nucloudai.cloud, ni muestra precios: %s", (file) => {
    const content = readFileSync(file, "utf-8");
    for (const tool of BANNED_TOOLS) {
      const pattern = new RegExp(`\\b${tool}\\b`, "i");
      expect(pattern.test(content), `${file} nombra la herramienta interna "${tool}"`).toBe(false);
    }
    expect(content.includes(BANNED_DOMAIN), `${file} menciona "${BANNED_DOMAIN}"`).toBe(false);
    expect(PRICE_PATTERN.test(content), `${file} parece mostrar un precio`).toBe(false);
  });
});
