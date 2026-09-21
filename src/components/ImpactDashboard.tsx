import React, { useState } from 'react';
import {
  Users,
  Recycle,
  Palette,
  Sprout,
  PackageCheck,
  Globe2,
  TrendingUp,
  Info,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { VisitorAnalytics, Language } from '../types';

interface ImpactDashboardProps {
  analytics: VisitorAnalytics;
  lang: Language;
  onOpenDetails?: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  analytics,
  lang,
  onOpenDetails,
}) => {
  const [showVisitorBreakdown, setShowVisitorBreakdown] = useState(false);

  // Format large numbers with locale formatting
  const formatNum = (n: number) => {
    return n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
  };

  const impactCards = [
    {
      id: 'visitors',
      icon: Users,
      value: formatNum(analytics.totalVisits),
      labelAr: 'زائر للموقع',
      labelEn: 'Website Visitors',
      subAr: `زرتنا حتى الآن: ${formatNum(analytics.totalVisits)} زائرًا`,
      subEn: `Visited us so far: ${formatNum(analytics.totalVisits)} visitors`,
      color: 'bg-blue-50 text-[#087EAD] border-blue-200',
      badge: lang === 'ar' ? 'مباشر وتفاعلي' : 'Live & Dynamic',
      hasBreakdown: true,
    },
    {
      id: 'rescued_items',
      icon: Recycle,
      value: formatNum(analytics.rescuedItemsCount),
      labelAr: 'خامة تم إنقاذها',
      labelEn: 'Materials Rescued',
      subAr: 'من الهدر ومقالب الورش',
      subEn: 'Saved from studio disposal',
      color: 'bg-emerald-50 text-[#2E8B35] border-emerald-200',
      badge: lang === 'ar' ? '+18 هذا الأسبوع' : '+18 this week',
    },
    {
      id: 'sustainable_projects',
      icon: Palette,
      value: formatNum(analytics.sustainableProjectsCount),
      labelAr: 'مشروع مستدام',
      labelEn: 'Sustainable Projects',
      subAr: 'بأقسام الفنون التطبيقية',
      subEn: 'Across 8 departments',
      color: 'bg-amber-50 text-[#F39A24] border-amber-200',
      badge: lang === 'ar' ? 'معتمدة بالمعرض' : 'Exhibition Verified',
    },
    {
      id: 'participating_students',
      icon: Sprout,
      value: formatNum(analytics.registeredStudentsCount),
      labelAr: 'طالب مشارك',
      labelEn: 'Participating Students',
      subAr: 'سفراء نشطون بالكلية',
      subEn: 'Active ambassadors',
      color: 'bg-green-50 text-[#58A947] border-green-200',
      badge: lang === 'ar' ? 'كل الفرق الدراسية' : 'All academic years',
    },
    {
      id: 'reused_weight',
      icon: PackageCheck,
      value: `${formatNum(analytics.savedMaterialsKg)} ${lang === 'ar' ? 'كجم' : 'kg'}`,
      labelAr: 'خامات أُعيد استخدامها',
      labelEn: 'Reused Material Mass',
      subAr: 'أخشاب، معادن، منسوجات',
      subEn: 'Timber, metals, textiles',
      color: 'bg-purple-50 text-[#6950A1] border-purple-200',
      badge: lang === 'ar' ? 'وزن قياسي' : 'Record weight',
    },
    {
      id: 'co2_avoided',
      icon: Globe2,
      value: `${formatNum(analytics.co2SavedKg)} ${lang === 'ar' ? 'كجم' : 'kg'}`,
      labelAr: 'تقدير الأثر البيئي',
      labelEn: 'Carbon Footprint Avoided',
      subAr: 'مكافئ انبعاثات CO2e موفرة',
      subEn: 'Estimated avoided CO2e',
      color: 'bg-cyan-50 text-[#28A9D6] border-cyan-200',
      badge: lang === 'ar' ? 'حساب معتمد' : 'Verified metrics',
    },
  ];

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 backdrop-blur-md">
        {/* Header bar with Live Official Visitor Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E8B35] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2E8B35]" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#102A43]">
                {lang === 'ar' ? 'لوحة الأثر المستدام اللحظية' : 'Live Sustainability Impact Dashboard'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {lang === 'ar'
                ? 'مؤشرات حية متصلة بقاعدة بيانات كلية الفنون التطبيقية – جامعة بنها'
                : 'Real-time metrics connected to Benha Applied Arts live platform'}
            </p>
          </div>

          {/* Prominent Visitor Counter Box as strictly requested */}
          <div className="flex items-center gap-3 bg-[#FFF9ED] border-2 border-[#F39A24]/30 px-4 py-2.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#F39A24]/20 flex items-center justify-center text-[#F39A24]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'العداد الرسمي للزيارات' : 'Official Visitor Counter'}
              </div>
              <div className="text-base sm:text-lg font-black text-[#102A43]">
                {lang === 'ar'
                  ? `زرتنا حتى الآن: ${formatNum(analytics.totalVisits)} زائرًا`
                  : `Visited us so far: ${formatNum(analytics.totalVisits)} visitors`}
              </div>
            </div>
            <button
              onClick={() => setShowVisitorBreakdown(!showVisitorBreakdown)}
              className="text-xs font-bold text-[#087EAD] hover:underline px-2 py-1 bg-white rounded-lg border border-gray-200"
            >
              {showVisitorBreakdown
                ? lang === 'ar'
                  ? 'إخفاء التفاصيل'
                  : 'Hide'
                : lang === 'ar'
                ? 'تفاصيل الإحصائيات'
                : 'Stats'}
            </button>
          </div>
        </div>

        {/* Visitor Breakdown Drawer (Total, Unique, Today, Week, Month) */}
        {showVisitorBreakdown && (
          <div className="mb-6 p-4 bg-[#F8FCF6] border border-[#2E8B35]/20 rounded-2xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-[#2E8B35] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {lang === 'ar' ? 'تحليلات الزوار المباشرة (معايير الخصوصية الصارمة)' : 'Live Privacy-Conscious Visitor Analytics'}
              </span>
              <span className="text-[11px] text-gray-500">
                {lang === 'ar' ? 'لا يتم تسجيل أي بيانات تعريفية شخصية' : 'Zero personally identifiable data collected'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <div className="text-xs text-gray-500 font-bold">{lang === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}</div>
                <div className="text-lg font-black text-[#102A43]">{formatNum(analytics.totalVisits)}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <div className="text-xs text-gray-500 font-bold">{lang === 'ar' ? 'زوار فريدون' : 'Unique Visitors'}</div>
                <div className="text-lg font-black text-[#087EAD]">{formatNum(analytics.uniqueVisitors)}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <div className="text-xs text-gray-500 font-bold">{lang === 'ar' ? 'زيارات اليوم' : "Today's Visits"}</div>
                <div className="text-lg font-black text-[#2E8B35]">{formatNum(analytics.todayVisits)}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <div className="text-xs text-gray-500 font-bold">{lang === 'ar' ? 'هذا الأسبوع' : 'This Week'}</div>
                <div className="text-lg font-black text-[#F39A24]">{formatNum(analytics.weekVisits)}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-xs text-gray-500 font-bold">{lang === 'ar' ? 'هذا الشهر' : 'This Month'}</div>
                <div className="text-lg font-black text-[#6950A1]">{formatNum(analytics.monthVisits)}</div>
              </div>
            </div>
          </div>
        )}

        {/* 6 Impact Counter Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {impactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="relative bg-white rounded-2xl p-4 border border-gray-200/80 hover:border-[#2E8B35]/50 transition-all hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`p-2.5 rounded-xl border ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {card.badge}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                    {card.value}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                    {lang === 'ar' ? card.labelAr : card.labelEn}
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 font-medium mt-2 pt-2 border-t border-gray-100">
                  {lang === 'ar' ? card.subAr : card.subEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
