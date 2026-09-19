import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Niches } from "@/components/sections/Niches";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { TechStackLazy } from "@/components/sections/TechStackLazy";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Página principal: compone las secciones como vista general, en el orden
 * narrativo del rediseño. El chrome (Navbar, Footer, drawer, WhatsApp) vive
 * en Layout.
 */
export function Home() {
  useDocumentTitle("NUCLOUD — Automatización con IA, desarrollo y cloud para empresas");

  return (
    <>
      <Hero />
      <Manifesto />
      <Services detailTo="/servicios" />
      <Niches />
      <Process detailTo="/proceso" />
      <Benefits detailTo="/beneficios" />
      <TechStackLazy />
      <About detailTo="/nosotros" />
      <FAQ detailTo="/faq" />
      <FinalCTA />
      <Contact />
    </>
  );
}
