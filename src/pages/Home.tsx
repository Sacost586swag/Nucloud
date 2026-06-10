import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

/** Página única que compone todas las secciones de la web de NUCLOUD. */
export function Home() {
  return (
    <div className="grain relative min-h-screen bg-ink">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Process />
        <Benefits />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
