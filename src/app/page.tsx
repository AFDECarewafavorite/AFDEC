'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  ShoppingBag,
  ListOrdered,
  Briefcase,
  LayoutDashboard,
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
      icon: <ListOrdered className="h-8 w-8 md:h-12 md:w-12" />,
      title: t('bookNow'),
      description: t('bookNowCardDesc'),
    },
    {
      href: '/agent',
      icon: <Briefcase className="h-8 w-8 md:h-12 md:w-12" />,
      title: t('agentPortal'),
      description: t('agentPortalCardDesc'),
    },
    {
      href: '/admin',
      icon: <LayoutDashboard className="h-8 w-8 md:h-12 md:w-12" />,
      title: t('dashboard'),
      description: t('dashboardCardDesc'),
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
                className="mb-6 bg-primary/20 text-primary px-6 py-2 text-sm font-bold uppercase tracking-widest"
              >
                AFDEC Online Chicken Booking
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline text-primary mb-8 drop-shadow-sm">
                {t('heroTitle')}
              </h1>
              <p className="text-lg md:text-2xl leading-relaxed text-foreground/90 max-w-2xl mx-auto mb-12 font-medium">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Button asChild size="lg" className="h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20">
                  <Link href="/booking">
                    {t('bookNow')} <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold border-2">
                  <a href="#how-it-works">{t('learnMore')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Navigation Grid (Grips) - 2 columns on mobile */}
        <section id="navigation-grid" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight font-headline text-primary uppercase">
                {t('navigateTo')}
              </h2>
              <p className="mt-4 text-base md:text-xl text-foreground/90 max-w-2xl mx-auto font-medium">
                {t('navigateToSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
              {navCards.map((card, idx) => (
                <Link 
                  href={card.href} 
                  key={card.href} 
                  className={cn(
                    "group",
                    idx === 2 ? "col-span-2 md:col-span-1" : ""
                  )}
                >
                  <Card className="h-full border-2 border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader className="flex flex-col items-center text-center p-4 md:p-8 pb-2">
                      <div className="flex items-center justify-center h-14 w-14 md:h-24 md:w-24 rounded-2xl bg-primary/20 text-primary mb-4 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        {card.icon}
                      </div>
                      <CardTitle className="font-headline text-base md:text-3xl font-black group-hover:text-primary transition-colors leading-tight">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-foreground/80 px-4 md:px-8 pb-6 md:pb-10">
                      <p className="text-xs md:text-lg leading-snug md:leading-relaxed line-clamp-2 font-medium">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bird Catalog Section */}
        <section id="bird-types" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight font-headline text-primary uppercase">
                {t('whatWeOffer')}
              </h2>
              <p className="mt-4 text-base md:text-xl text-foreground/90 max-w-2xl mx-auto font-medium">
                {t('whatWeOfferSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {areProductsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="flex flex-col overflow-hidden">
                    <Skeleton className="w-full h-40 md:h-56 rounded-none" />
                    <CardContent className="p-4 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-14 w-full" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : products?.length ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden flex flex-col border-2 border-transparent hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-40 md:h-56 w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                    <CardContent className="p-4 md:p-8 flex-1 flex flex-col">
                      <CardTitle className="font-headline text-lg md:text-2xl font-black mb-3 text-primary">
                        {product.name}
                      </CardTitle>
                      <p className="text-foreground/80 text-xs md:text-base mb-6 flex-1 line-clamp-3 font-medium">
                        {product.description}
                      </p>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-auto">
                        {product.maturity && (
                          <Badge variant="outline" className="border-primary/40 text-primary w-fit text-xs font-bold px-3 py-1">
                            {product.maturity}
                          </Badge>
                        )}
                        <p className="font-black text-primary text-sm md:text-xl">
                          ₦{product.bookingFeePerUnit} {t('fee')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center col-span-full py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-primary/20">
                  <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground opacity-30" />
                  <p className="mt-6 text-xl text-muted-foreground font-bold">
                    {t('noProductsAvailable')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-headline text-primary mb-16 uppercase">
              {t('howItWorks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {[
                { icon: <ListOrdered className="h-8 w-8" />, title: t('step1Title'), desc: t('step1Desc') },
                { icon: <Phone className="h-8 w-8" />, title: t('step2Title'), desc: t('step2Desc') },
                { icon: <ShoppingBag className="h-8 w-8" />, title: t('step3Title'), desc: t('step3Desc') },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="flex items-center justify-center h-20 w-20 rounded-3xl bg-primary text-primary-foreground mb-8 shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-foreground/90 leading-relaxed text-base md:text-lg font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
