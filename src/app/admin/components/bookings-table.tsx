'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Booking, BookingStatus } from '@/lib/types';
import { BIRD_TYPES } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Phone, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';

interface BookingsTableProps {
  bookings: Booking[];
}

const statusStyles: { [key in BookingStatus]: string } = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  called: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  allocated: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const firestore = useFirestore();
  const handleStatusChange = (bookingId: string, customerId: string, newStatus: BookingStatus) => {
    if (!firestore || !customerId || !bookingId) return;

    const bookingRef = doc(firestore, 'users', customerId, 'bookings', bookingId);
    updateDocumentNonBlocking(bookingRef, { status: newStatus });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Bird Type</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          const birdType = BIRD_TYPES.find((b) => b.id === booking.birdType);
          const customerInitials = booking.fullName.split(' ').map(s => s[0]).join('');

          return (
            <TableRow key={booking.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={booking.customerAvatar} alt={booking.fullName} />
                        <AvatarFallback>{customerInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{booking.fullName}</div>
                        <a
                            href={`tel:${booking.phone}`}
                            className="text-muted-foreground text-sm flex items-center gap-1 hover:text-primary"
                        >
                            <Phone className="h-3 w-3" />
                            {booking.phone}
                        </a>
                    </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {birdType && (
                    <Image
                      src={birdType.image.src}
                      alt={birdType.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                      data-ai-hint={birdType.image.hint}
                    />
                  )}
                  <span>{birdType?.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {booking.quantity}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={booking.status}
                  onValueChange={(value) =>
                    handleStatusChange(booking.id, booking.customerId, value as BookingStatus)
                  }
                >
                  <SelectTrigger
                    className={cn(
                      'w-[120px] border-2 focus:ring-0',
                      statusStyles[booking.status]
                    )}
                  >
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statusStyles).map((status) => (
                      <SelectItem key={status} value={status}>
                        <Badge
                          className={cn(
                            'w-full justify-center',
                            statusStyles[status as BookingStatus]
                          )}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <a href={`tel:${booking.phone}`}>Call Customer</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
