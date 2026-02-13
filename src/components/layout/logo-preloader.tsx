"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

export default function LogoPreloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // The preloader will be visible for 0.8 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black z-[99] transition-opacity duration-500 ease-in-out",
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      aria-hidden={isLoaded}
    >
      <div className="animate-logo flex flex-col items-center gap-4">
        <Logo
            width={150}
            height={150}
        />
        <p className="text-2xl text-primary drop-shadow-[0_0_10px_gold] font-headline">AFDEC</p>
      </div>
    </div>
  );
}
