"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
      <div className="animate-logo">
        <Image
          src="/logo.png"
          alt="AFDEC Logo"
          width={250}
          height={250}
          priority // Prioritize loading of the logo
          className="drop-shadow-[0_0_20px_gold]"
        />
      </div>
    </div>
  );
}
