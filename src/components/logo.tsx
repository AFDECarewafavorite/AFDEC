import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    textClassName?: string;
}

export default function Logo({ className, iconContainerClassName, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("p-2 bg-primary/20 rounded-lg", iconContainerClassName)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("w-5 h-5 text-primary", iconClassName)}
        >
          <path d="M16 7h.01"/>
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L8.4 5.26A4 4 0 0 0 4 9v6a2 2 0 0 1-2 2h2a2 2 0 0 1-2-2Z"/>
          <path d="m20 7-4 4-4-4"/>
          <path d="m10 18-2 2"/>
          <path d="m6 18-2 2"/>
        </svg>
      </div>
      <span className={cn("font-bold text-2xl font-headline text-primary", textClassName)}>
        AFDEC
      </span>
    </div>
  );
}
