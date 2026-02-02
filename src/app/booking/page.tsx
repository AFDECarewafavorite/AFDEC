'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { BookingData } from '@/lib/types';
import { BIRD_TYPES } from '@/lib/placeholder-data';
import StepIndicator from '@/components/booking/step-indicator';
import SelectBirdStep from '@/components/booking/select-bird-step';
import SelectQuantityStep from '@/components/booking/select-quantity-step';
import CustomerDetailsStep from '@/components/booking/customer-details-step';
import SummaryStep from '@/components/booking/summary-step';
import Confirmation from '@/components/booking/confirmation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 4;

const initialBookingData: BookingData = {
  birdType: null,
  quantity: 10,
  fullName: '',
  phone: '',
  location: '',
  referralCode: '',
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const selectedBird = useMemo(
    () => BIRD_TYPES.find((b) => b.id === bookingData.birdType),
    [bookingData.birdType]
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
    // Simulate payment and booking creation
    console.log('Final Booking Data:', bookingData);
    const newBookingId = `AFDEC-${Date.now().toString().slice(-6)}`;
    setBookingId(newBookingId);
    setIsConfirmed(true);
  };
  
  if (isConfirmed) {
    return <Confirmation bookingId={bookingId} phone={bookingData.phone} />;
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <SelectBirdStep
            bookingData={bookingData}
            onUpdateData={updateData}
            onNextStep={nextStep}
          />
        );
      case 2:
        return (
          <SelectQuantityStep
            bookingData={bookingData}
            onUpdateData={updateData}
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
        return <SummaryStep bookingData={bookingData} bird={selectedBird} />;
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
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
                  (step === 3 && (!bookingData.fullName || !bookingData.phone || !bookingData.location))
                }
              >
                Next
              </Button>
            )}
            {step === TOTAL_STEPS && (
              <Button onClick={handleConfirm} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Confirm & Pay Booking Fee
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
