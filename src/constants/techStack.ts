import whatsapp from "@/assets/tech/whatsapp-business-api.svg";
import instagram from "@/assets/tech/instagram-business-api.svg";
import stripe from "@/assets/tech/stripe.svg";
import hubspot from "@/assets/tech/hubspot.svg";
import googleCloud from "@/assets/tech/google-cloud.svg";
import slack from "@/assets/tech/slack.svg";
import openai from "@/assets/tech/openai.svg";
import anthropic from "@/assets/tech/anthropic.svg";
import gemini from "@/assets/tech/gemini.svg";
import meta from "@/assets/tech/meta.svg";
import langgraph from "@/assets/tech/langgraph.svg";
import langchain from "@/assets/tech/langchain.svg";
import hermesAgent from "@/assets/tech/hermes-agent.png";
import python from "@/assets/tech/python.svg";
import pytorch from "@/assets/tech/pytorch.svg";
import huggingface from "@/assets/tech/huggingface.svg";
import fastapi from "@/assets/tech/fastapi.svg";
import fastmcp from "@/assets/tech/fastmcp.svg";
import react from "@/assets/tech/react.svg";
import javascript from "@/assets/tech/javascript.svg";
import typescript from "@/assets/tech/typescript.svg";
import tailwindcss from "@/assets/tech/tailwind-css.svg";
import postgresql from "@/assets/tech/postgresql.svg";
import qdrant from "@/assets/tech/qdrant.svg";
import redis from "@/assets/tech/redis.svg";
import supabase from "@/assets/tech/supabase.svg";
import neon from "@/assets/tech/neon.svg";
import airtable from "@/assets/tech/airtable.svg";
import docker from "@/assets/tech/docker.svg";
import dokploy from "@/assets/tech/dokploy.svg";
import aws from "@/assets/tech/aws.svg";
import n8n from "@/assets/tech/n8n.svg";
import claudeCode from "@/assets/tech/claude-code.svg";
import kiro from "@/assets/tech/kiro.svg";
import antigravity from "@/assets/tech/antigravity.svg";
import cloudflare from "@/assets/tech/cloudflare.svg";
import sentry from "@/assets/tech/sentry.svg";
import traefik from "@/assets/tech/traefik.svg";
import letsEncrypt from "@/assets/tech/lets-encrypt.svg";

export type TechCategory =
  | "Integraciones"
  | "LLMs"
  | "Orquestación"
  | "ML"
  | "Base de Datos y RAG"
  | "DevOps"
  | "Automatización"
  | "Red y Seguridad";

export const TECH_CATEGORIES: TechCategory[] = [
  "Integraciones",
  "LLMs",
  "Orquestación",
  "ML",
  "Base de Datos y RAG",
  "DevOps",
  "Automatización",
  "Red y Seguridad",
];

export interface TechItem {
  id: string;
  nombre: string;
  categoria: TechCategory;
  /**
   * Los SVG/PNG traen su color de marca embebido y se muestran siempre a ese
   * color, sobre una placa clara (así se leen también los logos oscuros).
   * `fallback` activa la tile tipográfica de respaldo cuando no hay logo
   * vectorial/transparente disponible (ver SOURCES.md) — hoy es el caso de
   * GoHighLevel.
   */
  logo: { tipo: "svg" | "png"; ruta: string } | { tipo: "fallback" };
}

