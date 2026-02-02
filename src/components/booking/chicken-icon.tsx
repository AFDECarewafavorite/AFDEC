import { cn } from '@/lib/utils';
import React from 'react';

const ChickenIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('w-6 h-6', className)}
    {...props}
  >
    <path d="M19 16.218a5.999 5.999 0 0 1-7.92 5.626A5.998 5.998 0 0 1 5 16.218V12c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v4.218z" />
    <path d="M16 8c-2 0-3-2-3-2s1-2 3-2 3 2 3 2-1 2-3 2z" />
    <path d="M9 20v2" />
    <path d="M15 20v2" />
    <circle cx="10" cy="14" r="0.5" fill="currentColor" />
  </svg>
);

export default ChickenIcon;
