"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

const quickReplies = [
  "I need a website",
  "I need an app",
  "I need a booking system",
  "I need prices",
  "I want to start a project",
];

function getBotResponse(message: string) {
  const text = message.toLowerCase();

  if (text.includes("price") || text.includes("cost")) {
    return "Starter Digital Presence begins from JMD $10,000+. Business systems and full ecosystems are quoted based on scope.";
  }

  if (text.includes("website")) {
    return "We can build business websites, landing pages, portfolio sites, and SEO-ready service websites. Use the project form to share your goals.";
  }

  if (text.includes("app")) {
    return "We can plan and build mobile app experiences, customer apps, and business operation apps with backend systems when needed.";
  }

  if (text.includes("booking")) {
    return "We can build appointment, excursion, transfer, and reservation systems with confirmations, dashboards, and payments if needed.";
  }

  if (text.includes("start")) {
    return "Great. Select Start a Project or complete the intake form so we can review your project, timeline, budget, and required features.";
  }

  return "Thanks. J Supreme Tech can help with websites, apps, booking systems, CRMs, automations, dashboards, and full digital ecosystems.";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hello. What do you need help building?" },
  ]);
  const [input, setInput] = useState("");

  function sendMessage(message: string) {
    const trimmed = message.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "bot", text: getBotResponse(trimmed) }]);
    }, 450);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#7B2FFF] to-[#6D5BFF] text-white shadow-[0_0_45px_rgba(123,47,255,0.45)] transition-transform hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div className="fixed inset-x-4 bottom-24 z-[70] flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] text-white shadow-[0_0_80px_rgba(123,47,255,0.3)] sm:left-auto sm:right-6 sm:h-[620px] sm:w-96">
          <div className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-[#7B2FFF] to-[#6D5BFF] p-4">
            <div>
              <p className="font-bold">J Supreme Support</p>
              <p className="text-xs text-white/80">Choose an option or type a message</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-linear-to-br from-[#7B2FFF] to-[#6D5BFF] text-white"
                      : "border border-white/10 bg-white/[0.06] text-[#F4F4F5]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#B3B3B3]">Quick Select</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white hover:border-[#A855F7]/60 hover:bg-[#7B2FFF]/20"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#A855F7]"
              />
              <button
                type="submit"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#7B2FFF] to-[#6D5BFF] text-white hover:shadow-[0_0_30px_rgba(123,47,255,0.4)]"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
