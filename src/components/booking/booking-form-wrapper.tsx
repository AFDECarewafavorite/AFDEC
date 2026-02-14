'use client';

import { useSearchParams } from 'next/navigation';
import BookingForm from './booking-form';

export default function BookingFormWrapper() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  return <BookingForm initialReferralCode={refCode} />;
}
