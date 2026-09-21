import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_ANALYTICS,
  INITIAL_MATERIALS,
  INITIAL_PROJECTS,
  INITIAL_CHALLENGES,
  INITIAL_REWARDS,
  INITIAL_SURVEY_ANALYTICS,
} from './src/data/mockData.ts';
import { Material, MaterialSubmission, MaterialRequest } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // In-memory persistent state during server runtime
  let analyticsState = { ...INITIAL_ANALYTICS };
  const uniqueVisitorIps = new Set<string>();
  let materialsState: Material[] = [...INITIAL_MATERIALS];
  let materialRequests: MaterialRequest[] = [];
  let surveyAnalyticsState = { ...INITIAL_SURVEY_ANALYTICS };
  let challengesState = [...INITIAL_CHALLENGES];
  let rewardsState = [...INITIAL_REWARDS];

  // Lazy Gemini AI initialization
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // -------------------------------------------------------------
  // 1. Visitor Analytics API
  // -------------------------------------------------------------
  app.post('/api/analytics/visit', (req: Request, res: Response) => {
    try {
      const { page, visitorId } = req.body;
      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'visitor';
      const trackingKey = visitorId || clientIp;

      analyticsState.totalVisits += 1;
      analyticsState.todayVisits += 1;
      analyticsState.weekVisits += 1;
      analyticsState.monthVisits += 1;

      if (!uniqueVisitorIps.has(trackingKey)) {
        uniqueVisitorIps.add(trackingKey);
        analyticsState.uniqueVisitors += 1;
      }

      if (page && typeof analyticsState.pageViews === 'object' && analyticsState.pageViews !== null) {
        const views = analyticsState.pageViews as Record<string, number>;
        views[String(page)] = (views[String(page)] || 0) + 1;
      }

      res.json({
        success: true,
        analytics: analyticsState,
      });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to record visit' });
    }
  });

  app.get('/api/analytics/stats', (_req: Request, res: Response) => {
    res.json({
      success: true,
      analytics: analyticsState,
    });
  });

  // -------------------------------------------------------------
  // 2. Materials API (Digital Material Bank)
  // -------------------------------------------------------------
  app.get('/api/materials', (req: Request, res: Response) => {
    let results = [...materialsState];
    const { type, department, condition, search } = req.query;

    if (type && type !== 'all') {
      results = results.filter((m) => m.type === type);
    }
    if (department && department !== 'all') {
      results = results.filter((m) => m.department === department);
    }
    if (condition && condition !== 'all') {
      results = results.filter((m) => m.condition === condition);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      results = results.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.nameEn && m.nameEn.toLowerCase().includes(q)) ||
          m.id.toLowerCase().includes(q) ||
          (m.color && m.color.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, materials: results });
  });

  app.post('/api/materials', (req: Request, res: Response) => {
    try {
      const submission: MaterialSubmission = req.body;
      const idNumber = String(materialsState.length + 1).padStart(3, '0');
      const newId = `MAT-BNH-2026-${idNumber}`;

      const newMaterial: Material = {
        id: newId,
        name: submission.materialName || 'خامة مستنقذة متبقية',
        nameEn: 'Salvaged Leftover Material',
        type: submission.materialType || 'mixed',
        department: submission.department || 'التصميم الصناعي',
        departmentEn: 'Faculty of Applied Arts',
        color: 'طبيعي / متنوع',
        dimensions: submission.dimensions || 'أبعاد متنوعة',
        thickness: 'متغير',
        weightKg: Math.round((Math.random() * 5 + 1) * 10) / 10,
        quantity: submission.quantity || '1 وحدة',
        condition: submission.condition || 'scraps',
        location: submission.locationInFaculty || 'معمل بنك الخامات الرئيسي',
        locationEn: 'Main Material Bank Lab',
        donorStudent: `${submission.studentName} - ${submission.academicYear}`,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'available',
        imageUrl:
          submission.imageUrl ||
          'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=700&q=80',
        suggestedUses: [
          'نماذج اختبارية واستكشافية',
          'عناصر تصميم داخلي وحُلي',
          'مشاريع التصميم الدائري للطلاب',
        ],
        suggestedUsesEn: ['Rapid prototyping', 'Jewelry & interior accents', 'Circular design coursework'],
        processes: ['تشغيل يدوي', 'قص وتشكيل'],
        processesEn: ['Handcrafting', 'Cutting & forming'],
        notes: submission.description,
      };

      materialsState.unshift(newMaterial);
      analyticsState.savedMaterialsKg += Math.round(newMaterial.weightKg || 2);
      analyticsState.rescuedItemsCount += 1;
      analyticsState.totalPointsAwarded += 50;

      res.json({
        success: true,
        submissionId: newId,
        material: newMaterial,
        pointsAwarded: 50,
        message: 'تم استلام بيانات الخامة بنجاح 🌱',
      });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to submit material' });
    }
  });

  app.post('/api/materials/:id/request', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { studentName, studentDepartment, projectTitle, purpose } = req.body;
      const material = materialsState.find((m) => m.id === id);

      if (!material) {
        res.status(404).json({ success: false, error: 'Material not found' });
        return;
      }

      const request: MaterialRequest = {
        id: `REQ-${Date.now()}`,
        materialId: id,
        materialName: material.name,
        studentName,
        studentDepartment,
        projectTitle,
        purpose,
        dateRequested: new Date().toISOString().split('T')[0],
        status: 'approved',
      };

      materialRequests.unshift(request);
      material.status = 'reserved';
      analyticsState.totalPointsAwarded += 70;

      res.json({
        success: true,
        request,
        pointsAwarded: 70,
        message: 'تم حجز الخامة بنجاح وتجهيز إذن الاستلام في الورشة!',
      });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to request material' });
    }
  });

  app.patch('/api/materials/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const material = materialsState.find((m) => m.id === id);
    if (!material) {
      res.status(404).json({ success: false, error: 'Material not found' });
      return;
    }
    material.status = status;
    res.json({ success: true, material });
  });

  // -------------------------------------------------------------
  // 3. AI Chatbot "سفير" (Saefer)
  // -------------------------------------------------------------
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const { message, chatHistory } = req.body;

    if (!message) {
      res.status(400).json({ success: false, error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    // Default institutional response knowledge if AI key is missing or fails
    const defaultResponse = getInstitutionalSaeferAnswer(message);

    if (!ai) {
      res.json({
        success: true,
        reply: defaultResponse,
        source: 'knowledge_base',
      });
      return;
    }

    try {
      const systemInstruction = `
أنت «سفير» (Saefer) 🌱، المساعد الذكي الرسمي لمبادرة الاستدامة بكلية الفنون التطبيقية – جامعة بنها في جمهورية مصر العربية.
مهمتك: مساعدة طلاب وأعضاء هيئة التدريس بأسلوب أكاديمي، مبهج، عملي، ومبتكر.

القواعد الصارمة:
1. الترحيب بروح خضراء (🌱).
2. لا تخترع سياسات أو لوائح جامعية غير موجودة. اعتمد على الإجراءات الرسمية المحددة:
   - التبرع بالخامات: يتوجه الطالب لصفحة "عندك خامات متبقية؟" أو معمل بنك الخامات بمبنى الكلية، يسجل بيانات الخامة وينال 50 عملة استدامة.
   - طلب خامة: يتم من خلال "بنك الخامات الرقمي" ثم يظهر جواز مرور الخامة (Material Passport) مع كود QR للتوجه لورشة القسم والاستلام.
   - البصمة الكربونية: توجيه الطالب لحاسبة الموقع التعليمية أو تقليل هدر الطاقة في استوديوهات الفنون.
3. التخصص في أقسام الكلية:
   - التصميم الصناعي (Industrial Design)
   - المنتجات المعدنية والحلية (Metal & Jewelry)
   - التصميم الداخلي والأثاث (Interior & Furniture)
   - طباعة المنسوجات والصباغة والتجهيز
   - الغزل والنسيج والتريكو والملابس الجاهزة
   - الإعلان والطباعة والنشر والتغليف
   - الخزف والزجاج
   - النحت والتشكيل المعماري والترميم
4. شجع دائماً على حلول التصميم الدائري (Design for Disassembly, Cradle to Cradle, Upcycling).
5. اجعل الإجابة مركزة، منسقة بنقاط واضحة باللغة العربية الفصحى المعاصرة.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `سؤال الطالب أو الزائر: ${message}` }] },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || defaultResponse;
      res.json({
        success: true,
        reply: replyText,
        source: 'gemini-3.8-flash',
      });
    } catch {
      res.json({
        success: true,
        reply: defaultResponse,
        source: 'fallback_knowledge_base',
      });
    }
  });

  // -------------------------------------------------------------
  // 4. Sustainable Design Idea Generator ("حوّل مخلفاتك إلى فكرة")
  // -------------------------------------------------------------
  app.post('/api/ai/idea-generator', async (req: Request, res: Response) => {
    const { materialType, dimensions, quantity, department, targetProject, description } = req.body;

    const ai = getGeminiClient();

    const fallbackIdeas = generateLocalDesignIdeas(materialType, department, targetProject);

    if (!ai) {
      res.json({
        success: true,
        ideas: fallbackIdeas,
        disclaimer: 'أفكار تصميمية أولية مستندة إلى قاعدة بيانات الورش بكلية الفنون التطبيقية',
      });
      return;
    }

    try {
      const prompt = `
بصفتك أستاذ ومصمم استدامة في كلية الفنون التطبيقية - جامعة بنها:
قام طالب بإدخال بيانات خامة متبقية ويريد تحويلها إلى فكرة مشروع تصميم مستدام مبتكر:
- نوع الخامة: ${materialType || 'غير محدد'}
- الأبعاد التقريبية: ${dimensions || 'متوسطة'}
- الكمية: ${quantity || 'بضع قطع'}
- قسم الطالب: ${department || 'التصميم الصناعي'}
- المشروع المطلوب: ${targetProject || 'منتج نفعي مستدام'}
- وصف إضافي: ${description || 'لا يوجد'}

قم باقتراح 3 أفكار تصميمية أولية نفعية محكمة (Primary Design Concepts) تتناسب مع إمكانيات ورش الكلية (ماكينات الليزر، CNC، التشكيل اليدوي، السباكة، الخياطة، النجارة).
لكل فكرة اذكر:
1. عنوان الفكرة (Concept Title)
2. الفكرة التصميمية والوظيفة (Design Concept & Function)
3. تقنية التصنيع والتعشيق بالكلية (Fabrication & Assembly Technique)
4. الأثر البيئي المستدام (Eco Impact)
5. نصيحة للمصمم (Key Tip)

اكتب الإجابة بصيغة JSON مهيكلة:
Array of 3 objects containing { title, concept, technique, ecoImpact, tip }.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.8,
        },
      });

      let ideas = fallbackIdeas;
      if (response.text) {
        try {
          const parsed = JSON.parse(response.text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            ideas = parsed;
          }
        } catch {
          ideas = fallbackIdeas;
        }
      }

      res.json({
        success: true,
        ideas,
        disclaimer: 'أفكار تصميمية أولية',
      });
    } catch {
      res.json({
        success: true,
        ideas: fallbackIdeas,
        disclaimer: 'أفكار تصميمية أولية',
      });
    }
  });

  // -------------------------------------------------------------
  // 5. Survey API ("صوتك يصنع التغيير")
  // -------------------------------------------------------------
  app.post('/api/survey/submit', (req: Request, res: Response) => {
    try {
      const { awarenessLevel, department, priorityTopics } = req.body;
      surveyAnalyticsState.totalResponses += 1;
      if (awarenessLevel) {
        surveyAnalyticsState.averageAwareness =
          Math.round(
            ((surveyAnalyticsState.averageAwareness * (surveyAnalyticsState.totalResponses - 1) +
              Number(awarenessLevel)) /
              surveyAnalyticsState.totalResponses) *
              10
          ) / 10;
      }
      if (priorityTopics && Array.isArray(priorityTopics)) {
        priorityTopics.forEach((t: string) => {
          const found = surveyAnalyticsState.topTopics.find((item) => item.topic.includes(t));
          if (found) found.votes += 1;
        });
      }
      if (department) {
        const depFound = surveyAnalyticsState.responsesByDepartment.find((d) => d.department === department);
        if (depFound) depFound.count += 1;
      }

      analyticsState.totalPointsAwarded += 30;

      res.json({
        success: true,
        pointsAwarded: 30,
        message: 'شكرًا لمشاركتك! صوتك يصنع التغيير في استدامة كليتنا 🌱',
        analytics: surveyAnalyticsState,
      });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to record survey' });
    }
  });

  app.get('/api/survey/results', (_req: Request, res: Response) => {
    res.json({ success: true, analytics: surveyAnalyticsState });
  });

  // -------------------------------------------------------------
  // 6. Challenges & Rewards API
  // -------------------------------------------------------------
  app.post('/api/challenges/:id/join', (req: Request, res: Response) => {
    const { id } = req.params;
    const challenge = challengesState.find((c) => c.id === id);
    if (!challenge) {
      res.status(404).json({ success: false, error: 'Challenge not found' });
      return;
    }
    challenge.participants += 1;
    res.json({
      success: true,
      message: `تم انضمامك لتحدي «${challenge.title}» بنجاح! جهز فكرتك للتقديم.`,
      challenge,
    });
  });

  app.post('/api/rewards/:id/redeem', (req: Request, res: Response) => {
    const { id } = req.params;
    const reward = rewardsState.find((r) => r.id === id);
    if (!reward) {
      res.status(404).json({ success: false, error: 'Reward not found' });
      return;
    }
    if (reward.stock <= 0) {
      res.status(400).json({ success: false, error: 'نفدت المكافأة حالياً' });
      return;
    }
    reward.stock -= 1;
    res.json({
      success: true,
      message: `مبروك! تم حجز مكافأتك «${reward.title}». تواصل مع إدارة المبادرة للاستلام.`,
      reward,
    });
  });

  // -------------------------------------------------------------
  // 7. Vite Integration (SPA Fallback)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Benha Sustainability Server running at http://0.0.0.0:${PORT}`);
  });
}

