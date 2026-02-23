'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Bird, Info } from 'lucide-react';
import type { BookingData, Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { calculateTotalPrice, formatCurrency } from '@/lib/utils';
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
  // Note: These calculations mirror the logic in utils.ts for UI consistency
  const profitPerUnit = 80;
  const deliveryFeePerUnit = 40;
  const finalPricePerUnit = basePrice + profitPerUnit + deliveryFeePerUnit;
  const totalPrice = finalPricePerUnit * quantity;

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
            className="h-16 w-16 rounded-2xl border-2"
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
            className="h-16 w-16 rounded-2xl border-2"
            onClick={() => handleQuantityChange(quantity + 50)}
            disabled={quantity >= MAX_QUANTITY}
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>

        {product && (
            <div className="w-full space-y-4">
                <Card className="w-full bg-card p-6 rounded-3xl border-4 shadow-xl text-left">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60">Base Price (Market)</span>
                            <span className="font-mono">{formatCurrency(basePrice * quantity)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60">AFDEC Service & Profit</span>
                            <span className="font-mono">{formatCurrency(profitPerUnit * quantity)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold opacity-60">Delivery Fee (All States)</span>
                            <span className="font-mono text-accent">{formatCurrency(deliveryFeePerUnit * quantity)}</span>
                        </div>
                        <div className="pt-4 border-t-2 border-dashed flex justify-between items-center">
                            <span className="text-2xl font-black uppercase">Total to Pay</span>
                            <span className="text-3xl font-black text-primary">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </Card>
                <Alert className="bg-primary/5 border-primary/20 rounded-2xl text-left">
                    <Info className="h-5 w-5 text-primary" />
                    <AlertDescription className="font-bold italic">
                        Price includes ₦2,000 delivery fee per carton (50 chicks). 
                        Pick up from Gombe office to save on delivery!
                    </AlertDescription>
                </Alert>
            </div>
        )}
        
        <div className="w-full bg-muted/30 p-6 rounded-3xl border-2 border-dashed">
          <p className="text-sm font-bold uppercase opacity-50 mb-4">{t('livePreview')}</p>
          <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto">
            {Array.from({ length: Math.min(100, quantity) }).map((_, i) => (
              <Bird key={i} className="w-5 h-5 text-primary/40" />
            ))}
             {quantity > 100 && <span className="self-center text-primary font-bold text-sm uppercase">...and {{quantity - 100}} more</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
