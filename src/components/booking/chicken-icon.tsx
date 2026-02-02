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
    <path d="M18.88 12.06C18.88 12.06 17 14 14.5 14C12 14 11 12.5 11 11.5C11 10.5 11.5 8 13.5 8C15.5 8 16.5 9.5 16.5 9.5" />
    <path d="M12 11.5C12 14.5 9.5 17 6.5 17C3.5 17 1 14.5 1 11.5C1 8.5 3.5 6 6.5 6" />
    <path d="M6.5 6C6.5 6 6 5 6.5 4C7 3 8.5 3.5 8.5 3.5" />
    <path d="M11.5 18C11.5 18 10 21 12 21C14 21 12.5 18 12.5 18" />
    <path d="M22 13C22 13 20 14.5 20 16.5C20 18.5 22 20 22 20" />
    <path d="M16 11.5C16 11.5 17.5 10 18.5 10C19.5 10 20.5 11 20.5 11" />
  </svg>
);

export default ChickenIcon;
