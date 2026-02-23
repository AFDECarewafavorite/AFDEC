import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Profit Calculation Logic:
 * - Each carton has 50 chicks.
 * - Minimum Profit: ₦4,000 per carton -> ₦80 per chick.
 * - Delivery Fee: ₦2,000 per carton -> ₦40 per chick.
 */
const PROFIT_PER_UNIT = 80; 
const DELIVERY_FEE_PER_UNIT = 40;

export function calculateBookingFee(product: Product | undefined, quantity: number): number {
  if (!product) return 0;
  // AFDEC model: Booking is free. Payment is on delivery.
  return 0;
}

export function calculateTotalPrice(product: Product | undefined, quantity: number, isDelivery: boolean = true): number {
  if (!product) return 0;
  
  const baseTotal = product.pricePerUnit * quantity;
  const profitTotal = PROFIT_PER_UNIT * quantity;
  const deliveryTotal = isDelivery ? (DELIVERY_FEE_PER_UNIT * quantity) : 0;
  
  return baseTotal + profitTotal + deliveryTotal;
}

// Commission logic: Partner earns ₦50 per chick successfully sold/delivered
export const calculateCommission = (bookingFee: number, quantity: number = 1) => {
  return quantity * 50;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};
