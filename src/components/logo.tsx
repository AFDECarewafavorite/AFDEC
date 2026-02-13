import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function Logo({ className, width = 56, height = 56 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="/logo.png"
        alt="AFDEC Logo"
        width={width}
        height={height}
        className="text-primary"
      />
    </div>
  );
}
