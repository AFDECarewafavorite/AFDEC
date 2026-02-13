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
import type { Agent, Commission } from '@/lib/types';
import { doc, query, collection, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/language-provider';

export default function AgentDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { t } = useLanguage();

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
  
  const isUserAgent = !!agent;

  const commissionsQuery = useMemoFirebase(
    () =>
      (firestore && user && isUserAgent)
        ? query(collection(firestore, 'agents', user.uid, 'commissions'), orderBy('createdAt', 'desc'))
        : null,
    [firestore, user, isUserAgent]
  );
  const { data: commissions, isLoading: areCommissionsLoading, error: commissionsError } = useCollection<Commission>(commissionsQuery);

  const isLoading = isUserLoading || isAgentLoading || (isUserAgent && areCommissionsLoading);
  const isAuthorizing = isUserLoading || (user && isAgentLoading);
  const hasError = agentError || commissionsError;

  if (!isAuthorizing && user && !agent) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">{t('accessDenied')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {t('accessDeniedAgent')}
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/">{t('returnToHomepage')}</Link>
            </Button>
        </div>
    )
  }

  if (hasError) {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold font-headline">{t('errorLoadingData')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {t('errorLoadingAgentData')}
            </p>
             <p className="text-sm text-muted-foreground max-w-md">
                <code>{hasError.message}</code>
            </p>
            <Button asChild variant="outline" className="mt-8">
                <Link href="/">{t('returnToHomepage')}</Link>
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
          {t('agentPortal')}
        </h1>
        {isLoading ? (
            <Skeleton className="h-5 w-48 mt-2" />
        ) : (
            <p className="text-muted-foreground">
            {t('agentPortalWelcome').replace('{agentName}', agent?.name || t('agent'))}
            </p>
        )}
      </header>
      
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>{t('yourReferralLink')}</CardTitle>
            <CardDescription>{t('referralLinkDesc')}</CardDescription>
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
                {t('copyLink')}
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('availableBalance')}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{formatCurrency(agent?.availableBalance || 0)}</div>}
                <Button size="sm" className="mt-2" disabled={isLoading || (agent?.availableBalance || 0) === 0}>{t('withdraw')}</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('totalCommission')}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{formatCurrency(agent?.totalCommission || 0)}</div>}
                <p className="text-xs text-muted-foreground">{t('allTimeEarnings')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('totalBookings')}</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-12" /> : <div className="text-2xl font-bold">+{agent?.totalBookings || 0}</div>}
                <p className="text-xs text-muted-foreground">{t('fromYourReferrals')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('yourCode')}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold font-mono tracking-wider">{agent?.referralCode}</div>}
                <p className="text-xs text-muted-foreground">{t('shareWithCustomers')}</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t('commissionHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            )}
            {!isLoading && commissions && commissions.length > 0 && <AgentDashboardLayout commissions={commissions} />}
            {!isLoading && (!commissions || commissions.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12" />
                <p className="mt-4">{t('noCommissionsEarned')}</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
