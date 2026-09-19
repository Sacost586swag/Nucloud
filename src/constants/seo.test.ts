import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { FAQS } from "./content/faq";

/** T089: el FAQPage JSON-LD embebido en index.html debe coincidir 1:1 con FAQS. */
function readFaqPageJsonLd(): { mainEntity: { name: string; acceptedAnswer: { text: string } }[] } {
  const html = readFileSync("index.html", "utf-8");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, raw] of scripts) {
    const json = JSON.parse(raw);
    if (json["@type"] === "FAQPage") return json;
  }
  throw new Error("No se encontró un bloque JSON-LD de tipo FAQPage en index.html");
}

describe("SEO: FAQPage JSON-LD ↔ faq.ts", () => {
  const faqPage = readFaqPageJsonLd();

  it("tiene la misma cantidad de preguntas que FAQS", () => {
    expect(faqPage.mainEntity.length).toBe(FAQS.length);
  });

  it.each(FAQS.map((faq, i) => [i, faq] as const))("pregunta %i coincide en texto y respuesta", (i, faq) => {
    const entry = faqPage.mainEntity[i];
    expect(entry.name).toBe(faq.question);
    expect(entry.acceptedAnswer.text).toBe(faq.answer);
  });
});
