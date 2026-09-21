import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Challenge, Language } from '../types';

interface ChallengesSectionProps {
  challenges: Challenge[];
  onJoinChallenge: (challengeId: string) => void;
  lang: Language;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  challenges,
  onJoinChallenge,
  lang,
}) => {
  const [joinedSet, setJoinedSet] = useState<Set<string>>(new Set());

  const handleJoin = async (c: Challenge) => {
    try {
      await fetch(`/api/challenges/${c.id}/join`, { method: 'POST' });
    } catch {
      // offline fallback
    }
    setJoinedSet((prev) => new Set([...prev, c.id]));
    onJoinChallenge(c.id);
  };

  return (
    <section className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تحديات الاستدامة التنافسية' : 'Eco Design Challenges'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43]">
            {lang === 'ar' ? 'تحدي الاستدامة بورش الكلية' : 'Sustainability Studio Challenges'}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {lang === 'ar'
              ? 'تحديات تصميمية دورية بين أقسام كلية الفنون التطبيقية لتحويل الخردة إلى حلول واقعية، مع جوائز مالية وشهادات معتمدة.'
              : 'Periodic faculty competitions across departments turning scrap into functional prototypes.'}
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((c) => {
            const isJoined = joinedSet.has(c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#2E8B35]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-[#102A43]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                      {c.department}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#FFF9ED] text-[#F39A24] border border-[#F39A24]/40 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                      +{c.pointsReward} عملة استدامة ✨
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[#2E8B35]" />
                        <span>{lang === 'ar' ? 'آخر موعد للتقديم:' : 'Deadline:'} {c.deadline}</span>
                      </div>
                      <h3 className="text-xl font-black text-[#102A43] leading-snug">{c.title}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-medium">
                      {c.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#087EAD]" />
                        <span>{c.participants + (isJoined ? 1 : 0)} طالب مشارك</span>
                      </div>
                      <div className="text-[#2E8B35] font-black">
                        {c.prize}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleJoin(c)}
                    disabled={isJoined}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-black shadow-xs transition-all flex items-center justify-center gap-2 ${
                      isJoined
                        ? 'bg-[#DFF2D8] text-[#2E8B35] cursor-default'
                        : 'bg-[#2E8B35] hover:bg-[#25732b] text-white hover:shadow-md'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'أنت منضم لهذا التحدي الآن' : 'Enrolled in Challenge'}</span>
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'انضم للتحدي وقدم فكرتك' : 'Join Challenge'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
