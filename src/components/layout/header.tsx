'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, UserCircle } from 'lucide-react';
import Logo from '../logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-provider';
import { useUser } from '@/firebase';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={40} height={40} />
            <span className="hidden sm:inline-block font-headline font-bold text-xl tracking-tight text-primary">AFDEC</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-3 h-10 hover:bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-semibold text-xs md:text-sm">{t('language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 p-1">
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

          <Button asChild className="h-10 px-3 md:px-6">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('dashboard')}</span>
                </div>
              ) : (
                <span className="text-xs md:text-sm font-bold">{t('loginSignUp')}</span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
