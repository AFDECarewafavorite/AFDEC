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
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="absolute inset-0 object-cover w-full h-full opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <div className="max-w-3xl mx-auto">
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/20 text-primary"
              >
                AFDEC Online Chicken Booking
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/booking">
                    {t('bookNow')} <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#how-it-works">{t('learnMore')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="navigation-grid" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              {t('navigateTo')}
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('navigateToSubtitle')}
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {navCards.map((card) => (
                <Link href={card.href} key={card.href}>
                  <Card className="h-full transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer flex flex-col">
                    <CardHeader className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                        {card.icon}
                      </div>
                      <CardTitle className="font-headline text-2xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-foreground/70 flex-1">
                      <p>{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="bird-types" className="py-16 sm:py-24 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              {t('whatWeOffer')}
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('whatWeOfferSubtitle')}
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {areProductsLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="flex flex-col">
                    <CardHeader className="p-0">
                      <Skeleton className="w-full h-48" />
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full mt-4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                      <div className="mt-4 flex justify-between items-center">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {!areProductsLoading &&
                products?.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col"
                  >
                    <CardHeader className="p-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={product.imageWidth}
                        height={product.imageHeight}
                        className="w-full h-48 object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <CardTitle className="font-headline text-xl">
                        {product.name}
                      </CardTitle>
                      <p className="mt-2 text-foreground/70 flex-1">
                        {product.description}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        {product.maturity && (
                          <Badge
                            variant="outline"
                            className="border-primary/50 text-primary"
                          >
                            {t('maturity')}: {product.maturity}
                          </Badge>
                        )}
                        <p className="font-semibold text-primary">
                          ₦{product.bookingFeePerUnit} {t('fee')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {!areProductsLoading && products?.length === 0 && (
              <div className="text-center col-span-full py-16">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  {t('noProductsAvailable')}
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              {t('howItWorks')}
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('howItWorksSubtitle')}
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <ListOrdered />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  {t('step1Title')}
                </h3>
                <p className="mt-2 text-foreground/70">
                  {t('step1Desc')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <Phone />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  {t('step2Title')}
                </h3>
                <p className="mt-2 text-foreground/70">
                  {t('step2Desc')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <ShoppingBag />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  {t('step3Title')}
                </h3>
                <p className="mt-2 text-foreground/70">
                  {t('step3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="lifecycle" className="py-16 sm:py-24 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              {t('fromChickToMarket')}
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('fromChickToMarketSubtitle')}
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Shield className="text-primary" />
                    {t('dayOldChicks')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    {t('dayOldChicksDesc')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Clock className="text-primary" />
                    {t('growerStage')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    {t('growerStageDesc')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Award className="text-primary" />
                    {t('maturityAndMarket')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    {t('maturityAndMarketDesc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
