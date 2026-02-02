import { Bird } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-primary/20 rounded-lg">
        <Bird className="w-5 h-5 text-primary" />
      </div>
      <span className="font-bold text-2xl font-headline text-primary">
        AFDEC
      </span>
    </div>
  );
}
