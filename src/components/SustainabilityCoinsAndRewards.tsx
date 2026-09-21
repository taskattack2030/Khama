import React, { useState } from 'react';
import {
  Award,
  Coins,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Gift,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Reward, StudentProfile, Language } from '../types';

interface SustainabilityCoinsAndRewardsProps {
  rewards: Reward[];
  studentProfile: StudentProfile;
  onRedeemReward: (reward: Reward) => void;
  lang: Language;
}

export const SustainabilityCoinsAndRewards: React.FC<SustainabilityCoinsAndRewardsProps> = ({
  rewards,
  studentProfile,
  onRedeemReward,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'rewards'>('rewards');
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  const levels = [
    { nameAr: '🌱 بداية خضراء', nameEn: 'Green Starter', min: 0, max: 150, color: 'bg-emerald-500' },
    { nameAr: '♻️ صديق الاستدامة', nameEn: 'Eco Friend', min: 151, max: 400, color: 'bg-[#2E8B35]' },
    { nameAr: '💡 مبتكر مستدام', nameEn: 'Eco Innovator', min: 401, max: 800, color: 'bg-[#F39A24]' },
    { nameAr: '🌍 سفير الاستدامة', nameEn: 'Global Ambassador', min: 801, max: 2000, color: 'bg-[#6950A1]' },
  ];

  const studentPoints = studentProfile.sustainabilityPoints ?? studentProfile.points ?? 0;

  const handleRedeem = async (reward: Reward) => {
    const cost = reward.costCoins ?? reward.pointsRequired ?? 50;
    if (studentPoints < cost) {
      alert(lang === 'ar' ? 'نقاطك غير كافية لاستبدال هذه المكافأة بعد' : 'Not enough coins yet');
      return;
    }

    try {
      const res = await fetch(`/api/rewards/${reward.id}/redeem`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setRedeemSuccessMsg(data.message);
        onRedeemReward(reward);
        setTimeout(() => setRedeemSuccessMsg(null), 5000);
      }
    } catch {
      onRedeemReward(reward);
      setRedeemSuccessMsg(
        lang === 'ar'
          ? `مبروك! تم حجز مكافأتك «${reward.title}»`
          : `Congrats! Reserved "${reward.title}"`
      );
      setTimeout(() => setRedeemSuccessMsg(null), 5000);
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9ED] text-[#F39A24] border border-[#F39A24]/30 text-xs font-black">
            <Coins className="w-4 h-4" />
            <span>{lang === 'ar' ? 'منظومة التحفيز الأكاديمية' : 'Student Gamification System'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'عملات الاستدامة ومكافآت التميز' : 'Sustainability Coins & Rewards'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'كل خطوة خضراء تخطوها في الكلية لها تقدير! تبرع بالخامات، شارك في التحديات، واجمع العملات لاستبدالها بشهادات وجوائز معتمدة.'
              : 'Every green choice is recognized. Earn coins for material donations & challenges, then redeem for certified awards.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'rewards'
                  ? 'bg-[#2E8B35] text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {lang === 'ar' ? 'كتالوج المكافآت (استبدل نقاطك)' : 'Rewards Catalog'}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#2E8B35] text-white shadow-xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {lang === 'ar' ? 'لوحة الطالب ومستويات السفير' : 'Student Ambassador Levels'}
            </button>
          </div>
        </div>

        {redeemSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2E8B35]" />
              <span>{redeemSuccessMsg}</span>
            </div>
          </div>
        )}

        {/* Tab 1: Rewards Catalog */}
        {activeTab === 'rewards' && (
          <div className="space-y-8">
            {/* Student Balance Strip */}
            <div className="bg-[#FFF9ED] rounded-3xl p-6 border-2 border-[#F39A24]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F39A24] text-white flex items-center justify-center font-black text-xl shadow-xs">
                  🌱
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500">
                    {lang === 'ar' ? 'رصيد نقاطك الحالي:' : 'Your Current Balance:'}
                  </span>
                  <div className="text-2xl font-black text-[#102A43]">
                    {studentPoints} {lang === 'ar' ? 'عملة استدامة' : 'Coins'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">مستواك الحالي:</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-black text-[#2E8B35]">
                  {studentProfile.level}
                </span>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const cost = reward.costCoins ?? reward.pointsRequired ?? 50;
                const canAfford = studentPoints >= cost;
                return (
                  <div
                    key={reward.id}
                    className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#2E8B35]/40 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{reward.icon}</span>
                        <span className="px-3 py-1 rounded-full bg-[#FFF9ED] border border-[#F39A24]/30 text-xs font-extrabold text-[#102A43]">
                          {cost} {lang === 'ar' ? 'عملة' : 'Coins'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-[#102A43] leading-snug">{reward.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          {reward.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold pt-2 border-t border-gray-100">
                        <span>{lang === 'ar' ? 'المتبقي بالمخزن:' : 'Stock:'} {reward.stock}</span>
                        <span>{reward.category}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford || reward.stock <= 0}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                          canAfford && reward.stock > 0
                            ? 'bg-[#2E8B35] hover:bg-[#25732b] text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Gift className="w-4 h-4" />
                            <span>{lang === 'ar' ? 'استبدل المكافأة الآن' : 'Redeem Reward'}</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>
                              {lang === 'ar'
                                ? `يلزمك ${cost - studentPoints} عملة إضافية`
                                : `Need ${cost - studentPoints} more`}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Student Profile & Levels */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Student Card (Left) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2E8B35]/30 shadow-lg space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#DFF2D8] flex items-center justify-center text-[#2E8B35] font-black text-2xl">
                  {studentProfile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#102A43]">{studentProfile.name}</h3>
                  <div className="text-xs text-gray-500 font-semibold">
                    {studentProfile.department} • {studentProfile.academicYear || studentProfile.year || 'الفرقة الثالثة'}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-gray-400 block font-bold">خامات تم التبرع بها</span>
                  <span className="text-lg font-black text-[#102A43]">
                    {studentProfile.materialsContributed ?? studentProfile.materialsDonated ?? 0} خامات
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-gray-400 block font-bold">خامات تم استخدامها</span>
                  <span className="text-lg font-black text-[#087EAD]">{studentProfile.materialsReused || 0} خامات</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-gray-400 block font-bold">مشاريع مستدامة</span>
                  <span className="text-lg font-black text-[#2E8B35]">
                    {studentProfile.projectsCompleted ?? studentProfile.projectsSubmitted ?? 0} مشاريع
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-gray-400 block font-bold">شهادات معتمدة</span>
                  <span className="text-lg font-black text-[#6950A1]">
                    {studentProfile.certificatesEarned?.length ?? studentProfile.certificates?.length ?? 1} شهادة
                  </span>
                </div>
              </div>

              {/* Badges Earned */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#102A43]">الأوسمة المحققة:</span>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.badges.map((b, idx) => {
                    const badgeTitle = typeof b === 'string' ? b : b.title;
                    return (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-[#FFF9ED] border border-[#F39A24]/30 text-xs font-bold text-[#102A43]"
                      >
                        🏆 {badgeTitle}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Level Tier Ladder (Right) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
              <h3 className="text-xl font-black text-[#102A43]">
                {lang === 'ar' ? 'سلم مستويات سفير الاستدامة' : 'Ambassador Level Ladder'}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {lang === 'ar'
                  ? 'ترقية مستواك تمنحك صلاحيات إضافية بالورش وتكريم رسمي في مؤتمر الكلية السنوي.'
                  : 'Advancing levels grants extra workshop privileges and recognition.'}
              </p>

              <div className="space-y-3 pt-2">
                {levels.map((lvl, idx) => {
                  const isCurrent = studentPoints >= lvl.min && studentPoints <= lvl.max;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'border-[#2E8B35] bg-[#F8FCF6] shadow-sm'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[#102A43]">
                            {lang === 'ar' ? lvl.nameAr : lvl.nameEn}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#2E8B35] text-white">
                              مستواك الحالي
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 font-semibold">
                          يتطلب من {lvl.min} إلى {lvl.max} عملة استدامة
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                        {idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Official Institutional Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950 font-medium">
          <AlertCircle className="w-5 h-5 text-[#F39A24] shrink-0 mt-0.5" />
          <span>
            {lang === 'ar'
              ? 'تنويه رسمي: عملات الاستدامة هي نقاط تحفيزية داخلية غير نقدية تمنحها كلية الفنون التطبيقية – جامعة بنها لتشجيع الطلاب وأعضاء هيئة التدريس على تبني السلوك المستدام ولا تمثل أي معاملة مالية.'
              : 'Official Disclaimer: Sustainability Coins are internal non-monetary academic incentive points awarded by Faculty of Applied Arts – Benha University.'}
          </span>
        </div>
      </div>
    </section>
  );
};
