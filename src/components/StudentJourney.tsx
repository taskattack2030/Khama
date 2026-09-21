import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  Compass,
  Wrench,
  Sparkles,
  RefreshCw,
  Trash2,
  CheckCircle,
  HelpCircle,
  Scissors,
  Hammer,
} from 'lucide-react';
import { Language } from '../types';

interface StudentJourneyProps {
  lang: Language;
  onExploreMaterialBank: () => void;
}

export const StudentJourney: React.FC<StudentJourneyProps> = ({
  lang,
  onExploreMaterialBank,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      titleAr: 'أنا أتعلم',
      titleEn: '1. I Learn',
      icon: GraduationCap,
      color: 'bg-emerald-500',
      descAr:
        'أفهم أبعاد الاستدامة، ودورة حياة المنتج (LCA)، والآثار البيئية لاختياراتي في الاستوديو. أدرك أن كل قرار رسم على الورق ينعكس في استهلاك كوكب الأرض.',
      descEn:
        'Understanding circularity, Life Cycle Assessment (LCA), and how drafting decisions dictate planetary carbon footprints.',
      deptFocusAr: 'جميع أقسام الكلية - المقررات التأسيسية واستوديوهات التصميم',
      deptFocusEn: 'All Departments - Core Curricula & Design Studios',
      practicalActionAr: 'حساب معامل الانبعاثات لكل خامة قبل بدء الرسم.',
      practicalActionEn: 'Calculate material emission factors before starting the concept.',
    },
    {
      id: 1,
      titleAr: 'أنا أختار الخامة',
      titleEn: '2. I Choose Materials',
      icon: Layers,
      color: 'bg-[#087EAD]',
      descAr:
        'أبحث أولاً في بنك الخامات الرقمي بالكلية عن بقايا صالحة بدلاً من شراء خامات جديدة. أفضل المواد المحلية، الطبيعية، غير السامة وقابلة للتحلل.',
      descEn:
        'Searching the Digital Material Bank for existing offcuts before procuring virgin stock. Prioritizing local non-toxic inputs.',
      deptFocusAr: 'التصميم الصناعي • التصميم الداخلي والأثاث • الخزف والزجاج',
      deptFocusEn: 'Industrial Design • Interior Design & Furniture • Ceramics',
      practicalActionAr: 'استعارة ألواح خشب أو أكريليك متبقية من مشاريع التخرج السابقة.',
      practicalActionEn: 'Salvaging wooden boards or acrylic sheets from prior graduation studio stock.',
    },
    {
      id: 2,
      titleAr: 'أنا أصمم',
      titleEn: '3. I Design',
      icon: Compass,
      color: 'bg-[#6950A1]',
      descAr:
        'أعتمد مبادئ التصميم الدائري (DfD: Design for Disassembly). أصمم منتجي ليكون قابلاً للتفكيك، الصيانة، والاستبدال النمطي بدون لحام دائم أو غراء سام.',
      descEn:
        'Applying Design for Disassembly (DfD). Engineering components for modular disassembly and glueless dry mechanical joinery.',
      deptFocusAr: 'التصميم الصناعي • الإعلان والطباعة والتغليف • المنتجات المعدنية والحلية',
      deptFocusEn: 'Industrial Design • Packaging • Metal Products & Jewelry',
      practicalActionAr: 'استخدام التعاشيق الميكانيكية بدلاً من الغراء الصناعي اللاصق.',
      practicalActionEn: 'Using snap-fits and interlocking joints instead of toxic adhesives.',
    },
    {
      id: 3,
      titleAr: 'أنا أصنع',
      titleEn: '4. I Fabricate',
      icon: Hammer,
      color: 'bg-[#F39A24]',
      descAr:
        'في ورش الكلية ومعمل فاب لاب، أضبط خطط القص (Nesting Layouts) لتقليل الهدر إلى أقل من 5%. أجمع القصاصات الناتجة فوراً لإعادتها لبنك الخامات.',
      descEn:
        'In faculty workshops & FabLab, optimizing CNC/laser nesting layouts below 5% kerf loss, and collecting remaining chips immediately.',
      deptFocusAr: 'ورش النجارة والسباكة • ورش النسيج • معمل التصنيع الرقمي CNC',
      deptFocusEn: 'Carpentry & Foundry • Textile Studios • Digital Fab Lab',
      practicalActionAr: 'تعشيق القطع على لوح الليزر بحيث لا يتبقى سوى رقائق دقيقة.',
      practicalActionEn: 'Nesting patterns on sheet stock to leave minimal offcut kerf.',
    },
    {
      id: 4,
      titleAr: 'أنا أستخدم',
      titleEn: '5. I Use',
      icon: Sparkles,
      color: 'bg-emerald-600',
      descAr:
        'أستخدم المنتج أو أسلمه للمستخدم النهائي مع إرشادات تشغيل واضحة توفر الطاقة وتحافظ على ديمومته، وتمنع تقادمه السريع.',
      descEn:
        'Ensuring durable usability, energy conservation in operation, and timeless aesthetic longevity against planned obsolescence.',
      deptFocusAr: 'تصميم الأجهزة النفعية • التجهيزات المعمارية والداخلية',
      deptFocusEn: 'Consumer Appliances • Architectural & Interior Fit-outs',
      practicalActionAr: 'تضمين إرشادات الاستخدام الموفر للطاقة والصيانة الدورية.',
      practicalActionEn: 'Providing clear eco-operating manuals and periodic maintenance guides.',
    },
    {
      id: 5,
      titleAr: 'أنا أصلح',
      titleEn: '6. I Repair',
      icon: Wrench,
      color: 'bg-sky-600',
      descAr:
        'عند حدوث عطل، لا أستبدل المنتج بالكامل! أصلح الجزء التالف بفضل التصميم النمطي وتوافر قطع الغيار المصنعة بالطباعة ثلاثية الأبعاد.',
      descEn:
        'When damaged, repairing individual parts rather than replacing the whole unit via 3D printed spares and modular fasteners.',
      deptFocusAr: 'التصميم الصناعي • المنتجات المعدنية • الحلي والمصوغات',
      deptFocusEn: 'Product Design • Metal Products • Jewelry & Accessories',
      practicalActionAr: 'استبدال المفصلة التالفة فقط في دقيقة واحدة.',
      practicalActionEn: 'Swapping out a single broken joint in 1 minute.',
    },
    {
      id: 6,
      titleAr: 'أنا أعيد الاستخدام',
      titleEn: '7. I Reuse',
      icon: RefreshCw,
      color: 'bg-[#2E8B35]',
      descAr:
        'عندما تنتهي الوظيفة الأصلية، أحوّل القطعة أو خاماتها إلى منتج جديد ذي قيمة جمالية ووظيفية أعلى (Upcycling) بدلاً من رميها.',
      descEn:
        'When the primary purpose ends, upcycling parts into higher-value functional art or new studio prototypes.',
      deptFocusAr: 'طباعة المنسوجات والملابس • النحت والتشكيل المعماري • الخزف',
      deptFocusEn: 'Textile Printing & Fashion • Sculpture & Architecture • Ceramics',
      practicalActionAr: 'تحويل بانرات الكلية القديمة إلى حقائب لابتوب عصرية مقاومة للماء.',
      practicalActionEn: 'Upcycling old vinyl banners into waterproof designer messenger bags.',
    },
    {
      id: 7,
      titleAr: 'أنا أقلل المخلفات',
      titleEn: '8. I Minimize Waste',
      icon: Trash2,
      color: 'bg-[#102A43]',
      descAr:
        'الوصول إلى «صفر فاقد» في استوديو الفنون التطبيقية، وإلهام زملائي بنشر ثقافة الاستدامة كسفراء معتمدين للكلية.',
      descEn:
        'Achieving Zero Studio Waste in Benha Applied Arts, empowering peers as verified sustainability ambassadors.',
      deptFocusAr: 'إدارة الكلية • مبادرة سفراء الاستدامة • اتحاد طلاب الفنون التطبيقية',
      deptFocusEn: 'Faculty Leadership • Ambassador Program • Applied Arts Union',
      practicalActionAr: 'تحقيق دورة خامات مغلقة بالكامل داخل الكلية.',
      practicalActionEn: 'Enforcing a 100% closed material loop across the campus.',
    },
  ];

  return (
    <section id="student-journey" className="py-20 bg-[#FFF9ED] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'رحلة المصمم الدائري' : 'Circular Designer Journey'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'ما علاقتي أنا بالاستدامة؟' : 'What is My Role in Sustainability?'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'رحلة طالب كلية الفنون التطبيقية من لحظة التعلم وحتى الوصول لصفر هدر. انقر على كل مرحلة لاستكشاف دورك العملي:'
              : 'The Applied Arts student pathway from learning to zero waste. Click each stage to explore your practical impact:'}
          </p>
        </div>

        {/* Interactive Stepper Journey Tracker */}
        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1.5 bg-gray-200 -translate-y-1/2 z-0" />

          {/* Stepper Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#2E8B35] shadow-lg scale-105'
                      : 'bg-white/80 border-gray-200 hover:border-[#2E8B35]/50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-2 transition-transform ${
                      step.color
                    } ${isActive ? 'scale-110' : 'opacity-90'}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-black ${isActive ? 'text-[#2E8B35]' : 'text-[#102A43]'}`}>
                    {lang === 'ar' ? step.titleAr : step.titleEn}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold mt-0.5">
                    {lang === 'ar' ? `المرحلة 0${step.id + 1}` : `Stage 0${step.id + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detailed View Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#2E8B35]/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl text-white ${steps[activeStep].color}`}>
                {React.createElement(steps[activeStep].icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400">
                  {lang === 'ar' ? `خطوة رقم ${activeStep + 1} من 8` : `Step ${activeStep + 1} of 8`}
                </span>
                <h3 className="text-2xl font-black text-[#102A43]">
                  {lang === 'ar' ? steps[activeStep].titleAr : steps[activeStep].titleEn}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF9ED] border border-[#F39A24]/30 text-xs font-bold text-[#102A43]">
              <span>🏛️ {lang === 'ar' ? steps[activeStep].deptFocusAr : steps[activeStep].deptFocusEn}</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            {lang === 'ar' ? steps[activeStep].descAr : steps[activeStep].descEn}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#DFF2D8]/60 border border-[#2E8B35]/20 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#2E8B35] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-extrabold text-[#2E8B35] uppercase">
                  {lang === 'ar' ? 'التطبيق العملي في استوديو التصميم:' : 'Studio Action:'}
                </div>
                <div className="text-sm font-bold text-[#102A43] mt-0.5">
                  {lang === 'ar' ? steps[activeStep].practicalActionAr : steps[activeStep].practicalActionEn}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#087EAD] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-extrabold text-[#087EAD] uppercase">
                  {lang === 'ar' ? 'سؤال تفكيري للمصمم:' : 'Designer Reflection:'}
                </div>
                <div className="text-sm font-bold text-[#102A43] mt-0.5">
                  {lang === 'ar'
                    ? 'هل خامتك قابلة لإعادة التدوير بعد 10 سنوات بدون سموم؟'
                    : 'Can your specified material be recycled in 10 years without toxicity?'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls between steps */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold disabled:opacity-40"
            >
              {lang === 'ar' ? '← المرحلة السابقة' : '← Previous Stage'}
            </button>

            <button
              onClick={onExploreMaterialBank}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2E8B35] hover:underline"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تصفح خامات بنك الكلية الآن' : 'Browse Faculty Material Bank'}</span>
            </button>

            <button
              onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-4 py-2 rounded-xl bg-[#2E8B35] text-white text-xs font-bold disabled:opacity-40"
            >
              {lang === 'ar' ? 'المرحلة التالية →' : 'Next Stage →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
