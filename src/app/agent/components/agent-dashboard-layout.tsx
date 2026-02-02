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
import type { Booking, BookingStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface AgentDashboardLayoutProps {
  bookings: Booking[];
}

const statusStyles: { [key in BookingStatus]: string } = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  called: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  allocated: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

// Commission logic based on proposal
const calculateCommission = (bookingFee: number) => {
    if (bookingFee <= 500) return 200;
    if (bookingFee > 500 && bookingFee <= 1000) return 350;
    return bookingFee * 0.1; // 10% for higher value bookings as an example
};

export default function AgentDashboardLayout({ bookings }: AgentDashboardLayoutProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Commission</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.fullName}</TableCell>
            <TableCell className="text-muted-foreground">
                {format(parseISO(booking.createdAt), 'dd MMM yyyy')}
            </TableCell>
            <TableCell>
              <Badge className={cn('capitalize', statusStyles[booking.status])}>
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium text-primary">
              {formatCurrency(calculateCommission(booking.bookingFee))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
