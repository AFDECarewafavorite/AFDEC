import { Suspense } from 'react';
import BookingForm from '@/components/booking/booking-form';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


function BookingPageSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 px-4">
      <div className="space-y-8">
        {/* Step Indicator Skeleton */}
        <div className="flex space-x-4 md:space-x-8">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-full bg-border" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-full bg-border" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-full bg-border" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="space-y-4 text-center">
                <Loader className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading Booking Form...</p>
            </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Skeleton className="h-11 w-24" />
          <Skeleton className="h-11 w-24" />
        </div>
      </div>
    </div>
  );
}


export default function BookingPage() {
  return (
    <Suspense fallback={<BookingPageSkeleton />}>
      <BookingForm />
    </Suspense>
  );
}
