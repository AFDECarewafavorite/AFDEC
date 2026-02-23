
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, Booking } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateBookingFee(product: Product | undefined, quantity: number): number {
  if (!product) {
    return 0;
  }
  // All Amo chicks in this model have 0 booking fee (Free Booking)
  return 0;
}

// Commission logic: Partner earns ₦50 per chick successfully sold/delivered
export const calculateCommission = (bookingFee: number, quantity: number = 1) => {
  // If we are passing quantity, use the ₦50 per chick rule. 
  // If only bookingFee is passed (old logic), we fallback to ₦50 per estimated bird.
  return quantity * 50;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};
