
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
      <div className="container mx-auto flex h-20 items-center px-4">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Logo width={48} height={48} />
            <span className="font-headline font-black text-3xl md:text-4xl tracking-tighter text-primary uppercase italic">
              AFDEC
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 md:px-4 h-12 hover:bg-primary/10 rounded-xl transition-all border-2 border-transparent hover:border-primary/30">
                <Languages className="h-6 w-6 text-primary" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-black text-sm md:text-base uppercase tracking-tight hidden sm:inline-block">
                    {t('language')}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 border-4 shadow-2xl rounded-2xl">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase p-3 rounded-xl' : 'uppercase p-3 rounded-xl font-bold'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase p-3 rounded-xl' : 'uppercase p-3 rounded-xl font-bold'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-12 px-5 md:px-8 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-base font-black uppercase">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
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
