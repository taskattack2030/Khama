import React from 'react';
import {
  ArrowDown,
  Layers,
  Sparkles,
  RefreshCw,
  Compass,
  Palette,
  Leaf,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { BenhaUniversityLogo } from './BenhaUniversityLogo';

interface HeroSectionProps {
  lang: Language;
  onExploreJourney: () => void;
  onExploreMaterialBank: () => void;
  onOpenSubmitMaterial: () => void;
  onOpenAmbassadorModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreJourney,
  onExploreMaterialBank,
  onOpenSubmitMaterial,
  onOpenAmbassadorModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 eco-pattern border-b border-emerald-900/10">
      {/* Decorative Floating Background Ambient Leaves & Blurs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#DFF2D8]/60 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#28A9D6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Academic Initiative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFF2D8] border border-[#2E8B35]/30 text-[#102A43] text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#2E8B35] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#2E8B35]" />
              <span>
                {lang === 'ar'
                  ? 'كلية الفنون التطبيقية – جامعة بنها • مبادرة الاستدامة 2026'
                  : 'Faculty of Applied Arts – Benha University • Sustainability 2026'}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102A43] tracking-tight leading-[1.2]">
                {lang === 'ar' ? (
                  <>
                    كُن سفيرًا <span className="text-[#2E8B35]">للاستدامة</span>
                  </>
                ) : (
                  <>
                    Be a <span className="text-[#2E8B35]">Sustainability</span> Ambassador
                  </>
                )}
              </h1>

              {/* Campaign Slogans */}
              <p className="text-xl sm:text-2xl font-extrabold text-[#F39A24]">
                {lang === 'ar' ? '«خطوتك اليوم تغيّر الغد»' : '"Your step today transforms tomorrow"'}
              </p>

              <div className="inline-block px-3 py-1 rounded-md bg-[#FFF9ED] border border-[#F39A24]/30 text-xs sm:text-sm font-semibold text-[#102A43]">
                {lang === 'ar'
                  ? '💡 كل اختيار صغير يصنع فرقًا كبيرًا'
                  : '💡 Every small choice makes a huge difference'}
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {lang === 'ar'
                ? 'من الوعي إلى الفعل... تعلّم، شارك، أعد الاستخدام، وصمّم مستقبلًا أكثر استدامة. منصة الفنون التطبيقية المبتكرة لتحويل مخلفات واستوديوهات التصميم إلى طاقة إبداعية دائرية.'
                : 'From awareness to action... Learn, share, reuse, and engineer a sustainable future. The creative Applied Arts platform transforming studio scrap into circular design power.'}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {onOpenAmbassadorModal && (
                <button
                  id="hero-ambassador-pledge-btn"
                  onClick={onOpenAmbassadorModal}
                  className="flex items-center gap-2 bg-[#F39A24] hover:bg-[#d88417] text-white px-6 py-3.5 rounded-xl font-black text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{lang === 'ar' ? 'كُن سفيرًا للاستدامة 🌱' : 'Become an Ambassador 🌱'}</span>
                </button>
              )}

              <button
                id="hero-start-journey-btn"
                onClick={onExploreJourney}
                className="flex items-center gap-2.5 bg-[#2E8B35] hover:bg-[#25732b] text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>{lang === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                id="hero-explore-bank-btn"
                onClick={onExploreMaterialBank}
                className="flex items-center gap-2.5 bg-white hover:bg-[#FFF9ED] text-[#102A43] border-2 border-[#102A43]/20 hover:border-[#102A43] px-6 py-3.5 rounded-xl font-bold text-base transition-all"
              >
                <Layers className="w-4 h-4 text-[#087EAD]" />
                <span>{lang === 'ar' ? 'اكتشف بنك الخامات' : 'Explore Material Bank'}</span>
              </button>

              <button
                id="hero-submit-material-btn"
                onClick={onOpenSubmitMaterial}
                className="flex items-center gap-2 bg-[#F39A24]/10 hover:bg-[#F39A24]/20 text-[#102A43] border border-[#F39A24]/40 px-5 py-3 rounded-xl font-bold text-sm transition-all"
              >
                <RefreshCw className="w-4 h-4 text-[#F39A24]" />
                <span>{lang === 'ar' ? 'عندك خامة متبقية؟' : 'Have leftover scrap?'}</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-gray-600 font-semibold border-t border-gray-200/60">
              <div className="flex items-center gap-1.5 text-[#2E8B35]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'توثيق رسمي من جامعة بنها' : 'Official Benha Univ. Endorsement'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#087EAD]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'شهادات وجوائز لطلاب الفنون التطبيقية' : 'Verified Student Awards & Badges'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6950A1]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'بنك خامات مجاني متجدد' : 'Zero-Cost Material Bank'}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual / Artistic Applied Arts Sustainable World */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Rotating Circular Arrows Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#58A947]/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-[#28A9D6]/30 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Central Globe & Artistic Sustainable World SVG */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#102A43] via-[#087EAD] to-[#2E8B35] shadow-2xl p-1 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Grid Lines of the Globe */}
                  <circle cx="200" cy="200" r="180" stroke="#FFFFFF22" strokeWidth="1.5" />
                  <ellipse cx="200" cy="200" rx="180" ry="80" stroke="#FFFFFF22" strokeWidth="1" />
                  <ellipse cx="200" cy="200" rx="90" ry="180" stroke="#FFFFFF22" strokeWidth="1" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#FFFFFF33" strokeWidth="1.5" />

                  {/* Continents / Green Leaves Layer */}
                  <path
                    d="M 120 180 C 130 140, 190 120, 220 150 C 250 170, 280 150, 310 190 C 290 240, 220 270, 160 250 Z"
                    fill="#58A947"
                    opacity="0.8"
                  />
                  <path
                    d="M 90 220 C 110 210, 140 230, 150 260 C 130 280, 90 260, 90 220 Z"
                    fill="#2E8B35"
                    opacity="0.9"
                  />

                  {/* Circular Economy Flow Arrows */}
                  <g className="animate-spin origin-center" style={{ animationDuration: '30s' }}>
                    <path
                      d="M 200 45 A 155 155 0 0 1 345 160"
                      stroke="#F39A24"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <polygon points="345,160 335,145 355,145" fill="#F39A24" />

                    <path
                      d="M 345 240 A 155 155 0 0 1 200 355"
                      stroke="#2E8B35"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <polygon points="200,355 215,345 215,365" fill="#2E8B35" />

                    <path
                      d="M 70 260 A 155 155 0 0 1 70 140"
                      stroke="#28A9D6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <polygon points="70,140 60,155 80,155" fill="#28A9D6" />
                  </g>

                  {/* Renewable Energy Wind Turbine */}
                  <g transform="translate(260, 90)">
                    <line x1="0" y1="40" x2="0" y2="90" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="0" cy="40" r="4" fill="#FFFFFF" />
                    <g className="animate-spin origin-center" style={{ animationDuration: '6s' }}>
                      <path d="M 0 40 L 0 10 L 4 35 Z" fill="#FFFFFF" />
                      <path d="M 0 40 L 26 55 L 6 45 Z" fill="#FFFFFF" />
                      <path d="M 0 40 L -26 55 L -6 45 Z" fill="#FFFFFF" />
                    </g>
                  </g>

                  {/* Student Designer Tools: Drafting Compass & Brush */}
                  <g transform="translate(130, 270)">
                    <rect x="0" y="0" width="80" height="8" rx="2" fill="#F39A24" transform="rotate(-35)" />
                    {/* Pencil Tip */}
                    <polygon points="0,0 -8,-12 4,-10" fill="#102A43" />
                  </g>

                  {/* Sprouting Plant from Metal / Product Prototype */}
                  <g transform="translate(200, 200)">
                    {/* Metal Scrap Base */}
                    <rect x="-35" y="10" width="70" height="24" rx="4" fill="#102A43" stroke="#F39A24" strokeWidth="2" />
                    {/* Eco Seedling Sprout */}
                    <path
                      d="M 0 10 Q 0 -25 -20 -40 Q 5 -30 0 10 Z"
                      fill="#DFF2D8"
                      stroke="#2E8B35"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0 -10 Q 0 -35 25 -45 Q 10 -25 0 -10 Z"
                      fill="#58A947"
                      stroke="#2E8B35"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>

              {/* Floating Badge 1: Material Saved */}
              <div className="absolute -top-3 -right-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-emerald-100 flex items-center gap-3 animate-bounce [animation-duration:5s]">
                <div className="w-10 h-10 rounded-xl bg-[#DFF2D8] flex items-center justify-center text-[#2E8B35]">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <div className="text-xs text-gray-500 font-bold">
                    {lang === 'ar' ? 'خامات مستنقذة' : 'Materials Rescued'}
                  </div>
                  <div className="text-sm font-extrabold text-[#102A43]">
                    1,840+ {lang === 'ar' ? 'كجم' : 'kg'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Student Projects */}
              <div className="absolute -bottom-4 -left-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9ED] flex items-center justify-center text-[#F39A24]">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <div className="text-xs text-gray-500 font-bold">
                    {lang === 'ar' ? 'مشاريع تطبيقية' : 'Applied Projects'}
                  </div>
                  <div className="text-sm font-extrabold text-[#102A43]">
                    160+ {lang === 'ar' ? 'تصميم دائري' : 'Circular Designs'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 3: Official Faculty Logo Emblem */}
              <div className="absolute top-1/2 -left-6 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-md border border-orange-100 hidden sm:flex items-center gap-2.5">
                <BenhaUniversityLogo size="sm" variant="emblem" />
                <div className="text-start">
                  <div className="text-xs font-black text-[#102A43]">
                    {lang === 'ar' ? 'فنون تطبيقية بنها' : 'Benha Applied Arts'}
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold">
                    {lang === 'ar' ? 'اعتماد رسمي' : 'Official Faculty'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
