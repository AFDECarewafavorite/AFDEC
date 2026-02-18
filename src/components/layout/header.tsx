'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import Logo from '../logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-provider';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <Languages className="h-4 w-4 text-primary" />
                <span className="font-medium">{t('language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-bold' : ''}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-bold' : ''}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/login">{t('loginSignUp')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
