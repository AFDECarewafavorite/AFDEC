'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className='mx-auto mb-4'>
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Enter your phone number to receive a one-time password (OTP).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="0801 234 5678"
                required
                className="pl-10 h-12"
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-base">
            Send OTP
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
          <Button variant="outline" className="w-full h-12 text-base">
            <Mail className="mr-2 h-4 w-4" />
            Continue with Email
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our{' '}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
