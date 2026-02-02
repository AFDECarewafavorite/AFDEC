import { Bird } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bird className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg font-headline">AFDEC Online</span>
    </div>
  );
}
