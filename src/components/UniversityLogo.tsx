import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UniversityLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const dimensions =
    size === 'sm'
      ? 'w-8 h-8'
      : size === 'lg'
        ? 'w-16 h-16'
        : 'w-11 h-11';

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`}
    >
      <img
        src="/assets/universitas-gunung-muria-logo.png"
        alt="Logo Universitas Gunung Muria"
        className="w-full h-full object-contain drop-shadow-sm"
        draggable={false}
      />
    </div>
  );
};
