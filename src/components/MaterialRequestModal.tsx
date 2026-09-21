import React, { useState } from 'react';
import { X, CheckCircle, PackageCheck, AlertCircle, Sparkles } from 'lucide-react';
import { Material, Language } from '../types';

interface MaterialRequestModalProps {
  material: Material | null;
  onClose: () => void;
  onSubmitSuccess: (materialId: string, studentName: string) => void;
  lang: Language;
}

export const MaterialRequestModal: React.FC<MaterialRequestModalProps> = ({
  material,
  onClose,
  onSubmitSuccess,
  lang,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('التصميم الصناعي');
  const [projectTitle, setProjectTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!material) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !projectTitle.trim()) {
      setError(lang === 'ar' ? 'يرجى كتابة الاسم وعنوان المشروع' : 'Please fill required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/materials/${material.id}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentDepartment,
          projectTitle,
          purpose,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSubmitSuccess(material.id, studentName);
      } else {
        setError(data.error || 'Failed to submit request');
      }
    } catch {
      // Offline fallback
      onSubmitSuccess(material.id, studentName);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-[#2E8B35]/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#F8FCF6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DFF2D8] flex items-center justify-center text-[#2E8B35]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#2E8B35] uppercase tracking-wider">
                {lang === 'ar' ? 'طلب استعارة خامة مستنقذة' : 'Material Reservation Request'}
              </span>
              <h3 className="text-lg font-black text-[#102A43]">{material.name}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-black rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-[#FFF9ED] rounded-xl border border-[#F39A24]/30 text-xs text-[#102A43] flex items-center justify-between">
            <span className="font-bold">كود الخامة: {material.id}</span>
            <span className="font-extrabold text-[#2E8B35]">ستحصل على +70 عملة استدامة 🌱</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ar' ? 'اسم الطالب رباعي *' : 'Student Full Name *'}
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="مثال: أحمد محمود إبراهيم"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#2E8B35]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ar' ? 'القسم الأكاديمي *' : 'Department *'}
            </label>
            <select
              value={studentDepartment}
              onChange={(e) => setStudentDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#2E8B35]"
            >
              <option value="التصميم الصناعي">التصميم الصناعي</option>
              <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
              <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
              <option value="طباعة المنسوجات والصباغة والتجهيز">طباعة المنسوجات والصباغة والتجهيز</option>
              <option value="الغزل والنسيج والتريكو والملابس">الغزل والنسيج والتريكو والملابس</option>
              <option value="الإعلان والطباعة والنشر">الإعلان والطباعة والنشر</option>
              <option value="الخزف والزجاج">الخزف والزجاج</option>
              <option value="النحت والتشكيل المعماري والترميم">النحت والتشكيل المعماري والترميم</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ar' ? 'عنوان أو فكرة المشروع التصميمي *' : 'Project Title *'}
            </label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="مثال: وحدة إضاءة مكتبية دائرية مستدامة"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#2E8B35]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ar' ? 'كيف ستوظف هذه الخامة وما الماكينات المطلوبة؟' : 'Application & Tools Required'}
            </label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="قص بالليزر، تشغيل يدوي، ماكيت اختباري..."
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#2E8B35]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] text-white text-xs font-bold shadow-md disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{loading ? 'جارِ التأكيد...' : lang === 'ar' ? 'تأكيد حجز الخامة' : 'Confirm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
