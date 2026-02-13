'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Globe } from 'lucide-react';
import Logo from '../logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-provider';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/booking', label: t('bookNow') },
    { href: '/agent', label: t('agentPortal') },
    { href: '/admin', label: t('dashboard') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  (pathname.startsWith(link.href) && link.href !== '/') ||
                    (pathname === '/' && link.href === '/')
                    ? 'text-primary'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                A list of links to navigate the site.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="border-b pb-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Logo />
                </Link>
              </div>
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      (pathname.startsWith(link.href) && link.href !== '/') ||
                        (pathname === '/' && link.href === '/')
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-foreground/80">
                    {t('language')}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Globe className="mr-2 h-4 w-4" />
                        {language === 'en' ? t('english') : t('hausa')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setLanguage('en')}>
                        {t('english')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setLanguage('ha')}>
                        {t('hausa')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button asChild className="w-full">
                  <Link href="/login">{t('loginSignUp')}</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a search bar here if needed */}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setLanguage('en')}>
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('ha')}>
                  {t('hausa')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/login">{t('loginSignUp')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
