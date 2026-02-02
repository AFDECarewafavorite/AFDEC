'use client';

import { useState } from 'react';
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
import { Mail, Lock, User as UserIcon, Phone } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // We await user creation here to reliably get the user's UID.
      // This is crucial for creating their corresponding profile document in Firestore.
      // While we generally prefer non-blocking calls, this one-time action on signup
      // ensures data integrity between Auth and Firestore.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
          const userProfile = {
              id: user.uid,
              role: 'Customer', // Default role
              phone: phone,
              language: 'en',
              email: user.email,
              fullName: fullName,
          };
          const userRef = doc(firestore, 'users', user.uid);
          setDocumentNonBlocking(userRef, userProfile, { merge: true });
          router.push('/');
      }
    } catch(error: any) {
        console.error("Error signing up:", error);
        toast({
            variant: "destructive",
            title: "Sign-up Failed",
            description: error.message || "Could not create your account. Please try again.",
        })
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className='mx-auto mb-4'>
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join AFDEC to start booking your chickens today.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Tunde Ednut"
                    required
                    className="pl-10 h-12"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    required
                    className="pl-10 h-12"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    className="pl-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base">
                Sign Up
            </Button>
            </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="underline hover:text-primary">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
