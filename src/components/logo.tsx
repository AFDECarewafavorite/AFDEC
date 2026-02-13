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
          {/* Path for the top circular text */}
          <path id="text-path" d="M 30,100 a 70,70 0 1,1 140,0" fill="none" />
        </defs>
        
        {/* Black background circle */}
        <circle cx="100" cy="100" r="100" fill="black" />

        {/* Outer thin circle */}
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" fill="none" />
        
        {/* Curved Text */}
        <text fill="currentColor" fontSize="11" fontWeight="bold" letterSpacing="1.5">
          <textPath href="#text-path" startOffset="50%" textAnchor="middle">
            AREWAFAVORITE DOMESTIC EARNING CORPORATION
          </textPath>
        </text>

        {/* Center Text */}
        <text x="100" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" letterSpacing="1">
            AREWAFAVORITE
        </text>
        <text x="100" y="160" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" letterSpacing="1">
            AFDEC
        </text>
        
        {/* Northern Knot */}
        <g id="knot" transform="translate(91 45)" fill="#006400" strokeWidth="0.5" stroke="#006400">
          <path d="M8.5,1.5 l-2,2 v3 l2,2 h3 l2,-2 v-3 l-2,-2 h-3 z M9.5,2.5 h1 v1 h-1 v-1 z M7.5,4.5 h1 v1 h-1 v-1 z M11.5,4.5 h1 v1 h-1 v-1 z M9.5,6.5 h1 v1 h-1 v-1 z" />
          <path d="M13,4 l-1.5,1.5 v1 l1.5,1.5 h1 l1.5,-1.5 v-1 l-1.5,-1.5 h-1 z" />
          <path d="M4,4 l-1.5,1.5 v1 l1.5,1.5 h1 l1.5,-1.5 v-1 l-1.5,-1.5 h-1 z" />
          <path d="M8.5,9.5 l-2,2 v3 l2,2 h3 l2,-2 v-3 l-2,-2 h-3 z M9.5,10.5 h1 v1 h-1 v-1 z M7.5,12.5 h1 v1 h-1 v-1 z M11.5,12.5 h1 v1 h-1 v-1 z M9.5,14.5 h1 v1 h-1 v-1 z" />
          <path d="M1,8.5 l-1.5,2 v1 l1.5,2 h1 l1.5,-2 v-1 l-1.5,-2 h-1 z" />
          <path d="M16,8.5 l-1.5,2 v1 l1.5,2 h1 l1.5,-2 v-1 l-1.5,-2 h-1 z" />
          <path d="M6,0 l1.5,1.5 h1 l1.5,-1.5 v-1 l-1.5,-1.5 h-1 l-1.5,1.5 v1 z" />
          <path d="M6,18 l1.5,1.5 h1 l1.5,-1.5 v-1 l-1.5,-1.5 h-1 l-1.5,1.5 v1 z" />
        </g>
        
        {/* Chicken Family */}
        <g fill="currentColor" transform="translate(0, 5)">
            {/* Rooster */}
            <path d="M110,75 C 108,70 105,68 103,70 L 100,75 C 98,80 100,85 105,88 L 108,85 C 110,83 112,78 110,75 Z M 104,70 C 102,68 102,65 104,63 C 106,61 108,63 107,65 Z M 107,65 C 105,62 106,59 108,58 C 110,57 112,60 111,62 Z M 111,62 C 110,59 111,56 113,55 C 115,54 116,57 115,60 Z" />
            <path d="M112,90 C 105,95 100,110 105,120 C 110,130 120,135 130,130 L 132,120 L 130,100 C 128,95 120,88 112,90 Z" />
            <path d="M107,120 C 105,125 105,130 110,135 L 115,137 L 118,132 C 115,128 112,125 107,120 Z" />
            <path d="M112,135 L 118,138 L 120,133 C 118,130 115,128 112,135 Z" />
            <path d="M118,138 L 123,140 L 124,135 C 122,132 120,131 118,138 Z" />
            <path d="M130,130 L 132,135 L 125,138 L 124,135 Z" />

            {/* Hen */}
            <path d="M140,88 C 138,85 135,85 133,88 C 130,95 132,105 138,115 C 145,125 155,130 160,125 L 162,115 C 163,105 160,95 150,90 C 148,88 145,86 140,88 Z" />
            <path d="M150,98 C 148,105 150,110 155,112 Z" />

            {/* Chick 1 */}
            <path d="M125,118 C 122,115 120,118 122,122 C 125,128 132,128 135,122 C 136,118 132,115 128,118 Z" />
            
            {/* Chick 2 */}
            <path d="M138,118 C 135,115 133,118 135,122 C 138,128 145,128 148,122 C 149,118 145,115 141,118 Z" />
            
            {/* Chick 3 */}
            <path d="M149,125 C 146,122 144,125 146,129 C 149,135 156,135 159,129 C 160,125 156,122 152,125 Z" />
        </g>
        
        {/* Golden Swoosh */}
        <path 
          d="M30,175 C 40,160 60,150 100,152 C 140,155 160,165 170,175 C 165,190 140,195 100,193 C 60,190 35,185 30,175 Z" 
          fill="url(#swoosh-gradient)" 
        />
        <defs>
          <linearGradient id="swoosh-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: "currentColor", stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: "currentColor", stopOpacity: 0.2}} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
