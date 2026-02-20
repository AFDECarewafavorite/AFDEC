'use client';

import { Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import Logo from '../logo';
import { useLanguage } from '@/context/language-provider';

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="bg-card text-card-foreground py-24 border-t-[12px] border-primary/5">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-16 text-center md:text-left">
                <div className='flex flex-col items-center md:items-start space-y-8'>
                   <div className="flex items-center gap-4">
                        <Logo width={80} height={80} />
                        <div>
                            <span className="font-headline font-black text-5xl text-primary italic block leading-none">AFDEC</span>
                            <span className="text-xs font-bold opacity-50 uppercase tracking-tighter">ArewaFavorite Domestic Earning Corp</span>
                        </div>
                   </div>
                   <p className="text-xl font-bold text-foreground/80 max-w-sm italic">
                        {t('footerSlogan')}
                    </p>
                </div>

                <div className="space-y-10">
                    <h3 className="font-black text-3xl text-primary uppercase tracking-tighter">{t('sellToUsTitle')}</h3>
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-2xl font-bold text-muted-foreground hover:text-primary transition-colors">
                            <MessageCircle className="w-8 h-8"/>
                            <span>{t('whatsApp')}</span>
                        </a>
                        <a href="tel:+2341234567890" className="flex items-center gap-4 text-2xl font-bold text-muted-foreground hover:text-primary transition-colors">
                            <Phone className="w-8 h-8"/>
                            <span>{t('callUs')}</span>
                        </a>
                        <a href="mailto:info@afdec.online" className="flex items-center gap-4 text-2xl font-bold text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-8 h-8"/>
                            <span>{t('emailUs')}</span>
                        </a>
                    </div>
                </div>
                
                <div className="space-y-10">
                    <h3 className="font-black text-3xl text-primary uppercase tracking-tighter">Quick Links</h3>
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <Link href="/booking" className="text-2xl font-bold text-muted-foreground hover:text-primary">{t('bookNow')}</Link>
                        <Link href="/check-status" className="text-2xl font-bold text-muted-foreground hover:text-primary">{t('checkBookingStatus')}</Link>
                        <Link href="/signup" className="text-2xl font-bold text-muted-foreground hover:text-primary">Become Partner</Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-20 pt-12 border-t-4 border-primary/5">
                <p className="text-lg font-bold text-foreground/50 text-center uppercase tracking-widest">
                    {t('copyright').replace('{year}', '2026')}
                </p>
                <p className="text-center text-xs opacity-30 mt-4 uppercase tracking-[0.5em]">ArewaFavorite Domestic Earning Corporation</p>
            </div>
        </footer>
    );
}
