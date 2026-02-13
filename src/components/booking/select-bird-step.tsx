'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { BookingData, ProductId, Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-provider';

interface SelectBirdStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  onNextStep: () => void;
  products: Product[];
}

export default function SelectBirdStep({
  bookingData,
  onUpdateData,
  onNextStep,
  products,
}: SelectBirdStepProps) {
  const { t } = useLanguage();

  const handleSelect = (productId: ProductId) => {
    onUpdateData({ birdType: productId });
    setTimeout(() => onNextStep(), 300); // give a moment for visual feedback
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (products.length === 0) {
    return (
        <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold font-headline text-primary">{t('noProductsForBooking')}</h2>
            <p className="mt-2 text-lg text-foreground/80">
                {t('noProductsForBookingDesc')}
            </p>
        </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        {t('bookingStep1Title')}
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        {t('bookingStep1Subtitle')}
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            onClick={() => handleSelect(product.id)}
            className={cn(
              'cursor-pointer transition-all duration-300 ease-in-out hover:shadow-primary/50 hover:shadow-lg hover:-translate-y-1 relative flex flex-col',
              bookingData.birdType === product.id
                ? 'ring-2 ring-primary shadow-primary/50 shadow-lg'
                : 'ring-1 ring-border'
            )}
          >
            {bookingData.birdType === product.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            <CardContent className="p-0 flex-1 flex flex-col">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={product.imageWidth}
                height={product.imageHeight}
                className="w-full h-40 object-cover rounded-t-lg"
                data-ai-hint={product.imageHint}
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold font-headline text-lg">{product.name}</h3>
                <p className="text-sm text-foreground/70 mt-1 flex-1">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  {product.maturity && (
                    <Badge
                      variant="outline"
                      className="border-primary/50 text-primary"
                    >
                      {product.maturity}
                    </Badge>
                  )}
                  <p className="font-semibold text-primary">
                    {formatCurrency(product.bookingFeePerUnit)} {t('fee')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
