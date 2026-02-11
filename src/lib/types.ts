import type { Timestamp, FieldValue } from 'firebase/firestore';

export type ProductId = string;

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  category: 'chick' | 'grower' | 'mature';
  imageUrl: string;
  imageHint: string;
  imageWidth: number;
  imageHeight: number;
  bookingFeePerUnit: number;
  pricePerUnit: number;
  maturity?: string;
  isActive: boolean;
}

export interface BookingData {
  birdType: ProductId | null;
  quantity: number;
  fullName: string;
  phone: string;
  location: string;
  referralCode: string;
}

export type BookingStatus = 'pending' | 'called' | 'allocated' | 'completed';

export interface Booking {
  id: string;
  customerId: string;
  fullName:string;
  phone: string;
  location: string;
  birdType: ProductId;
  quantity: number;
  bookingFee: number;
  agentId?: string;
  status: BookingStatus;
  managerNote?: string;
  expectedDate?: string;
  createdAt: Timestamp | FieldValue | string;
  customerAvatar?: string;
}

export interface Agent {
  id: string;
  userId: string;
  name: string;
  referralCode: string;
  totalCommission: number;
  availableBalance: number;
  totalBookings: number;
}

