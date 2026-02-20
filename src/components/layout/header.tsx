
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
    <header className="sticky top-0 z-50 w-full border-b-[6px] border-primary/10 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-24 items-center px-4">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="transition-transform group-hover:scale-110">
              <Logo width={64} height={64} />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-primary uppercase italic drop-shadow-sm leading-none">
                AFDEC
              </span>
              <span className="hidden md:block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                ArewaFavorite Domestic Earning Corp
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-4 h-14 hover:bg-primary/5 rounded-2xl transition-all group">
                <Languages className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
                <span className="font-black text-lg md:text-xl uppercase tracking-tighter text-foreground">
                  {t('language')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 border-4 shadow-xl rounded-3xl bg-card">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase p-4 rounded-2xl mb-1 cursor-pointer text-lg' : 'uppercase p-4 rounded-2xl font-bold hover:bg-muted cursor-pointer mb-1 text-lg'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase p-4 rounded-2xl cursor-pointer text-lg' : 'uppercase p-4 rounded-2xl font-bold hover:bg-muted cursor-pointer text-lg'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-14 px-6 md:px-10 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 text-lg font-black uppercase bg-primary text-primary-foreground">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-2">
                  <UserCircle className="h-6 w-6" />
                  <span className="hidden sm:inline tracking-tighter italic">Dashboard</span>
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
