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
  ArrowRight,
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
      title: t('bookNow'),
      subtitle: 'Start your farm now',
      icon: <ShoppingBag className="h-8 w-8" />,
      color: 'bg-primary text-primary-foreground',
    },
    {
      href: '#sell-to-us',
      title: t('sellYourChicken'),
      subtitle: 'We buy mature birds',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'bg-accent text-accent-foreground',
    },
    {
      href: '/check-status',
      title: t('checkBookingStatus'),
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
      <section className="relative py-12 md:py-24 bg-background border-b-4 border-primary/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-4 py-1 text-sm uppercase font-black">
            ArewaFavorite Domestic Earning Corporation
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none mb-6 drop-shadow-sm">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-3xl font-bold text-foreground/80 max-w-2xl mx-auto mb-12 italic leading-tight">
            {t('heroSubtitle')}
          </p>

          {/* 4-GRIP NAVIGATION (2 Columns on Mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {navCards.map((card, i) => (
              <Link href={card.href} key={i}>
                <Card className={`${card.color} h-full transition-all hover:scale-105 active:scale-95 border-none shadow-xl rounded-2xl overflow-hidden group`}>
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
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
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* 2. HOW BOOKING WORKS */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
              {t('howBookingWorks')}
            </h2>
            <div className="h-2 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-xl md:text-2xl font-bold opacity-70 uppercase tracking-widest italic">{t('easyProcess')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative">
                <Card className="border-4 border-primary/5 hover:border-primary/20 transition-all rounded-3xl h-full shadow-lg bg-card">
                  <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg mb-2">
                      {num}
                    </div>
                    <h3 className="text-xl font-black uppercase text-primary tracking-tight">
                      {t(`step${num}Title`)}
                    </h3>
                    <p className="text-lg font-bold opacity-80 leading-snug">
                      {t(`step${num}Desc`)}
                    </p>
                  </CardContent>
                </Card>
                {num < 5 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-10 w-10 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary p-8 rounded-3xl shadow-2xl text-center transform rotate-1">
            <p className="text-2xl md:text-3xl font-black text-primary-foreground uppercase tracking-tight flex items-center justify-center gap-4">
              <BadgeCheck className="h-10 w-10" />
              {t('bookingNote')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SELL TO US SECTION */}
      <section id="sell-to-us" className="py-24 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-accent text-white text-xl font-black px-6 py-2 uppercase rounded-xl">
                {t('sellToUsTitle')}
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black font-headline text-accent uppercase tracking-tighter leading-none">
                {t('struggleToSell')}
              </h2>
              <p className="text-2xl md:text-3xl font-bold leading-tight opacity-90 text-foreground/80">
                {t('sellToUsDesc')}
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {[t('weBuyFast'), t('fairPrices'), t('noStories')].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-accent/10 p-4 rounded-2xl border-l-8 border-accent">
                    <CheckCircle2 className="text-accent h-8 w-8 flex-shrink-0" />
                    <span className="text-xl font-black uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* CONTACT BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 h-16 px-8 text-xl font-black rounded-2xl shadow-xl transition-all hover:scale-105">
                  <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-3 h-6 w-6" /> {t('whatsApp')}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-4 border-accent text-accent h-16 px-8 text-xl font-black rounded-2xl transition-all hover:bg-accent hover:text-white">
                  <a href="tel:+2341234567890">
                    <Phone className="mr-3 h-6 w-6" /> {t('callUs')}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
               <div className="relative h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden border-8 border-accent/10 shadow-2xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                  alt="Mature chickens"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  data-ai-hint="mature chicken"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-accent/90 backdrop-blur-md p-8 rounded-3xl text-white shadow-2xl">
                  <p className="font-black text-3xl uppercase italic tracking-tighter leading-none">
                    {t('fairPriceNotice')}
                  </p>
                </div>
              </div>
              {/* Decorative circle behind image */}
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES & SOLUTIONS */}
      <section className="py-24 border-t-4 border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
              {t('challengesTitle')}
            </h2>
            <div className="h-2 w-32 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl md:text-3xl font-bold opacity-60 italic">{t('challengesSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { prob: 'probFeed', sol: 'solFeed', icon: <Package className="text-red-500" />, color: "border-red-500/20" },
              { prob: 'probSickness', sol: 'solSickness', icon: <AlertTriangle className="text-yellow-500" />, color: "border-yellow-500/20" },
              { prob: 'probMarket', sol: 'solMarket', icon: <TrendingUp className="text-green-500" />, color: "border-green-500/20" },
              { prob: 'probTools', sol: 'solTools', icon: <ShoppingBag className="text-blue-500" />, color: "border-blue-500/20" },
              { prob: 'probCare', sol: 'solCare', icon: <BadgeCheck className="text-purple-500" />, color: "border-purple-500/20" },
            ].map((item, i) => (
              <Card key={i} className={`border-4 ${item.color} rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col group`}>
                <div className="bg-muted/30 p-8 flex items-center gap-5 border-b-2">
                  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{t(item.prob)}</h3>
                </div>
                <CardContent className="p-10 flex-1 flex items-center">
                  <p className="text-xl font-bold opacity-90 leading-tight text-foreground/80">{t(item.sol)}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="border-4 border-primary bg-primary/10 rounded-[2.5rem] p-10 text-center flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <BadgeCheck className="h-24 w-24" />
              </div>
              <h3 className="text-4xl font-black uppercase text-primary italic leading-none">AFDEC Support</h3>
              <p className="text-2xl font-bold leading-tight">{t('afdecPromise')}</p>
              <Button asChild size="lg" className="rounded-xl font-black uppercase h-14 px-8 mt-2">
                <Link href="/booking">{t('bookNow')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. AGENT PROGRAM */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-6xl md:text-9xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
              {t('agentProgramTitle')}
            </h2>
            <p className="text-2xl md:text-4xl font-bold opacity-90 leading-tight text-foreground/80">
              {t('agentProgramDesc')}
            </p>
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border-8 border-primary shadow-2xl inline-block transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <p className="text-4xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none">
                {t('earnPerChick')}
              </p>
            </div>
            <div className="pt-6">
              <Button asChild size="lg" className="h-20 px-12 text-2xl font-black uppercase rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
                <Link href="/signup">
                  {t('registerAsAgent')} <Users className="ml-3 h-8 w-8" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* 6. TRUST SECTION */}
      <section className="py-24 border-t-8 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-card p-12 md:p-24 rounded-[4rem] border-4 border-primary/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 opacity-5 group-hover:scale-110 transition-transform duration-1000">
              <BadgeCheck className="h-96 w-96" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                {t('trustTitle')}
              </h2>
              <p className="text-2xl md:text-4xl font-bold leading-tight italic opacity-90 text-foreground/80">
                {t('trustDesc')}
              </p>
              <div className="flex gap-4">
                 <div className="h-2 w-16 bg-primary rounded-full"></div>
                 <div className="h-2 w-8 bg-primary/30 rounded-full"></div>
                 <div className="h-2 w-4 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS (CONTACT) */}
      <section className="py-16 bg-card border-t-4 border-border">
        <div className="container mx-auto px-4 text-center mb-10">
            <h3 className="text-3xl font-black uppercase text-primary tracking-tighter mb-2">Connect With Us</h3>
            <p className="text-xl font-bold opacity-60">Reach out for any inquiries or support.</p>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                className={`${social.color} text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:scale-105 hover:shadow-2xl transition-all shadow-lg font-black uppercase tracking-tighter text-sm md:text-base text-center group`}
              >
                <div className="group-hover:rotate-12 transition-transform">
                  {social.icon}
                </div>
                {t(social.label)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
