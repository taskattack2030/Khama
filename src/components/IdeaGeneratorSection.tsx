import React, { useState } from 'react';
import {
  Sparkles,
  Lightbulb,
  Wrench,
  Leaf,
  Layers,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { Language } from '../types';

interface IdeaGeneratorSectionProps {
  lang: Language;
  onExploreProjects: () => void;
}

interface IdeaItem {
  title: string;
  concept: string;
  technique: string;
  ecoImpact: string;
  tip: string;
}

export const IdeaGeneratorSection: React.FC<IdeaGeneratorSectionProps> = ({
  lang,
  onExploreProjects,
}) => {
  const [materialType, setMaterialType] = useState('wood');
  const [dimensions, setDimensions] = useState('قصاصات 40×20 سم، سمك 5 مم');
  const [quantity, setQuantity] = useState('6 قطع');
  const [department, setDepartment] = useState('التصميم الصناعي');
  const [targetProject, setTargetProject] = useState('وحدة إضاءة أو منظم مكتبي');
  const [description, setDescription] = useState('بقايا لوح خشب زان نظيف بعد تفريغ بالليزر');

  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<IdeaItem[] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/idea-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialType,
          dimensions,
          quantity,
          department,
          targetProject,
          description,
        }),
      });

      const data = await res.json();
      if (data.success && data.ideas) {
        setIdeas(data.ideas);
      } else {
        setErrorMsg('حدث خطأ أثناء توليد الأفكار');
      }
    } catch {
      setErrorMsg('تعذر الاتصال بخادم التوليد الذكي');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="innovate" className="py-20 bg-gradient-to-b from-white to-[#F8FCF6] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9ED] text-[#F39A24] border border-[#F39A24]/30 text-xs font-black">
            <Bot className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مولد الأفكار التصميمية المستدامة' : 'AI Sustainable Idea Generator'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'حوّل مخلفاتك إلى فكرة' : 'Turn Scraps Into Design Concepts'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'أدخل بيانات الخامة أو القصاصات المتبقية لديك، وسيقترح عليك الذكاء الاصطناعي الأكاديمي 3 مفاهيم تصميمية نفعية بالتعشيق والتصنيع النظيف في ورش الكلية.'
              : 'Enter your studio scrap details, and AI will structure 3 functional design concepts optimized for faculty workshops.'}
          </p>
        </div>

        {/* Form and Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#102A43]/10 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm font-black text-[#102A43] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2E8B35]" />
                {lang === 'ar' ? 'بيانات الخامة المتاحة' : 'Scrap Material Specs'}
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                {lang === 'ar' ? 'مدعوم بنماذج Gemini' : 'Powered by Gemini'}
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'نوع الخامة *' : 'Material Type *'}
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#102A43]"
                >
                  <option value="أخشاب زان وقشور طبيعية">أخشاب وقشور (Wood)</option>
                  <option value="صفائح نحاس وأسلاك معدنية">معادن وأسلاك وصفائح (Metal)</option>
                  <option value="بقايا أكريليك شفاف وملون">أكريليك وبلاستيك (Acrylic)</option>
                  <option value="كرتون مقوى مموج">كرتون وورق مقوى (Cardboard)</option>
                  <option value="قصاصات أقمشة وكتان وجلود">أقمشة ومنسوجات وجلود (Fabrics/Leather)</option>
                  <option value="شظايا خزف وسيراميك وزجاج">خزف وزجاج وسيراميك (Glass/Ceramic)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الأبعاد والسمك' : 'Dimensions'}
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الكمية' : 'Quantity'}
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'قسم الطالب بالكلية' : 'Department'}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#102A43]"
                >
                  <option value="التصميم الصناعي">التصميم الصناعي</option>
                  <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
                  <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
                  <option value="طباعة المنسوجات والصباغة والتجهيز">طباعة المنسوجات والصباغة</option>
                  <option value="الإعلان والطباعة والنشر والتغليف">الإعلان والتغليف</option>
                  <option value="الخزف والزجاج">الخزف والزجاج</option>
                  <option value="النحت والتشكيل المعماري">النحت والتشكيل المعماري</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'المشروع المطلوب أو الوظيفة المستهدفة' : 'Target Project'}
                </label>
                <input
                  type="text"
                  value={targetProject}
                  onChange={(e) => setTargetProject(e.target.value)}
                  placeholder="وحدة إضاءة، منظم مكتبي، مجسم، حامل..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'وصف إضافي لحالة القصاصة' : 'Description / Condition'}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-300 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ar' ? 'جارِ ابتكار الأفكار بالذكاء الاصطناعي...' : 'Synthesizing ideas...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#DFF2D8]" />
                    <span>{lang === 'ar' ? 'ابتكر 3 أفكار تصميمية مستدامة' : 'Generate 3 Eco Concepts'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column (Right) */}
          <div className="lg:col-span-7 space-y-4">
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {ideas && ideas.length > 0 ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2E8B35] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === 'ar' ? 'مقترحات أولية لورش الفنون التطبيقية' : 'Preliminary Applied Arts Concepts'}
                  </span>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
                    {lang === 'ar' ? 'أفكار تصميمية أولية' : 'Preliminary Design Concepts'}
                  </span>
                </div>

                {ideas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border-2 border-[#2E8B35]/30 shadow-md space-y-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-[#DFF2D8] text-[#2E8B35] font-black text-xs flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h4 className="text-lg font-black text-[#102A43]">{idea.title}</h4>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FFF9ED] text-[#F39A24] border border-[#F39A24]/30">
                        {lang === 'ar' ? 'فكرة مبتكرة' : 'Concept'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                      {idea.concept}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                        <div className="font-extrabold text-[#087EAD] flex items-center gap-1">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'تقنية التصنيع والتعشيق:' : 'Joinery & Process:'}</span>
                        </div>
                        <p className="text-gray-600">{idea.technique}</p>
                      </div>

                      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-1">
                        <div className="font-extrabold text-[#2E8B35] flex items-center gap-1">
                          <Leaf className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'الأثر البيئي المستدام:' : 'Eco Impact:'}</span>
                        </div>
                        <p className="text-emerald-950 font-medium">{idea.ecoImpact}</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#F39A24] shrink-0" />
                      <span>
                        <strong className="font-bold">{lang === 'ar' ? 'نصيحة للمصمم: ' : 'Designer Tip: '}</strong>
                        {idea.tip}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Educational Disclaimer */}
                <div className="p-3 rounded-xl bg-gray-100 text-[11px] text-gray-500 text-center font-medium">
                  {lang === 'ar'
                    ? 'تنبيه: هذه المخرجات تمثل أفكاراً تصميمية أولية استكشافية، ويخضع تنفيذها لإشراف أساتذة الأقسام ومعايير السلامة المهنية بالورش.'
                    : 'Notice: These outputs represent preliminary design explorations subject to academic mentorship and workshop safety.'}
                </div>
              </div>
            ) : (
              /* Placeholder preview prior to generation */
              <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FFF9ED] flex items-center justify-center mx-auto text-[#F39A24]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-[#102A43]">
                  {lang === 'ar' ? 'أفكارك التصميمية ستظهر هنا' : 'Your Concepts Will Appear Here'}
                </h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? 'حدد نوع خامتك واضغط على الزر الأخضر لبدء المعالجة الإبداعية بالذكاء الاصطناعي وتوليد خطط التعشيق والمواصفات.'
                    : 'Choose your material and click generate to synthesize tailored Applied Arts concepts.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={onExploreProjects}
                    className="text-xs font-bold text-[#087EAD] hover:underline"
                  >
                    {lang === 'ar' ? 'أو تصفح معرض مشاريع الطلاب السابقة ←' : 'Or browse student project gallery →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
