import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAgent, mockBookings } from '@/lib/placeholder-data';
import { Copy, DollarSign, ShoppingBag, Users } from 'lucide-react';
import AgentDashboardLayout from './components/agent-dashboard-layout';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

export default function AgentDashboard() {
  const agentBookings = mockBookings.filter(b => b.agentId === mockAgent.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Agent Portal
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {mockAgent.name}. Here's your referral dashboard.
        </p>
      </header>
      
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link or your code to earn commissions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 bg-muted/50 p-3 rounded-md font-mono text-sm break-all">
                {`https://afdec.online/book?ref=${mockAgent.referralCode}`}
            </div>
            <Button variant="outline">
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
                <div className="text-2xl font-bold">{formatCurrency(mockAgent.availableBalance)}</div>
                <Button size="sm" className="mt-2">Withdraw</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockAgent.totalCommission)}</div>
                <p className="text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{mockAgent.totalBookings}</div>
                <p className="text-xs text-muted-foreground">From your referrals</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Code</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-mono tracking-wider">{mockAgent.referralCode}</div>
                <p className="text-xs text-muted-foreground">Share this with customers</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Referral History</CardTitle>
        </CardHeader>
        <CardContent>
            <AgentDashboardLayout bookings={agentBookings} />
        </CardContent>
      </Card>
    </div>
  );
}
