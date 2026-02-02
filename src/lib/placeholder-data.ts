import type { BirdType, Booking, Agent } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const chickImage = PlaceHolderImages.find((img) => img.id === 'chick');
const growerImage = PlaceHolderImages.find((img) => img.id === 'grower');
const matureImage = PlaceHolderImages.find((img) => img.id === 'mature');
const avatar1 = PlaceHolderImages.find((img) => img.id === 'avatar1');
const avatar2 = PlaceHolderImages.find((img) => img.id === 'avatar2');
const avatar3 = PlaceHolderImages.find((img) => img.id === 'avatar3');

export const BIRD_TYPES: BirdType[] = [
  {
    id: 'chicks',
    name: 'Day-Old Chicks',
    description: 'High-quality, vaccinated day-old chicks, perfect for starting your flock.',
    image: {
      id: 'chick',
      src: chickImage?.imageUrl || 'https://picsum.photos/seed/chick/600/400',
      width: 600,
      height: 400,
      hint: 'chick',
    },
    bookingFeePerUnit: 50,
  },
  {
    id: 'grower',
    name: 'Grower Chickens',
    description: 'Healthy 4-8 week old chickens, already past the delicate stage.',
    image: {
      id: 'grower',
      src: growerImage?.imageUrl || 'https://picsum.photos/seed/grower/600/400',
      width: 600,
      height: 400,
      hint: 'young chicken',
    },
    bookingFeePerUnit: 100,
  },
  {
    id: 'mature',
    name: 'Mature Chickens',
    description: 'Fully grown birds, ready for meat or egg-laying. Strong and healthy.',
    image: {
      id: 'mature',
      src: matureImage?.imageUrl || 'https://picsum.photos/seed/mature/600/400',
      width: 600,
      height: 400,
      hint: 'rooster',
    },
    bookingFeePerUnit: 200,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'BK-001',
    customerId: 'CUST-001',
    fullName: 'Adekunle Gold',
    phone: '08012345678',
    location: 'Lagos, Ikeja',
    birdType: 'chicks',
    quantity: 50,
    bookingFee: 2500,
    status: 'pending',
    createdAt: '2023-10-26T10:00:00Z',
    agentId: 'AGENT-01',
    customerAvatar: avatar1?.imageUrl || 'https://picsum.photos/seed/avatar1/100/100',
  },
  {
    id: 'BK-002',
    customerId: 'CUST-002',
    fullName: 'Chioma Okoro',
    phone: '09087654321',
    location: 'Abuja, Garki',
    birdType: 'grower',
    quantity: 20,
    bookingFee: 2000,
    status: 'called',
    createdAt: '2023-10-25T14:30:00Z',
    managerNote: 'Collection next Friday. Balance: ₦15,000',
    customerAvatar: avatar2?.imageUrl || 'https://picsum.photos/seed/avatar2/100/100',
  },
  {
    id: 'BK-003',
    customerId: 'CUST-003',
    fullName: 'Musa Ibrahim',
    phone: '07011223344',
    location: 'Kano, Fagge',
    birdType: 'mature',
    quantity: 15,
    bookingFee: 3000,
    status: 'allocated',
    createdAt: '2023-10-24T09:00:00Z',
    managerNote: 'Allocated from batch C. Pickup Saturday.',
    expectedDate: '2023-11-04',
    agentId: 'AGENT-02',
    customerAvatar: avatar3?.imageUrl || 'https://picsum.photos/seed/avatar3/100/100',
  },
  {
    id: 'BK-004',
    customerId: 'CUST-004',
    fullName: 'Funke Akindele',
    phone: '08122334455',
    location: 'Ogun, Abeokuta',
    birdType: 'chicks',
    quantity: 100,
    bookingFee: 5000,
    status: 'completed',
    createdAt: '2023-10-20T11:00:00Z',
    managerNote: 'Collected and paid in full.',
    expectedDate: '2023-10-28',
    customerAvatar: avatar1?.imageUrl || 'https://picsum.photos/seed/avatar1/100/100',
  },
];

export const mockAgent: Agent = {
  id: 'AGENT-01',
  userId: 'USER-AGENT-01',
  name: 'Bayo Adebayo',
  referralCode: 'BAYO25',
  totalCommission: 45000,
  availableBalance: 12500,
  totalBookings: 25,
};
