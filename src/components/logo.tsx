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
          <path id="text-path" d="M 20,100 a 80,80 0 1,1 160,0" fill="none" />
        </defs>
        
        {/* Outer Circle */}
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="3" fill="none" />
        
        {/* Curved Text */}
        <text fill="currentColor" fontSize="14" fontWeight="bold" letterSpacing="1">
          <textPath href="#text-path" startOffset="50%" textAnchor="middle">
            AREWAFAVORITE DOMESTIC EARNING CORPORATION
          </textPath>
        </text>

        {/* AFDEC Text */}
        <text x="100" y="115" textAnchor="middle" fontSize="28" fontWeight="bold" fill="currentColor">
            AFDEC
        </text>

        {/* Northern Knot */}
        <g transform="translate(85 45)" fill="#2E8B57">
          <path d="M15,0 L15,5 L5,15 L0,15 L0,10 L10,0 L15,0 Z M15,30 L15,25 L5,15 L0,15 L0,20 L10,30 L15,30 Z" />
          <path d="M0,15 L5,15 L15,5 L15,0 L20,0 L30,10 L30,20 L20,30 L15,30 L15,25 L5,15 L0,15 Z" transform="translate(0, 0)" />
          <path d="M15,0 L10,0 L0,10 L0,15 L5,15 L15,5 L15,0 Z M15,30 L10,30 L0,20 L0,15 L5,15 L15,25 L15,30 Z" transform="scale(-1, 1) translate(-30, 0)" />
        </g>

        {/* Rooster */}
        <g transform="translate(-10, 5)" fill="currentColor">
          <path d="M105,120 C 95,110 90,95 95,80 C 100,65 115,60 125,70 C 130,75 135,85 130,95 C 135,90 140,90 145,95 C 150,100 150,110 145,115 L 140,120 C 145,125 155,125 160,120 C 165,115 170,120 170,125 C 170,135 160,145 150,150 L 120,155 L 110,150 C 105,145 100,135 105,120 Z" />
          <path d="M125,70 C 122,65 125,60 130,60 C 135,60 138,65 135,70" />
          <path d="M130,60 C 128,55 130,50 135,50 C 140,50 142,55 140,60" />
          <path d="M135,50 C 133,45 135,40 140,40 C 145,40 147,45 145,50" />
          <path d="M150,150 C 155,155 165,155 170,150 C 175,145 180,150 180,155 C 180,165 170,175 160,180 L 130,185 L 120,180" />
          <path d="M160,180 L 155,190 L 150,180" />
          <path d="M130,185 L 125,195 L 120,185" />
        </g>
        
        {/* Hen */}
        <g transform="translate(10, 25)" fill="currentColor">
          <path d="M85,125 C 78,120 75,110 80,100 C 85,90 95,90 100,100 C 105,110 100,125 90,130 L 85,125Z" />
          <circle cx="95" cy="100" r="2" fill="black" />
        </g>

        {/* Chicks */}
        <g transform="translate(0, 35)" fill="currentColor">
          <circle cx="70" cy="120" r="5" />
          <circle cx="68" cy="119" r="1" fill="black" />
          <circle cx="80" cy="125" r="5" />
          <circle cx="78" cy="124" r="1" fill="black" />
          <circle cx="90" cy="120" r="5" />
          <circle cx="88" cy="119" r="1" fill="black" />
        </g>

         {/* Golden Swoosh */}
        <path d="M 40,165 C 80,185 120,185 160,165 C 155,170 100,175 45,170 C 42,168 40,165 40,165 Z" fill="currentColor" />

      </svg>
    </div>
  );
}
