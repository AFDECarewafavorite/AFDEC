import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BIRD_TYPES } from '@/lib/placeholder-data';
import type { BookingData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface SelectBirdStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  onNextStep: () => void;
}

export default function SelectBirdStep({
  bookingData,
  onUpdateData,
  onNextStep,
}: SelectBirdStepProps) {
  const handleSelect = (birdId: 'chicks' | 'grower' | 'mature') => {
    onUpdateData({ birdType: birdId });
    setTimeout(() => onNextStep(), 300); // give a moment for visual feedback
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        Step 1: Select Bird Type
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        Choose the type of chicken you want to book.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {BIRD_TYPES.map((bird) => (
          <Card
            key={bird.id}
            onClick={() => handleSelect(bird.id)}
            className={cn(
              'cursor-pointer transition-all duration-300 ease-in-out hover:shadow-primary/50 hover:shadow-lg hover:-translate-y-1 relative',
              bookingData.birdType === bird.id
                ? 'ring-2 ring-primary shadow-primary/50 shadow-lg'
                : 'ring-1 ring-border'
            )}
          >
            {bookingData.birdType === bird.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            <CardContent className="p-0">
              <Image
                src={bird.image.src}
                alt={bird.name}
                width={bird.image.width}
                height={bird.image.height}
                className="w-full h-40 object-cover rounded-t-lg"
                data-ai-hint={bird.image.hint}
              />
              <div className="p-4">
                <h3 className="font-bold font-headline text-lg">{bird.name}</h3>
                <p className="text-sm text-foreground/70 mt-1">
                  {bird.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