export const TECH_ITEMS: TechItem[] = [
  // Integraciones
  { id: "whatsapp-business-api", nombre: "WhatsApp Business API", categoria: "Integraciones", logo: { tipo: "svg", ruta: whatsapp } },
  { id: "instagram-business-api", nombre: "Instagram Business API", categoria: "Integraciones", logo: { tipo: "svg", ruta: instagram } },
  { id: "stripe", nombre: "Stripe", categoria: "Integraciones", logo: { tipo: "svg", ruta: stripe } },
  { id: "hubspot", nombre: "HubSpot", categoria: "Integraciones", logo: { tipo: "svg", ruta: hubspot } },
  { id: "google-cloud-int", nombre: "Google Cloud", categoria: "Integraciones", logo: { tipo: "svg", ruta: googleCloud } },
  { id: "gohighlevel", nombre: "GoHighLevel", categoria: "Integraciones", logo: { tipo: "fallback" } },
  { id: "slack", nombre: "Slack", categoria: "Integraciones", logo: { tipo: "svg", ruta: slack } },
  // LLMs
  { id: "openai", nombre: "OpenAI", categoria: "LLMs", logo: { tipo: "svg", ruta: openai } },
  { id: "anthropic", nombre: "Anthropic", categoria: "LLMs", logo: { tipo: "svg", ruta: anthropic } },
  { id: "gemini", nombre: "Gemini", categoria: "LLMs", logo: { tipo: "svg", ruta: gemini } },
  { id: "meta", nombre: "Meta", categoria: "LLMs", logo: { tipo: "svg", ruta: meta } },
  // Orquestación
  { id: "langgraph", nombre: "LangGraph", categoria: "Orquestación", logo: { tipo: "svg", ruta: langgraph } },
  { id: "langchain", nombre: "LangChain", categoria: "Orquestación", logo: { tipo: "svg", ruta: langchain } },
  { id: "hermes-agent", nombre: "Hermes Agent", categoria: "Orquestación", logo: { tipo: "png", ruta: hermesAgent } },
  // ML
  { id: "python", nombre: "Python", categoria: "ML", logo: { tipo: "svg", ruta: python } },
  { id: "pytorch", nombre: "PyTorch", categoria: "ML", logo: { tipo: "svg", ruta: pytorch } },
  { id: "huggingface", nombre: "Hugging Face", categoria: "ML", logo: { tipo: "svg", ruta: huggingface } },
  { id: "fastapi", nombre: "FastAPI", categoria: "ML", logo: { tipo: "svg", ruta: fastapi } },
  { id: "fastmcp", nombre: "FastMCP", categoria: "ML", logo: { tipo: "svg", ruta: fastmcp } },
  { id: "react", nombre: "React", categoria: "ML", logo: { tipo: "svg", ruta: react } },
  { id: "javascript", nombre: "JavaScript", categoria: "ML", logo: { tipo: "svg", ruta: javascript } },
  { id: "typescript", nombre: "TypeScript", categoria: "ML", logo: { tipo: "svg", ruta: typescript } },
  { id: "tailwindcss", nombre: "Tailwind CSS", categoria: "ML", logo: { tipo: "svg", ruta: tailwindcss } },
  // Base de Datos y RAG
  { id: "postgresql", nombre: "PostgreSQL", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: postgresql } },
  { id: "qdrant", nombre: "Qdrant", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: qdrant } },
  { id: "redis", nombre: "Redis", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: redis } },
  { id: "supabase", nombre: "Supabase", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: supabase } },
  { id: "neon", nombre: "Neon", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: neon } },
  { id: "airtable", nombre: "Airtable", categoria: "Base de Datos y RAG", logo: { tipo: "svg", ruta: airtable } },
  // DevOps
  { id: "google-cloud-devops", nombre: "Google Cloud", categoria: "DevOps", logo: { tipo: "svg", ruta: googleCloud } },
  { id: "docker", nombre: "Docker", categoria: "DevOps", logo: { tipo: "svg", ruta: docker } },
  { id: "dokploy", nombre: "Dokploy", categoria: "DevOps", logo: { tipo: "svg", ruta: dokploy } },
  { id: "aws", nombre: "AWS", categoria: "DevOps", logo: { tipo: "svg", ruta: aws } },
  // Automatización
  { id: "n8n", nombre: "n8n", categoria: "Automatización", logo: { tipo: "svg", ruta: n8n } },
  { id: "claude-code", nombre: "Claude Code", categoria: "Automatización", logo: { tipo: "svg", ruta: claudeCode } },
  { id: "kiro", nombre: "Kiro", categoria: "Automatización", logo: { tipo: "svg", ruta: kiro } },
  { id: "antigravity", nombre: "Antigravity", categoria: "Automatización", logo: { tipo: "svg", ruta: antigravity } },
  // Red y Seguridad
  { id: "cloudflare", nombre: "Cloudflare", categoria: "Red y Seguridad", logo: { tipo: "svg", ruta: cloudflare } },
  { id: "sentry", nombre: "Sentry", categoria: "Red y Seguridad", logo: { tipo: "svg", ruta: sentry } },
  { id: "traefik", nombre: "Traefik", categoria: "Red y Seguridad", logo: { tipo: "svg", ruta: traefik } },
  { id: "lets-encrypt", nombre: "Let's Encrypt", categoria: "Red y Seguridad", logo: { tipo: "svg", ruta: letsEncrypt } },
];

export function getTechByCategory(categoria: TechCategory): TechItem[] {
  return TECH_ITEMS.filter((item) => item.categoria === categoria);
}
