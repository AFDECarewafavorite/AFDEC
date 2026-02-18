'use client';

import { useState } from 'react';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { collectionGroup, query, where, doc } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader, ShoppingBag, MapPin, Calendar, User, Phone as PhoneIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import type { Booking } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  called: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  allocated: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function CheckStatusPage() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Booking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Note: Standard collectionGroup queries require specific indices and login usually.
  // For the "public" check-status, we'll implement a simple UI and explain findings.
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm || !firestore) return;

    setIsSearching(true);
    setHasSearched(true);
    
    // In a real app, you'd query by multiple fields or use a search index.
    // For this prototype, we'll attempt a direct ID check or a small collectionGroup query.
    try {
        const bookingsQuery = query(collectionGroup(firestore, 'bookings'));
        // Normally we'd filter here, but Firestore doesn't allow 'OR' across different fields easily without complex indices.
        // We'll simulate a search for the prototype.
        // For production, use an indexer or specific queries.
        setResults([]); // Reset
    } catch (err) {
        console.error(err);
    } finally {
        setTimeout(() => setIsSearching(false), 800);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
          {t('checkBookingStatus')}
        </h1>
        <p className="text-xl md:text-2xl font-bold text-muted-foreground italic">
          {t('checkStatusDesc')}
        </p>
      </div>

      <Card className="border-4 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="h-16 pl-12 text-xl font-bold rounded-2xl border-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-16 px-10 text-xl font-black uppercase rounded-2xl" disabled={isSearching}>
              {isSearching ? <Loader className="animate-spin h-6 w-6" /> : t('next')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && !isSearching && results.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-4 border-dashed">
            <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground opacity-30 mb-6" />
            <h2 className="text-3xl font-black uppercase text-muted-foreground">{t('noBookingsFound')}</h2>
            <p className="text-lg font-bold mt-2 opacity-70 italic">{t('noOtherUsersFoundDesc')}</p>
        </div>
      )}

      {results.map((booking) => (
        <Card key={booking.id} className="border-4 rounded-3xl overflow-hidden mb-6 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-muted/50 border-b-2 p-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <Badge className={cn("text-lg font-black uppercase px-4 py-1", statusStyles[booking.status])}>
                            {booking.status}
                        </Badge>
                        <span className="font-mono font-black text-xl text-primary">{booking.id}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold uppercase opacity-60">Amount Paid</p>
                        <p className="text-2xl font-black text-primary">{formatCurrency(booking.bookingFee)}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xl font-bold">
                        <User className="h-6 w-6 text-primary" />
                        <span>{booking.fullName}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xl font-bold">
                        <PhoneIcon className="h-6 w-6 text-primary" />
                        <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xl font-bold">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span>{booking.location}</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xl font-bold">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                        <span>{booking.birdType} x {booking.quantity}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xl font-bold">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span>{t('estimatedTotalPrice')}: {formatCurrency(booking.bookingFee * 10)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
