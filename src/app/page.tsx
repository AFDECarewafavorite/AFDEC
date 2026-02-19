'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  TrendingUp,
  Search,
  CheckCircle2,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  Package,
  AlertTriangle,
  BadgeCheck,
  Users,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-provider';

export default function Home() {
  const { t } = useLanguage();

  const navCards = [
    {
      href: '/booking',
      title: 'BOOK CHICKS',
      subtitle: 'Start your farm now',
      icon: <ShoppingBag className="h-8 w-8" />,
      color: 'bg-primary text-primary-foreground',
    },
    {
      href: '#sell-to-us',
      title: 'SELL CHICKEN',
      subtitle: 'We buy mature birds',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'bg-accent text-accent-foreground',
    },
    {
      href: '/check-status',
      title: 'CHECK STATUS',
      subtitle: 'Track your booking',
      icon: <Search className="h-8 w-8" />,
      color: 'bg-muted text-foreground border-2',
    },
    {
      href: '/signup',
      title: 'BECOME AGENT',
      subtitle: 'Earn per chick sold',
      icon: <Users className="h-8 w-8" />,
      color: 'bg-blue-600 text-white',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* 1. HERO SECTION */}
      <section className="relative py-12 md:py-24 bg-background border-b-4 border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-3xl font-bold text-foreground/80 max-w-2xl mx-auto mb-12 italic">
            {t('heroSubtitle')}
          </p>

          {/* 4-GRIP NAVIGATION (2 Columns on Mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {navCards.map((card, i) => (
              <Link href={card.href} key={i}>
                <Card className={`${card.color} h-full transition-transform hover:scale-105 active:scale-95 border-none shadow-xl rounded-2xl overflow-hidden`}>
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tighter leading-tight">{card.title}</h3>
                      <p className="text-xs font-bold opacity-80 uppercase">{card.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HOW BOOKING WORKS */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-primary uppercase tracking-tighter mb-2">
              {t('howBookingWorks')}
            </h2>
            <p className="text-xl font-bold opacity-60 uppercase tracking-widest italic">{t('easyProcess')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative group">
                <Card className="border-4 border-primary/5 hover:border-primary transition-all rounded-3xl h-full shadow-lg">
                  <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                    <div className="h-14 w-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black shadow-md">
                      {num}
                    </div>
                    <h3 className="text-xl font-black uppercase text-primary tracking-tight">
                      {t(`step${num}Title`)}
                    </h3>
                    <p className="text-base font-bold opacity-70 leading-tight">
                      {t(`step${num}Desc`)}
                    </p>
                  </CardContent>
                </Card>
                {num < 5 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary p-6 rounded-2xl shadow-xl text-center">
            <p className="text-xl md:text-2xl font-black text-primary-foreground uppercase tracking-tight">
              <BadgeCheck className="inline-block mr-3 h-8 w-8" />
              {t('bookingNote')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SELL TO US SECTION */}
      <section id="sell-to-us" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent text-white text-lg font-black px-4 py-1 uppercase rounded-lg">
                {t('sellToUsTitle')}
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black font-headline text-accent uppercase tracking-tighter leading-none">
                {t('struggleToSell')}
              </h2>
              <p className="text-2xl font-bold leading-tight opacity-90">
                {t('sellToUsDesc')}
              </p>
              <div className="space-y-2">
                <p className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="text-accent h-6 w-6" /> {t('weBuyFast')}
                </p>
                <p className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="text-accent h-6 w-6" /> {t('fairPrices')}
                </p>
                <p className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="text-accent h-6 w-6" /> {t('noStories')}
                </p>
              </div>

              {/* CONTACT BUTTONS */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 h-14 px-6 text-lg font-black rounded-xl">
                  <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> {t('whatsApp')}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-4 border-accent text-accent h-14 px-6 text-lg font-black rounded-xl">
                  <a href="tel:+2341234567890">
                    <Phone className="mr-2 h-5 w-5" /> {t('callUs')}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border-8 border-accent/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                alt="Mature chickens"
                fill
                className="object-cover"
                data-ai-hint="mature chicken"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-accent p-6 rounded-2xl text-white">
                <p className="font-black text-2xl uppercase italic tracking-tighter">
                  {t('fairPriceNotice')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES & SOLUTIONS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter">
              {t('challengesTitle')}
            </h2>
            <p className="text-2xl font-bold opacity-60 italic mt-2">{t('challengesSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { prob: 'probFeed', sol: 'solFeed', icon: <Package className="text-red-500" /> },
              { prob: 'probSickness', sol: 'solSickness', icon: <AlertTriangle className="text-yellow-500" /> },
              { prob: 'probMarket', sol: 'solMarket', icon: <TrendingUp className="text-green-500" /> },
              { prob: 'probTools', sol: 'solTools', icon: <ShoppingBag className="text-blue-500" /> },
              { prob: 'probCare', sol: 'solCare', icon: <BadgeCheck className="text-purple-500" /> },
            ].map((item, i) => (
              <Card key={i} className="border-4 rounded-3xl overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="bg-muted/30 p-6 flex items-center gap-4 border-b-2">
                  <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{t(item.prob)}</h3>
                </div>
                <CardContent className="p-8 flex-1 flex items-center">
                  <p className="text-lg font-bold opacity-80 leading-snug">{t(item.sol)}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="border-4 border-primary bg-primary/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4">
              <h3 className="text-3xl font-black uppercase text-primary italic">AFDEC Support</h3>
              <p className="text-xl font-bold">{t('afdecPromise')}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. AGENT PROGRAM */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter">
              {t('agentProgramTitle')}
            </h2>
            <p className="text-2xl font-bold opacity-90">
              {t('agentProgramDesc')}
            </p>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border-4 border-primary shadow-2xl inline-block rotate-1">
              <p className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-none">
                {t('earnPerChick')}
              </p>
            </div>
            <div>
              <Button asChild size="lg" className="h-16 px-10 text-xl font-black uppercase rounded-xl shadow-lg">
                <Link href="/signup">
                  {t('registerAsAgent')} <Users className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST SECTION */}
      <section className="py-20 border-t-8 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-card p-10 md:p-16 rounded-[3rem] border-4 border-primary/5 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5">
              <BadgeCheck className="h-64 w-64" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-6">
              <h2 className="text-5xl font-black font-headline text-primary uppercase tracking-tighter">
                {t('trustTitle')}
              </h2>
              <p className="text-2xl font-bold leading-tight italic opacity-90">
                {t('trustDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS (CONTACT) */}
      <section className="py-12 bg-card border-t-4 border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'whatsApp', icon: <MessageCircle />, color: 'bg-green-600', href: 'https://wa.me/2341234567890' },
              { label: 'callUs', icon: <Phone />, color: 'bg-blue-600', href: 'tel:+2341234567890' },
              { label: 'facebook', icon: <Facebook />, color: 'bg-blue-800', href: '#' },
              { label: 'instagram', icon: <Instagram />, color: 'bg-pink-600', href: '#' },
              { label: 'emailUs', icon: <Mail />, color: 'bg-red-600', href: 'mailto:info@afdec.online' },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className={`${social.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all shadow-md font-black uppercase tracking-tighter text-xs`}
              >
                {social.icon}
                {t(social.label)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
