import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { Language } from '../types';

interface SaeferChatbotProps {
  lang: Language;
  isOpenFloating: boolean;
  onToggleFloating: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'saefer';
  text: string;
  timestamp: string;
}

export const SaeferChatbot: React.FC<SaeferChatbotProps> = ({
  lang,
  isOpenFloating,
  onToggleFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'saefer',
      text:
        'مرحبًا بك يا فنان في كلية الفنون التطبيقية – جامعة بنها! 🌱 أنا «سفير» (Saefer)، مساعدك الذكي لمبادرة الاستدامة الرسمية. كيف يمكنني مساعدتك اليوم في خاماتك أو مشروعك أو حساب بصمتك؟',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'ازاي اتبرع بخاماتي المتبقية؟',
    'ازاي اطلب خامة لمشروعي؟',
    'عندي خردة نحاس أعمل بيها إيه؟',
    'إيه هي عملات الاستدامة؟',
    'ازاي اخفض البصمة الكربونية لمشروعي؟',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
        }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        'أهلاً بك! خطوتك اليوم تغير الغد. يمكنك التبرع بخامتك عبر بنك الخامات أو حساب بصمتك من خلال الموقع.';

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'saefer',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'saefer',
          text:
            'أهلاً بك يا فنان 🌱 يمكنك تصفح بنك الخامات الرقمي مباشرة واستعارة الأخشاب والمعادن المتبقية لمشروعك، أو التبرع بخاماتك للحصول على عملات استدامة معتمدة.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. In-Page Section for visitors scrolling to Saefer */}
      <section id="chatbot-section" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF2D8] text-[#2E8B35] text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'المساعد الذكي الأكاديمي' : 'Official Academic AI Assistant'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43]">
              {lang === 'ar' ? 'اسأل «سفير» للاستدامة' : 'Ask "Saefer" AI Assistant'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {lang === 'ar'
                ? 'مرشدك الذكي في كلية الفنون التطبيقية – جامعة بنها لاقتراح حلول التدوير وحساب البصمة وإجراءات بنك الخامات.'
                : 'Your dedicated Benha Applied Arts advisor for circular materials, carbon reduction, and studio workflows.'}
            </p>
          </div>

          {/* Embedded Chat Container */}
          <div className="bg-[#FFF9ED]/30 rounded-3xl border-2 border-[#2E8B35]/30 shadow-xl overflow-hidden flex flex-col h-[520px]">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2E8B35] flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-[#102A43] text-base">سفير (Saefer AI)</h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    كلية الفنون التطبيقية – جامعة بنها
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#2E8B35] font-bold bg-[#DFF2D8] px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>إجابات معتمدة</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'saefer' && (
                    <div className="w-8 h-8 rounded-xl bg-[#2E8B35] text-white flex items-center justify-center shrink-0 text-xs">
                      🌱
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-[#102A43] text-white rounded-tr-xs'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-tl-xs font-medium'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-gray-300' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold bg-white p-3 rounded-2xl border border-gray-200 w-fit">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#2E8B35]" />
                  <span>سفير يفكر ويكتب الإجابة...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-gray-400 shrink-0">مقترحات:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#DFF2D8] hover:text-[#2E8B35] text-gray-700 text-[11px] font-bold whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اكتب سؤالك لسفير حول الاستدامة، الخامات، أو الورش..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#2E8B35]"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="bg-[#2E8B35] hover:bg-[#25732b] disabled:bg-gray-300 text-white p-2.5 rounded-xl shadow-xs transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Floating Action Button in Corner (Always Available) */}
      <div className="fixed bottom-6 left-6 z-50">
        {!isOpenFloating ? (
          <button
            onClick={onToggleFloating}
            className="flex items-center gap-2 bg-[#2E8B35] hover:bg-[#25732b] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all border-2 border-white/60 group"
            aria-label="اسأل سفير"
          >
            <Bot className="w-5 h-5 text-[#DFF2D8] group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xs sm:text-sm">{lang === 'ar' ? 'اسأل سفير AI' : 'Ask Saefer'}</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
          </button>
        ) : (
          /* Floating Drawer Modal */
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#2E8B35] w-[340px] sm:w-[380px] h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="bg-[#102A43] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2E8B35] flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">سفير AI • الفنون التطبيقية</h4>
                  <span className="text-[10px] text-emerald-300">مبادرة جامعة بنها</span>
                </div>
              </div>
              <button
                onClick={onToggleFloating}
                className="p-1 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl max-w-[88%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#102A43] text-white mr-auto rounded-tr-xs'
                      : 'bg-white text-gray-800 border border-gray-200 ml-auto rounded-tl-xs shadow-2xs font-medium'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="p-2 bg-white rounded-xl border border-gray-200 text-[11px] text-gray-500 font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2E8B35]" />
                  <span>سفير يكتب...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2 bg-white border-t border-gray-100 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اسأل سفير عن الخامات والاستدامة..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-[#2E8B35]"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2 rounded-xl bg-[#2E8B35] text-white hover:bg-[#25732b] disabled:bg-gray-300"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