// Institutional answers fallback for Saefer AI
function getInstitutionalSaeferAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('معدن') || q.includes('حديد') || q.includes('نحاس') || q.includes('scrap')) {
    return `رائع 🌱
يمكنك تسجيل الخامة في بنك الخامات الرقمي بكلية الفنون التطبيقية – جامعة بنها.
خطواتك العملية:
1. اذهب لقسم «عندك خامات متبقية؟» في الموقع.
2. ارفع صورة واضحة للخامة وحدد النوع (نحاس/ألمنيوم/حديد)، والكمية، والأبعاد، والحالة.
3. حدد مكان وجودها في ورشة الكلية (مثل ورشة تشكيل المعادن بمبنى ب).
4. بمجرد الإرسال ستحصل على 50 عملة استدامة وجواز مرور للخامة!
يمكن لزملائك في قسم المنتجات المعدنية أو التصميم الصناعي إعادة تشكيلها بدلاً من شراء خامات جديدة.`;
  }

  if (q.includes('خشب') || q.includes('wood')) {
    return `أهلاً بك يا فنان 🌱
قصاصات وألواح الخشب الزان وMDF من أثمن الخامات في كليتنا!
- يمكنك التبرع بها لبنك الخامات ليستخدمها زملاؤك في نماذج الماكيت أو قطع أثاث صغيرة.
- أو يمكنك استخدام أداة «حوّل مخلفاتك إلى فكرة» في الموقع لمعرفة كيف تصمم منها وحدة إضاءة أو حامل لابتوب بدون مسامير عبر تقنية التعشيق (Joinery).`;
  }

  if (q.includes('بصمة') || q.includes('كربون') || q.includes('carbon')) {
    return `البصمة الكربونية للمصمم 🌱
هي إجمالي غازات الاحتباس الحراري (مكافئ CO2) الناتجة عن اختيارك للخامة، وعمليات التصنيع، والنقل، والطاقة المستهلكة في الاستوديو.
💡 نصيحة سريعة لطلاب الفنون التطبيقية:
- اختيار الخامات المحلية المستنقذة من بنك الخامات يخفض البصمة بنسبة تصل إلى 80%!
- احسب بصمتك بدقة الآن عبر قسم «اعرف بصمتك الكربونية» في الموقع.`;
  }

  if (q.includes('نقاط') || q.includes('عملات') || q.includes('coins') || q.includes('سفير')) {
    return `عملات الاستدامة (Sustainability Coins) 🌱
هي نقاط تحفيزية غير نقدية تمنحها كلية الفنون التطبيقية لطلابها تقديراً لجهودهم الخضراء:
• تبرع بخامة: +50 نقطة
• إعادة استخدام خامة: +70 نقطة
• إنجاز مشروع مستدام: +100 نقطة
• حضور ورشة عمل: +40 نقطة
المستويات: بداية خضراء 🌱 ➔ صديق الاستدامة ♻️ ➔ مبتكر مستدام 💡 ➔ سفير الاستدامة 🌍
يمكنك استبدالها بشهادات معتمدة وأدوات تصميم وتكريم في مؤتمر الجامعة!`;
  }

  return `مرحبًا! أنا سفير 🌱 مساعدك الذكي في رحلة الاستدامة بكلية الفنون التطبيقية – جامعة بنها.
خطوتك اليوم تغيّر الغد!
يمكنك أن تسألني عن:
1. كيفية التبرع بخاماتك المتبقية أو طلب خامات لمشروعك.
2. تقنيات التصميم للتفكيك وإعادة التدوير في أقسام الكلية المختلفة.
3. حساب البصمة الكربونية لمنتجك واستوديو التصميم.
4. تحديات الاستدامة والمكافآت والشهادات المعتمدة.

ما الذي تعمل عليه اليوم؟`;
}

