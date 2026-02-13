'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Commission } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

interface AgentDashboardLayoutProps {
  commissions: Commission[];
}

const statusStyles: { [key in Commission['status']]: string } = {
  credited: 'bg-green-500/20 text-green-400 border-green-500/30',
  paid_out: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};


const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
        return format(date.toDate(), 'dd MMM yyyy');
    }
    // Fallback for string dates from mock data, if any
    return format(new Date(date), 'dd MMM yyyy');
}

export default function AgentDashboardLayout({
  commissions,
}: AgentDashboardLayoutProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From Customer</TableHead>
          <TableHead>Date Credited</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Commission Earned</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commissions.map((commission) => (
          <TableRow key={commission.id}>
            <TableCell className="font-medium">{commission.customerName}</TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(commission.createdAt)}
            </TableCell>
            <TableCell>
              <Badge className={cn('capitalize', statusStyles[commission.status])}>
                {commission.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium text-primary">
              {formatCurrency(commission.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

    