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
  Bird,
  ShieldCheck,
  Zap,
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
      subtitle: 'Start small. Grow fast.',
      icon: <Bird className="h-12 w-12" />,
      color: 'bg-primary text-primary-foreground',
    },
    {
      href: '#sell-to-us',
      title: t('sellYourChicken'),
      subtitle: 'Fast cash for mature birds',
      icon: <TrendingUp className="h-12 w-12" />,
      color: 'bg-accent text-accent-foreground',
    },
    {
      href: '/check-status',
      title: t('checkBookingStatus'),
      subtitle: 'Search by phone or ID',
      icon: <Search className="h-12 w-12" />,
      color: 'bg-card text-foreground border-2 border-primary/20',
    },
    {
      href: '/signup',
      title: 'BECOME PARTNER',
      subtitle: 'Earn attractive rewards',
      icon: <Users className="h-12 w-12" />,
      color: 'bg-blue-600 text-white',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-body bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-primary/5">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-accent text-white font-black uppercase px-4 py-1 animate-pulse">
            🔥 {t('limitedSlots')}
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none mb-6 drop-shadow-sm">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-3xl font-bold text-foreground/80 max-w-2xl mx-auto mb-12 leading-tight">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col items-center gap-6 mb-12">
             <div className="bg-accent/20 border-2 border-accent text-accent p-6 rounded-[2rem] max-w-2xl w-full flex flex-col md:flex-row items-center justify-center gap-4">
                <ShieldCheck className="h-12 w-12" />
                <div className="text-left md:text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none">{t('freeBookingPayOnDelivery')}</h3>
                    <p className="text-lg font-bold opacity-80 uppercase mt-1">{t('noBookingFee')}</p>
                </div>
             </div>
          </div>

          {/* 4-GRIP NAVIGATION (2 Columns on Mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {navCards.map((card, i) => (
              <Link href={card.href} key={i}>
                <Card className={`${card.color} h-full transition-all hover:scale-[1.03] active:scale-95 border-none shadow-lg rounded-2xl overflow-hidden group`}>
                  <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none">{card.title}</h3>
                      <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase mt-1">{card.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HOW BOOKING WORKS */}
      <section className="py-20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-primary uppercase tracking-tighter mb-2">
              {t('howBookingWorks')}
            </h2>
            <p className="text-lg md:text-xl font-bold opacity-60 uppercase tracking-widest italic">{t('easy5Steps')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative group">
                <Card className="border-2 border-primary/10 group-hover:border-primary/30 transition-all rounded-3xl h-full shadow-sm bg-card overflow-hidden">
                  <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black shadow-md mb-2">
                      {num}
                    </div>
                    <h3 className="text-xl font-black uppercase text-primary tracking-tight leading-none">
                      {t(`step${num}Title`)}
                    </h3>
                    <p className="text-base font-bold opacity-80 leading-tight">
                      {t(`step${num}Desc`)}
                    </p>
                  </CardContent>
                </Card>
                {num < 5 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary/10 p-8 rounded-3xl border-2 border-primary/20 text-center flex flex-col md:flex-row items-center justify-center gap-6">
            <Zap className="h-12 w-12 text-primary animate-bounce" />
            <div className="text-left">
                <p className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">
                Allocation is fast. We call you immediately!
                </p>
                <p className="text-lg font-bold opacity-70 italic">Choose your confirmation: Phone, WhatsApp, or Facebook.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY AFDEC */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary text-primary-foreground text-lg font-black px-6 py-2 uppercase rounded-xl">
                {t('whyAfdec')}
              </Badge>
              <h2 className="text-4xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                {t('problemTitle')}
              </h2>
              <p className="text-xl md:text-2xl font-bold leading-snug opacity-80">
                {t('problemDesc')}
              </p>
              
              <div className="bg-accent/10 p-8 rounded-3xl border-l-[12px] border-accent shadow-sm">
                <h3 className="text-2xl font-black uppercase text-accent mb-4 italic">{t('solutionTitle')}</h3>
                <p className="text-lg md:text-xl font-bold leading-tight opacity-90">
                  {t('solutionDesc')}
                </p>
              </div>
            </div>

            <div className="relative">
               <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden border-8 border-primary/5 shadow-xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                  alt="Healthy chickens"
                  fill
                  className="object-cover"
                  data-ai-hint="healthy chicken"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-sm p-8 rounded-3xl text-primary-foreground shadow-lg">
                  <p className="font-black text-2xl uppercase italic tracking-tighter leading-none">
                    No Market Struggle. We Buy Back.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES & SOLUTIONS */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
              {t('challengesTitle')}
            </h2>
            <p className="text-xl md:text-2xl font-bold opacity-60 italic">{t('challengesSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { prob: 'probFeed', sol: 'solFeed', icon: <Package className="h-8 w-8 text-red-500" /> },
              { prob: 'probSickness', sol: 'solSickness', icon: <AlertTriangle className="h-8 w-8 text-yellow-500" /> },
              { prob: 'probMarket', sol: 'solMarket', icon: <TrendingUp className="h-8 w-8 text-green-500" /> },
              { prob: 'probTools', sol: 'solTools', icon: <ShoppingBag className="h-8 w-8 text-blue-500" /> },
              { prob: 'probCare', sol: 'solCare', icon: <BadgeCheck className="h-8 w-8 text-purple-500" /> },
            ].map((item, i) => (
              <Card key={i} className="border-2 border-border/50 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col bg-background">
                <div className="bg-muted/50 p-6 flex items-center gap-4 border-b">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{t(item.prob)}</h3>
                </div>
                <CardContent className="p-8 flex-1 flex items-center">
                  <p className="text-lg font-bold opacity-80 italic leading-tight">{t(item.sol)}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="border-4 border-primary bg-primary/5 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-6 shadow-md relative overflow-hidden group">
              <Bird className="h-16 w-16 text-primary opacity-10 absolute -top-2 -right-2 transition-transform group-hover:rotate-12" />
              <h3 className="text-2xl font-black uppercase text-primary italic leading-none">You Are Not Alone</h3>
              <p className="text-lg font-bold leading-tight">We guide you from Day 1 until you sell back to us!</p>
              <Button asChild size="lg" className="rounded-xl font-black uppercase h-16 px-8 text-xl shadow-md transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
                <Link href="/booking">{t('bookNow')} <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. SELL TO US SECTION */}
      <section id="sell-to-us" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-card p-10 md:p-16 rounded-[3rem] border-8 border-accent/10 shadow-lg relative overflow-hidden">
             <div className="max-w-3xl space-y-8 relative z-10">
                <Badge className="bg-accent text-white text-xl font-black px-6 py-2 uppercase rounded-xl">
                    {t('sellToUsTitle')}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black font-headline text-accent uppercase tracking-tighter leading-none">
                    {t('sellToUsTitle')}
                </h2>
                <p className="text-2xl md:text-3xl font-bold leading-tight italic opacity-80">
                    {t('sellToUsDesc')}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                   {[
                    { label: 'WhatsApp', icon: <MessageCircle />, color: 'bg-green-600', href: 'https://wa.me/2341234567890' },
                    { label: 'Call Us', icon: <Phone />, color: 'bg-blue-600', href: 'tel:+2341234567890' },
                   ].map((social, i) => (
                    <Button key={i} asChild size="lg" className={`${social.color} h-20 text-xl font-black rounded-2xl shadow-md hover:scale-[1.03] transition-all`}>
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.icon} <span className="ml-2">{social.label}</span>
                      </a>
                    </Button>
                   ))}
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-5 hidden md:block">
                <Bird className="h-64 w-64" />
             </div>
          </div>
        </div>
      </section>

      {/* 6. AGENT PROGRAM */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
              {t('agentProgram')}
            </h2>
            <p className="text-2xl md:text-3xl font-bold opacity-80 leading-tight">
              {t('agentTitle')}
            </p>
            <div className="bg-white p-10 md:p-14 rounded-3xl border-8 border-primary shadow-xl inline-block transform rotate-1 hover:rotate-0 transition-transform">
              <p className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter leading-none p-4">
                {t('noFarmNeeded')}
              </p>
              <p className="text-xl md:text-2xl font-bold text-muted-foreground mt-2">{t('shareReferralCode')}</p>
            </div>
            <div className="pt-8">
              <Button asChild size="lg" className="h-20 px-12 text-2xl font-black uppercase rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
                <Link href="/signup">
                  Register as Partner <Users className="ml-3 h-8 w-8" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST SECTION */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-card p-12 md:p-20 rounded-[4rem] border-8 border-primary/5 shadow-md">
              <h2 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter leading-none mb-8">
                {t('trustTitle')}
              </h2>
              <p className="text-2xl md:text-4xl font-bold leading-tight italic opacity-70 max-w-3xl mx-auto">
                {t('trustDesc')}
              </p>
              <p className="mt-8 text-xl font-black uppercase text-accent tracking-widest">{t('noHiddenStory')}</p>
          </div>
        </div>
      </section>

      {/* CONTACT LINKS */}
      <section className="py-12 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'WhatsApp', icon: <MessageCircle />, color: 'bg-green-600', href: 'https://wa.me/2341234567890' },
              { label: 'Call Us', icon: <Phone />, color: 'bg-blue-600', href: 'tel:+2341234567890' },
              { label: 'Facebook', icon: <Facebook />, color: 'bg-blue-800', href: '#' },
              { label: 'Instagram', icon: <Instagram />, color: 'bg-pink-600', href: '#' },
              { label: 'Email', icon: <Mail />, color: 'bg-red-600', href: 'mailto:info@afdec.online' },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className={`${social.color} text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-[1.05] transition-all shadow-sm font-black uppercase tracking-tighter text-sm text-center`}
              >
                {social.icon}
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2341234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[99] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle className="h-8 w-8" />
      </a>
    </div>
  );
}
