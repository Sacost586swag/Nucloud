import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Home } from "@/pages/Home";
import { ServiciosPage } from "@/pages/ServiciosPage";
import { ProcesoPage } from "@/pages/ProcesoPage";
import { BeneficiosPage } from "@/pages/BeneficiosPage";
import { NosotrosPage } from "@/pages/NosotrosPage";
import { FaqPage } from "@/pages/FaqPage";
import { ContactoPage } from "@/pages/ContactoPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { EmbeddedWhatsAppPage } from "@/pages/EmbeddedWhatsAppPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Página oculta, sin el chrome del sitio (Navbar/Footer/drawer):
            enlace personalizado por cliente para el Embedded Signup de Meta. */}
        <Route path="embedded-whatsapp" element={<EmbeddedWhatsAppPage />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<ServiciosPage />} />
          <Route path="proceso" element={<ProcesoPage />} />
          <Route path="beneficios" element={<BeneficiosPage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
