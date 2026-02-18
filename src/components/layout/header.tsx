'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Languages, UserCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center px-4 md:px-6">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-4">
            <Logo width={64} height={64} />
            <span className="font-headline font-black text-3xl md:text-5xl tracking-tighter text-primary uppercase drop-shadow-lg">
              AFDEC
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 md:px-6 h-14 hover:bg-primary/10 rounded-2xl transition-all border-2 border-transparent hover:border-primary/30">
                <Languages className="h-8 w-8 text-primary" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-black text-lg md:text-xl uppercase tracking-tight hidden sm:inline-block">
                    {t('language')}
                  </span>
                  <span className="text-[10px] uppercase font-bold opacity-70 hidden sm:inline-block">Language</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-3 border-4 shadow-2xl rounded-2xl">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase text-base p-4 rounded-xl' : 'uppercase text-base p-4 rounded-xl font-bold'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase text-base p-4 rounded-xl' : 'uppercase text-base p-4 rounded-xl font-bold'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-14 px-6 md:px-10 rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg font-black uppercase">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-3">
                  <UserCircle className="h-7 w-7" />
                  <span className="hidden sm:inline tracking-tight">{t('dashboard')}</span>
                </div>
              ) : (
                <span className="tracking-tight">{t('loginSignUp')}</span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
