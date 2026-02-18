'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  ListOrdered,
  Briefcase,
  Search,
  Tag,
  Bird,
  TrendingUp,
  Settings,
  Phone,
  Mail,
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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';

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
  const firestore = useFirestore();
  const { t } = useLanguage();

  const productsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'products'), where('isActive', '==', true))
        : null,
    [firestore]
  );
  const { data: products, isLoading: areProductsLoading } =
    useCollection<Product>(productsQuery);

  const navCards = [
    {
      href: '/booking',
      icon: <ListOrdered className="h-10 w-10 md:h-16 md:w-16" />,
      title: t('bookNow'),
      description: t('bookNowCardDesc'),
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      href: '#bird-types',
      icon: <Tag className="h-10 w-10 md:h-16 md:w-16" />,
      title: t('sale'),
      description: t('saleCardDesc'),
      color: "text-red-500",
      bgColor: "bg-red-500/20"
    },
    {
      href: '/check-status',
      icon: <Search className="h-10 w-10 md:h-16 md:w-16" />,
      title: t('checkBookingStatus'),
      description: t('checkStatusDesc'),
      color: "text-blue-500",
      bgColor: "bg-blue-500/20"
    },
    {
      href: '/agent',
      icon: <Briefcase className="h-10 w-10 md:h-16 md:w-16" />,
      title: t('agentPortal'),
      description: t('agentPortalCardDesc'),
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 border-b overflow-hidden">
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
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <Badge
                variant="secondary"
                className="mb-6 bg-primary/20 text-primary px-8 py-3 text-lg font-black uppercase tracking-widest border-2 border-primary/30"
              >
                AFDEC Online
              </Badge>
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl font-headline text-primary mb-8 drop-shadow-2xl uppercase">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-3xl leading-relaxed text-foreground/90 max-w-3xl mx-auto mb-12 font-bold italic">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Button asChild size="lg" className="h-16 px-12 text-2xl font-black shadow-2xl shadow-primary/40 uppercase rounded-2xl">
                  <Link href="/booking">
                    {t('bookNow')} <ArrowRight className="ml-3 h-8 w-8" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-12 text-2xl font-black uppercase rounded-2xl border-4">
                  <Link href="#how-it-works">
                    {t('learnMore')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Grid (4 Items, 2-column on mobile) */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {navCards.map((card) => (
                <Link 
                  href={card.href} 
                  key={card.href} 
                  className="group"
                >
                  <Card className="h-full border-4 border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 rounded-3xl overflow-hidden">
                    <CardHeader className="flex flex-col items-center text-center p-4 md:p-8">
                      <div className={cn(
                        "flex items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-2xl md:rounded-3xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border-2 border-white/5",
                        card.bgColor,
                        card.color
                      )}>
                        {card.icon}
                      </div>
                      <CardTitle className="font-headline text-lg md:text-2xl font-black group-hover:text-primary transition-colors leading-tight uppercase tracking-tighter">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-foreground/80 px-4 pb-8 hidden md:block">
                      <p className="text-sm font-bold leading-tight">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learn More / Process Section */}
        <section id="how-it-works" className="py-20 md:py-32 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-primary text-primary-foreground text-xl font-black px-6 py-2 uppercase rounded-xl">
                  {t('rearingToProfitTitle')}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                  {t('fromChickToMarket')}
                </h2>
                <p className="text-2xl font-bold italic opacity-90 leading-snug">
                  {t('rearingToProfitDesc')}
                </p>
                <div className="space-y-6 pt-4">
                  <div className="flex gap-6">
                    <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Bird className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase text-primary tracking-tighter">{t('dayOldChicks')}</h3>
                      <p className="text-lg font-bold opacity-70">{t('dayOldChicksDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-16 w-16 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase text-accent tracking-tighter">{t('maturityAndMarket')}</h3>
                      <p className="text-lg font-bold opacity-70">{t('maturityAndMarketDesc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-16 w-16 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Settings className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase text-blue-500 tracking-tighter">{t('feedsAndTools')}</h3>
                      <p className="text-lg font-bold opacity-70">{t('feedsAndToolsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[700px] rounded-3xl overflow-hidden border-8 border-primary/20 shadow-2xl">
                 <Image
                    src="https://picsum.photos/seed/chicken-chicks/800/1200"
                    alt="Chicken and Chicks"
                    fill
                    className="object-cover"
                    data-ai-hint="chicken chicks"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div className="bg-primary p-6 rounded-2xl shadow-2xl">
                        <p className="text-primary-foreground font-black text-3xl uppercase leading-none italic">
                            Buy {"->"} Rear {"->"} Sell {"->"} Profit
                        </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bird Catalog Section (SALE) */}
        <section id="bird-types" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <Badge className="bg-red-500 text-white px-6 py-2 text-xl font-black mb-4 animate-pulse uppercase">
                {t('sale')}
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter font-headline text-primary uppercase drop-shadow-lg">
                {t('whatWeOffer')}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
              {areProductsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="flex flex-col overflow-hidden border-4">
                    <Skeleton className="w-full h-48 md:h-64 rounded-none" />
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : products?.length ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden flex flex-col border-4 border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 rounded-3xl"
                  >
                    <div className="relative h-40 md:h-64 w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                    <CardContent className="p-4 md:p-8 flex-1 flex flex-col bg-card/80">
                      <CardTitle className="font-headline text-xl md:text-3xl font-black mb-2 md:mb-4 text-primary uppercase tracking-tighter">
                        {product.name}
                      </CardTitle>
                      <p className="text-foreground/90 text-sm md:text-lg mb-4 md:mb-8 flex-1 line-clamp-2 md:line-clamp-3 font-bold italic leading-tight">
                        {product.description}
                      </p>
                      <div className="flex flex-col gap-2 md:gap-4 mt-auto">
                        <Badge variant="outline" className="border-primary/40 text-primary w-fit text-xs md:text-sm font-black px-3 py-1 uppercase">
                          {product.maturity}
                        </Badge>
                        <p className="font-black text-primary text-xl md:text-3xl tracking-tighter">
                          ₦{product.bookingFeePerUnit} <span className="text-xs md:text-sm uppercase opacity-70">{t('fee')}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center col-span-full py-24 bg-muted/20 rounded-3xl border-4 border-dashed border-primary/20">
                  <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground opacity-30" />
                  <p className="mt-8 text-2xl text-muted-foreground font-black uppercase">
                    {t('noProductsAvailable')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact to Sell Section */}
        <section className="py-20 md:py-32 bg-accent/10 border-t-8 border-accent/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-5xl md:text-8xl font-black font-headline text-accent uppercase tracking-tighter mb-8 drop-shadow-lg">
              {t('contactToSell')}
            </h2>
            <p className="text-2xl md:text-4xl font-bold italic max-w-4xl mx-auto mb-16 opacity-90 leading-tight">
              {t('contactToSellDesc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button asChild size="lg" className="h-20 px-12 text-2xl font-black bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-2xl shadow-green-600/30">
                <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-3 h-8 w-8" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl border-4 border-accent text-accent hover:bg-accent hover:text-white">
                <a href="tel:+2341234567890">
                  <Phone className="mr-3 h-8 w-8" /> {t('callUs')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-2xl border-4 border-accent text-accent hover:bg-accent hover:text-white">
                <a href="mailto:sales@afdec.online">
                  <Mail className="mr-3 h-8 w-8" /> {t('emailUs')}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
