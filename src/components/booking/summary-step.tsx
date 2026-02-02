import Image from 'next/image';
import type { BookingData, BirdType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface SummaryStepProps {
  bookingData: BookingData;
  bird: BirdType | undefined;
}

export default function SummaryStep({ bookingData, bird }: SummaryStepProps) {
  if (!bird) {
    return <div>Error: Bird type not selected.</div>;
  }

  const bookingFee = bird.bookingFeePerUnit * bookingData.quantity;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        Step 4: Booking Summary
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        Please review your booking details before proceeding to payment.
      </p>
      <Card className="mt-8 text-left">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Image
              src={bird.image.src}
              alt={bird.name}
              width={150}
              height={100}
              className="rounded-lg object-cover w-full md:w-[150px]"
              data-ai-hint={bird.image.hint}
            />
            <div className="flex-1">
              <CardTitle className="font-headline text-2xl">{bird.name}</CardTitle>
              <div className="text-4xl font-bold mt-2">
                x {bookingData.quantity}
              </div>
            </div>
            <div className="text-right w-full md:w-auto">
              <p className="text-muted-foreground">Booking Fee</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(bookingFee)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t border-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-semibold text-lg">{bookingData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-semibold text-lg">{bookingData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold text-lg">{bookingData.location}</p>
            </div>
            {bookingData.referralCode && (
              <div>
                <p className="text-sm text-muted-foreground">Referral Code</p>
                <p className="font-semibold text-lg">{bookingData.referralCode}</p>
              </div>
            )}
          </div>
          <Alert className="bg-primary/10 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="font-bold text-primary">Please Note!</AlertTitle>
            <AlertDescription>
              Booking does not mean instant delivery. A manager will call you on{' '}
              <span className="font-bold">{bookingData.phone}</span> to confirm
              your collection date and the balance to be paid.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
