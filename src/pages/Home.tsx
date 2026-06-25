import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Página principal: compone las secciones como vista general. El chrome
 *  (Navbar, Footer, drawer, WhatsApp) vive en Layout. */
export function Home() {
  useDocumentTitle(
    "NUCLOUD — Automatización con IA, desarrollo y cloud para empresas"
  );

  return (
    <>
      <Hero />
      <TechMarquee />
      <Services detailTo="/servicios" />
      <Process detailTo="/proceso" />
      <Benefits detailTo="/beneficios" />
      <About detailTo="/nosotros" />
      <FAQ detailTo="/faq" />
      <FinalCTA />
      <Contact />
    </>
  );
}
