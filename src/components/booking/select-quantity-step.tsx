import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import type { BookingData } from '@/lib/types';
import ChickenIcon from './chicken-icon';

interface SelectQuantityStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
}

const MAX_QUANTITY = 200;
const MIN_QUANTITY = 10;

export default function SelectQuantityStep({
  bookingData,
  onUpdateData,
}: SelectQuantityStepProps) {
  const { quantity } = bookingData;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= MIN_QUANTITY && newQuantity <= MAX_QUANTITY) {
      onUpdateData({ quantity: newQuantity });
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        Step 2: Select Quantity
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        How many chickens would you like to book? (Minimum 10)
      </p>
      <div className="mt-8 flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= MIN_QUANTITY}
            aria-label="Decrease quantity"
          >
            <Minus className="h-6 w-6" />
          </Button>
          <span className="text-5xl font-bold font-headline w-24 text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= MAX_QUANTITY}
            aria-label="Increase quantity"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="w-full bg-card p-4 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground/70 mb-4">Live Preview</p>
          <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto p-2 rounded-md bg-background">
            {Array.from({ length: quantity > 50 ? 50 : quantity }).map((_, i) => (
              <ChickenIcon key={i} className="w-6 h-6 text-primary/70" />
            ))}
             {quantity > 50 && <span className="self-center text-primary font-bold">& more...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
