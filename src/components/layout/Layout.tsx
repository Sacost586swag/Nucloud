import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SideDrawer } from "@/components/layout/SideDrawer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

/**
 * Chrome compartido por todas las rutas: Navbar + drawer lateral, contenido
 * (Outlet), Footer y botón flotante de WhatsApp. Es dueño del estado del drawer.
 */
export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="grain relative min-h-screen bg-ink">
      <Navbar onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
