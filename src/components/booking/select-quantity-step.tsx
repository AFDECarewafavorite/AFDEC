import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Bird } from 'lucide-react';
import type { BookingData, Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { calculateBookingFee } from '@/lib/utils';

interface SelectQuantityStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  product: Product | undefined;
}

const MAX_QUANTITY = 200;
const MIN_QUANTITY = 1;

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
};

export default function SelectQuantityStep({
  bookingData,
  onUpdateData,
  product,
}: SelectQuantityStepProps) {
  const { quantity } = bookingData;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= MIN_QUANTITY && newQuantity <= MAX_QUANTITY) {
      onUpdateData({ quantity: newQuantity });
    }
  };

  const bookingFee = calculateBookingFee(product, quantity);
  const totalPrice = product ? product.pricePerUnit * quantity : 0;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        Step 2: Select Quantity
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        How many chickens would you like to book? (Minimum 1)
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

        {product && (
            <Card className="w-full bg-transparent p-4 rounded-lg border border-border text-left">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-muted-foreground">Booking Fee (Payable now)</p>
                    <p className="font-bold text-lg text-primary">{formatCurrency(bookingFee)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Estimated Total Price</p>
                    <p className="font-bold text-lg">{formatCurrency(totalPrice)}</p>
                </div>
            </Card>
        )}
        
        <div className="w-full bg-card p-4 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground/70 mb-4">Live Preview</p>
          <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto p-2 rounded-md bg-background">
            {Array.from({ length: quantity > 50 ? 50 : quantity }).map((_, i) => (
              <Bird key={i} className="w-6 h-6 text-primary/70" />
            ))}
             {quantity > 50 && <span className="self-center text-primary font-bold">& more...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

