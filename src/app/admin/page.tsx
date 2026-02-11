'use client';

import BookingsTable from './components/bookings-table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DollarSign, ShoppingBag, Users, ShieldAlert, Package } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc } from '@/firebase';
import { collectionGroup, query, orderBy, doc } from 'firebase/firestore';
import type { Booking } from '@/lib/types';
import { BookingsTableSkeleton } from './components/bookings-table-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();

  // Check if the user has an admin role document.
  const adminRoleRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'roles_admin', user.uid) : null),
    [firestore, user]
  );
  const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);

  const isUserAdmin = !!adminRole;
  const isAuthorizing = isAuthLoading || (user && isAdminRoleLoading);

  // Redirect non-logged-in users.
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  const bookingsQuery = useMemoFirebase(
    () =>
      // Only build query if user is a confirmed admin
      (firestore && isUserAdmin)
        ? query(collectionGroup(firestore, 'bookings'), orderBy('createdAt', 'desc'))
        : null,
    [firestore, isUserAdmin]
  );

  const { data: bookings, isLoading: areBookingsLoading, error: bookingsError } = useCollection<Booking>(bookingsQuery);

  // Show Access Denied for non-admins
  if (!isAuthorizing && user && !isUserAdmin) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">Access Denied</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                You do not have the necessary permissions to view this page.
            </p>
            <p className="text-sm text-muted-foreground">
                Please sign in as an administrator.
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/login">Go to Login</Link>
            </Button>
        </div>
    )
  }

  if (bookingsError) {
    // This will now only trigger for actual errors during the bookings fetch for an admin.
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">Error Fetching Data</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Could not load bookings. There might be a network issue or a problem with the query.
            </p>
             <p className="text-sm text-muted-foreground max-w-md">
                <code>{bookingsError.message}</code>
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/">Return to Homepage</Link>
            </Button>
        </div>
    )
  }

  // Show loading skeleton if authorizing OR if we are an admin and bookings are loading
  const showLoading = isAuthorizing || (isUserAdmin && areBookingsLoading);

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showLoading ? <Skeleton className="h-8 w-32" /> : totalRevenue}</div>
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
            <div className="text-2xl font-bold">{showLoading ? <Skeleton className="h-8 w-12" /> : `+${totalBookings}`}</div>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <p className="text-xs text-muted-foreground mb-2">
                Add, edit, and control available birds for booking.
              </p>
              <Button asChild size="sm">
                <Link href="/admin/products">Go to Products</Link>
              </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
            {showLoading && <BookingsTableSkeleton />}
            {!showLoading && bookings && <BookingsTable bookings={bookings} />}
            {!showLoading && !bookings?.length && (
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

