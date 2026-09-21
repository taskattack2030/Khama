export type Language = 'ar' | 'en';

export type MaterialType =
  | 'wood'
  | 'metal'
  | 'plastic'
  | 'acrylic'
  | 'textile'
  | 'fabric'
  | 'cardboard'
  | 'leather'
  | 'paper'
  | 'glass'
  | 'bio'
  | 'mixed';

export type MaterialCondition =
  | 'new'
  | 'like_new'
  | 'good_offcuts'
  | 'scraps'
  | 'cutoffs'
  | 'usable_fragments';

export type MaterialStatus = 'available' | 'reserved' | 'reused' | 'pending_approval';

export interface MaterialPassport {
  id: string;
  origin: string;
  co2Embodied: string;
  recyclabilityScore: number;
  suggestedUses: string[];
  purityGrade: string;
}

export interface Material {
  id: string; // e.g. MAT-BNH-2026-001
  name: string;
  title?: string;
  nameEn?: string;
  type: MaterialType;
  department?: string;
  departmentEn?: string;
  color?: string;
  dimensions: string;
  thickness?: string;
  weightKg?: number;
  quantity: string;
  condition: MaterialCondition;
  location?: string;
  locationEn?: string;
  locationInFaculty?: string;
  donorStudent?: string;
  donorName?: string;
  donorDepartment?: string;
  dateAdded: string;
  status: MaterialStatus;
  imageUrl: string;
  suggestedUses?: string[];
  suggestedUsesEn?: string[];
  processes?: string[];
  processesEn?: string[];
  qrCodeData?: string;
  notes?: string;
  description?: string;
  carbonOffsetKg?: number;
  passport?: MaterialPassport;
}

export type MaterialItem = Material;

export interface MaterialSubmission {
  id?: string;
  studentName: string;
  studentId?: string;
  department: string;
  academicYear: string;
  materialType: MaterialType;
  materialName: string;
  quantity: string;
  dimensions: string;
  condition: MaterialCondition;
  locationInFaculty: string;
  description: string;
  imageUrl?: string;
  createdAt?: string;
  status?: MaterialStatus;
}

export interface MaterialRequest {
  id: string;
  materialId: string;
  materialName: string;
  studentName: string;
  studentId?: string;
  studentDepartment?: string;
  department?: string;
  academicYear?: string;
  projectTitle?: string;
  purpose?: string;
  intendedUse?: string;
  dateRequested: string;
  status: 'pending' | 'approved' | 'collected' | 'rejected';
}

export interface Badge {
  id: string;
  title: string;
  titleEn?: string;
  icon?: string;
  description?: string;
  descriptionEn?: string;
  earnedAt?: string;
}

export type AmbassadorLevel =
  | 'بداية خضراء'
  | 'صديق الاستدامة'
  | 'مبتكر مستدام'
  | 'سفير الاستدامة';

export interface StudentProfile {
  id: string;
  name: string;
  department: string;
  departmentEn?: string;
  year?: string;
  academicYear?: string;
  points: number;
  sustainabilityPoints?: number;
  level: AmbassadorLevel | string;
  levelEn?: string;
  badges: string[] | Badge[];
  materialsDonated: number;
  materialsContributed?: number;
  materialsReused: number;
  projectsSubmitted: number;
  projectsCompleted?: number;
  certificates: {
    id: string;
    title: string;
    issueDate: string;
    verificationCode: string;
  }[];
  certificatesEarned?: string[];
}

export interface Reward {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  pointsRequired: number;
  costCoins?: number;
  icon: string;
  category: string;
  stock: number;
}

export interface SustainableProject {
  id: string;
  title: string;
  titleEn?: string;
  student?: string;
  studentName?: string;
  department: string;
  departmentEn?: string;
  wasteBefore?: string;
  wasteBeforeEn?: string;
  material?: string;
  materials?: string[];
  materialEn?: string;
  concept?: string;
  description?: string;
  conceptEn?: string;
  finalProduct?: string;
  finalProductEn?: string;
  reusedAmount?: string;
  reusedAmountKg?: string | number;
  manufacturing?: string;
  process?: string;
  manufacturingEn?: string;
  impact: string;
  impactEn?: string;
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  year?: string;
}

export interface SustainabilityChallenge {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  department?: string;
  deadline: string;
  participants: number;
  submissions?: number;
  points?: number;
  pointsReward?: number;
  prize?: string;
  status?: 'active' | 'completed';
  badgeIcon?: string;
  imageUrl?: string;
}

export type Challenge = SustainabilityChallenge;

export interface VisitorAnalytics {
  totalVisits: number;
  totalVisitors?: number;
  uniqueVisitors: number;
  todayVisits: number;
  weekVisits: number;
  monthVisits: number;
  savedMaterialsKg: number;
  rescuedItemsCount: number;
  materialsRescuedCount?: number;
  co2SavedKg: number;
  carbonSavedKg?: number;
  registeredStudentsCount: number;
  sustainableProjectsCount: number;
  totalPointsAwarded: number;
  pageViews: number | Record<string, number>;
  visitorsByDay?: { day: string; visits: number; uniques: number }[];
  materialsByCategory?: { category: string; count: number; weight: number }[];
}

export interface SurveySubmission {
  awarenessLevel: number; // 1 - 5
  studentRole: string;
  department: string;
  reusedMaterialsBefore: boolean;
  priorityTopics: string[];
  feedback: string;
  timestamp: string;
}

export interface SurveyAnalytics {
  totalResponses: number;
  averageAwareness: number;
  reusedBeforePercent: number;
  topTopics: { topic: string; votes: number }[];
  responsesByDepartment: { department: string; count: number }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'saefer';
  text: string;
  timestamp: string;
  actionPrompt?: string;
  actionLink?: string;
}

export interface SDGGoal {
  number: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  facultyRoleAr: string;
  facultyRoleEn: string;
  color: string;
}
