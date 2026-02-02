import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Phone, Mail, Clock, Shield, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BIRD_TYPES } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

const WhatsAppIcon = ({className}: {className?:string}) => (
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

const FacebookIcon = ({className}: {className?:string}) => (
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
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);


export default function Home() {
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
                Book Your Chickens Online, Simply.
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
                The easiest way to book day-old chicks, growers, and mature
                chickens in Nigeria. A simple, step-by-step process right from
                your phone.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/booking">
                    Book Now <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#how-it-works">Learn More</a>
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
              {BIRD_TYPES.map((bird) => (
                <Card
                  key={bird.id}
                  className="overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={bird.image.src}
                      alt={bird.name}
                      width={bird.image.width}
                      height={bird.image.height}
                      className="w-full h-48 object-cover"
                      data-ai-hint={bird.image.hint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <CardTitle className="font-headline text-xl">
                      {bird.name}
                    </CardTitle>
                    <p className="mt-2 text-foreground/70 flex-1">
                      {bird.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                        {bird.maturity && (
                            <Badge
                            variant="outline"
                            className="border-primary/50 text-primary"
                            >
                            Maturity: {bird.maturity}
                            </Badge>
                        )}
                         <p className="font-semibold text-primary">
                            ₦{bird.bookingFeePerUnit} fee
                        </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline text-primary">
              How It Works
            </h2>
            <p className="mt-4 text-center text-lg text-foreground/80 max-w-2xl mx-auto">
              A simple 3-step process to secure your booking.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <span className="font-bold text-2xl font-headline">1</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  Book Online
                </h3>
                <p className="mt-2 text-foreground/70">
                  Use our simple form to choose your bird type, quantity, and
                  pay a small booking fee.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <Phone />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  Get a Call
                </h3>
                <p className="mt-2 text-foreground/70">
                  Our manager will call you to confirm details like collection
                  date, location, and balance payment.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <CheckCircle />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-headline">
                  Collect Your Birds
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
                Understand the journey of our birds and what to expect at each stage.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Shield className="text-primary"/>
                                Day-Old Chicks
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/70">The first few weeks are crucial. Our day-old chicks are from top-tier hatcheries, giving them a healthy start. They require warmth, special feed, and close monitoring.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Clock className="text-primary"/>
                                Grower Stage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/70">After the initial delicate phase, they enter the grower stage. At 4 weeks, they are more resilient and experience rapid growth, building the framework for a healthy mature bird.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Award className="text-primary"/>
                                Maturity & Market
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/70">Our broiler breeds typically reach full maturity for meat production in just 5-6 weeks. At this point, they have achieved their optimal weight and are ready for the market.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="font-bold text-primary">Contact Us</p>
            <div className="flex justify-center items-center gap-6 my-4">
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <WhatsAppIcon className="w-6 h-6"/>
                    <span className="sr-only">WhatsApp</span>
                </a>
                <a href="https://facebook.com/afdec" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <FacebookIcon className="w-6 h-6"/>
                    <span className="sr-only">Facebook</span>
                </a>
                <a href="tel:+2348000000000" className="text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-6 h-6"/>
                    <span className="sr-only">Call Us</span>
                </a>
                <a href="mailto:info@afdec.online" className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-6 h-6"/>
                    <span className="sr-only">Email Us</span>
                </a>
            </div>
          <p className="font-bold text-primary mt-6">Important Business Notice</p>
          <p className="text-sm text-foreground/70 max-w-3xl mx-auto mt-2">
            Booking does not guarantee immediate delivery. Allocation details,
            final balance, and collection date will be communicated by the
            manager via the phone number you provide.
          </p>
          <p className="text-sm text-foreground/50 mt-4">
            © {new Date().getFullYear()} AFDEC Online. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
