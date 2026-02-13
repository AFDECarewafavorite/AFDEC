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

        <section id="bird-types" className="py-16 sm:py-24 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              What We Offer
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              Select from our range of high-quality birds to meet your poultry
              needs.
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
                            Maturity: {product.maturity}
                          </Badge>
                        )}
                        <p className="font-semibold text-primary">
                          ₦{product.bookingFeePerUnit} fee
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
                  No products available at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              How It Works
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              Secure your chickens in 3 simple steps.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <ListOrdered />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  1. Book & Join Queue
                </h3>
                <p className="mt-2 text-foreground/70">
                  Select your birds, quantity, and pay a small booking fee to
                  get your place in line.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <Phone />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  2. Get a Call
                </h3>
                <p className="mt-2 text-foreground/70">
                  Our manager will call to confirm your allocation, collection
                  date, and the final balance payment.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <ShoppingBag />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  3. Collect Your Birds
                </h3>
                <p className="mt-2 text-foreground/70">
                  Visit the collection point on the agreed date, pay the
                  balance, and collect your chickens.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="lifecycle" className="py-16 sm:py-24 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              From Chick to Market
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              Understand the journey of our birds and what to expect at each
              stage.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Shield className="text-primary" />
                    Day-Old Chicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    The first few weeks are crucial. Our day-old chicks are from
                    top-tier hatcheries, giving them a healthy start. They
                    require warmth, special feed, and close monitoring.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Clock className="text-primary" />
                    Grower Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    After the initial delicate phase, they enter the grower
                    stage. At 4 weeks, they are more resilient and experience
                    rapid growth, building the framework for a healthy mature
                    bird.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Award className="text-primary" />
                    Maturity & Market
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Our broiler breeds typically reach full maturity for meat
                    production in just 5-6 weeks. At this point, they have
                    achieved their optimal weight and are ready for the market.
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
