import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Check,
} from 'lucide-react';
import QRCode from 'qrcode';
import { BenhaUniversityLogo } from './BenhaUniversityLogo';
import { Language } from '../types';

interface AmbassadorPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AmbassadorPledgeModal: React.FC<AmbassadorPledgeModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [studentName, setStudentName] = useState('');
  const [academicEmail, setAcademicEmail] = useState('');
  const [department, setDepartment] = useState('التصميم الصناعي');
  const [pledgeAccepted, setPledgeAccepted] = useState(true);

  const [certificateData, setCertificateData] = useState<{
    serialNumber: string;
    date: string;
    qrDataUrl: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !academicEmail.trim()) return;

    const randomSerial = `BU-FAPA-SUS-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
    const today = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const qrPayload = JSON.stringify({
      institution: 'Benha University - Faculty of Applied Arts',
      credential: 'Certified Sustainability Ambassador',
      holder: studentName,
      department,
      serial: randomSerial,
      date: today,
      verificationUrl: `https://fapa.bu.edu.eg/sustainability/verify/${randomSerial}`,
    });

    try {
      const qrUrl = await QRCode.toDataURL(qrPayload, {
        margin: 1,
        width: 160,
        color: {
          dark: '#102A43',
          light: '#FFFFFF',
        },
      });
      setCertificateData({
        serialNumber: randomSerial,
        date: today,
        qrDataUrl: qrUrl,
      });
    } catch {
      setCertificateData({
        serialNumber: randomSerial,
        date: today,
        qrDataUrl: '',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = () => {
    if (!certificateData) return;
    navigator.clipboard.writeText(
      `شهادة سفير الاستدامة المعتمدة - جامعة بنها\nرقم المسلسل: ${certificateData.serialNumber}\nالطالب: ${studentName}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#2E8B35]/30 p-6 sm:p-8 space-y-6">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#DFF2D8] flex items-center justify-center text-[#2E8B35]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                {lang === 'ar' ? 'ميثاق سفير الاستدامة الأكاديمي' : 'Sustainability Ambassador Pledge'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold">
                كلية الفنون التطبيقية – جامعة بنها
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!certificateData ? (
          /* Step 1: Pledge Form */
          <form onSubmit={handleGenerateCertificate} className="space-y-5 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#F39A24]/30 space-y-2 text-xs">
              <span className="font-extrabold text-[#F39A24] block">
                🌱 {lang === 'ar' ? 'ميثاق المصمم المستدام:' : 'The Sustainable Designer Pledge:'}
              </span>
              <p className="text-gray-700 leading-relaxed font-semibold">
                «أعاهد نفسي وكلية الفنون التطبيقية – جامعة بنها بأن أكون سفيرًا فاعلاً للاستدامة، أفكر في دورة حياة الخامات قبل بدء التشكيل، أشارك فائض الاستوديو مع زملائي، وأسخر مهاراتي الإبداعية لخدمة البيئة والمجتمع.»
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'اسم الطالب / الباحث ثلاثي أو رباعي *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: مريم خالد السيد"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني الجامعي *' : 'Academic Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={academicEmail}
                  onChange={(e) => setAcademicEmail(e.target.value)}
                  placeholder="student@fapa.bu.edu.eg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ar' ? 'القسم الأكاديمي بالكلية *' : 'Department *'}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-[#102A43] focus:outline-hidden focus:border-[#2E8B35]"
                >
                  <option value="التصميم الصناعي">التصميم الصناعي</option>
                  <option value="المنتجات المعدنية والحلية">المنتجات المعدنية والحلية</option>
                  <option value="التصميم الداخلي والأثاث">التصميم الداخلي والأثاث</option>
                  <option value="طباعة المنسوجات والصباغة والتجهيز">طباعة المنسوجات والصباغة</option>
                  <option value="الغزل والنسيج والتريكو والملابس">الغزل والنسيج والتريكو والملابس</option>
                  <option value="الإعلان والطباعة والنشر والتغليف">الإعلان والتغليف</option>
                  <option value="الخزف والزجاج">الخزف والزجاج</option>
                  <option value="النحت والتشكيل المعماري">النحت والتشكيل المعماري</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  className="w-4 h-4 text-[#2E8B35] rounded-sm"
                />
                <span className="text-xs font-bold text-gray-700">
                  {lang === 'ar'
                    ? 'أوافق على بنود الميثاق الأخلاقي للاستدامة والتصميم الدائري'
                    : 'I agree to the circular design ethics pledge'}
                </span>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={!pledgeAccepted || !studentName.trim() || !academicEmail.trim()}
                className="w-full py-3.5 rounded-2xl bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-300 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#DFF2D8]" />
                <span>{lang === 'ar' ? 'إصدار شهادة سفير الاستدامة الرسمية 🌱' : 'Generate Ambassador Certificate 🌱'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Instant Official Certificate Display */
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            {/* Certificate Outer Border Frame */}
            <div
              id="printable-certificate"
              className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF9ED] via-white to-[#F8FCF6] border-4 border-[#2E8B35]/40 shadow-xl space-y-6"
            >
              {/* Certificate Header Branding */}
              <div className="flex items-center justify-between border-b-2 border-[#102A43]/10 pb-4">
                <BenhaUniversityLogo size="md" theme="dark" />
                <div className="text-end">
                  <span className="text-[10px] font-bold text-gray-400 block font-mono">
                    {certificateData.serialNumber}
                  </span>
                  <span className="text-[11px] font-black text-[#2E8B35] uppercase">
                    اعتماد رسمي للعام 2026
                  </span>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="text-center space-y-2 py-2">
                <span className="text-xs font-black text-[#087EAD] uppercase tracking-widest">
                  جمهورية مصر العربية • جامعة بنها
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                  شهادة سفير الاستدامة المعتمد
                </h2>
                <p className="text-xs text-gray-500 font-bold">
                  Official Sustainability Ambassador Credential
                </p>
              </div>

              {/* Awarded To Text */}
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-600 font-medium">تشهد إدارة الكلية بأن المصمم / الطالب:</p>
                <div className="text-xl sm:text-2xl font-black text-[#2E8B35] border-b border-gray-200 pb-1 max-w-sm mx-auto">
                  {studentName}
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  المقيد بقسم: <strong className="text-[#102A43]">{department}</strong>
                </p>
                <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed pt-1 font-medium">
                  قد أتم بنجاح ميثاق الاستدامة والتصميم الدائري، والتزم بتطبيق معايير خفض البصمة الكربونية وترشيد الخامات في مشاريع الورش.
                </p>
              </div>

              {/* Certificate Footer with QR and Signatures */}
              <div className="flex items-end justify-between pt-4 border-t border-gray-200 text-xs">
                {/* QR Code */}
                <div className="text-center space-y-1">
                  {certificateData.qrDataUrl && (
                    <img
                      src={certificateData.qrDataUrl}
                      alt="Verification QR"
                      className="w-16 h-16 rounded-lg border border-gray-200 mx-auto"
                    />
                  )}
                  <span className="text-[9px] text-gray-400 font-mono block">امسح للتحقق</span>
                </div>

                {/* Slogan */}
                <div className="text-center text-[10px] text-gray-500 font-bold hidden sm:block">
                  «خطوتك اليوم تغيّر الغد»
                  <br />
                  كلية الفنون التطبيقية – جامعة بنها
                </div>

                {/* Date & Signature Stamp */}
                <div className="text-start space-y-1">
                  <div className="text-[10px] text-gray-400 font-semibold">{certificateData.date}</div>
                  <div className="w-20 h-10 border border-dashed border-[#2E8B35]/40 rounded-lg flex items-center justify-center text-[10px] font-black text-[#2E8B35] bg-[#DFF2D8]/30">
                    ختم المبادرة ✓
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E8B35] hover:bg-[#25732b] text-white font-bold text-xs shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'ar' ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}</span>
              </button>

              <button
                onClick={handleCopyVerification}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold text-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#2E8B35]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ بيانات الاعتماد!' : 'نسخ بيانات الشهادة'}</span>
              </button>

              <button
                onClick={() => setCertificateData(null)}
                className="text-xs font-bold text-gray-500 hover:underline"
              >
                إصدار شهادة أخرى
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
