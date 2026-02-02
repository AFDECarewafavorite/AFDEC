import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ConfirmationProps {
  bookingId: string;
  phone: string;
}

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 h-5 w-5"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );

export default function Confirmation({ bookingId, phone }: ConfirmationProps) {
  const businessPhoneNumber = '2348000000000'; // Replace with actual business WhatsApp number
  const message = `Hello AFDEC, I have just completed a booking with ID: ${bookingId}. My phone number is ${phone}.`;
  const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="container mx-auto max-w-2xl py-12 md:py-24 px-4 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full">
        <CardContent className="p-8 md:p-12 text-center">
          <CheckCircle className="h-20 w-20 text-accent mx-auto" />
          <h1 className="mt-6 text-3xl md:text-4xl font-bold font-headline text-primary">
            Booking Confirmed!
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Thank you for your booking. Your booking ID is:
          </p>
          <div className="my-6 bg-card-foreground/5 dark:bg-black/20 inline-block px-6 py-3 rounded-lg border border-dashed border-border">
            <p className="text-2xl md:text-3xl font-bold tracking-widest font-mono text-primary">
              {bookingId}
            </p>
          </div>
          <p className="text-foreground/70">
            A manager will call you soon on{' '}
            <span className="font-bold text-foreground">{phone}</span> to finalize the details of your
            collection date and balance payment.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon/>
                Message us on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
