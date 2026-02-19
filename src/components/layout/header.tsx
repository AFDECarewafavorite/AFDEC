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
    <header className="sticky top-0 z-50 w-full border-b-8 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center px-4">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="transition-transform group-hover:scale-110">
              <Logo width={64} height={64} />
            </div>
            <span className="font-headline font-black text-4xl md:text-7xl tracking-tighter text-primary uppercase italic drop-shadow-sm">
              AFDEC
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-4 md:px-6 h-14 hover:bg-primary/10 rounded-2xl transition-all border-4 border-transparent hover:border-primary/30 group">
                <Languages className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
                <span className="font-black text-base md:text-xl uppercase tracking-tighter">
                  {t('language')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-3 border-4 shadow-2xl rounded-[2rem] bg-card">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase p-4 rounded-2xl mb-2 cursor-pointer' : 'uppercase p-4 rounded-2xl font-bold hover:bg-muted cursor-pointer mb-2'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase p-4 rounded-2xl cursor-pointer' : 'uppercase p-4 rounded-2xl font-bold hover:bg-muted cursor-pointer'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-14 px-6 md:px-10 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-lg font-black uppercase bg-primary text-primary-foreground">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-3">
                  <UserCircle className="h-6 w-6" />
                  <span className="hidden sm:inline tracking-tighter">{t('dashboard')}</span>
                </div>
              ) : (
                <span className="tracking-tighter">{t('loginSignUp')}</span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
