import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  theme?: 'dark' | 'light';
  variant?: 'horizontal' | 'stacked' | 'emblem';
}

/**
 * Official Emblem of Faculty of Applied Arts – Benha University (FAPA)
 * Displays the exact official logo image without any alterations or distortions.
 */
export const BenhaUniversityLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'dark',
  variant = 'horizontal',
}) => {
  // Proportional sizing maps preserving original 1:1 aspect ratio
  const sizeMap = {
    sm: { emblemSize: 44, titleClass: 'text-xs font-black', subClass: 'text-[10px]', captionClass: 'text-[8px]' },
    md: { emblemSize: 58, titleClass: 'text-sm sm:text-base font-black', subClass: 'text-[11px] sm:text-xs font-bold', captionClass: 'text-[9px] sm:text-[10px]' },
    lg: { emblemSize: 84, titleClass: 'text-lg font-black', subClass: 'text-xs font-extrabold', captionClass: 'text-[11px]' },
    xl: { emblemSize: 110, titleClass: 'text-xl font-black', subClass: 'text-sm font-extrabold', captionClass: 'text-xs' },
    '2xl': { emblemSize: 160, titleClass: 'text-2xl font-black', subClass: 'text-base font-extrabold', captionClass: 'text-sm' },
  };

  const current = sizeMap[size];
  const isLight = theme === 'light';

  // Dynamic theme colors
  const primaryTextColor = isLight ? 'text-white' : 'text-[#102A43]';
  const secondaryTextColor = isLight ? 'text-emerald-200' : 'text-[#2E8B35]';
  const captionColor = isLight ? 'text-gray-300' : 'text-gray-500';

  // The authentic logo image element (preserves exact original proportions and details)
  const LogoImage = (
    <img
      src="/fapa_logo.jpg"
      alt="شعار كلية الفنون التطبيقية - جامعة بنها"
      width={current.emblemSize}
      height={current.emblemSize}
      className="shrink-0 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
      style={{
        width: `${current.emblemSize}px`,
        height: `${current.emblemSize}px`,
        aspectRatio: '1 / 1',
      }}
      loading="eager"
      decoding="async"
    />
  );

  // Variant: Emblem only
  if (variant === 'emblem' || !showText) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        {LogoImage}
      </div>
    );
  }

  // Variant: Stacked Full Poster Emblem
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {LogoImage}
        <div
          className="w-full my-2.5 h-[2px] rounded-full"
          style={{ backgroundColor: isLight ? '#58A947' : '#102A43' }}
        />
        <h3
          className={`font-black tracking-normal leading-tight ${primaryTextColor} ${current.titleClass}`}
        >
          كلية الفنون التطبيقية
        </h3>
        <span
          className={`font-serif uppercase tracking-[0.14em] font-extrabold mt-0.5 ${secondaryTextColor} ${current.subClass}`}
        >
          FACULTY OF APPLIED ARTS
        </span>
        <span className={`text-[10px] tracking-wider mt-0.5 font-semibold ${captionColor}`}>
          جامعة بنها • مبادرة الاستدامة
        </span>
      </div>
    );
  }

  // Variant: Horizontal Navigation Layout (Logo + Side Titles)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {LogoImage}

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`font-black tracking-tight ${primaryTextColor} ${current.titleClass}`}>
            كلية الفنون التطبيقية
          </span>
          <span className="text-[#F39A24] font-black hidden sm:inline">•</span>
          <span className={`font-extrabold ${primaryTextColor} ${current.titleClass}`}>
            جامعة بنها
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`font-medium tracking-normal ${secondaryTextColor} ${current.subClass}`}>
            Faculty of Applied Arts – Benha University
          </span>
        </div>
        <span className={`font-semibold tracking-wider uppercase mt-0.5 ${captionColor} ${current.captionClass}`}>
          مبادرة «كُن سفيرًا للاستدامة» الرسمية 2026
        </span>
      </div>
    </div>
  );
};
