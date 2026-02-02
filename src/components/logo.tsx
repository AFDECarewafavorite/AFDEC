import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {logoImage ? (
        <Image
          src={logoImage.imageUrl}
          alt="AFDEC Logo"
          width={32}
          height={32}
          className="rounded-full object-cover"
          data-ai-hint={logoImage.imageHint}
        />
      ) : (
        <div className="w-8 h-8 bg-muted rounded-full" />
      )}
      <span className="font-bold text-lg font-headline">AFDEC</span>
    </div>
  );
}
