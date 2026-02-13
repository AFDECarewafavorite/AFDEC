"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

export default function LogoPreloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // The preloader will be visible for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black z-[99] transition-opacity duration-1000 ease-in-out",
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      aria-hidden={isLoaded}
    >
      <div className="animate-logo flex flex-col items-center gap-4">
        <Logo
            iconContainerClassName="bg-transparent p-0"
            iconClassName="w-24 h-24 text-primary drop-shadow-[0_0_20px_gold]"
            textClassName="text-5xl text-primary drop-shadow-[0_0_20px_gold]"
        />
      </div>
    </div>
  );
}
