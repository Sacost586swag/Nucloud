import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SideDrawer } from "@/components/layout/SideDrawer";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { RouteScrollManager } from "@/motion/RouteScrollManager";

/**
 * Chrome compartido por todas las rutas (salvo /embedded-whatsapp, que vive
 * fuera de este árbol — Principio V): scroll suave (Lenis), atmósfera de
 * fondo, Navbar + drawer lateral, contenido (Outlet), Footer y botón
 * flotante de WhatsApp. Es dueño del estado del drawer.
 *
 * La atmósfera va en `z-0` (fija) y todo el contenido en una capa
 * `relative z-10` por encima.
 */
export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <SmoothScroll>
      <RouteScrollManager />
      <div className="relative min-h-screen overflow-x-clip">
        <Atmosphere />
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
    </SmoothScroll>
  );
}
