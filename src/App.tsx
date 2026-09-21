import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ImpactDashboard } from './components/ImpactDashboard';
import { WhatIsSustainability } from './components/WhatIsSustainability';
import { StudentJourney } from './components/StudentJourney';
import { CarbonFootprintSection } from './components/CarbonFootprintSection';
import { DigitalMaterialBank } from './components/DigitalMaterialBank';
import { SubmitMaterialSection } from './components/SubmitMaterialSection';
import { IdeaGeneratorSection } from './components/IdeaGeneratorSection';
import { SaeferChatbot } from './components/SaeferChatbot';
import { ProjectGallery } from './components/ProjectGallery';
import { SustainabilityCoinsAndRewards } from './components/SustainabilityCoinsAndRewards';
import { ChallengesSection } from './components/ChallengesSection';
import { SurveySection } from './components/SurveySection';
import { EducationalPostersSection } from './components/EducationalPostersSection';
import { SDGsSection } from './components/SDGsSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { AmbassadorPledgeModal } from './components/AmbassadorPledgeModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MaterialPassportModal } from './components/MaterialPassportModal';
import { MaterialRequestModal } from './components/MaterialRequestModal';

import {
  mockMaterials,
  mockProjects,
  mockRewards,
  mockChallenges,
  mockStudentProfile,
  mockSurveyAnalytics,
  mockVisitorAnalytics,
  mockSDGs,
} from './data/mockData';

