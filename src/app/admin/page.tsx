'use client';

import BookingsTable from './components/bookings-table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DollarSign, ShoppingBag, Users, ShieldAlert, Package, UserCog } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc } from '@/firebase';
import { collectionGroup, query, orderBy, doc, collection } from 'firebase/firestore';
import type { Agent, Booking, User as UserType } from '@/lib/types';
import { BookingsTableSkeleton } from './components/bookings-table-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-provider';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const { t } = useLanguage();

  const managerRoleRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'roles_manager', user.uid) : null),
    [firestore, user]
  );
  const { data: managerRole, isLoading: isManagerRoleLoading } = useDoc(managerRoleRef);

  const ceoRoleRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'roles_ceo', user.uid) : null),
    [firestore, user]
  );
  const { data: ceoRole, isLoading: isCeoRoleLoading } = useDoc(ceoRoleRef);
  
  const isUserCEO = !!ceoRole;
  const isUserPrivileged = !!managerRole || !!ceoRole;
  const isAuthorizing = isAuthLoading || (user && (isManagerRoleLoading || isCeoRoleLoading));

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  const bookingsQuery = useMemoFirebase(
    () =>
      (firestore && isUserPrivileged)
        ? query(collectionGroup(firestore, 'bookings'), orderBy('createdAt', 'desc'))
        : null,
    [firestore, isUserPrivileged]
  );

  const { data: bookings, isLoading: areBookingsLoading, error: bookingsError } = useCollection<Booking>(bookingsQuery);
  
  const agentsQuery = useMemoFirebase(
    () => (firestore && isUserPrivileged ? collection(firestore, 'agents') : null),
    [firestore, isUserPrivileged]
  );
  const { data: agents, isLoading: areAgentsLoading } = useCollection<Agent>(agentsQuery);

  if (!isAuthorizing && user && !isUserPrivileged) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">{t('accessDenied')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {t('accessDeniedAdmin')}
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/login">{t('goToLogin')}</Link>
            </Button>
        </div>
    )
  }

  if (bookingsError) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">{t('errorFetchingData')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {t('errorFetchingBookings')}
            </p>
             <p className="text-sm text-muted-foreground max-w-md">
                <code>{bookingsError.message}</code>
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/">{t('returnToHomepage')}</Link>
            </Button>
        </div>
    )
  }

  const showLoading = isAuthorizing || (isUserPrivileged && (areBookingsLoading || areAgentsLoading));

  const totalRevenue = bookings
    ?.reduce((acc, b) => acc + b.bookingFee, 0)
    .toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });
  const totalBookings = bookings?.length ?? 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">
          {isUserCEO ? t('ceoDashboard') : t('managerDashboard')}
        </h1>
        <p className="text-muted-foreground">
          {isUserCEO ? t('ceoDashboardSubtitle') : t('managerDashboardSubtitle')}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showLoading ? <Skeleton className="h-8 w-32" /> : totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              {t('fromBookingFees')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalBookings')}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showLoading ? <Skeleton className="h-8 w-12" /> : `+${totalBookings}`}</div>
            <p className="text-xs text-muted-foreground">
              {t('acrossAllStatuses')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('manageProducts')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <p className="text-xs text-muted-foreground mb-2">
                {t('manageProductsDesc')}
              </p>
              <Button asChild size="sm">
                <Link href="/admin/products">{t('goToProducts')}</Link>
              </Button>
          </CardContent>
        </Card>
        {isUserCEO ? (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('userManagement')}</CardTitle>
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">
                        {t('userManagementDesc')}
                    </p>
                    <Button asChild size="sm">
                        <Link href="/admin/users">{t('manageUsers')}</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('totalAgents')}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{showLoading ? <Skeleton className="h-8 w-12" /> : `+${agents?.length ?? 0}`}</div>
                    <p className="text-xs text-muted-foreground">
                    {t('registeredInSystem')}
                    </p>
                </CardContent>
            </Card>
        )}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t('allBookings')}</CardTitle>
        </CardHeader>
        <CardContent>
            {showLoading && <BookingsTableSkeleton />}
            {!showLoading && bookings && agents && <BookingsTable bookings={bookings} agents={agents} />}
            {!showLoading && !bookings?.length && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12" />
                <p className="mt-4">{t('noBookingsFound')}</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
