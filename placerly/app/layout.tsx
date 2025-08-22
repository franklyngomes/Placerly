import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Financial Dashboard App",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="min-h-screen w-full flex bg-neutral-950 text-neutral-100">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />

        {/* Main Content */}
        <main className="flex-1 md:pl-0 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-8">
            {children}
            <div className="h-24" />
          </div>
        </main>

        {/* Mobile Header */}
        <MobileHeader/>
      </body>
    </html>
  );
}

