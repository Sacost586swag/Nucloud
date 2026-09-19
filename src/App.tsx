import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RouteLoader } from "@/components/layout/RouteLoader";
import { Home } from "@/pages/Home";
import { EmbeddedWhatsAppPage } from "@/pages/EmbeddedWhatsAppPage";

const ServiciosPage = lazy(() => import("@/pages/ServiciosPage").then((m) => ({ default: m.ServiciosPage })));
const ProcesoPage = lazy(() => import("@/pages/ProcesoPage").then((m) => ({ default: m.ProcesoPage })));
const BeneficiosPage = lazy(() => import("@/pages/BeneficiosPage").then((m) => ({ default: m.BeneficiosPage })));
const NosotrosPage = lazy(() => import("@/pages/NosotrosPage").then((m) => ({ default: m.NosotrosPage })));
const FaqPage = lazy(() => import("@/pages/FaqPage").then((m) => ({ default: m.FaqPage })));
const ContactoPage = lazy(() => import("@/pages/ContactoPage").then((m) => ({ default: m.ContactoPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export default function App() {
  return (
    <>
      <Routes>
        {/* Página oculta, sin el chrome del sitio (Navbar/Footer/drawer):
            enlace personalizado por cliente para el Embedded Signup de Meta.
            No es lazy — su archivo y comportamiento no cambian. */}
        <Route path="embedded-whatsapp" element={<EmbeddedWhatsAppPage />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="servicios"
            element={
              <Suspense fallback={<RouteLoader />}>
                <ServiciosPage />
              </Suspense>
            }
          />
          <Route
            path="proceso"
            element={
              <Suspense fallback={<RouteLoader />}>
                <ProcesoPage />
              </Suspense>
            }
          />
          <Route
            path="beneficios"
            element={
              <Suspense fallback={<RouteLoader />}>
                <BeneficiosPage />
              </Suspense>
            }
          />
          <Route
            path="nosotros"
            element={
              <Suspense fallback={<RouteLoader />}>
                <NosotrosPage />
              </Suspense>
            }
          />
          <Route
            path="faq"
            element={
              <Suspense fallback={<RouteLoader />}>
                <FaqPage />
              </Suspense>
            }
          />
          <Route
            path="contacto"
            element={
              <Suspense fallback={<RouteLoader />}>
                <ContactoPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
