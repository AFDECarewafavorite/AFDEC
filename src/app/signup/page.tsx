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
import { Mail, Lock, User as UserIcon, Phone, Loader } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/types';
import { useLanguage } from '@/context/language-provider';

export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !auth) {
      toast({
        variant: "destructive",
        title: "Firebase not initialized",
        description: "Please try again in a moment.",
      });
      return;
    }
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
          // --- DEMO ACCOUNT LOGIC ---
          // This logic is for testing convenience. In a real production app,
          // roles would be assigned by a CEO from the admin dashboard.
          const isDemoCEO = email === 'ceo@afdec.online';
          const isDemoManager = email === 'manager@afdec.online';
          const isDemoAgent = email === 'agent@afdec.online';

          let role: UserRole = 'Customer';
          if (isDemoCEO) role = 'CEO';
          else if (isDemoManager) role = 'Manager';
          else if (isDemoAgent) role = 'Agent';
          // --- END DEMO ACCOUNT LOGIC ---

          const userProfile = {
              id: user.uid,
              role: role,
              phone: phone,
              language: 'en',
              email: user.email,
              fullName: fullName,
              isSuspended: false,
          };
          const userRef = doc(firestore, 'users', user.uid);
          setDocumentNonBlocking(userRef, userProfile, { merge: true });

          // Create role-specific documents for demo accounts
          if (isDemoCEO) {
            const ceoRoleRef = doc(firestore, 'roles_ceo', user.uid);
            setDocumentNonBlocking(ceoRoleRef, { userId: user.uid }, { merge: true });
          } else if (isDemoManager) {
            const managerRoleRef = doc(firestore, 'roles_manager', user.uid);
            setDocumentNonBlocking(managerRoleRef, { userId: user.uid }, { merge: true });
          } else if (isDemoAgent) {
            const agentProfile = {
              id: user.uid,
              userId: user.uid,
              name: fullName,
              referralCode: `${fullName.split(' ')[0].toUpperCase()}${user.uid.slice(0,4)}`,
              totalCommission: 0,
              availableBalance: 0,
              totalBookings: 0,
            };
            const agentRef = doc(firestore, 'agents', user.uid);
            setDocumentNonBlocking(agentRef, agentProfile, { merge: true });
          }
          
          toast({
            title: "Account Created",
            description: "You have been successfully signed up.",
          });
          router.push('/');
      }
    } catch(error: any) {
        console.error("Error signing up:", error);
        toast({
            variant: "destructive",
            title: "Sign-up Failed",
            description: error.message || "Could not create your account. Please try again.",
        })
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className='mx-auto mb-4'>
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">{t('createAnAccount')}</CardTitle>
          <CardDescription>
            {t('signupSubtitle')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                <p className="font-bold text-left">{t('creatingDemoAccounts')}</p>
                <p className="text-left">{t('creatingDemoAccountsDesc')}</p>
                <ul className="text-left mt-2 space-y-1">
                    <li><strong>{t('ceoAccount')}</strong> <code className="font-mono text-xs">ceo@afdec.online</code></li>
                    <li><strong>{t('managerAccount')}</strong> <code className="font-mono text-xs">manager@afdec.online</code></li>
                    <li><strong>{t('agentAccount')}</strong> <code className="font-mono text-xs">agent@afdec.online</code></li>
                </ul>
            </div>
            <div className="space-y-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
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
                    disabled={isLoading}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
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
                    disabled={isLoading}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">{t('phoneNumber')}</Label>
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
                    disabled={isLoading}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder={t('passwordMinLength')}
                    className="pl-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2" />}
                {isLoading ? t('creatingAccount') : t('signUp')}
            </Button>
            </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="underline hover:text-primary">
              {t('login')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
