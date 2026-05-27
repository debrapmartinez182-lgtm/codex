"use client";

import { useState, useRef, useEffect } from "react";

const quickQuestions = [
  "认证需要多长时间？",
  "需要准备什么材料？",
  "费用是多少？",
  "如何查询办理进度？",
];

const autoReplies: Record<string, string> = {
  "认证需要多长时间？":
    "不同文件类型的认证时间不同：\n• 学历认证：约15个工作日\n• 出生证明：约12个工作日\n• 无犯罪记录：约12个工作日\n• 委托书/声明书：约8-10个工作日\n\n如需加急服务，请联系客服。",
  "需要准备什么材料？":
    "一般需要准备：\n1. 文件原件\n2. 申请人身份证复印件\n3. 申请人护照复印件\n\n具体文件类型所需材料可在「文件类型」页面查看。",
  "费用是多少？":
    "费用根据文件类型不同：\n• 学历认证：约2,800元\n• 出生证明：约2,000元\n• 结婚证：约2,500元\n• 无犯罪记录：约2,000元\n\n以上为参考价格，含公证费+双认证费。",
  "如何查询办理进度？":
    "登录后在「个人中心」页面可实时查看办理进度。每个阶段完成后会有短信/微信通知，您也可以随时联系客服获取最新状态。",
};

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "bot",
      text: "您好！欢迎使用中俄文件认证在线客服 👋\n\n我是您的认证顾问，有什么可以帮您的吗？",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Auto reply
    const reply = autoReplies[text] || "感谢您的咨询！如需更详细的帮助，请拨打客服热线 400-888-9999，我们的专业顾问将为您一对一解答。";
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: reply },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] h-[520px] max-h-[calc(100vh-120px)] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-medium text-sm">在线客服</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">常见问题：</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="输入您的问题..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => handleSend(input)}
              className="flex-shrink-0 rounded-xl bg-primary p-2 text-white hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
