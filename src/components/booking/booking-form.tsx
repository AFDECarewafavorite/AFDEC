'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { BookingData, Product } from '@/lib/types';
import StepIndicator from '@/components/booking/step-indicator';
import SelectBirdStep from '@/components/booking/select-bird-step';
import SelectQuantityStep from '@/components/booking/select-quantity-step';
import CustomerDetailsStep from '@/components/booking/customer-details-step';
import SummaryStep from '@/components/booking/summary-step';
import Confirmation from '@/components/booking/confirmation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader } from 'lucide-react';
import {
  useUser,
  useAuth,
  useFirestore,
  addDocumentNonBlocking,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { collection, serverTimestamp, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { calculateBookingFee } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/language-provider';

const TOTAL_STEPS = 4;

const initialBookingData: BookingData = {
  birdType: null,
  quantity: 1,
  fullName: '',
  phone: '',
  location: '',
  referralCode: '',
};

export default function BookingForm({ initialReferralCode }: { initialReferralCode: string | null }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'products'), where('isActive', '==', true)) : null),
    [firestore]
  );
  const { data: products, isLoading: areProductsLoading } = useCollection<Product>(productsQuery);


  useEffect(() => {
    if (initialReferralCode) {
      updateData({ referralCode: initialReferralCode });
    }
  }, [initialReferralCode]);

  useEffect(() => {
    // If user is not logged in and we are done checking, sign them in anonymously.
    if (!user && !isUserLoading) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const selectedProduct = useMemo(
    () => products?.find((b) => b.id === bookingData.birdType),
    [products, bookingData.birdType]
  );

  const updateData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleConfirm = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be signed in to create a booking.',
      });
      return;
    }

    if (!selectedProduct) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please select a product.',
      });
      return;
    }

    const bookingPayload = {
      customerId: user.uid,
      fullName: bookingData.fullName,
      phone: bookingData.phone,
      location: bookingData.location,
      birdType: bookingData.birdType,
      quantity: bookingData.quantity,
      bookingFee: calculateBookingFee(selectedProduct, bookingData.quantity),
      agentId: bookingData.referralCode || null,
      status: 'pending' as const,
      createdAt: serverTimestamp(),
      customerAvatar:
        user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
    };

    const bookingsRef = collection(firestore, 'users', user.uid, 'bookings');
    addDocumentNonBlocking(bookingsRef, bookingPayload).then((docRef) => {
      if (docRef) {
        setBookingId(docRef.id);
      } else {
        // Fallback for optimistic UI
        setBookingId(`AFDEC-${Date.now().toString().slice(-6)}`);
      }
    });

    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return <Confirmation bookingId={bookingId} phone={bookingData.phone} />;
  }

  const renderStepContent = () => {
    if (areProductsLoading) {
        return (
            <div className="space-y-4 text-center">
                <Loader className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">{t('loadingProducts')}</p>
            </div>
        )
    }

    switch (step) {
      case 1:
        return (
          <SelectBirdStep
            bookingData={bookingData}
            onUpdateData={updateData}
            onNextStep={nextStep}
            products={products || []}
          />
        );
      case 2:
        return (
          <SelectQuantityStep
            bookingData={bookingData}
            onUpdateData={updateData}
            product={selectedProduct}
          />
        );
      case 3:
        return (
          <CustomerDetailsStep
            bookingData={bookingData}
            onUpdateData={updateData}
          />
        );
      case 4:
        return <SummaryStep bookingData={bookingData} product={selectedProduct} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 px-4">
      <div className="space-y-8">
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={prevStep} size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('back')}
              </Button>
            )}
          </div>
          <div>
            {step < TOTAL_STEPS && (
              <Button
                onClick={nextStep}
                size="lg"
                disabled={
                  (step === 1 && !bookingData.birdType) ||
                  (step === 3 &&
                    (!bookingData.fullName ||
                      !bookingData.phone ||
                      !bookingData.location))
                }
              >
                {t('next')}
              </Button>
            )}
            {step === TOTAL_STEPS && (
              <Button
                onClick={handleConfirm}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {t('confirmAndPay')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
