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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center space-x-3">
            <Logo width={48} height={48} />
            <span className="hidden sm:inline-block font-headline font-black text-2xl tracking-tighter text-primary uppercase">AFDEC</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3 md:px-5 h-12 hover:bg-primary/10 rounded-xl transition-all">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-black text-sm md:text-base uppercase tracking-tight">{t('language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 border-2 shadow-2xl">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase text-sm p-3 rounded-lg' : 'uppercase text-sm p-3 rounded-lg font-bold'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase text-sm p-3 rounded-lg' : 'uppercase text-sm p-3 rounded-lg font-bold'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-12 px-5 md:px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-3">
                  <UserCircle className="h-6 w-6" />
                  <span className="hidden sm:inline font-black uppercase tracking-tight text-sm md:text-base">{t('dashboard')}</span>
                </div>
              ) : (
                <span className="text-sm md:text-base font-black uppercase tracking-tight">{t('loginSignUp')}</span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