import {
  Material,
  MaterialSubmission,
  Reward,
  VisitorAnalytics,
  StudentProfile,
  Language,
} from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [activeSection, setActiveSection] = useState('hero');

  // Core Data States
  const [analytics, setAnalytics] = useState<VisitorAnalytics>(mockVisitorAnalytics);
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(mockStudentProfile);

  // Modal States
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isFloatingChatbotOpen, setIsFloatingChatbotOpen] = useState(false);
  const [selectedPassportMaterial, setSelectedPassportMaterial] = useState<Material | null>(null);
  const [selectedRequestMaterial, setSelectedRequestMaterial] = useState<Material | null>(null);

  // Track initial page view & load analytics
  useEffect(() => {
    const initData = async () => {
      try {
        // Record visitor analytics
        const resAnalytics = await fetch('/api/analytics/visit', { method: 'POST' });
        const dataAnalytics = await resAnalytics.json();
        if (dataAnalytics.success && dataAnalytics.analytics) {
          setAnalytics(dataAnalytics.analytics);
        }

        // Fetch materials from API
        const resMaterials = await fetch('/api/materials');
        const dataMaterials = await resMaterials.json();
        if (dataMaterials.success && dataMaterials.materials) {
          setMaterials(dataMaterials.materials);
        }
      } catch {
        // Fallback to initial mock data
      }
    };
    initData();
  }, []);

  // Update HTML document dir and lang attribute
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Callback when a student donates a material
  const handleMaterialAdded = (submission: MaterialSubmission) => {
    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      name: submission.materialName,
      title: submission.materialName,
      type: submission.materialType,
      quantity: submission.quantity,
      dimensions: submission.dimensions || 'متبقيات حرة',
      condition: submission.condition,
      location: submission.locationInFaculty,
      locationInFaculty: submission.locationInFaculty,
      description: submission.description,
      imageUrl:
        submission.imageUrl ||
        'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80',
      donorStudent: submission.studentName,
      donorName: submission.studentName,
      donorDepartment: submission.department,
      department: submission.department,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'available',
      carbonOffsetKg: 8.5,
      suggestedUses: ['نماذج أولية سريعة', 'تعاشيق خشبية', 'أعمال فنية بالورشة'],
      passport: {
        id: `BNH-MAT-${Math.floor(Math.random() * 9000 + 1000)}`,
        origin: `ورش كلية الفنون التطبيقية - ${submission.department}`,
        co2Embodied: '3.2 kg CO2e',
        recyclabilityScore: 95,
        suggestedUses: ['نماذج أولية سريعة', 'تعاشيق خشبية', 'أعمال فنية بالورشة'],
        purityGrade: 'A+ نظيف للتشغيل',
      },
    };

    setMaterials((prev) => [newMaterial, ...prev]);

    // Award +50 sustainability points
    setStudentProfile((prev) => ({
      ...prev,
      points: prev.points + 50,
      sustainabilityPoints: (prev.sustainabilityPoints || prev.points) + 50,
      materialsDonated: prev.materialsDonated + 1,
      materialsContributed: (prev.materialsContributed || prev.materialsDonated) + 1,
    }));
  };

  // Callback when a student requests/reserves a material
  const handleMaterialRequestSuccess = (materialId: string, _studentName: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === materialId ? { ...m, status: 'reserved' } : m))
    );
    setStudentProfile((prev) => ({
      ...prev,
      materialsReused: prev.materialsReused + 1,
      points: prev.points + 15,
      sustainabilityPoints: (prev.sustainabilityPoints || prev.points) + 15,
    }));
    setSelectedRequestMaterial(null);
  };

  // Callback when a student redeems a reward
  const handleRedeemReward = (reward: Reward) => {
    const cost = reward.costCoins ?? reward.pointsRequired ?? 50;
    setStudentProfile((prev) => {
      const cur = prev.sustainabilityPoints ?? prev.points;
      const nextPoints = Math.max(0, cur - cost);
      return {
        ...prev,
        points: nextPoints,
        sustainabilityPoints: nextPoints,
      };
    });
  };

  // Callback when joining a challenge
  const handleJoinChallenge = (_challengeId: string) => {
    setStudentProfile((prev) => {
      const cur = prev.sustainabilityPoints ?? prev.points;
      return {
        ...prev,
        points: cur + 20,
        sustainabilityPoints: cur + 20,
      };
    });
  };

  // Font size class mapping
  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg'
      : fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      className={`min-h-screen bg-[#FFF9ED]/30 text-gray-900 transition-colors ${
        isHighContrast ? 'contrast-125 saturate-150 font-semibold' : ''
      } ${fontSizeClass}`}
    >
      {/* 1. Sticky Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAmbassadorModal={() => setIsAmbassadorModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        highContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      <main>
        {/* 2. Hero Section */}
        <div id="hero">
          <HeroSection
            lang={lang}
            onExploreJourney={() => handleNavigate('journey')}
            onExploreMaterialBank={() => handleNavigate('material-bank')}
            onOpenSubmitMaterial={() => handleNavigate('submit-material')}
            onOpenAmbassadorModal={() => setIsAmbassadorModalOpen(true)}
          />
        </div>

        {/* 3. Real-Time Impact Dashboard */}
        <div id="impact-dashboard">
          <ImpactDashboard analytics={analytics} lang={lang} />
        </div>

        {/* 4. What is Sustainability in Applied Arts */}
        <div id="about-sustainability">
          <WhatIsSustainability
            lang={lang}
            onExploreStudentRole={() => handleNavigate('journey')}
          />
        </div>

        {/* 5. 8-Stage Student Circular Design Journey */}
        <div id="journey">
          <StudentJourney
            lang={lang}
            onExploreMaterialBank={() => handleNavigate('material-bank')}
          />
        </div>

        {/* 6. Interactive Studio Carbon Footprint Calculator */}
        <div id="calculator">
          <CarbonFootprintSection lang={lang} />
        </div>

        {/* 7. Digital Material Bank Catalog */}
        <div id="material-bank">
          <DigitalMaterialBank
            materials={materials}
            onOpenPassport={(m) => setSelectedPassportMaterial(m)}
            onRequestMaterial={(m) => setSelectedRequestMaterial(m)}
            onOpenSubmitMaterial={() => handleNavigate('submit-material')}
            lang={lang}
          />
        </div>

        {/* 8. Submit Leftover Material Section */}
        <div id="submit-material">
          <SubmitMaterialSection
            onMaterialAdded={handleMaterialAdded}
            lang={lang}
          />
        </div>

        {/* 9. AI Sustainable Design Idea Generator */}
        <div id="ai-generator">
          <IdeaGeneratorSection
            lang={lang}
            onExploreProjects={() => handleNavigate('gallery')}
          />
        </div>

        {/* 10. AI Assistant "Saefer" In-Page Section */}
        <div id="saefer-ai">
          <SaeferChatbot
            lang={lang}
            isOpenFloating={isFloatingChatbotOpen}
            onToggleFloating={() => setIsFloatingChatbotOpen(!isFloatingChatbotOpen)}
          />
        </div>

        {/* 11. Sustainable Project Gallery (Before/After) */}
        <div id="gallery">
          <ProjectGallery projects={mockProjects} lang={lang} />
        </div>

        {/* 12. Sustainability Coins & Rewards */}
        <div id="coins">
          <SustainabilityCoinsAndRewards
            rewards={mockRewards}
            studentProfile={studentProfile}
            onRedeemReward={handleRedeemReward}
            lang={lang}
          />
        </div>

        {/* 13. Sustainability Challenges & Competitions */}
        <div id="challenges">
          <ChallengesSection
            challenges={mockChallenges}
            onJoinChallenge={handleJoinChallenge}
            lang={lang}
          />
        </div>

        {/* 14. Student Survey & Live Aggregate Analytics */}
        <div id="survey">
          <SurveySection
            initialAnalytics={mockSurveyAnalytics}
            lang={lang}
          />
        </div>

        {/* 15. Educational Posters & High-Res Zoom */}
        <div id="posters">
          <EducationalPostersSection lang={lang} />
        </div>

        {/* 16. UN Sustainable Development Goals (SDGs) */}
        <div id="sdgs">
          <SDGsSection sdgs={mockSDGs} lang={lang} />
        </div>
      </main>

      {/* 17. Contact & Official University Footer */}
      <div id="contact">
        <ContactAndFooter
          lang={lang}
          onNavigate={handleNavigate}
          onOpenAmbassadorModal={() => setIsAmbassadorModalOpen(true)}
        />
      </div>

      {/* Interactive Modal: Ambassador Pledge & Certificate */}
      <AmbassadorPledgeModal
        isOpen={isAmbassadorModalOpen}
        onClose={() => setIsAmbassadorModalOpen(false)}
        lang={lang}
      />

      {/* Interactive Modal: Faculty Admin Dashboard */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
      />

      {/* Interactive Modal: Material Passport */}
      <MaterialPassportModal
        material={selectedPassportMaterial}
        onClose={() => setSelectedPassportMaterial(null)}
        onRequestMaterial={(m) => {
          setSelectedPassportMaterial(null);
          setSelectedRequestMaterial(m);
        }}
        lang={lang}
      />

      {/* Interactive Modal: Material Request */}
      <MaterialRequestModal
        material={selectedRequestMaterial}
        onClose={() => setSelectedRequestMaterial(null)}
        onSubmitSuccess={handleMaterialRequestSuccess}
        lang={lang}
      />
    </div>
  );
}
