import React from "react";
import { Sidebar } from "@/components/placerly/Sidebar";
import { MobileHeader } from "@/components/placerly/MobileHeader";
import '../globals.css'

function Placerly() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on larger screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      
      if (sidebarOpen && overlay && event.target === overlay) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  return (
      <div className="min-h-screen w-full flex bg-neutral-950 text-neutral-100">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" onNavigate={closeSidebar} />
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            id="sidebar-overlay"
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 md:hidden"
          />
        )}
        
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <Sidebar 
            id="mobile-sidebar"
            className="fixed z-50 inset-y-0 left-0 md:hidden" 
            onNavigate={closeSidebar}
            onClose={closeSidebar}
          />
        )}

        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

      </div>
  );
}

export default Placerly;
