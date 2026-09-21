import React, { useState } from 'react';
import {
  Globe,
  Sliders,
  Menu,
  X,
  Sparkles,
  Leaf,
  Award,
  BookOpen,
  Footprints,
  Layers,
  UploadCloud,
  MessageSquare,
  ShieldCheck,
  Type,
  Sun,
  Eye,
} from 'lucide-react';
import { BenhaUniversityLogo } from './BenhaUniversityLogo';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAmbassadorModal: () => void;
  onOpenAdminModal: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeSection,
  onNavigate,
  onOpenAmbassadorModal,
  onOpenAdminModal,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [a11yMenuOpen, setA11yMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', labelAr: 'الرئيسية', labelEn: 'Home', icon: Leaf },
    { id: 'what-is-sustainability', labelAr: 'اكتشف الاستدامة', labelEn: 'Sustainability', icon: BookOpen },
    { id: 'student-journey', labelAr: 'الاستدامة والطالب', labelEn: 'Student Role', icon: Sparkles },
    { id: 'carbon-footprint', labelAr: 'البصمة الكربونية', labelEn: 'Carbon Footprint', icon: Footprints },
    { id: 'material-bank', labelAr: 'بنك الخامات', labelEn: 'Material Bank', icon: Layers },
    { id: 'submit-material', labelAr: 'شارك بخامتك', labelEn: 'Share Material', icon: UploadCloud },
    { id: 'innovate', labelAr: 'ابتكر', labelEn: 'Innovate', icon: Sparkles },
    { id: 'chatbot-section', labelAr: 'سفير AI', labelEn: 'Saefer AI', icon: MessageSquare },
    { id: 'initiative-about', labelAr: 'المبادرة', labelEn: 'The Initiative', icon: Award },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on Left / Start */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('hero')}>
            <BenhaUniversityLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2E8B35] text-white shadow-xs'
                      : 'text-[#102A43] hover:text-[#2E8B35] hover:bg-[#DFF2D8]/50'
                  }`}
                >
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA Button: "كن سفيرًا الآن" */}
            <button
              id="header-cta-ambassador-btn"
              onClick={onOpenAmbassadorModal}
              className="hidden sm:inline-flex items-center gap-2 bg-[#2E8B35] hover:bg-[#25732b] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Leaf className="w-4 h-4 text-[#DFF2D8]" />
              <span>{lang === 'ar' ? 'كُن سفيرًا الآن' : 'Become an Ambassador'}</span>
            </button>

            {/* Language Switch */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-[#102A43] hover:bg-[#FFF9ED] transition-colors"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#087EAD]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Accessibility Control Dropdown */}
            <div className="relative">
              <button
                id="a11y-toggle-btn"
                onClick={() => setA11yMenuOpen(!a11yMenuOpen)}
                className={`p-2 rounded-lg border border-gray-200 text-[#102A43] hover:bg-[#FFF9ED] transition-colors ${
                  a11yMenuOpen || highContrast ? 'bg-[#DFF2D8] border-[#2E8B35]' : ''
                }`}
                aria-label="إمكانية الوصول والتباين"
                title="إمكانية الوصول والتباين"
              >
                <Eye className="w-4 h-4 text-[#2E8B35]" />
              </button>

              {a11yMenuOpen && (
                <div
                  className={`absolute ${
                    lang === 'ar' ? 'left-0' : 'right-0'
                  } mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 text-xs text-[#102A43] space-y-3`}
                >
                  <div className="font-bold border-b border-gray-100 pb-1.5 flex items-center justify-between">
                    <span>{lang === 'ar' ? 'خيارات إمكانية الوصول' : 'Accessibility Tools'}</span>
                    <button onClick={() => setA11yMenuOpen(false)} className="text-gray-400 hover:text-black">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* High Contrast Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#F39A24]" />
                      {lang === 'ar' ? 'تباين بصري عالي' : 'High Contrast'}
                    </span>
                    <button
                      onClick={onToggleHighContrast}
                      className={`px-2.5 py-1 rounded font-bold text-[11px] ${
                        highContrast ? 'bg-[#102A43] text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {highContrast ? (lang === 'ar' ? 'مفعّل' : 'ON') : (lang === 'ar' ? 'معطل' : 'OFF')}
                    </button>
                  </div>

                  {/* Font Size Adjust */}
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Type className="w-3.5 h-3.5 text-[#087EAD]" />
                      {lang === 'ar' ? 'حجم الخط' : 'Text Size'}
                    </span>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      <button
                        onClick={() => onChangeFontSize('normal')}
                        className={`py-1 rounded text-center font-bold ${
                          fontSize === 'normal' ? 'bg-[#2E8B35] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => onChangeFontSize('large')}
                        className={`py-1 rounded text-center font-bold text-sm ${
                          fontSize === 'large' ? 'bg-[#2E8B35] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        A+
                      </button>
                      <button
                        onClick={() => onChangeFontSize('xlarge')}
                        className={`py-1 rounded text-center font-bold text-base ${
                          fontSize === 'xlarge' ? 'bg-[#2E8B35] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        A++
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Dashboard shortcut button */}
            <button
              id="admin-dashboard-btn"
              onClick={onOpenAdminModal}
              className="p-2 rounded-lg border border-gray-200 text-[#102A43] hover:bg-[#FFF9ED] transition-colors"
              title={lang === 'ar' ? 'لوحة تحكم المشرف' : 'Admin Panel'}
            >
              <ShieldCheck className="w-4 h-4 text-[#6950A1]" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#102A43] hover:bg-gray-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-start ${
                    isActive
                      ? 'bg-[#2E8B35] text-white'
                      : 'text-[#102A43] hover:bg-[#FFF9ED]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAmbassadorModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#2E8B35] text-white py-3 rounded-xl font-bold text-sm shadow-sm"
            >
              <Leaf className="w-4 h-4 text-[#DFF2D8]" />
              <span>{lang === 'ar' ? 'كُن سفيرًا الآن' : 'Become an Ambassador'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
