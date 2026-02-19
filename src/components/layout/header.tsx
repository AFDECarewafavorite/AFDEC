
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
    <header className="sticky top-0 z-50 w-full border-b-[12px] border-primary/10 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-32 items-center px-4">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-6 group">
            <div className="transition-transform group-hover:scale-110">
              <Logo width={80} height={80} />
            </div>
            <span className="font-headline font-black text-5xl md:text-9xl tracking-tighter text-primary uppercase italic drop-shadow-md">
              AFDEC
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-6 md:px-8 h-20 hover:bg-primary/5 rounded-3xl transition-all border-4 border-transparent hover:border-primary/20 group">
                <Languages className="h-10 w-10 text-primary transition-transform group-hover:rotate-12" />
                <span className="font-black text-xl md:text-3xl uppercase tracking-tighter text-foreground">
                  {t('language')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4 border-[6px] shadow-3xl rounded-[3rem] bg-card">
              <DropdownMenuItem 
                onSelect={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20 text-primary font-black uppercase p-6 rounded-[2rem] mb-3 cursor-pointer text-2xl' : 'uppercase p-6 rounded-[2rem] font-bold hover:bg-muted cursor-pointer mb-3 text-2xl'}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={() => setLanguage('ha')}
                className={language === 'ha' ? 'bg-primary/20 text-primary font-black uppercase p-6 rounded-[2rem] cursor-pointer text-2xl' : 'uppercase p-6 rounded-[2rem] font-bold hover:bg-muted cursor-pointer text-2xl'}
              >
                {t('hausa')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="h-20 px-10 md:px-14 rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-2xl font-black uppercase bg-primary text-primary-foreground">
            <Link href={user ? "/admin" : "/login"}>
              {user ? (
                <div className="flex items-center gap-4">
                  <UserCircle className="h-8 w-8" />
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
