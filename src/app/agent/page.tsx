'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, DollarSign, ShoppingBag, Users, ShieldAlert } from 'lucide-react';
import AgentDashboardLayout from './components/agent-dashboard-layout';
import { useUser, useDoc, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Agent, Booking } from '@/lib/types';
import { doc, query, collectionGroup, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function AgentDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const agentRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'agents', user.uid) : null),
    [firestore, user]
  );
  const { data: agent, isLoading: isAgentLoading, error: agentError } = useDoc<Agent>(agentRef);

  const referredBookingsQuery = useMemoFirebase(
    () =>
      firestore && user
        ? query(collectionGroup(firestore, 'bookings'), where('agentId', '==', user.uid))
        : null,
    [firestore, user]
  );
  const { data: bookings, isLoading: areBookingsLoading, error: bookingsError } = useCollection<Booking>(referredBookingsQuery);

  const isLoading = isUserLoading || isAgentLoading || areBookingsLoading;
  const hasError = agentError || bookingsError;

  if (hasError) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">Access Denied</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                You do not have permission to view this page or an error occurred.
            </p>
            <p className="text-sm text-muted-foreground">
                Ensure you are signed in as an agent. Contact an administrator if you believe this is an error.
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/">Return to Homepage</Link>
            </Button>
        </div>
    )
  }

  const referralLink = `https://afdec.online/book?ref=${agent?.referralCode || ''}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Agent Portal
        </h1>
        {isLoading ? (
            <Skeleton className="h-5 w-48 mt-2" />
        ) : (
            <p className="text-muted-foreground">
            Welcome back, {agent?.name || 'Agent'}. Here's your referral dashboard.
            </p>
        )}
      </header>
      
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link or your code to earn commissions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {isLoading ? (
                <Skeleton className="h-10 flex-1" />
            ) : (
                <div className="flex-1 bg-muted/50 p-3 rounded-md font-mono text-sm break-all">
                    {referralLink}
                </div>
            )}
            <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{formatCurrency(agent?.availableBalance || 0)}</div>}
                <Button size="sm" className="mt-2" disabled={isLoading || (agent?.availableBalance || 0) === 0}>Withdraw</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{formatCurrency(agent?.totalCommission || 0)}</div>}
                <p className="text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-12" /> : <div className="text-2xl font-bold">+{bookings?.length || 0}</div>}
                <p className="text-xs text-muted-foreground">From your referrals</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Code</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold font-mono tracking-wider">{agent?.referralCode}</div>}
                <p className="text-xs text-muted-foreground">Share this with customers</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Referral History</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            )}
            {!isLoading && bookings && bookings.length > 0 && <AgentDashboardLayout bookings={bookings} />}
            {!isLoading && (!bookings || bookings.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12" />
                <p className="mt-4">No referral bookings found yet.</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
