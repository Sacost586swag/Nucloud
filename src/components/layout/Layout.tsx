import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SideDrawer } from "@/components/layout/SideDrawer";
import { BackgroundVideo } from "@/components/layout/BackgroundVideo";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

/**
 * Chrome compartido por todas las rutas: fondo de vídeo dirigido por scroll,
 * Navbar + drawer lateral, contenido (Outlet), Footer y botón flotante de
 * WhatsApp. Es dueño del estado del drawer.
 *
 * El fondo va en `z-0` (fijo) y todo el contenido en una capa `relative z-10`
 * por encima; el `body` pinta `#050505` como fallback.
 */
export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="grain relative min-h-screen">
      <BackgroundVideo />
      <div className="relative z-10">
        <Navbar onMenuClick={() => setDrawerOpen(true)} />
        <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <main>
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
