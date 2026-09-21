import React, { useState } from 'react';
import {
  Leaf,
  Users,
  Coins,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface WhatIsSustainabilityProps {
  lang: Language;
  onExploreStudentRole: () => void;
}

export const WhatIsSustainability: React.FC<WhatIsSustainabilityProps> = ({
  lang,
  onExploreStudentRole,
}) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'circularity'>('pillars');
  const [selectedPillar, setSelectedPillar] = useState<'env' | 'soc' | 'eco'>('env');

  const pillars = {
    env: {
      id: 'env',
      titleAr: '🌱 ركيزة البيئة (Planet)',
      titleEn: '🌱 Environment (Planet)',
      subtitleAr: 'حفظ الموارد الطبيعية وحماية النظم الحيوية',
      subtitleEn: 'Resource conservation & ecosystem protection',
      color: 'bg-emerald-500 text-white',
      badgeBg: 'bg-[#DFF2D8] text-[#2E8B35]',
      border: 'border-emerald-200',
      descriptionAr:
        'في الفنون التطبيقية، تعني اختيار خامات محلية متجددة أو معادة التدوير، تقليل استهلاك المياه والطاقة في ورش الصباغة والسباكة، وخفض الانبعاثات السامة والمخلفات غير القابلة للتحلل.',
      descriptionEn:
        'In Applied Arts, it means specifying renewable or salvaged local materials, reducing water & energy in kiln and dye studios, and minimizing hazardous solvents.',
      examplesAr: [
        'استبدال البلاستيك بألياف نباتية وقشور زراعية',
        'استخدام صبغات طبيعية مائية غير سامة في المنسوجات',
        'تصميم منتجات قابلة للتفكيك الكامل وإعادة التدوير',
      ],
      examplesEn: [
        'Replacing virgin plastics with agricultural bio-composites',
        'Using non-toxic botanical water-based dyes in textiles',
        'Engineering products for complete disassembly & circularity',
      ],
    },
    soc: {
      id: 'soc',
      titleAr: '👥 ركيزة المجتمع (People)',
      titleEn: '👥 Society (People)',
      subtitleAr: 'العدالة، صحة الإنسان، والارتقاء بالمجتمع المحلي',
      subtitleEn: 'Equity, human health & community well-being',
      color: 'bg-[#087EAD] text-white',
      badgeBg: 'bg-blue-100 text-[#087EAD]',
      border: 'border-blue-200',
      descriptionAr:
        'تصميم منتجات آمنة هندسياً ونفسياً تحترم كرامة وحرفية العمال والمجتمع، وتدعم الحرفيين المحليين في القليوبية، وتوفر حلولاً شاملة لمختلف الفئات بما فيها ذوو الإعاقة وكبار السن.',
      descriptionEn:
        'Designing safe, ergonomic products respecting artisanal workers, supporting Egyptian craftsmen, and enabling universal access for all people.',
      examplesAr: [
        'بيئة عمل آمنة خالية من الغازات الكيميائية للطلاب والفنيين',
        'تمكين الحرف اليدوية التراثية في النحت والخزف والحلي',
        'تصميم شمولي يخدم جميع أفراد المجتمع بعدالة',
      ],
      examplesEn: [
        'Zero-emission safe studio environments for makers',
        'Empowering heritage craftsmanship in metal and ceramics',
        'Universal inclusive design for all abilities',
      ],
    },
    eco: {
      id: 'eco',
      titleAr: '💰 ركيزة الاقتصاد (Prosperity)',
      titleEn: '💰 Economy (Prosperity)',
      subtitleAr: 'الجدوى الاقتصادية وخلق القيمة المستدامة',
      subtitleEn: 'Economic viability & circular value creation',
      color: 'bg-[#F39A24] text-white',
      badgeBg: 'bg-[#FFF9ED] text-[#F39A24]',
      border: 'border-amber-200',
      descriptionAr:
        'الاستدامة ليست خسارة مالية، بل ذكاء استثماري! إعادة تدوير الخامات تخفض تكلفة إنتاج مشروعات الطلاب بنسبة تفوق 60%، وتخلق فرص عمل جديدة في ريادة الأعمال الخضراء.',
      descriptionEn:
        'Sustainability is smart economics! Rescuing material offcuts cuts prototype costs by over 60% and unlocks viable green enterprise opportunities.',
      examplesAr: [
        'توفير آلاف الجنيهات في خامات مشاريع التخرج بالكلية',
        'تحويل النفايات إلى منتجات تجارية نفعية مطلوبة بالأسواق',
        'إطالة عمر المنتج وتسهيل الصيانة بدلاً من الشراء المتكرر',
      ],
      examplesEn: [
        'Saving student budgets on expensive imported raw materials',
        'Converting scrap into high-value commercial design products',
        'Extending product lifespan via modular repairability',
      ],
    },
  };

  return (
    <section id="what-is-sustainability" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading & Core Quote */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'المفاهيم التأسيسية للاستدامة' : 'Foundational Concepts'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'يعني إيه استدامة؟' : 'What is Sustainability?'}
          </h2>

          <div className="p-4 rounded-2xl bg-[#FFF9ED] border-2 border-[#F39A24]/30 shadow-xs">
            <p className="text-base sm:text-lg font-black text-[#102A43] leading-relaxed">
              {lang === 'ar'
                ? '«الاستدامة ليست مجرد حماية البيئة... إنها طريقة تفكير وتصميم واتخاذ قرار.»'
                : '"Sustainability is not just protecting the environment... It is a way of thinking, designing, and decision making."'}
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 border border-gray-200">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'pillars'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {lang === 'ar' ? 'أركان الاستدامة الثلاثة' : 'The 3 Pillars of Sustainability'}
            </button>
            <button
              onClick={() => setActiveTab('circularity')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'circularity'
                  ? 'bg-white text-[#102A43] shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {lang === 'ar' ? 'الاقتصاد الخطي مقابل الدائري' : 'Linear vs. Circular Economy'}
            </button>
          </div>
        </div>

        {/* View 1: The Three Interactive Pillars */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left buttons / tabs */}
            <div className="lg:col-span-5 space-y-3">
              {(['env', 'soc', 'eco'] as const).map((key) => {
                const item = pillars[key];
                const isSelected = selectedPillar === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPillar(key)}
                    className={`w-full text-start p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2E8B35] bg-[#F8FCF6] shadow-md -translate-x-1'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-base sm:text-lg font-black text-[#102A43]">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </div>
                      <div className="text-xs text-gray-500 font-semibold mt-1">
                        {lang === 'ar' ? item.subtitleAr : item.subtitleEn}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-[#2E8B35] text-white' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Pillar Card Detail */}
            <div className="lg:col-span-7 bg-[#FFF9ED] rounded-3xl p-6 sm:p-8 border-2 border-[#102A43]/10 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pillars[selectedPillar].badgeBg}`}>
                  {lang === 'ar' ? 'رؤية كلية الفنون التطبيقية' : 'Benha Applied Arts Perspective'}
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  {lang === 'ar' ? 'تطبيق عملي في الاستوديو' : 'Studio Application'}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#102A43]">
                  {lang === 'ar' ? pillars[selectedPillar].titleAr : pillars[selectedPillar].titleEn}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                  {lang === 'ar'
                    ? pillars[selectedPillar].descriptionAr
                    : pillars[selectedPillar].descriptionEn}
                </p>
              </div>

              {/* Real Applied Arts Examples */}
              <div className="space-y-2 pt-2 border-t border-gray-200/60">
                <div className="text-xs font-extrabold text-[#102A43] uppercase tracking-wider">
                  {lang === 'ar' ? 'أمثلة عملية للطلاب في الورش:' : 'Practical Student Studio Examples:'}
                </div>
                <div className="space-y-2">
                  {(lang === 'ar'
                    ? pillars[selectedPillar].examplesAr
                    : pillars[selectedPillar].examplesEn
                  ).map((ex, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-800 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2E8B35] shrink-0 mt-0.5" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Linear vs Circular Economy Interactive Diagram */}
        {activeTab === 'circularity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Linear Economy Card */}
            <div className="bg-red-50/60 rounded-3xl p-6 sm:p-8 border border-red-200 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'النموذج التقليدي القديم' : 'Linear Economy Model'}</span>
              </div>
              <h3 className="text-xl font-black text-[#102A43]">
                {lang === 'ar' ? 'النموذج الخطي: «خُذ، اصنع، تخلّص»' : 'Linear: "Take, Make, Dispose"'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {lang === 'ar'
                  ? 'استنزاف المواد الخام البكر، تصنيع المنتج، ثم إلقاؤه في مدافن النفايات بمجرد انتهاء عمره الافتراضي أو كسر جزء صغير منه. هذا النموذج يسبب استنزافاً هائلاً للموارد وتلوثاً بيئياً خانقاً.'
                  : 'Extracting virgin resources, manufacturing goods, and discarding them into landfills once obsolete. This causes severe resource depletion and toxic waste.'}
              </p>
              <div className="flex flex-col gap-2 pt-2 text-xs font-bold text-gray-700">
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  ❌ {lang === 'ar' ? 'استخراج مفرط للخامات البكر' : 'Excessive raw resource extraction'}
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  ❌ {lang === 'ar' ? 'هدر كبير في قصاصات ورش النجارة والمعادن' : 'Massive studio fabrication offcut scrap'}
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  ❌ {lang === 'ar' ? 'تراكم المخلفات وانبعاثات CO2 مرتفعة' : 'Landfill piling & high embodied carbon'}
                </div>
              </div>
            </div>

            {/* Circular Economy Card */}
            <div className="bg-[#DFF2D8]/50 rounded-3xl p-6 sm:p-8 border-2 border-[#2E8B35] space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E8B35] text-white text-xs font-bold">
                <RefreshCw className="w-4 h-4 animate-spin [animation-duration:12s]" />
                <span>{lang === 'ar' ? 'نموذج الفنون التطبيقية المستدام' : 'Circular Applied Arts Model'}</span>
              </div>
              <h3 className="text-xl font-black text-[#102A43]">
                {lang === 'ar' ? 'النموذج الدائري: «تصميم بلا هدر»' : 'Circular: "Zero Waste by Design"'}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {lang === 'ar'
                  ? 'الخامات تدور في حلقات مغلقة لا تنتهي! تصميم المنتج من البداية ليكون قابلاً للإصلاح، التفكيك السريع، وتتحول نفايات قسم إلى مدخلات تصنيعية ثمينة لقسم آخر.'
                  : 'Materials circulate perpetually in closed loops! Products are engineered upfront for modular repair, rapid disassembly, and studio scrap exchange.'}
              </p>
              <div className="flex flex-col gap-2 pt-2 text-xs font-bold text-gray-800">
                <div className="p-2.5 bg-white rounded-lg border border-[#2E8B35]/40 text-[#2E8B35]">
                  ✅ {lang === 'ar' ? 'بنك خامات رقمي يغذي ورش الكلية' : 'Digital material bank feeding student labs'}
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#2E8B35]/40 text-[#2E8B35]">
                  ✅ {lang === 'ar' ? 'تصميم للتفكيك (Design for Disassembly)' : 'Design for modular disassembly'}
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#2E8B35]/40 text-[#2E8B35]">
                  ✅ {lang === 'ar' ? 'توفير التكاليف وحماية البيئة المصرية' : 'Cost savings & climate action'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Bottom Next Step Link */}
        <div className="text-center pt-4">
          <button
            onClick={onExploreStudentRole}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2E8B35] hover:text-[#25732b] hover:underline"
          >
            <span>
              {lang === 'ar'
                ? 'اكتشف رحلة طالب الفنون التطبيقية مع الاستدامة ←'
                : 'Discover the Applied Arts Student Journey →'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
