import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Logo from '../logo';

const WhatsAppIcon = ({className}: {className?: string}) => (
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

const FacebookIcon = ({className}: {className?: string}) => (
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


export default function Footer() {
    return (
        <footer className="bg-card text-card-foreground py-12">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div className='flex flex-col items-center md:items-start'>
                   <Logo />
                   <p className="text-sm text-foreground/70 max-w-xs mt-4">
                        The easiest way to book day-old chicks, growers, and mature
                        chickens in Nigeria.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-primary mb-4">Contact for Inquiries</h3>
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                            <WhatsAppIcon className="w-6 h-6"/>
                            <span className="font-medium">WhatsApp</span>
                        </a>
                        <a href="https://facebook.com/afdec" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                            <FacebookIcon className="w-6 h-6"/>
                            <span className="font-medium">Facebook</span>
                        </a>
                        <a href="tel:+2341234567890" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                            <Phone className="w-6 h-6"/>
                            <span className="font-medium">Call Us</span>
                        </a>
                        <a href="mailto:info@afdec.online" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-6 h-6"/>
                            <span className="font-medium">Email Us</span>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-bold text-lg text-primary mb-4">Important Business Notice</h3>
                    <p className="text-sm text-foreground/70">
                        Paying the booking fee secures your place in the queue for the next available batch of chickens.
                        Our manager will call you to confirm allocation, final balance, and your collection date.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-border">
                <p className="text-sm text-foreground/50 text-center">
                    © {new Date().getFullYear()} AFDEC Online. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
