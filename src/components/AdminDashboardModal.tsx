import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  BarChart3,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Users,
  Search,
} from 'lucide-react';
import { MaterialItem, MaterialRequest, VisitorAnalytics, Language } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'inventory'>('overview');
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resAnalytics, resRequests, resMaterials] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/materials/requests'),
        fetch('/api/materials'),
      ]);

      const dataAnalytics = await resAnalytics.json();
      const dataRequests = await resRequests.json();
      const dataMaterials = await resMaterials.json();

      if (dataAnalytics.success) setAnalytics(dataAnalytics.analytics);
      if (dataRequests.success) setRequests(dataRequests.requests);
      if (dataMaterials.success) setMaterials(dataMaterials.materials);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/materials/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status: newStatus as any } : r))
        );
      }
    } catch {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus as any } : r))
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#102A43]/20 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#102A43] text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#2E8B35]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                {lang === 'ar' ? 'لوحة تحكم إدارة مبادرة الاستدامة' : 'Faculty Sustainability Admin'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold">
                كلية الفنون التطبيقية – جامعة بنها • متابعة بنك الخامات والطلبات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-100 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#102A43] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'ar' ? 'نظرة عامة وإحصائيات' : 'Overview & Analytics'}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-[#102A43] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{lang === 'ar' ? 'طلبات استعارة الخامات' : 'Material Requests'}</span>
            <span className="w-5 h-5 rounded-full bg-[#F39A24] text-white text-[10px] flex items-center justify-center font-bold">
              {requests.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'inventory'
                ? 'bg-[#102A43] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang === 'ar' ? 'مخزون بنك الخامات' : 'Bank Inventory'} ({materials.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F8FCF6] rounded-2xl border border-[#2E8B35]/20">
                <span className="text-xs text-gray-500 font-bold block">إجمالي الزوار</span>
                <span className="text-2xl font-black text-[#2E8B35]">
                  {(analytics.totalVisitors || analytics.totalVisits || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-4 bg-[#FFF9ED] rounded-2xl border border-[#F39A24]/30">
                <span className="text-xs text-gray-500 font-bold block">مشاهدات الصفحات</span>
                <span className="text-2xl font-black text-[#F39A24]">
                  {typeof analytics.pageViews === 'number'
                    ? analytics.pageViews.toLocaleString()
                    : (analytics.totalVisits * 3 || 3820).toLocaleString()}
                </span>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-xs text-gray-500 font-bold block">خامات تم إنقاذها</span>
                <span className="text-2xl font-black text-[#087EAD]">
                  {analytics.materialsRescuedCount || analytics.rescuedItemsCount || 230} خامة
                </span>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="text-xs text-gray-500 font-bold block">انبعاثات تم تفاديها</span>
                <span className="text-2xl font-black text-[#6950A1]">
                  {analytics.carbonSavedKg || analytics.co2SavedKg || 1420} كجم CO2
                </span>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <span className="font-extrabold text-[#102A43] block">
                توزيع النشاط الأكاديمي داخل كلية الفنون التطبيقية:
              </span>
              <p className="text-gray-600 leading-relaxed font-medium">
                تشهد ورش التصميم الصناعي والمنتجات المعدنية أعلى معدلات استعارة لقصاصات الأخشاب والشرائح النحاسية. يُنصح بتوفير نقاط إيداع إضافية في استوديوهات العمارة الداخلية وقسم النحت.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#102A43]">
                قائمة طلبات الطلاب لحجز الخامات المتبقية:
              </span>
              <span className="text-xs text-gray-400 font-semibold">{requests.length} طلب مسجل</span>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#102A43]">{req.studentName}</span>
                        {req.studentId && <span className="text-gray-400">({req.studentId})</span>}
                      </div>
                      <div className="text-gray-500 font-semibold">
                        {req.department || req.studentDepartment || 'كلية الفنون التطبيقية'}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'collected'
                          ? 'bg-blue-100 text-blue-800'
                          : (req.status as string) === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status === 'approved'
                        ? 'تمت الموافقة'
                        : req.status === 'collected'
                        ? 'تم التسليم'
                        : (req.status as string) === 'rejected'
                        ? 'مرفوض'
                        : 'قيد المراجعة'}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200/80 space-y-1">
                    <div className="font-bold text-[#2E8B35]">الخامة المطلوبة: {req.materialName}</div>
                    <div className="text-gray-600">هدف الاستخدام: {req.intendedUse || req.purpose || req.projectTitle || 'مشروع أكاديمي'}</div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleUpdateRequestStatus(req.id, 'approved')}
                      className="px-3 py-1.5 rounded-lg bg-[#2E8B35] text-white font-bold hover:bg-[#25732b]"
                    >
                      موافقة وتجهيز بالورشة
                    </button>
                    <button
                      onClick={() => handleUpdateRequestStatus(req.id, 'collected')}
                      className="px-3 py-1.5 rounded-lg bg-[#087EAD] text-white font-bold hover:bg-[#076b94]"
                    >
                      تسليم للطالب
                    </button>
                    <button
                      onClick={() => handleUpdateRequestStatus(req.id, 'rejected')}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 font-bold hover:bg-red-50"
                    >
                      رفض
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-4 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold">
                    <th className="py-2.5 px-3 text-start">الخامة</th>
                    <th className="py-2.5 px-3 text-start">النوع</th>
                    <th className="py-2.5 px-3 text-start">الكمية</th>
                    <th className="py-2.5 px-3 text-start">الموقع بالكلية</th>
                    <th className="py-2.5 px-3 text-start">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {materials.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-bold text-[#102A43]">{m.title}</td>
                      <td className="py-3 px-3 text-gray-600">{m.type}</td>
                      <td className="py-3 px-3 font-semibold">{m.quantity}</td>
                      <td className="py-3 px-3 text-gray-600">{m.locationInFaculty}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.status === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'reserved'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.status === 'available' ? 'متاح' : m.status === 'reserved' ? 'محجوز' : 'تم الاستخدام'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
