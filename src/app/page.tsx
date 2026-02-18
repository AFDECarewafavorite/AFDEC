'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  ShoppingBag,
  ListOrdered,
  Loader,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-provider';

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
      icon: <ListOrdered className="h-8 w-8" />,
      title: t('bookNow'),
      description: t('bookNowCardDesc'),
    },
    {
      href: '/agent',
      icon: <Briefcase className="h-8 w-8" />,
      title: t('agentPortal'),
      description: t('agentPortalCardDesc'),
    },
    {
      href: '/admin',
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: t('dashboard'),
      description: t('dashboardCardDesc'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 border-b">
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
            <div className="max-w-3xl mx-auto">
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/20 text-primary px-4 py-1"
              >
                AFDEC Online Chicken Booking
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-lg leading-8 text-foreground/80 max-w-2xl mx-auto mb-10">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/booking">
                    {t('bookNow')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <a href="#how-it-works">{t('learnMore')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Navigation Grid (Grips) */}
        <section id="navigation-grid" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">
                {t('navigateTo')}
              </h2>
              <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                {t('navigateToSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {navCards.map((card) => (
                <Link href={card.href} key={card.href} className="group">
                  <Card className="h-full border-2 border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center text-center pb-2">
                      <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-foreground/70 px-6 pb-8">
                      <p className="leading-relaxed">{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bird Catalog Section */}
        <section id="bird-types" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">
                {t('whatWeOffer')}
              </h2>
              <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                {t('whatWeOfferSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {areProductsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="flex flex-col overflow-hidden">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : products?.length ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <CardTitle className="font-headline text-xl mb-3">
                        {product.name}
                      </CardTitle>
                      <p className="text-foreground/70 text-sm mb-6 flex-1 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        {product.maturity && (
                          <Badge variant="outline" className="border-primary/30 text-primary">
                            {product.maturity}
                          </Badge>
                        )}
                        <p className="font-bold text-primary">
                          ₦{product.bookingFeePerUnit} {t('fee')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center col-span-full py-16 bg-muted/20 rounded-xl">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">
                    {t('noProductsAvailable')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-primary mb-12">
              {t('howItWorks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { icon: <ListOrdered />, title: t('step1Title'), desc: t('step1Desc') },
                { icon: <Phone />, title: t('step2Title'), desc: t('step2Desc') },
                { icon: <ShoppingBag />, title: t('step3Title'), desc: t('step3Desc') },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6 shadow-lg shadow-primary/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
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