function generateLocalDesignIdeas(materialType: string, department: string, targetProject: string) {
  return [
    {
      title: 'وحدة إضاءة نمطية مستدامة بالتعشيق الميكانيكي',
      concept: `استغلال مخلفات ${materialType || 'الخامات'} لتصنيع وحدة إضاءة مكتبية تفاعلية تعتمد على الانتشار الضوئي المريح لبيئة الاستوديو دون استخدام مواد لاصقة ضارة.`,
      technique: 'تفريغ ليزر دقيق مع فتحات تداخل ميكانيكي (Finger Joint) لسهولة الفك والتركيب خلال دقيقتين.',
      ecoImpact: 'توفير 85% من المواد البكر وتقليل استهلاك الطاقة باستخدام شريط ليد موفر 5 واط.',
      tip: 'صمم المنتج ليكون قابلاً للتسطيح (Flat-Pack) لتسهيل نقله وتخزينه بدون شغل مساحات فراغية.',
    },
    {
      title: 'منظم مكتبي هندسي متعدد الوظائف للطلاب',
      concept: `تحويل القطع والقصاصات المتبقية إلى حامل أدوات وألوان وأقلام متدرج هندسيًا مع قاعدة مغناطيسية لتجميع الدبابيس وأسلحة القطر.`,
      technique: 'تشغيل CNC وتنعيم يدوي بزيت الكتان الطبيعي لحماية المظهر الخام للخامة.',
      ecoImpact: 'صفر انبعاثات كيميائية مع إطالة دورة حياة الخامة المستنقذة لخمس سنوات قادمة.',
      tip: 'استفد من العيوب الطبيعية أو الملامس السطحية للقصاصة كقيمة جمالية أصيلة تعبر عن الاستدامة.',
    },
    {
      title: 'أداة مساعدة تفاعلية أو مجسم عرض لمعارض الكلية',
      concept: `تصميم حامل ترويجي أو منصة عرض للنماذج الصغيرة يخدم مشروعات ${department || 'الفنون التطبيقية'} ويسهل تعديل زاويته وفق زاوية الرؤية.`,
      technique: 'مفاصل دوارة بسيطة مدمجة تعتمد على الضغط ومسامير فراشة قابلة لإعادة التدوير.',
      ecoImpact: 'بديل مستدام للبلاستيك أحادي الاستخدام يوفر تكلفة شراء ستاندات عرض مستوردة.',
      tip: 'وثق مراحل التحويل من الخردة إلى المنتج النهائي لتقديمها ضمن ملف البورتفوليو الأخضر.',
    },
  ];
}

startServer();
