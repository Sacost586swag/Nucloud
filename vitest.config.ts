import { defineConfig } from "vitest/config";
import path from "path";

/**
 * Config separada de vite.config.ts: solo se testea lógica pura (agenda,
 * coherencia de copy/SEO) sin DOM — ver research.md §7. No se instala
 * Testing Library ni entorno jsdom.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
