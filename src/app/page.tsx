
'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Users,
  MessageCircle,
  TrendingUp,
  Package,
  BadgeCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

const WhatsAppIcon = ({className}: {className?: string}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full py-20 md:py-32 border-b overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="absolute inset-0 object-cover w-full h-full opacity-10"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl font-headline text-primary mb-8 uppercase leading-tight drop-shadow-sm">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-3xl font-bold text-foreground/90 max-w-3xl mx-auto mb-12 italic leading-snug">
                {t('heroSubtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Button asChild size="lg" className="h-16 px-8 text-xl font-black uppercase rounded-2xl shadow-xl">
                  <Link href="/booking">
                    <ShoppingBag className="mr-3 h-6 w-6" /> {t('bookNow')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-8 text-xl font-black uppercase rounded-2xl border-4 border-accent text-accent hover:bg-accent hover:text-white transition-all">
                  <Link href="#sell-to-us">
                    <TrendingUp className="mr-3 h-6 w-6" /> {t('sellYourChicken')}
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="h-16 px-8 text-xl font-black uppercase rounded-2xl col-span-1 sm:col-span-2 lg:col-span-1">
                  <Link href="/check-status">
                    {t('checkBookingStatus')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* HOW BOOKING WORKS */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black font-headline text-primary uppercase tracking-tighter mb-4">
                {t('howBookingWorks')}
              </h2>
              <div className="h-2 w-24 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <Card key={num} className="border-4 border-primary/10 hover:border-primary transition-all rounded-3xl overflow-hidden text-center p-6 bg-card/50">
                   <div className="h-16 w-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-lg">
                      {num}
                   </div>
                   <h3 className="text-2xl font-black uppercase mb-4 text-primary tracking-tight">
                    {t(`step${num}Title`)}
                   </h3>
                   <p className="text-lg font-bold opacity-80 leading-tight">
                    {t(`step${num}Desc`)}
                   </p>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 bg-primary/10 p-8 rounded-3xl border-2 border-dashed border-primary text-center">
              <p className="text-2xl font-black text-primary uppercase tracking-tight">
                <BadgeCheck className="inline-block mr-3 h-8 w-8" />
                Quick Note: We call you within 5 minutes of your payment!
              </p>
            </div>
          </div>
        </section>

        {/* SELL TO US SECTION */}
        <section id="sell-to-us" className="py-20 md:py-32 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Badge className="bg-accent text-white text-xl font-black px-6 py-2 uppercase rounded-xl">
                  {t('sellToUsTitle')}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black font-headline text-accent uppercase tracking-tighter leading-none">
                  Struggling to find buyers?
                </h2>
                <p className="text-2xl font-bold leading-snug opacity-90 italic">
                  {t('sellToUsDesc')}
                </p>
                <p className="text-xl font-bold text-accent">
                  {t('whySellToUs')}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="h-16 px-8 text-xl font-black bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-xl">
                    <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="mr-3 h-6 w-6" /> {t('whatsApp')}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-16 px-8 text-xl font-black border-4 border-accent text-accent rounded-2xl">
                    <a href="tel:+2341234567890">
                      <Phone className="mr-3 h-6 w-6" /> {t('callUs')}
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border-8 border-accent/20 shadow-2xl">
                 <Image
                    src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                    alt="Mature chickens"
                    fill
                    className="object-cover"
                    data-ai-hint="mature chicken"
                 />
                 <div className="absolute bottom-6 left-6 right-6 bg-accent p-6 rounded-2xl shadow-2xl">
                    <p className="text-white font-black text-3xl uppercase leading-none italic">
                      Fair Price. Fast Payment. No Stories.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHALLENGES & SOLUTIONS */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter font-headline text-primary uppercase drop-shadow-sm">
                {t('challengesTitle')}
              </h2>
              <p className="text-2xl font-bold mt-4 opacity-70 italic">{t('challengesSubtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { prob: 'probFeed', sol: 'solFeed', icon: <Package className="text-red-500" /> },
                { prob: 'probSickness', sol: 'solSickness', icon: <AlertTriangle className="text-yellow-500" /> },
                { prob: 'probMarket', sol: 'solMarket', icon: <TrendingUp className="text-green-500" /> },
                { prob: 'probTools', sol: 'solTools', icon: <ShoppingBag className="text-blue-500" /> },
                { prob: 'probCare', sol: 'solCare', icon: <BadgeCheck className="text-purple-500" /> },
              ].map((item, i) => (
                <Card key={i} className="border-4 rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
                  <CardHeader className="bg-muted/50 p-6 flex flex-row items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                      {item.icon}
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">
                      {t(item.prob)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-xl font-bold opacity-80 leading-snug">
                      {t(item.sol)}
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-4 border-primary bg-primary/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                 <h3 className="text-3xl font-black uppercase text-primary mb-4 italic">AFDEC Support</h3>
                 <p className="text-xl font-bold">We guide you from Day 1 until you sell your birds!</p>
              </Card>
            </div>
          </div>
        </section>

        {/* AGENT PROGRAM */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter">
                {t('agentProgramTitle')}
              </h2>
              <p className="text-2xl md:text-3xl font-bold opacity-90">
                {t('agentProgramDesc')}
              </p>
              <div className="bg-white p-8 md:p-12 rounded-3xl border-4 border-primary shadow-2xl transform rotate-1">
                <p className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tight leading-none">
                  {t('earnPerChick')}
                </p>
              </div>
              <Button asChild size="lg" className="h-20 px-12 text-2xl font-black uppercase rounded-2xl shadow-xl mt-8">
                <Link href="/signup">
                  {t('registerAsAgent')} <Users className="ml-3 h-8 w-8" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-20 md:py-32 border-t-8 border-primary/20">
          <div className="container mx-auto px-4">
             <div className="bg-card p-10 md:p-20 rounded-[3rem] border-4 border-primary/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <BadgeCheck className="h-64 w-64 text-primary" />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter mb-8">
                    {t('trustTitle')}
                  </h2>
                  <p className="text-2xl md:text-3xl font-bold leading-snug italic opacity-90">
                    {t('trustDesc')}
                  </p>
                </div>
             </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'whatsApp', icon: <WhatsAppIcon />, href: 'https://wa.me/2341234567890', color: 'bg-green-600' },
                  { label: 'callUs', icon: <Phone />, href: 'tel:+2341234567890', color: 'bg-blue-600' },
                  { label: 'facebook', icon: <MessageCircle />, href: '#', color: 'bg-blue-800' },
                  { label: 'instagram', icon: <Users />, href: '#', color: 'bg-pink-600' },
                  { label: 'emailUs', icon: <ShoppingBag />, href: 'mailto:info@afdec.online', color: 'bg-red-600' },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    className={`${social.color} text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl font-black uppercase tracking-tighter text-sm`}
                  >
                    {social.icon}
                    {t(social.label)}
                  </a>
                ))}
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
