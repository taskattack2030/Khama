import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Filter,
  QrCode,
  PackagePlus,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Tag,
  Hammer,
} from 'lucide-react';
import { Material, MaterialType, Language } from '../types';

interface DigitalMaterialBankProps {
  materials: Material[];
  onOpenPassport: (material: Material) => void;
  onRequestMaterial: (material: Material) => void;
  onOpenSubmitMaterial: () => void;
  lang: Language;
}

export const DigitalMaterialBank: React.FC<DigitalMaterialBankProps> = ({
  materials,
  onOpenPassport,
  onRequestMaterial,
  onOpenSubmitMaterial,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');

  const materialTypes: { id: string; labelAr: string; labelEn: string; icon: string }[] = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All', icon: '✨' },
    { id: 'wood', labelAr: 'أخشاب', labelEn: 'Wood', icon: '🪵' },
    { id: 'metal', labelAr: 'معادن', labelEn: 'Metal', icon: '⚙️' },
    { id: 'acrylic', labelAr: 'أكريليك وبلاستيك', labelEn: 'Acrylic & Plastic', icon: '🔷' },
    { id: 'cardboard', labelAr: 'كرتون وورق', labelEn: 'Cardboard & Paper', icon: '📦' },
    { id: 'fabric', labelAr: 'أقمشة ومنسوجات', labelEn: 'Fabrics & Textiles', icon: '🧵' },
    { id: 'leather', labelAr: 'جلود', labelEn: 'Leather', icon: '🧳' },
    { id: 'glass', labelAr: 'زجاج وخزف', labelEn: 'Glass & Ceramics', icon: '🏺' },
    { id: 'bio', labelAr: 'حيوية وطبيعية', labelEn: 'Bio & Natural', icon: '🌿' },
  ];

  const departments = [
    { id: 'all', labelAr: 'جميع الأقسام', labelEn: 'All Departments' },
    { id: 'التصميم الصناعي', labelAr: 'التصميم الصناعي', labelEn: 'Industrial Design' },
    { id: 'المنتجات المعدنية والحلية', labelAr: 'المنتجات المعدنية والحلية', labelEn: 'Metal & Jewelry' },
    { id: 'التصميم الداخلي والأثاث', labelAr: 'التصميم الداخلي والأثاث', labelEn: 'Interior & Furniture' },
    { id: 'طباعة المنسوجات والصباغة والتجهيز', labelAr: 'طباعة المنسوجات', labelEn: 'Textile Printing' },
    { id: 'الغزل والنسيج والتريكو والملابس', labelAr: 'الملابس والنسيج', labelEn: 'Fashion & Apparel' },
    { id: 'الإعلان والطباعة والنشر والتغليف', labelAr: 'الإعلان والتغليف', labelEn: 'Packaging & Graphic' },
    { id: 'الخزف والزجاج', labelAr: 'الخزف والزجاج', labelEn: 'Ceramics & Glass' },
    { id: 'النحت والتشكيل المعماري والترميم', labelAr: 'النحت والتشكيل المعماري', labelEn: 'Sculpture & Arch.' },
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchType = selectedType === 'all' || m.type === selectedType;
      const deptName = m.department || m.donorDepartment || '';
      const matchDept = selectedDept === 'all' || deptName.includes(selectedDept);
      const matchCond = selectedCondition === 'all' || m.condition === selectedCondition;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        (m.nameEn && m.nameEn.toLowerCase().includes(q)) ||
        m.id.toLowerCase().includes(q) ||
        (m.color && m.color.toLowerCase().includes(q)) ||
        deptName.toLowerCase().includes(q);

      return matchType && matchDept && matchCond && matchSearch;
    });
  }, [materials, selectedType, selectedDept, selectedCondition, searchTerm]);

  return (
    <section id="material-bank" className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'بنك الخامات الرقمي التفاعلي' : 'Digital Material Bank'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
              {lang === 'ar' ? 'بنك خامات الفنون التطبيقية' : 'Faculty Material Bank'}
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#F39A24]">
              {lang === 'ar'
                ? '«لا يوجد خامة متبقية... هناك تصميم لم يُكتشف بعد»'
                : '"There is no leftover material... only a design yet to be discovered"'}
            </p>
          </div>

          {/* Add Material CTA Button */}
          <button
            onClick={onOpenSubmitMaterial}
            className="flex items-center gap-2 bg-[#2E8B35] hover:bg-[#25732b] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <PackagePlus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'أضف خامة مستنقذة متبقية (+50 نقطة)' : 'Donate Leftover Material'}</span>
          </button>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-4">
          {/* Search bar & Department dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحث باسم الخامة، الكود (MAT-BNH-...)، القسم، أو اللون...'
                    : 'Search material by name, code, dept, color...'
                }
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#2E8B35]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {lang === 'ar' ? d.labelAr : d.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
              >
                <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Conditions'}</option>
                <option value="new">{lang === 'ar' ? 'جديدة بالكامل' : 'New'}</option>
                <option value="good_offcuts">{lang === 'ar' ? 'قصاصات ممتازة' : 'Good Offcuts'}</option>
                <option value="scraps">{lang === 'ar' ? 'بقايا ورش صالحة' : 'Usable Scraps'}</option>
                <option value="usable_fragments">{lang === 'ar' ? 'قطع وشظايا' : 'Fragments'}</option>
              </select>
            </div>
          </div>

          {/* Material Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {materialTypes.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{lang === 'ar' ? type.labelAr : type.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Results count badge */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
            <span>
              {lang === 'ar'
                ? `عرض ${filteredMaterials.length} خامة متوفرة ببنك الكلية`
                : `Showing ${filteredMaterials.length} available materials`}
            </span>
            {(selectedType !== 'all' || selectedDept !== 'all' || selectedCondition !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDept('all');
                  setSelectedCondition('all');
                  setSearchTerm('');
                }}
                className="text-[#087EAD] font-bold hover:underline"
              >
                {lang === 'ar' ? 'إعادة ضبط التصفية' : 'Reset filters'}
              </button>
            )}
          </div>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((mat) => {
              return (
                <div
                  key={mat.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#2E8B35]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                      <img
                        src={mat.imageUrl}
                        alt={mat.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-lg border border-white/20">
                        {mat.id}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            mat.status === 'available'
                              ? 'bg-emerald-500 text-white'
                              : mat.status === 'reserved'
                              ? 'bg-amber-500 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {mat.status === 'available'
                            ? lang === 'ar'
                              ? 'متاحة للاستعارة'
                              : 'Available'
                            : mat.status === 'reserved'
                            ? lang === 'ar'
                              ? 'محجوزة لمشروع'
                              : 'Reserved'
                            : lang === 'ar'
                            ? 'أُعيد استخدامها'
                            : 'Reused'}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="text-[11px] font-bold text-gray-500">
                          {mat.department}
                        </div>
                        <h3 className="text-base font-black text-[#102A43] group-hover:text-[#2E8B35] transition-colors leading-snug">
                          {mat.name}
                        </h3>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {mat.nameEn}
                        </div>
                      </div>

                      {/* Specs pills */}
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-gray-50 p-2.5 rounded-xl border border-gray-100 font-semibold text-gray-700">
                        <div>
                          <span className="text-gray-400 block text-[9px]">{lang === 'ar' ? 'الأبعاد' : 'Dim'}</span>
                          <span>{mat.dimensions}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9px]">{lang === 'ar' ? 'الكمية' : 'Qty'}</span>
                          <span>{mat.quantity}</span>
                        </div>
                      </div>

                      {/* Location in faculty */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#2E8B35] shrink-0" />
                        <span className="truncate">{mat.location}</span>
                      </div>

                      {/* Suggested Uses Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(mat.suggestedUses || []).slice(0, 2).map((use, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#FFF9ED] text-[#102A43] border border-[#F39A24]/30 text-[10px] font-bold truncate max-w-[130px]"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-gray-100">
                    <button
                      onClick={() => onOpenPassport(mat)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-[#102A43] text-xs font-bold transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#087EAD]" />
                      <span>{lang === 'ar' ? 'جواز الخامة' : 'Passport'}</span>
                    </button>

                    <button
                      onClick={() => onRequestMaterial(mat)}
                      disabled={mat.status !== 'available'}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-300 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'اطلب الخامة' : 'Request'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {lang === 'ar' ? 'لا توجد خامات مطابقة لمعايير البحث' : 'No materials match your filter'}
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              {lang === 'ar'
                ? 'جرب تقليل شروط التصفية، أو كن أنت أول من يضيف هذه الخامة وتبرع بها لبنك الكلية!'
                : 'Try adjusting filters or be the first to donate this scrap material to the bank!'}
            </p>
            <button
              onClick={onOpenSubmitMaterial}
              className="px-5 py-2.5 rounded-xl bg-[#2E8B35] text-white text-xs font-bold shadow-md"
            >
              {lang === 'ar' ? 'شارك بخامتك الآن' : 'Share Material Now'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
