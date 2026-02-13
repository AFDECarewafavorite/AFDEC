import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function Logo({ className, width = 56, height = 56 }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <defs>
          <path id="text-path" d="M 30,100 a 70,70 0 1,1 140,0" fill="none" />
          <linearGradient id="swoosh-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: "currentColor", stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: "currentColor", stopOpacity: 0.2}} />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="100" fill="black" />
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" fill="none" />

        <text fill="currentColor" fontSize="11" fontWeight="bold" letterSpacing="1.5" style={{fontFamily: 'sans-serif'}}>
          <textPath href="#text-path" startOffset="50%" textAnchor="middle">
            AREWAFAVORITE DOMESTIC EARNING CORPORATION
          </textPath>
        </text>

        {/* Center Text */}
        <text x="100" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" letterSpacing="1" style={{fontFamily: 'sans-serif'}}>
            AREWAFAVORITE
        </text>
        <text x="100" y="160" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" letterSpacing="1" style={{fontFamily: 'sans-serif'}}>
            AFDEC
        </text>

        {/* Northern Knot (Detailed Trace) */}
        <g transform="translate(100, 75) scale(1.1)">
          <g fill="#006400" stroke="#006400" strokeWidth="0.5">
            <path d="M-8.5,-16.5 L-10.5,-14.5 -10.5,-11.5 -8.5,-9.5 -5.5,-9.5 -3.5,-11.5 -3.5,-14.5 -5.5,-16.5 Z M-7.5,-15.5 L-6.5,-15.5 -6.5,-14.5 -7.5,-14.5 Z M-9.5,-13.5 L-8.5,-13.5 -8.5,-12.5 -9.5,-12.5 Z M-5.5,-13.5 L-4.5,-13.5 -4.5,-12.5 -5.5,-12.5 Z M-7.5,-11.5 L-6.5,-11.5 -6.5,-10.5 -7.5,-10.5 Z" />
            <path d="M-2,-14 L-3.5,-12.5 -3.5,-11.5 -2,-10 -1,-10 0.5,-11.5 0.5,-12.5 -1,-14 Z" />
            <path d="M-15,-14 L-16.5,-12.5 -16.5,-11.5 -15,-10 -14,-10 -12.5,-11.5 -12.5,-12.5 -14,-14 Z" />
            <path d="M-8.5,-5.5 L-10.5,-3.5 -10.5,-0.5 -8.5,1.5 -5.5,1.5 -3.5,-0.5 -3.5,-3.5 -5.5,-5.5 Z M-7.5,-4.5 L-6.5,-4.5 -6.5,-3.5 -7.5,-3.5 Z M-9.5,-1.5 L-8.5,-1.5 -8.5,-0.5 -9.5,-0.5 Z M-5.5,-1.5 L-4.5,-1.5 -4.5,-0.5 -5.5,-0.5 Z M-7.5,0.5 L-6.5,0.5 -6.5,1.5 -7.5,1.5 Z" />
            <path d="M-18,-6.5 L-19.5,-5 -19.5,-4 -18,-2.5 -17,-2.5 -15.5,-4 -15.5,-5 -17,-6.5 Z" />
            <path d="M1,-6.5 L-0.5,-5 -0.5,-4 1,-2.5 2,-2.5 3.5,-4 3.5,-5 2,-6.5 Z" />
            <path d="M-11,-20 L-9.5,-18.5 -8.5,-18.5 -7,-20 -7,-21 -8.5,-22.5 -9.5,-22.5 -11,-21 Z" />
            <path d="M-11,4 L-9.5,5.5 -8.5,5.5 -7,4 -7,3 -8.5,1.5 -9.5,1.5 -11,3 Z" />
          </g>
        </g>
        
        {/* Chicken Family (Detailed Trace) */}
        <g fill="currentColor" transform="translate(5, 5)">
            {/* Rooster */}
            <path d="M110 75 c-2-5-5-7-7-5 l-3 5c-2 5 0 10 5 13l3-3c2-2 4-7 2-10z M104 70c-2-2-2-5 0-7s4 0 3 2z M107 65c-2-3 0-6 2-7s4 0 3 4z M111 62c-1-3 0-6 2-7s3 1 2 4z"></path>
            <path d="M112 90c-7 5-12 20-7 30s15 15 25 10l2-10-2-20c-2-5-10-2-18-10z"></path>
            <path d="M107 120c-2 5-2 10 3 15l5 2 3-5c-3-4-6-7-11-12z"></path>
            <path d="M112 135l6 3 2-5c-2-3-5-5-8-2z"></path>
            <path d="M118 138l5 2 1-5c-2-3-4-4-6 3z"></path>
            <path d="M130 130l2 5-7 3-1-3z"></path>

            {/* Hen */}
            <path d="M140 88c-2-3-5-3-7 0s-2 10 3 20c7 10 17 15 22 10l2-10c1-10-2-20-12-25s-5-3-10 5z"></path>
            <path d="M150 98c-2 7 0 12 5 14z"></path>

            {/* Chick 1 */}
            <path d="M125 118c-3-3-5 0-3 4s7 0 10-4c1-4-3-7-7-4z"></path>
            
            {/* Chick 2 */}
            <path d="M138 118c-3-3-5 0-3 4s7 0 10-4c1-4-3-7-7-4z"></path>
            
            {/* Chick 3 */}
            <path d="M149 125c-3-3-5 0-3 4s7 0 10-4c1-4-3-7-7-4z"></path>
        </g>
        
        {/* Golden Swoosh */}
        <path 
          d="M30,175 C 40,160 60,150 100,152 C 140,155 160,165 170,175 C 165,190 140,195 100,193 C 60,190 35,185 30,175 Z" 
          fill="url(#swoosh-gradient)" 
        />
      </svg>
    </div>
  );
}
