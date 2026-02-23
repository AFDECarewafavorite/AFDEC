'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Bird, Info } from 'lucide-react';
import type { BookingData, Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { formatCurrency, PROFIT_PER_UNIT, DELIVERY_FEE_PER_UNIT } from '@/lib/utils';
import { useLanguage } from '@/context/language-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SelectQuantityStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  product: Product | undefined;
}

const MAX_QUANTITY = 2000;
const MIN_QUANTITY = 1;

export default function SelectQuantityStep({
  bookingData,
  onUpdateData,
  product,
}: SelectQuantityStepProps) {
  const { t } = useLanguage();
  const { quantity } = bookingData;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= MIN_QUANTITY && newQuantity <= MAX_QUANTITY) {
      onUpdateData({ quantity: newQuantity });
    }
  };

  const basePrice = product ? product.pricePerUnit : 0;
  const profitTotal = PROFIT_PER_UNIT * quantity;
  const deliveryTotal = DELIVERY_FEE_PER_UNIT * quantity;
  const totalPrice = (basePrice * quantity) + profitTotal + deliveryTotal;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary uppercase">
        {t('bookingStep2Title')}
      </h2>
      <p className="mt-2 text-lg text-foreground/80 italic">
        {t('bookingStep2Subtitle')}
      </p>
      
      <div className="mt-8 flex flex-col items-center gap-8">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-2xl border-2 hover:bg-primary/5"
            onClick={() => handleQuantityChange(quantity - 50)}
            disabled={quantity <= 50}
          >
            <Minus className="h-8 w-8" />
          </Button>
          <div className="flex flex-col items-center">
             <span className="text-6xl font-black font-headline text-primary">
                {quantity}
            </span>
            <span className="text-xs font-bold uppercase opacity-50">Chicks</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-2xl border-2 hover:bg-primary/5"
            onClick={() => handleQuantityChange(quantity + 50)}
            disabled={quantity >= MAX_QUANTITY}
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>

        {product && (
            <div className="w-full space-y-4">
                <Card className="w-full bg-card p-6 rounded-[2rem] border-4 shadow-xl text-left border-primary/10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60 uppercase text-sm tracking-tighter">Hatchery Base Cost</span>
                            <span className="font-mono font-bold">{formatCurrency(basePrice * quantity)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60 uppercase text-sm tracking-tighter">AFDEC Profit (₦4k/carton)</span>
                            <span className="font-mono font-bold text-accent">+{formatCurrency(profitTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60 uppercase text-sm tracking-tighter">Delivery Fee (To all States)</span>
                            <span className="font-mono font-bold text-blue-500">+{formatCurrency(deliveryTotal)}</span>
                        </div>
                        <div className="pt-6 border-t-4 border-primary/5 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black uppercase leading-none">Total to Pay</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1 italic">Payment on Delivery</span>
                            </div>
                            <span className="text-4xl font-black text-primary">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </Card>
                <Alert className="bg-accent/5 border-accent/20 rounded-2xl text-left">
                    <Info className="h-5 w-5 text-accent" />
                    <AlertDescription className="font-bold italic text-accent">
                        Picking up from Gombe? Tell the manager to remove delivery fee for you! 
                        Free Booking. No pressure.
                    </AlertDescription>
                </Alert>
            </div>
        )}
        
        <div className="w-full bg-muted/20 p-8 rounded-3xl border-4 border-dashed border-primary/10">
          <p className="text-xs font-black uppercase opacity-40 mb-6 tracking-widest">{t('livePreview')}</p>
          <div className="flex flex-wrap gap-3 justify-center max-h-40 overflow-y-auto">
            {Array.from({ length: Math.min(50, Math.ceil(quantity / 10)) }).map((_, i) => (
              <Bird key={i} className="w-6 h-6 text-primary/30" />
            ))}
             {quantity > 500 && <span className="self-center text-primary font-black text-sm uppercase bg-primary/10 px-3 py-1 rounded-lg">...and many more</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
