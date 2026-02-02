'use client';

import BookingsTable from './components/bookings-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingBag, Users } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collectionGroup, query, orderBy } from 'firebase/firestore';
import type { Booking } from '@/lib/types';
import { BookingsTableSkeleton } from './components/bookings-table-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
  const firestore = useFirestore();

  const bookingsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collectionGroup(firestore, 'bookings'), orderBy('createdAt', 'desc'))
        : null,
    [firestore]
  );

  const { data: bookings, isLoading } = useCollection<Booking>(bookingsQuery);

  const totalRevenue = bookings
    ?.reduce((acc, b) => acc + b.bookingFee, 0)
    .toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });
  const totalBookings = bookings?.length ?? 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage all bookings and agents from here.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-32" /> : totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              From booking fees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-12" /> : `+${totalBookings}`}</div>
            <p className="text-xs text-muted-foreground">
              Across all statuses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2</div>
            <p className="text-xs text-muted-foreground">
              With recent referrals
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading && <BookingsTableSkeleton />}
            {!isLoading && bookings && <BookingsTable bookings={bookings} />}
            {!isLoading && !bookings?.length && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12" />
                <p className="mt-4">No bookings found.</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
