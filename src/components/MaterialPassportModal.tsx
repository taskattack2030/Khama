import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  QrCode,
  Download,
  Printer,
  ShieldCheck,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  User,
  CheckCircle2,
} from 'lucide-react';
import { Material, Language } from '../types';

interface MaterialPassportModalProps {
  material: Material | null;
  onClose: () => void;
  onRequestMaterial: (material: Material) => void;
  lang: Language;
}

export const MaterialPassportModal: React.FC<MaterialPassportModalProps> = ({
  material,
  onClose,
  onRequestMaterial,
  lang,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (material) {
      const payload = JSON.stringify({
        passportId: material.id,
        name: material.name,
        department: material.department,
        location: material.location,
        status: material.status,
        timestamp: new Date().toISOString(),
        institution: 'Faculty of Applied Arts - Benha University',
      });

      QRCode.toDataURL(payload, {
        width: 220,
        margin: 2,
        color: {
          dark: '#102A43',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation error:', err));
    }
  }, [material]);

  if (!material) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#2E8B35]/30">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-[#F8FCF6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DFF2D8] flex items-center justify-center text-[#2E8B35]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-[#2E8B35] tracking-wider uppercase">
                {lang === 'ar' ? 'جواز مرور الخامة الرقمي' : 'Digital Material Passport'}
              </span>
              <h3 className="text-xl font-black text-[#102A43]">{material.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div ref={printRef} className="p-6 sm:p-8 space-y-6">
          {/* Top Badge Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-[#FFF9ED] border border-[#F39A24]/30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">{lang === 'ar' ? 'كود الخامة:' : 'Code:'}</span>
              <span className="font-mono text-sm font-black text-[#102A43] bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                {material.id}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E8B35]">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'خامة معتمدة ببنك الكلية' : 'Verified Faculty Stock'}</span>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* QR Code and Status Box (Left/Start) */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code Material Passport"
                  className="w-40 h-40 rounded-xl border border-gray-200 shadow-2xs"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-xl" />
              )}
              <div className="text-[11px] font-bold text-gray-500 mt-2">
                {lang === 'ar' ? 'امسح الكود للاستلام في الورشة' : 'Scan in workshop for pickup'}
              </div>

              <div className="mt-3 w-full">
                <span
                  className={`inline-block w-full py-1.5 px-3 rounded-xl text-xs font-black uppercase text-center ${
                    material.status === 'available'
                      ? 'bg-emerald-100 text-emerald-800'
                      : material.status === 'reserved'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {material.status === 'available'
                    ? lang === 'ar'
                      ? '● متاحة للاستخدام'
                      : '● Available'
                    : material.status === 'reserved'
                    ? lang === 'ar'
                      ? '● محجوزة لمشروع'
                      : '● Reserved'
                    : lang === 'ar'
                    ? '● أُعيد استخدامها'
                    : '● Reused'}
                </span>
              </div>
            </div>

            {/* Material Attributes (Right) */}
            <div className="sm:col-span-7 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] font-bold">{lang === 'ar' ? 'القسم المصدر' : 'Dept'}</span>
                  <span className="font-bold text-[#102A43]">{material.department}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] font-bold">{lang === 'ar' ? 'الكمية' : 'Qty'}</span>
                  <span className="font-bold text-[#102A43]">{material.quantity} ({material.weightKg} كجم)</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] font-bold">{lang === 'ar' ? 'الأبعاد والسمك' : 'Dimensions'}</span>
                  <span className="font-bold text-[#102A43]">{material.dimensions} / {material.thickness}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 block text-[10px] font-bold">{lang === 'ar' ? 'حالة القصاصة' : 'Condition'}</span>
                  <span className="font-bold text-[#102A43]">{material.condition}</span>
                </div>
              </div>

              {/* Location & Donor */}
              <div className="p-3 bg-[#F8FCF6] rounded-xl border border-[#2E8B35]/20 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#102A43] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#2E8B35]" />
                  <span>{lang === 'ar' ? 'الموقع الفعلي بالكلية:' : 'Storage Location:'}</span>
                  <span className="text-gray-700 font-semibold">{material.location}</span>
                </div>
                {material.donorStudent && (
                  <div className="flex items-center gap-1.5 text-[#102A43] font-bold">
                    <User className="w-3.5 h-3.5 text-[#087EAD]" />
                    <span>{lang === 'ar' ? 'مقدمة بواسطة:' : 'Donated by:'}</span>
                    <span className="text-gray-700 font-semibold">{material.donorStudent}</span>
                  </div>
                )}
              </div>

              {/* Suggested Uses */}
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold text-[#102A43]">
                  {lang === 'ar' ? 'تطبيقات مقترحة للطلاب:' : 'Suggested Applications:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(material.suggestedUses || ['أعمال ورش وتصميم نماذج أولية']).map((use, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Manufacturing Compatibility */}
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold text-[#102A43]">
                  {lang === 'ar' ? 'طرق التشغيل المتوافقة بالورش:' : 'Compatible Fabrication Processes:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(material.processes || ['تشغيل يدوي', 'قص وتشكيل بالورش']).map((proc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#087EAD] border border-blue-200 text-xs font-semibold"
                    >
                      ⚙️ {proc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 sm:p-6 border-t border-gray-100 bg-gray-50 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-100"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طباعة الجواز' : 'Print Pass'}</span>
            </button>
            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download={`${material.id}-passport-qr.png`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تحميل QR' : 'Download QR'}</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestMaterial(material);
            }}
            disabled={material.status !== 'available'}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-300 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {material.status === 'available'
                ? lang === 'ar'
                  ? 'اطلب هذه الخامة لمشروعك'
                  : 'Request this Material'
                : lang === 'ar'
                ? 'الخامة غير متاحة حالياً'
                : 'Unavailable'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
