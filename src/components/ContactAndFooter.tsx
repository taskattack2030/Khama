import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Share2,
  Check,
  Send,
  CheckCircle2,
  ExternalLink,
  Heart,
  Globe,
} from 'lucide-react';
import { BenhaUniversityLogo } from './BenhaUniversityLogo';
import { Language } from '../types';

interface ContactAndFooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAmbassadorModal: () => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  lang,
  onNavigate,
  onOpenAmbassadorModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'التصميم الصناعي',
    subject: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const socialLinks = [
    { name: 'Facebook', url: '[FACEBOOK_URL]', icon: '📘' },
    { name: 'Instagram', url: '[INSTAGRAM_URL]', icon: '📸' },
    { name: 'YouTube', url: '[YOUTUBE_URL]', icon: '▶️' },
    { name: 'LinkedIn', url: '[LINKEDIN_URL]', icon: '💼' },
    { name: 'TikTok', url: '[TIKTOK_URL]', icon: '🎵' },
    { name: 'X / Twitter', url: '[X_URL]', icon: '🐦' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareSocial = (platform: 'whatsapp' | 'facebook' | 'linkedin') => {
    const text = encodeURIComponent(
      'انضم لمبادرة الاستدامة بكلية الفنون التطبيقية – جامعة بنها: «خطوتك اليوم تغيّر الغد» 🌱'
    );
    const url = encodeURIComponent(window.location.href);

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 6000);
    setFormData({
      name: '',
      email: '',
      department: 'التصميم الصناعي',
      subject: '',
      message: '',
    });
  };

  return (
    <footer className="bg-[#102A43] text-white">
      {/* 1. Contact Form & Connect Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white/5 rounded-3xl p-6 sm:p-10 border border-white/10 backdrop-blur-md space-y-6">
            <div>
              <span className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
                {lang === 'ar' ? 'تواصل مع فريق المبادرة' : 'Get in Touch'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-1">
                {lang === 'ar' ? 'شاركنا فكرتك أو استفسارك' : 'Send an Inquiry or Proposal'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">
                {lang === 'ar'
                  ? 'نسعد بتواصل طلاب وأعضاء هيئة التدريس والشركاء الصناعيين لدعم استدامة الكلية.'
                  : 'We welcome students, faculty, and industry partners to collaborate.'}
              </p>
            </div>

            {messageSent ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-200">
                  {lang === 'ar' ? 'تم استلام رسالتك بنجاح 🌱' : 'Message Sent Successfully!'}
                </h4>
                <p className="text-xs text-gray-300">
                  {lang === 'ar'
                    ? 'سيقوم منسق مبادرة الاستدامة بالرد عليك عبر البريد الجامعي.'
                    : 'The sustainability coordinator will reply to your academic email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'الاسم رباعي *' : 'Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="اسمك الكريم"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-hidden focus:border-[#2E8B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني الجامعي *' : 'Academic Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@fapa.bu.edu.eg"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-hidden focus:border-[#2E8B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'القسم الأكاديمي' : 'Department'}
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A43] border border-white/20 text-white focus:outline-hidden focus:border-[#2E8B35]"
                    >
                      <option value="التصميم الصناعي">التصميم الصناعي</option>
                      <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
                      <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
                      <option value="طباعة المنسوجات والصباغة">طباعة المنسوجات</option>
                      <option value="الغزل والنسيج والملابس">الغزل والنسيج والملابس</option>
                      <option value="الإعلان والتغليف">الإعلان والتغليف</option>
                      <option value="الخزف والزجاج">الخزف والزجاج</option>
                      <option value="النحت والتشكيل المعماري">النحت والتشكيل المعماري</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'موضوع الرسالة *' : 'Subject *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="شراكة، استعارة خامة، فكرة تحدي..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-hidden focus:border-[#2E8B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {lang === 'ar' ? 'نص الرسالة أو تفاصيل الفكرة *' : 'Message *'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-hidden focus:border-[#2E8B35]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Channels & Share Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Social Media Links */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#2E8B35] uppercase tracking-wider block">
                {lang === 'ar' ? 'تابع رحلة الاستدامة' : 'Follow Our Journey'}
              </span>
              <h3 className="text-2xl font-black text-white">
                {lang === 'ar' ? 'حساباتنا الرسمية على منصات التواصل' : 'Official Social Channels'}
              </h3>
              <p className="text-xs text-gray-300 font-medium">
                {lang === 'ar'
                  ? 'تابع ورش العمل الحية، معارض الطلاب الدورية، وإعلانات بنك الخامات عبر منصاتنا:'
                  : 'Follow live workshops, student exhibitions, and material bank updates:'}
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2E8B35] hover:bg-white/10 text-xs font-bold text-white transition-all flex items-center gap-2"
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Share Initiative Strip */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <div className="text-sm font-black text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#F39A24]" />
                <span>{lang === 'ar' ? 'شارك المبادرة مع زملائك' : 'Share the Initiative'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleShareSocial('whatsapp')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  واتساب (WhatsApp)
                </button>
                <button
                  onClick={() => handleShareSocial('facebook')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  فيسبوك (Facebook)
                </button>
                <button
                  onClick={() => handleShareSocial('linkedin')}
                  className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors"
                >
                  لينكد إن (LinkedIn)
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2E8B35]" /> : null}
                  <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>

            {/* Campus Location Info */}
            <div className="space-y-2 text-xs text-gray-300 font-medium pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2E8B35] shrink-0 mt-0.5" />
                <span>
                  مبنى كلية الفنون التطبيقية، شارع الشهيد فريد ندا، مجمع الكليات، مدينة بنها، محافظة القليوبية، جمهورية مصر العربية.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#087EAD] shrink-0" />
                <span>sustainability@fapa.bu.edu.eg</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F39A24] shrink-0" />
                <span>+20 (13) 322-1234 • داخلي: 4120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        <div className="flex items-center">
          <BenhaUniversityLogo size="sm" theme="light" />
        </div>

        <div className="text-center md:text-start space-y-1">
          <p className="font-extrabold text-white text-sm">
            «خطوتك اليوم تغيّر الغد» • «كل اختيار صغير يصنع فرقًا كبيرًا»
          </p>
          <p>
            جميع الحقوق محفوظة © 2026 كلية الفنون التطبيقية – جامعة بنها، جمهورية مصر العربية.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
            الرئيسية
          </button>
          <button onClick={() => onNavigate('material-bank')} className="hover:text-white transition-colors">
            بنك الخامات
          </button>
          <button onClick={onOpenAmbassadorModal} className="text-[#2E8B35] hover:underline font-bold">
            كن سفيرًا الآن
          </button>
        </div>
      </div>
    </footer>
  );
};
