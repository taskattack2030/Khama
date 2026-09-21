import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  ArrowRight,
  Filter,
  PackageCheck,
  Wrench,
  CheckCircle2,
  Eye,
  X,
} from 'lucide-react';
import { SustainableProject, Language } from '../types';

interface ProjectGalleryProps {
  projects: SustainableProject[];
  lang: Language;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, lang }) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [viewModes, setViewModes] = useState<Record<string, 'after' | 'before'>>({});
  const [activeModalProject, setActiveModalProject] = useState<SustainableProject | null>(null);

  const departments = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'التصميم الصناعي', labelAr: 'التصميم الصناعي', labelEn: 'Industrial Design' },
    { id: 'المنتجات المعدنية والحلية', labelAr: 'المنتجات المعدنية والحلية', labelEn: 'Metal & Jewelry' },
    { id: 'التصميم الداخلي والأثاث', labelAr: 'التصميم الداخلي والأثاث', labelEn: 'Interior & Furniture' },
    { id: 'طباعة المنسوجات والصباغة والتجهيز', labelAr: 'طباعة المنسوجات', labelEn: 'Textiles' },
    { id: 'الإعلان والطباعة والنشر والتغليف', labelAr: 'الإعلان والتغليف', labelEn: 'Packaging' },
    { id: 'الخزف والزجاج', labelAr: 'الخزف والزجاج', labelEn: 'Ceramics' },
  ];

  const filtered = selectedDept === 'all'
    ? projects
    : projects.filter((p) => p.department.includes(selectedDept));

  const toggleViewMode = (id: string) => {
    setViewModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  return (
    <section className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <Palette className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معرض الإبداع المستدام بالكلية' : 'Sustainable Applied Arts Exhibition'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'من المخلّف إلى منتج' : 'From Scrap to Finished Product'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'أعمال طلاب كلية الفنون التطبيقية – جامعة بنها التي أعادت توظيف بقايا الورش وحولتها إلى تصميمات نفعية راقية.'
              : 'Student designs from Benha Applied Arts transforming studio scraps into functional high-value products.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {departments.map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2E8B35] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang === 'ar' ? dept.labelAr : dept.labelEn}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => {
            const currentMode = viewModes[proj.id] || 'after';
            const displayImage =
              currentMode === 'after'
                ? proj.afterImageUrl || proj.imageUrl
                : proj.beforeImageUrl || proj.wasteBefore || proj.imageUrl;

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#2E8B35]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Before/After Toggle Pill */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100 group">
                    <img
                      src={displayImage}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Department Tag */}
                    <div className="absolute top-3 right-3 bg-[#102A43]/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {proj.department}
                    </div>

                    {/* Before/After Toggle Button */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-xl shadow-md border border-gray-200 flex items-center gap-1">
                      <button
                        onClick={() => toggleViewMode(proj.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
                          currentMode === 'before'
                            ? 'bg-[#F39A24] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {lang === 'ar' ? 'الخامة قبل' : 'Before (Scrap)'}
                      </button>
                      <button
                        onClick={() => toggleViewMode(proj.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
                          currentMode === 'after'
                            ? 'bg-[#2E8B35] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {lang === 'ar' ? 'المنتج بعد' : 'After (Product)'}
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-[#102A43] leading-snug">{proj.title}</h3>
                      <div className="text-xs font-bold text-gray-500 mt-1">
                        {lang === 'ar' ? 'تصميم: ' : 'Designer: '}
                        <span className="text-[#087EAD]">{proj.studentName || proj.student}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 font-medium">
                      {proj.description || proj.concept}
                    </p>

                    {/* Metrics bar */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div>
                        <span className="text-gray-400 block text-[10px] font-bold">
                          {lang === 'ar' ? 'الخامة المعاد استخدامها' : 'Reused Material'}
                        </span>
                        <span className="font-extrabold text-[#102A43]">
                          {proj.reusedAmountKg || proj.reusedAmount || '3.5 كجم'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] font-bold">
                          {lang === 'ar' ? 'تقنية التصنيع' : 'Process'}
                        </span>
                        <span className="font-bold text-[#2E8B35] truncate block">
                          {proj.process || proj.manufacturing || 'تعاشيق ميكانيكية'}
                        </span>
                      </div>
                    </div>

                    {/* Eco Impact Tag */}
                    <div className="p-2.5 rounded-xl bg-[#DFF2D8]/70 border border-[#2E8B35]/20 text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2E8B35] shrink-0" />
                      <span className="truncate">{proj.impact}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Inspection Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-[#FFF9ED] hover:border-[#F39A24] text-xs font-bold text-[#102A43] transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-[#087EAD]" />
                    <span>{lang === 'ar' ? 'عرض تفاصيل المشروع ودراسة الحالة' : 'View Case Study'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Case Study Inspection */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#2E8B35]/40 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#2E8B35]">{activeModalProject.department}</span>
                  <h3 className="text-2xl font-black text-[#102A43]">{activeModalProject.title}</h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 text-gray-400 hover:text-black rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Side by side Before and After images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-center">
                  <span className="text-xs font-extrabold text-[#F39A24]">
                    {lang === 'ar' ? 'الخامة قبل التدوير (بقايا الورشة)' : 'Before (Scraps)'}
                  </span>
                  <div className="h-44 rounded-2xl overflow-hidden border border-gray-200">
                    <img
                      src={activeModalProject.beforeImageUrl || activeModalProject.wasteBefore || activeModalProject.imageUrl}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-xs font-extrabold text-[#2E8B35]">
                    {lang === 'ar' ? 'المنتج النهائي المبتكر' : 'After (Finished Product)'}
                  </span>
                  <div className="h-44 rounded-2xl overflow-hidden border border-[#2E8B35] shadow-xs">
                    <img
                      src={activeModalProject.afterImageUrl || activeModalProject.imageUrl}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                <p>{activeModalProject.description || activeModalProject.concept}</p>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-500">الطالب / المصمم:</span>
                    <span className="font-extrabold text-[#102A43]">{activeModalProject.studentName || activeModalProject.student}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-500">الخامات المدمجة:</span>
                    <span className="font-bold text-[#102A43]">
                      {activeModalProject.materials ? activeModalProject.materials.join(' • ') : activeModalProject.material}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-500">تقنيات الورش والماكينات:</span>
                    <span className="font-bold text-[#087EAD]">{activeModalProject.process || activeModalProject.manufacturing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-500">الأثر البيئي الموثق:</span>
                    <span className="font-extrabold text-[#2E8B35]">{activeModalProject.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
