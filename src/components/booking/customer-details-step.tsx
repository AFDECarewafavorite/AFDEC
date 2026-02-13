'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import type { BookingData } from '@/lib/types';
import { useLanguage } from '@/context/language-provider';

interface CustomerDetailsStepProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
}

export default function CustomerDetailsStep({
  bookingData,
  onUpdateData,
}: CustomerDetailsStepProps) {
  const { t } = useLanguage();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold font-headline text-primary">
        {t('bookingStep3Title')}
      </h2>
      <p className="mt-2 text-lg text-foreground/80">
        {t('bookingStep3Subtitle')}
      </p>
      <Card className="mt-8 text-left">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-lg">{t('fullName')}</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="e.g. Tunde Ednut"
              value={bookingData.fullName}
              onChange={handleChange}
              className="h-12 text-lg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg">{t('phoneNumberRequired')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 08012345678"
              value={bookingData.phone}
              onChange={handleChange}
              className="h-12 text-lg"
              required
            />
            <p className="text-sm text-muted-foreground">{t('phoneNumberDesc')}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-lg">{t('location')}</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Lagos, Ikeja"
              value={bookingData.location}
              onChange={handleChange}
              className="h-12 text-lg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referralCode" className="text-lg">{t('referralCodeOptional')}</Label>
            <Input
              id="referralCode"
              name="referralCode"
              placeholder="Enter agent code if you have one"
              value={bookingData.referralCode}
              onChange={handleChange}
              className="h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
