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
    id: 'agrited-chicks',
    name: 'Agrited (Ross 308)',
    description: 'Known for very fast growth and high meat yield. A premium choice for many farmers.',
    image: {
      id: 'chick',
      src: chickImage?.imageUrl || 'https://picsum.photos/seed/chick/600/400',
      width: 600,
      height: 400,
      hint: 'chick',
    },
    bookingFeePerUnit: 155,
    pricePerUnit: 1460,
    maturity: '5-6 weeks',
  },
  {
    id: 'zartech-chicks',
    name: 'Zartech (Cobb 500)',
    description: 'A robust and efficient bird with great performance and feed conversion.',
    image: {
      id: 'chick',
      src: chickImage?.imageUrl || 'https://picsum.photos/seed/chick2/600/400',
      width: 600,
      height: 400,
      hint: 'chick',
    },
    bookingFeePerUnit: 145,
    pricePerUnit: 1415,
    maturity: '6 weeks',
  },
  {
    id: 'grower',
    name: 'Grower Chickens',
    description: 'Healthy 4-week old broilers, already past the delicate stage. Average weight of 1.5kg.',
    image: {
      id: 'grower',
      src: growerImage?.imageUrl || 'https://picsum.photos/seed/grower/600/400',
      width: 600,
      height: 400,
      hint: 'young chicken',
    },
    bookingFeePerUnit: 400,
    pricePerUnit: 2500,
    maturity: 'Ready in 2-3 weeks',
  },
  {
    id: 'mature',
    name: 'Mature Broilers',
    description: '6-week old broilers ready for market, weighing over 2.5kg. Also includes options for Noiler and local breeds.',
    image: {
      id: 'mature',
      src: matureImage?.imageUrl || 'https://picsum.photos/seed/mature/600/400',
      width: 600,
      height: 400,
      hint: 'rooster',
    },
    bookingFeePerUnit: 750,
    pricePerUnit: 4500,
    maturity: 'Ready for market',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'BK-001',
    customerId: 'CUST-001',
    fullName: 'Adekunle Gold',
    phone: '08012345678',
    location: 'Lagos, Ikeja',
    birdType: 'agrited-chicks',
    quantity: 50,
    bookingFee: 7500,
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
    bookingFee: 8000,
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
    bookingFee: 11250,
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
    birdType: 'zartech-chicks',
    quantity: 100,
    bookingFee: 15000,
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
