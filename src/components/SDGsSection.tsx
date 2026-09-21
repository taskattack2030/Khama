import React, { useState } from 'react';
import { Globe, Award, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { SDGGoal, Language } from '../types';

interface SDGsSectionProps {
  sdgs: SDGGoal[];
  lang: Language;
}

export const SDGsSection: React.FC<SDGsSectionProps> = ({ sdgs, lang }) => {
  const [expandedId, setExpandedId] = useState<number | null>(12); // Default to Goal 12 (Responsible Consumption)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="initiative-about" className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'أهداف التنمية المستدامة للأمم المتحدة' : 'UN Sustainable Development Goals'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'الفنون التطبيقية وأهداف التنمية المستدامة' : 'Applied Arts & The Global Goals'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'كيف تساهم أقسام ومشروعات كلية الفنون التطبيقية – جامعة بنها في تحقيق الأهداف الأممية ورؤية مصر 2030.'
              : 'How Benha Applied Arts departments directly power the UN SDGs and Egypt Vision 2030.'}
          </p>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdgs.map((sdg) => {
            const isExpanded = expandedId === sdg.number;
            return (
              <div
                key={sdg.number}
                className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Goal Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-xs"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.number}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase">
                        {lang === 'ar' ? `الهدف رقم 0${sdg.number}` : `Goal 0${sdg.number}`}
                      </span>
                      <h3 className="text-base font-black text-[#102A43] leading-snug">
                        {lang === 'ar' ? sdg.titleAr : sdg.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {lang === 'ar' ? sdg.descriptionAr : sdg.descriptionEn}
                  </p>

                  {/* Faculty & Student Role (Collapsible / Highlighted) */}
                  <div className="p-3.5 rounded-2xl bg-[#F8FCF6] border border-[#2E8B35]/20 space-y-1.5 text-xs">
                    <div className="font-extrabold text-[#2E8B35] flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(sdg.number)}>
                      <span>{lang === 'ar' ? 'كيف تساهم الكلية والطالب في هذا الهدف؟' : 'Faculty & Student Role:'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>

                    {isExpanded && (
                      <p className="text-gray-700 leading-relaxed pt-1 font-semibold animate-in fade-in duration-200">
                        {lang === 'ar' ? sdg.facultyRoleAr : sdg.facultyRoleEn}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span>جامعة بنها • مصر 2030</span>
                  <span className="text-[#2E8B35]">SDG {sdg.number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
