import { Bird } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const ChickenIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return <Bird className={cn('w-6 h-6', className)} {...props} />;
};

export default ChickenIcon;
