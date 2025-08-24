import Image from "next/image";
import React from "react";
import GridShape from "@/components/ui/GridShape";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  text-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape/>
              <div className="flex flex-col items-center max-w-xs">
                  <Image
                    width={150}
                    height={90}
                    src="/logoPlacerly.svg"
                    alt="Logo"
                  />
                <p className="text-center text-gray-900">
                 Managing your wealth made simple!
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
