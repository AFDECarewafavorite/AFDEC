import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BirdType } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateBookingFee(bird: BirdType | undefined, quantity: number): number {
  if (!bird) {
    return 0;
  }

  const isChick = bird.id.includes('chick');

  if (isChick && quantity > 0 && quantity <= 8) {
    // Flat fee of 300 for up to 8 chicks
    return 300;
  }
  
  // Per-unit fee for more than 8 chicks or for other bird types
  return bird.bookingFeePerUnit * quantity;
}
