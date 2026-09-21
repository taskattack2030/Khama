import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Camera,
  Layers,
  MapPin,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { MaterialSubmission, Language } from '../types';

interface SubmitMaterialSectionProps {
  onMaterialAdded: (submission: MaterialSubmission) => void;
  lang: Language;
}

export const SubmitMaterialSection: React.FC<SubmitMaterialSectionProps> = ({
  onMaterialAdded,
  lang,
}) => {
  const [formData, setFormData] = useState<MaterialSubmission>({
    studentName: '',
    department: 'التصميم الصناعي',
    academicYear: 'الفرقة الثالثة',
    materialName: '',
    materialType: 'wood',
    quantity: '',
    dimensions: '',
    condition: 'good_offcuts',
    locationInFaculty: '',
    description: '',
    imageUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    id: string;
    points: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample material photos for easy preview / selection
  const samplePhotos = [
    { label: 'قصاصات أخشاب زان', url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80' },
    { label: 'ألواح أكريليك ملونة', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' },
    { label: 'ألواح وشرائح نحاس', url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80' },
    { label: 'بقايا أقمشة وكتان', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80' },
    { label: 'كرتون مقوى مموج', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleInputChange = (field: keyof MaterialSubmission, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.materialName.trim() || !formData.locationInFaculty.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى استكمال الحقول الإلزامية المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionSuccess({
          id: data.submissionId,
          points: data.pointsAwarded || 50,
        });
        onMaterialAdded(formData);
      } else {
        setErrorMsg(data.error || 'Failed to submit');
      }
    } catch {
      // Local fallback
      const generatedId = `MAT-BNH-2026-${Math.floor(Math.random() * 900 + 100)}`;
      setSubmissionSuccess({
        id: generatedId,
        points: 50,
      });
      onMaterialAdded(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionSuccess(null);
    setFormData({
      studentName: '',
      department: 'التصميم الصناعي',
      academicYear: 'الفرقة الثالثة',
      materialName: '',
      materialType: 'wood',
      quantity: '',
      dimensions: '',
      condition: 'good_offcuts',
      locationInFaculty: '',
      description: '',
      imageUrl: '',
    });
  };

  return (
    <section id="submit-material" className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9ED] text-[#F39A24] border border-[#F39A24]/30 text-xs font-black">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'مبادرة تدوير خامات الاستوديو' : 'Studio Salvage Initiative'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'عندك خامات متبقية؟' : 'Have Leftover Materials?'}
          </h2>

          <p className="text-lg sm:text-xl font-bold text-[#2E8B35]">
            {lang === 'ar'
              ? '«بدل ما تتخلص منها... خلّيها بداية لفكرة جديدة»'
              : '"Instead of tossing them away... make them the spark for a new creation"'}
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto font-medium">
            {lang === 'ar'
              ? 'سجل خاماتك وقصاصاتك المتبقية في بنك الخامات لتحصل على عملات استدامة وجواز مرور رقمي وتساهم في مشروعات زملائك.'
              : 'Log your leftover studio offcuts into the Material Bank, earn Sustainability Coins, and power peer projects.'}
          </p>
        </div>

        {/* Success Modal Card Banner if submitted */}
        {submissionSuccess ? (
          <div className="bg-[#F8FCF6] border-2 border-[#2E8B35] rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#DFF2D8] flex items-center justify-center mx-auto text-[#2E8B35]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#102A43]">
                {lang === 'ar' ? 'تم استلام بيانات الخامة بنجاح 🌱' : 'Material Submitted Successfully 🌱'}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {lang === 'ar'
                  ? 'تم إدراج الخامة في بنك الخامات الرقمي لكلية الفنون التطبيقية – جامعة بنها.'
                  : 'Material is now cataloged in the Benha Applied Arts Digital Bank.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              <div className="px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-2xs text-xs">
                <span className="text-gray-400 block font-bold">{lang === 'ar' ? 'رقم جواز الخامة' : 'Passport ID'}</span>
                <span className="font-mono text-base font-black text-[#102A43]">{submissionSuccess.id}</span>
              </div>
              <div className="px-4 py-2.5 bg-[#FFF9ED] rounded-xl border border-[#F39A24]/40 shadow-2xs text-xs">
                <span className="text-[#F39A24] block font-bold">{lang === 'ar' ? 'مكافأة الاستدامة' : 'Reward'}</span>
                <span className="text-base font-black text-[#102A43]">+{submissionSuccess.points} عملة استدامة ✨</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetForm}
                className="px-6 py-3 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] text-white font-bold text-sm shadow-md"
              >
                {lang === 'ar' ? 'تسجيل خامة أخرى متبقية' : 'Submit Another Material'}
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFF9ED]/40 rounded-3xl p-6 sm:p-10 border-2 border-[#102A43]/10 shadow-lg space-y-6"
          >
            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Student Data */}
            <div className="space-y-4">
              <div className="text-xs font-black text-[#2E8B35] uppercase tracking-wider flex items-center gap-1.5">
                <span>01.</span>
                <span>{lang === 'ar' ? 'بيانات الطالب المانح' : 'Student Donor Details'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'اسم الطالب رباعي *' : 'Student Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    placeholder="مثال: ياسمين محمد حسن"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'القسم العلمي بالكلية *' : 'Department *'}
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
                  >
                    <option value="التصميم الصناعي">التصميم الصناعي</option>
                    <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
                    <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
                    <option value="طباعة المنسوجات والصباغة والتجهيز">طباعة المنسوجات والصباغة والتجهيز</option>
                    <option value="الغزل والنسيج والتريكو والملابس">الغزل والنسيج والتريكو والملابس</option>
                    <option value="الإعلان والطباعة والنشر والتغليف">الإعلان والطباعة والنشر والتغليف</option>
                    <option value="الخزف والزجاج">الخزف والزجاج</option>
                    <option value="النحت والتشكيل المعماري والترميم">النحت والتشكيل المعماري والترميم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الفرقة الدراسية *' : 'Academic Year *'}
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
                  >
                    <option value="الفرقة الإعدادية">الفرقة الإعدادية</option>
                    <option value="الفرقة الأولى">الفرقة الأولى</option>
                    <option value="الفرقة الثانية">الفرقة الثانية</option>
                    <option value="الفرقة الثالثة">الفرقة الثالثة</option>
                    <option value="الفرقة الرابعة (تخرج)">الفرقة الرابعة (تخرج)</option>
                    <option value="دراسات عليا وماجستير">دراسات عليا وماجستير</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Material Specifications */}
            <div className="space-y-4 pt-4 border-t border-gray-200/60">
              <div className="text-xs font-black text-[#087EAD] uppercase tracking-wider flex items-center gap-1.5">
                <span>02.</span>
                <span>{lang === 'ar' ? 'مواصفات الخامة المتبقية' : 'Material Specs'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'اسم ونوع الخامة بالتفصيل *' : 'Material Description *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.materialName}
                    onChange={(e) => handleInputChange('materialName', e.target.value)}
                    placeholder="مثال: قصاصات خشب زان مجفف أو ألواح نحاس أصفر"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'تصنيف نوع الخامة *' : 'Material Category *'}
                  </label>
                  <select
                    value={formData.materialType}
                    onChange={(e) => handleInputChange('materialType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
                  >
                    <option value="wood">أخشاب وقشور (Wood)</option>
                    <option value="metal">معادن وأسلاك وصفائح (Metal)</option>
                    <option value="acrylic">بلاستيك وأكريليك (Acrylic/Plastic)</option>
                    <option value="cardboard">كرتون وورق مقوى (Cardboard)</option>
                    <option value="fabric">أقمشة وخيوط ومنسوجات (Fabrics)</option>
                    <option value="leather">جلود طبيعية وصناعية (Leather)</option>
                    <option value="glass">زجاج وسيراميك وخزف (Glass/Ceramic)</option>
                    <option value="bio">خامات حيوية ومستدامة (Bio/Natural)</option>
                    <option value="mixed">مختلطة ومتنوعة (Mixed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الكمية التقريبية (قطع / وزن) *' : 'Quantity / Weight *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="مثال: 4 ألواح أو 2.5 كجم"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الأبعاد التقريبية والسمك' : 'Dimensions & Thickness'}
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="مثال: 50×30 سم، سمك 4 مم"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'حالة القصاصة / الخامة *' : 'Condition *'}
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
                  >
                    <option value="new">جديدة لم تُستخدم (New)</option>
                    <option value="good_offcuts">قصاصات ممتازة ومستقيمة (Good Offcuts)</option>
                    <option value="scraps">بقايا ورش صالحة للتشغيل (Scraps)</option>
                    <option value="usable_fragments">قطع وشظايا للنماذج الصغيرة (Fragments)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'مكان تواجدها الفعلي بالكلية *' : 'Location in Faculty *'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.locationInFaculty}
                      onChange={(e) => handleInputChange('locationInFaculty', e.target.value)}
                      placeholder="مثال: ورشة التصميم الصناعي - رف بنك الخامات"
                      className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload or Sample Selection */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-700">
                  📷 {lang === 'ar' ? 'صورة توضيحية للخامة (رفع أو اختيار نموذج مطابق)' : 'Material Photo'}
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50">
                    <Camera className="w-4 h-4 text-[#2E8B35]" />
                    <span>{lang === 'ar' ? 'رفع صورة من جهازك' : 'Upload File'}</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  <span className="text-xs text-gray-400 font-medium">أو اختر صورة مطابقة:</span>
                  {samplePhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePhotoSelect(s.url)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                        formData.imageUrl === s.url
                          ? 'bg-[#2E8B35] text-white border-[#2E8B35]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                {formData.imageUrl && (
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-2xs mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'وصف إضافي أو مقترحات استخدام للزملاء' : 'Additional Notes / Potential Uses'}
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="مثال: القصاصات نظيفة جداً ومناسبة للقطع بالليزر أو ماكيتات الأثاث..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between border-t border-gray-200/80">
              <span className="text-xs font-extrabold text-[#2E8B35] flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>+50 عملة استدامة تضاف فوراً لرصيدك</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-400 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? lang === 'ar'
                      ? 'جارِ التسجيل...'
                      : 'Saving...'
                    : lang === 'ar'
                    ? 'تسجيل الخامة في بنك الكلية 🌱'
                    : 'Submit Material 🌱'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
