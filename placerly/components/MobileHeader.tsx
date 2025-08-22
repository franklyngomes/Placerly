"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";

export function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ensure window logic runs only on client
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <>
      {/* Top Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="h-14 flex items-center justify-between px-4">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/5 outline outline-white/10"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="h-12 w-12 flex items-center justify-center">
              <Image
                src="/logoPlacerly.svg"
                width={60}
                height={60}
                sizes="100vw"
                alt="Logo"
              />
            </div>
            <span className="text-[13px] text-neutral-300">Placerly</span>
          </div>

          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
            alt="Alex Morgan"
            className="h-8 w-8 rounded-full ring-1 ring-white/10 object-cover"
          />
        </div>
      </div>

      {/* Sidebar + Overlay */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <button
            aria-label="Close sidebar overlay"
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden"
          />
          {/* Sidebar */}
          <Sidebar
            id="mobile-sidebar"
            className="fixed z-50 inset-y-0 left-0 w-72 lg:hidden"
            onNavigate={closeSidebar}
            onClose={closeSidebar}
          />
        </>
      )}
    </>
  );
}
