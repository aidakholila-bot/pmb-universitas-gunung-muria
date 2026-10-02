import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UniversityLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Outer Ring Gold / Blue */}
        <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#EAB308" strokeWidth="3" />
        <circle cx="50" cy="50" r="41" fill="#0284C7" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Shield outline */}
        <path
          d="M50 14 C68 14 74 24 74 38 C74 62 50 82 50 82 C50 82 26 62 26 38 C26 24 32 14 50 14 Z"
          fill="#0F172A"
          stroke="#FACC15"
          strokeWidth="2.5"
        />

        {/* Mountain Silhouette (Gunung Muria) */}
        <path
          d="M32 58 L44 40 L52 48 L61 36 L68 56 Z"
          fill="#38BDF8"
          stroke="#E0F2FE"
          strokeWidth="1"
        />
        <path
          d="M40 58 L50 42 L60 58 Z"
          fill="#0284C7"
        />

        {/* Open Book of Knowledge */}
        <path
          d="M35 62 Q50 56 50 67 Q50 56 65 62 L64 68 Q50 63 50 73 Q50 63 36 68 Z"
          fill="#FEF08A"
          stroke="#CA8A04"
          strokeWidth="1"
        />

        {/* Golden Star at the top */}
        <polygon
          points="50,22 52.5,28 58.5,28.5 54,32.5 55.5,38.5 50,35 44.5,38.5 46,32.5 41.5,28.5 47.5,28"
          fill="#FACC15"
        />

        {/* Tiny ribbon banner */}
        <rect x="33" y="74" width="34" height="6" rx="2" fill="#EAB308" />
        <text
          x="50"
          y="78.5"
          textAnchor="middle"
          fontSize="4"
          fontWeight="bold"
          fill="#0F172A"
          fontFamily="sans-serif"
          letterSpacing="0.5"
        >
          UGM
        </text>
      </svg>
    </div>
  );
};
