
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
      icon: <ShoppingBag className="h-10 w-10" />,
      color: 'bg-primary text-primary-foreground',
    },
    {
      href: '#sell-to-us',
      title: t('sellYourChicken'),
      subtitle: 'Fast cash for mature birds',
      icon: <TrendingUp className="h-10 w-10" />,
      color: 'bg-accent text-accent-foreground',
    },
    {
      href: '/check-status',
      title: t('checkBookingStatus'),
      subtitle: 'Search by phone or ID',
      icon: <Search className="h-10 w-10" />,
      color: 'bg-muted text-foreground border-4 border-primary/20',
    },
    {
      href: '/signup',
      title: 'BECOME AGENT',
      subtitle: 'Earn ₦50-₦100 per chick',
      icon: <Users className="h-10 w-10" />,
      color: 'bg-blue-600 text-white',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-body bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-32 overflow-hidden border-b-8 border-primary/10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-9xl font-black font-headline text-primary uppercase tracking-tighter leading-none mb-8 drop-shadow-lg italic">
            {t('heroTitle')}
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-foreground/90 max-w-3xl mx-auto mb-16 leading-tight bg-background/50 backdrop-blur-sm p-4 rounded-2xl">
            {t('heroSubtitle')}
          </p>

          {/* 4-GRIP NAVIGATION (2 Columns on Mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {navCards.map((card, i) => (
              <Link href={card.href} key={i}>
                <Card className={`${card.color} h-full transition-all hover:scale-105 active:scale-95 border-none shadow-2xl rounded-3xl overflow-hidden group`}>
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">{card.title}</h3>
                      <p className="text-xs md:text-sm font-bold opacity-90 uppercase mt-1">{card.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-0"></div>
      </section>

      {/* 2. HOW BOOKING WORKS */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
              {t('howBookingWorks')}
            </h2>
            <p className="text-2xl md:text-3xl font-bold opacity-70 uppercase tracking-widest italic">{t('easy5Steps')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative">
                <Card className="border-4 border-primary/10 hover:border-primary/30 transition-all rounded-[2.5rem] h-full shadow-xl bg-card">
                  <CardContent className="p-10 text-center flex flex-col items-center gap-6">
                    <div className="h-20 w-20 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center text-4xl font-black shadow-xl">
                      {num}
                    </div>
                    <h3 className="text-2xl font-black uppercase text-primary tracking-tight leading-none">
                      {t(`step${num}Title`)}
                    </h3>
                    <p className="text-xl font-bold opacity-90 leading-tight">
                      {t(`step${num}Desc`)}
                    </p>
                  </CardContent>
                </Card>
                {num < 5 && (
                  <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-12 w-12 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 bg-primary p-10 rounded-[3rem] shadow-2xl text-center transform -rotate-1">
            <p className="text-3xl md:text-4xl font-black text-primary-foreground uppercase tracking-tight flex items-center justify-center gap-6">
              <BadgeCheck className="h-12 w-12" />
              Allocation is fast. We call you immediately!
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY AFDEC & PROBLEM SECTION */}
      <section className="py-24 border-t-8 border-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <Badge className="bg-primary text-primary-foreground text-2xl font-black px-8 py-3 uppercase rounded-2xl">
                {t('whyAfdec')}
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                {t('problemTitle')}
              </h2>
              <p className="text-2xl md:text-3xl font-bold leading-snug opacity-90 text-foreground/80">
                {t('problemDesc')}
              </p>
              
              <div className="bg-accent/10 p-10 rounded-[3rem] border-l-[16px] border-accent shadow-lg">
                <h3 className="text-3xl font-black uppercase text-accent mb-6 italic">{t('solutionTitle')}</h3>
                <p className="text-xl md:text-2xl font-bold leading-tight text-foreground/90">
                  {t('solutionDesc')}
                </p>
              </div>
            </div>

            <div className="relative">
               <div className="relative h-[500px] md:h-[700px] rounded-[4rem] overflow-hidden border-[12px] border-primary/5 shadow-2xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                  alt="Healthy chickens"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                  data-ai-hint="healthy chicken"
                />
                <div className="absolute bottom-10 left-10 right-10 bg-primary/95 backdrop-blur-md p-10 rounded-[3rem] text-primary-foreground shadow-2xl">
                  <p className="font-black text-4xl uppercase italic tracking-tighter leading-none">
                    No Market Struggle. We Buy Back.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-primary/20 rounded-full blur-[80px] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES & SOLUTIONS */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-primary uppercase tracking-tighter mb-6">
              {t('challengesTitle')}
            </h2>
            <p className="text-2xl md:text-3xl font-bold opacity-60 italic">{t('challengesSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { prob: 'probFeed', sol: 'solFeed', icon: <Package className="h-10 w-10 text-red-500" />, color: "border-red-500/20" },
              { prob: 'probSickness', sol: 'solSickness', icon: <AlertTriangle className="h-10 w-10 text-yellow-500" />, color: "border-yellow-500/20" },
              { prob: 'probMarket', sol: 'solMarket', icon: <TrendingUp className="h-10 w-10 text-green-500" />, color: "border-green-500/20" },
              { prob: 'probTools', sol: 'solTools', icon: <ShoppingBag className="h-10 w-10 text-blue-500" />, color: "border-blue-500/20" },
              { prob: 'probCare', sol: 'solCare', icon: <BadgeCheck className="h-10 w-10 text-purple-500" />, color: "border-purple-500/20" },
            ].map((item, i) => (
              <Card key={i} className={`border-4 ${item.color} rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col group bg-background`}>
                <div className="bg-muted/30 p-10 flex items-center gap-6 border-b-4">
                  <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{t(item.prob)}</h3>
                </div>
                <CardContent className="p-12 flex-1 flex items-center">
                  <p className="text-2xl font-bold opacity-90 leading-tight text-foreground/80 italic">{t(item.sol)}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="border-[8px] border-primary bg-primary/10 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center gap-8 shadow-2xl relative overflow-hidden group">
              <Bird className="h-24 w-24 text-primary opacity-20 absolute -top-4 -right-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-4xl font-black uppercase text-primary italic leading-none">You Are Not Alone</h3>
              <p className="text-2xl font-bold leading-tight">We guide you from Day 1 until you sell back to us!</p>
              <Button asChild size="lg" className="rounded-2xl font-black uppercase h-20 px-12 text-2xl shadow-xl transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
                <Link href="/booking">{t('bookNow')} <ArrowRight className="ml-3 h-8 w-8" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. SELL TO US SECTION */}
      <section id="sell-to-us" className="py-24 bg-accent/5 relative">
        <div className="container mx-auto px-4">
          <div className="bg-card p-12 md:p-24 rounded-[4rem] border-[12px] border-accent/10 shadow-2xl relative overflow-hidden">
             <div className="max-w-4xl space-y-10 relative z-10">
                <Badge className="bg-accent text-white text-2xl font-black px-8 py-3 uppercase rounded-2xl">
                    {t('sellToUsTitle')}
                </Badge>
                <h2 className="text-6xl md:text-9xl font-black font-headline text-accent uppercase tracking-tighter leading-none">
                    {t('sellToUsTitle')}
                </h2>
                <p className="text-3xl md:text-4xl font-bold leading-tight italic opacity-90 text-foreground/80">
                    {t('sellToUsDesc')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                   {[
                    { label: 'WhatsApp', icon: <MessageCircle />, color: 'bg-green-600', href: 'https://wa.me/2341234567890' },
                    { label: 'Call Us', icon: <Phone />, color: 'bg-blue-600', href: 'tel:+2341234567890' },
                   ].map((social, i) => (
                    <Button key={i} asChild size="lg" className={`${social.color} h-24 text-2xl font-black rounded-3xl shadow-2xl hover:scale-105 transition-all`}>
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.icon} <span className="ml-3">{social.label}</span>
                      </a>
                    </Button>
                   ))}
                </div>
             </div>
             <div className="absolute -bottom-20 -right-20 opacity-5">
                <Bird className="h-[400px] w-[400px]" />
             </div>
          </div>
        </div>
      </section>

      {/* 6. AGENT PROGRAM */}
      <section className="py-24 bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-6xl md:text-9xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
              {t('agentTitle')}
            </h2>
            <p className="text-3xl md:text-4xl font-bold opacity-90 leading-tight text-foreground/80">
              {t('agentDesc')}
            </p>
            <div className="bg-white p-12 md:p-20 rounded-[4rem] border-[12px] border-primary shadow-3xl inline-block transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <p className="text-5xl md:text-8xl font-black text-primary uppercase tracking-tighter leading-none">
                Earn ₦50 – ₦100 Per Chick!
              </p>
            </div>
            <div className="pt-10">
              <Button asChild size="lg" className="h-24 px-16 text-3xl font-black uppercase rounded-[2.5rem] shadow-3xl transition-all hover:scale-110 active:scale-95 bg-primary text-primary-foreground">
                <Link href="/signup">
                  Register as Agent <Users className="ml-4 h-10 w-10" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST SECTION */}
      <section className="py-24 border-t-8 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-card p-16 md:p-32 rounded-[5rem] border-[16px] border-primary/5 shadow-3xl text-center space-y-12">
              <h2 className="text-6xl md:text-9xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                {t('trustTitle')}
              </h2>
              <p className="text-3xl md:text-5xl font-bold leading-tight italic opacity-90 text-foreground/80 max-w-4xl mx-auto">
                {t('trustDesc')}
              </p>
              <div className="flex justify-center gap-6">
                 <div className="h-4 w-32 bg-primary rounded-full"></div>
                 <div className="h-4 w-16 bg-primary/30 rounded-full"></div>
                 <div className="h-4 w-8 bg-primary/10 rounded-full"></div>
              </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS (CONTACT) */}
      <section className="py-20 bg-card border-t-8 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
                className={`${social.color} text-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:scale-105 hover:shadow-2xl transition-all shadow-xl font-black uppercase tracking-tighter text-lg text-center group`}
              >
                <div className="group-hover:rotate-12 transition-transform scale-125 mb-2">
                  {social.icon}
                </div>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
