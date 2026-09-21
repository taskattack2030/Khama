import React, { useState, useEffect } from 'react';
import {
  MessageSquareHeart,
  Send,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Users,
  Vote,
  Lightbulb,
} from 'lucide-react';
import { SurveyAnalytics, Language } from '../types';

interface SurveySectionProps {
  initialAnalytics: SurveyAnalytics;
  lang: Language;
}

export const SurveySection: React.FC<SurveySectionProps> = ({
  initialAnalytics,
  lang,
}) => {
  const [awarenessLevel, setAwarenessLevel] = useState<number>(4);
  const [department, setDepartment] = useState<string>('التصميم الصناعي');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'بنك خامات رقمي نشط ومتاح يومياً',
  ]);
  const [openSuggestion, setOpenSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [analytics, setAnalytics] = useState<SurveyAnalytics>(initialAnalytics);
  const [loading, setLoading] = useState(false);

  const topicOptions = [
    'بنك خامات رقمي نشط ومتاح يومياً',
    'ساعات تشغيل مجانية لماكينات الليزر وCNC للمشاريع المستدامة',
    'حاويات فرز ملونة مخصصة داخل كل ورشة وقسم',
    'ورش تدريبية عملية في التصميم الدائري وإعادة التدوير',
    'جوائز وشهادات تقدير رسمية لمشاريع التخرج الخضراء',
  ];

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          awarenessLevel,
          department,
          priorityTopics: selectedTopics,
          openSuggestion,
        }),
      });
      const data = await res.json();
      if (data.success && data.analytics) {
        setAnalytics(data.analytics);
      }
    } catch {
      // offline fallback
      setAnalytics((prev) => ({
        ...prev,
        totalResponses: prev.totalResponses + 1,
      }));
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#FFF9ED]/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'استطلاع رأي طلاب وأعضاء هيئة التدريس' : 'Student & Faculty Poll'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'صوتك يصنع التغيير' : 'Your Voice Drives the Change'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'شارك برأيك في تطوير مبادرة الاستدامة بكلية الفنون التطبيقية – جامعة بنها واحصل على +30 عملة استدامة فورية.'
              : 'Share your perspective on sustainability needs at Benha Applied Arts and earn +30 coins.'}
          </p>
        </div>

        {/* Survey Form & Live Aggregate Results Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (Left) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#102A43]/10 shadow-lg space-y-6">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-[#DFF2D8] flex items-center justify-center mx-auto text-[#2E8B35]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#102A43]">
                  {lang === 'ar' ? 'شكرًا لمشاركتك الفعالة! 🌱' : 'Thank You for Your Feedback! 🌱'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-sm mx-auto">
                  {lang === 'ar'
                    ? 'تم تسجيل صوتك ضمن تحليلات الكلية وإضافة +30 عملة استدامة لحسابك الطلابي.'
                    : 'Your response was counted and +30 Sustainability Coins were awarded.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#087EAD] hover:underline"
                  >
                    {lang === 'ar' ? 'تعديل أو إرسال مقترح آخر' : 'Submit Another Response'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-sm font-black text-[#102A43]">
                    {lang === 'ar' ? 'استبيان الاستدامة السريع' : 'Quick Sustainability Survey'}
                  </span>
                  <span className="text-xs font-extrabold text-[#2E8B35]">+30 نقطة 🌱</span>
                </div>

                {/* 1. Awareness Level */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700">
                    1. {lang === 'ar' ? 'كيف تقيّم وعيك الحالي بمفاهيم التصميم الدائري والاستدامة؟' : 'Rate your circular design awareness:'}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAwarenessLevel(num)}
                        className={`py-2 rounded-xl text-xs font-black transition-all ${
                          awarenessLevel === num
                            ? 'bg-[#2E8B35] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {num} / 5
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>مبتدئ</span>
                    <span>خبير وممارس</span>
                  </div>
                </div>

                {/* 2. Department */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    2. {lang === 'ar' ? 'القسم الأكاديمي للطالب / الأستاذ' : 'Your Department'}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#102A43]"
                  >
                    <option value="التصميم الصناعي">التصميم الصناعي</option>
                    <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
                    <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
                    <option value="طباعة المنسوجات والصباغة والتجهيز">طباعة المنسوجات والصباغة</option>
                    <option value="الغزل والنسيج والتريكو والملابس">الغزل والنسيج والملابس</option>
                    <option value="الإعلان والطباعة والنشر والتغليف">الإعلان والطباعة والتغليف</option>
                    <option value="الخزف والزجاج">الخزف والزجاج</option>
                    <option value="النحت والتشكيل المعماري">النحت والتشكيل المعماري</option>
                  </select>
                </div>

                {/* 3. Priority Topics */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700">
                    3. {lang === 'ar' ? 'ما أكثر ما تحتاجه كليتنا لدعم مشروعات الاستدامة؟ (اختر ما يناسبك)' : 'What does the faculty need most?'}
                  </label>
                  <div className="space-y-2">
                    {topicOptions.map((topic, idx) => {
                      const isChecked = selectedTopics.includes(topic);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleTopicToggle(topic)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'border-[#2E8B35] bg-[#DFF2D8]/60 text-[#102A43]'
                              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{topic}</span>
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-[#2E8B35] text-white' : 'border border-gray-300'
                            }`}
                          >
                            {isChecked && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Open Suggestion */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    4. {lang === 'ar' ? 'مقترحك لتطوير مبادرة الاستدامة بالكلية' : 'Any suggestions for the initiative?'}
                  </label>
                  <textarea
                    rows={2}
                    value={openSuggestion}
                    onChange={(e) => setOpenSuggestion(e.target.value)}
                    placeholder="أفكار لمعارض، ماكينات، أو ورش عمل..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-[#2E8B35] hover:bg-[#25732b] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'جارِ الإرسال...' : lang === 'ar' ? 'إرسال رأيي وتأكيد النقاط' : 'Submit Feedback'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Aggregate Live Survey Results Card (Right) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2E8B35]/30 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm font-black text-[#102A43] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#087EAD]" />
                {lang === 'ar' ? 'نتائج استطلاعات الكلية اللحظية' : 'Aggregate Survey Insights'}
              </span>
              <span className="text-xs font-extrabold text-gray-500">
                {analytics.totalResponses} مشاركة طلابية
              </span>
            </div>

            {/* Average Awareness Metric */}
            <div className="p-4 bg-[#F8FCF6] rounded-2xl border border-[#2E8B35]/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-bold block">متوسط وعي الطلاب بالاستدامة:</span>
                <span className="text-2xl font-black text-[#2E8B35]">{analytics.averageAwareness} / 5</span>
              </div>
              <div className="text-2xl">🌱</div>
            </div>

            {/* Priority Topics Bar Chart */}
            <div className="space-y-3">
              <span className="text-xs font-black text-[#102A43] block">
                {lang === 'ar' ? 'أولويات الطلاب في الكلية:' : 'Top Student Priorities:'}
              </span>
              <div className="space-y-2.5">
                {analytics.topTopics.map((item, idx) => {
                  const percentage = Math.min(100, Math.round((item.votes / analytics.totalResponses) * 100));
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-700">
                        <span className="truncate max-w-[280px]">{item.topic}</span>
                        <span className="text-[#2E8B35] shrink-0">{item.votes} صوت ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#2E8B35] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Participation By Department */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <span className="text-xs font-black text-[#102A43] block">
                {lang === 'ar' ? 'المشاركات حسب الأقسام:' : 'Department Breakdown:'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-gray-600">
                {analytics.responsesByDepartment.slice(0, 4).map((d, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
                    <span className="truncate">{d.department}</span>
                    <span className="font-extrabold text-[#102A43]">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
