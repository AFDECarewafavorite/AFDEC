import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateBookingFee(product: Product | undefined, quantity: number): number {
  if (!product) {
    return 0;
  }

  const isChick = product.category === 'chick';

  if (isChick && quantity > 0 && quantity <= 8) {
    // Flat fee of 300 for up to 8 chicks
    return 300;
  }
  
  // Per-unit fee for more than 8 chicks or for other bird types
  return product.bookingFeePerUnit * quantity;
}

// Commission logic based on proposal
export const calculateCommission = (bookingFee: number) => {
  if (bookingFee <= 500) return 200;
  if (bookingFee > 500 && bookingFee <= 1000) return 350;
  return bookingFee * 0.1; // 10% for higher value bookings as an example
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

    