import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Download,
  Maximize2,
  X,
  Sparkles,
  Share2,
  Printer,
  Check,
} from 'lucide-react';
import { Language } from '../types';

interface EducationalPostersSectionProps {
  lang: Language;
}

export const EducationalPostersSection: React.FC<EducationalPostersSectionProps> = ({ lang }) => {
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const posters = [
    {
      id: 0,
      titleAr: 'ملصق الحملة الرسمي: «كُن سفيرًا للاستدامة»',
      titleEn: 'Official Campaign Poster: "Be a Sustainability Ambassador"',
      subtitleAr: 'خطوتك اليوم تغيّر الغد • كل اختيار صغير يصنع فرقًا كبيرًا',
      subtitleEn: 'Your step transforms tomorrow • Every small choice matters',
      type: 'identity',
      accent: 'from-[#102A43] via-[#2E8B35] to-[#F39A24]',
      badge: 'الملصق الرئيسي للكلية 2026',
    },
    {
      id: 1,
      titleAr: 'إنفوجرافيك: تفكيك البصمة الكربونية لمصمم الفنون التطبيقية',
      titleEn: 'Infographic: Carbon Footprint Breakdown in Studio',
      subtitleAr: 'الكهرباء • النقل • تصنيع الخامات • ماكينات الليزر وCNC',
      subtitleEn: 'Power • Transport • Materials • Studio Machinery',
      type: 'carbon',
      accent: 'from-[#087EAD] via-[#28A9D6] to-[#DFF2D8]',
      badge: 'دليل حساب الانبعاثات',
    },
    {
      id: 2,
      titleAr: 'دليل التصميم الدائري: دورة حياة المنتج في الورش',
      titleEn: 'Circular Design Lifecycle: Studio Cradle-to-Cradle',
      subtitleAr: 'التصميم للتفكيك (DfD) • التعاشيق الميكانيكية • صفر غراء سام',
      subtitleEn: 'Design for Disassembly • Mechanical Joinery • Zero Toxic Adhesives',
      type: 'circular',
      accent: 'from-[#6950A1] via-[#2E8B35] to-[#58A947]',
      badge: 'معايير ورش الفنون',
    },
    {
      id: 3,
      titleAr: 'إرشادات استوديو صفر مخلفات (Zero-Waste Studio Guidelines)',
      titleEn: 'Zero-Waste Studio Guidelines & Best Practices',
      subtitleAr: 'فرز القصاصات • جمع الرقائق • إيداع بنك الخامات اليومي',
      subtitleEn: 'Scrap sorting • Kerf optimization • Daily bank check-in',
      type: 'zerowaste',
      accent: 'from-[#F39A24] via-[#58A947] to-[#102A43]',
      badge: 'لائحة الورش المعتمدة',
    },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الهوية البصرية والملصقات التوعوية' : 'Visual Identity & Posters'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'تعلم بصريًا: ملصقات المبادرة' : 'Learn Visually: Initiative Posters'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'ملصقات إنفوجرافيك تعليمية مستوحاة من الهوية البصرية الرسمية لكلية الفنون التطبيقية – جامعة بنها. قابلة للعرض بالحجم الكامل والتحميل.'
              : 'Educational infographic posters derived from the official campaign visual identity, ready for high-res zoom & download.'}
          </p>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posters.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#2E8B35]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Poster Canvas Preview */}
                <div
                  onClick={() => setSelectedPoster(p.id)}
                  className={`relative h-72 w-full bg-gradient-to-br ${p.accent} p-6 flex flex-col justify-between text-white cursor-pointer overflow-hidden`}
                >
                  {/* Subtle Grid & Wave Texture */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none eco-pattern" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Central Poster Graphic Content */}
                  <div className="relative z-10 space-y-2 text-center py-4">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight leading-snug drop-shadow-md">
                      {p.titleAr}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold opacity-90">
                      {p.subtitleAr}
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-bold opacity-80 pt-2 border-t border-white/20">
                    <span>جامعة بنها • كلية الفنون التطبيقية</span>
                    <span>2026 Sustainability Edition</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-black text-[#102A43]">{p.titleAr}</h3>
                  <p className="text-xs text-gray-500 font-medium">{p.subtitleAr}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedPoster(p.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'عرض بدقة عالية وتكبير' : 'Fullscreen Zoom'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                  title="مشاركة رابط الملصق"
                >
                  {copied ? <Check className="w-4 h-4 text-[#2E8B35]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Zoom Modal */}
        {selectedPoster !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-xl font-black text-[#102A43]">
                  {posters[selectedPoster].titleAr}
                </h3>
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="p-2 text-gray-400 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-res Rendered Poster Canvas */}
              <div
                className={`relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-br ${posters[selectedPoster].accent} p-8 flex flex-col justify-between text-white shadow-2xl border-4 border-white/30 overflow-hidden`}
              >
                <div className="flex items-center justify-between border-b border-white/25 pb-3">
                  <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-3.5 py-1 rounded-full">
                    كلية الفنون التطبيقية – جامعة بنها
                  </span>
                  <span className="text-xs font-bold">حملة كُن سفيرًا للاستدامة 2026</span>
                </div>

                <div className="text-center space-y-3 py-6">
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    {posters[selectedPoster].titleAr}
                  </h1>
                  <p className="text-base sm:text-lg font-bold opacity-90 max-w-lg mx-auto">
                    {posters[selectedPoster].subtitleAr}
                  </p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-xs text-xs font-extrabold">
                    🌱 خطوتك اليوم تغيّر الغد • كل اختيار صغير يصنع فرقًا كبيرًا
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs opacity-90 border-t border-white/25 pt-3">
                  <span>Faculty of Applied Arts – Benha University</span>
                  <span>www.bu.edu.eg • Sustainable Design Platform</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'طباعة الملصق' : 'Print'}</span>
                </button>

                <button
                  onClick={() => setSelectedPoster(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#2E8B35] text-white text-xs font-bold shadow-md"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
