export type BirdId = 'chicks' | 'grower' | 'mature';

export type BirdType = {
  id: BirdId;
  name: string;
  description: string;
  image: {
    id: string;
    src: string;
    width: number;
    height: number;
    hint: string;
  };
  bookingFeePerUnit: number;
};

export interface BookingData {
  birdType: BirdId | null;
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
  fullName: string;
  phone: string;
  location: string;
  birdType: BirdId;
  quantity: number;
  bookingFee: number;
  agentId?: string;
  status: BookingStatus;
  managerNote?: string;
  expectedDate?: string;
  createdAt: string;
  customerAvatar: string;
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
