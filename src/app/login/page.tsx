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
import { Mail, Lock, Loader } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-provider';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
        toast({
            variant: "destructive",
            title: "Authentication service not ready",
            description: "Please wait a moment and try again.",
        });
        return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push('/');
    } catch (error: any) {
        console.error("Login failed:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.code === 'auth/invalid-credential' 
                ? 'Invalid email or password.' 
                : error.message || 'An unexpected error occurred.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">{t('welcomeBack')}</CardTitle>
          <CardDescription>
            {t('loginSubtitle')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                <p className="font-bold text-left">{t('loginForTesting')}</p>
                <p className='text-left'>{t('loginForTestingDesc').replace('Sign Up', t('signUp'))}</p>
                <ul className="text-left mt-2 space-y-1">
                    <li><strong>{t('ceoEmail')}</strong> <code className="font-mono text-xs">ceo@afdec.online</code></li>
                    <li><strong>{t('managerEmail')}</strong> <code className="font-mono text-xs">manager@afdec.online</code></li>
                    <li><strong>{t('agentEmail')}</strong> <code className="font-mono text-xs">agent@afdec.online</code></li>
                </ul>
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
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2" />}
                {isLoading ? t('loggingIn') : t('login')}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {t('dontHaveAccount')}{' '}
            <Link href="/signup" className="underline hover:text-primary">
              {t('signUp')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
