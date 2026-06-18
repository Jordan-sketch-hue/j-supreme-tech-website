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
      setMessages((current) => [
        ...current,
        { role: "bot", text: getBotResponse(trimmed) },
      ]);
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
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-white shadow-[0_14px_40px_-10px_rgba(0,0,0,0.55)] transition-transform hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div className="fixed inset-x-4 bottom-24 z-[70] flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink-900 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.45)] sm:left-auto sm:right-6 sm:h-[620px] sm:w-96">
          <div className="flex items-center justify-between border-b border-line bg-ink-950 p-4 text-white">
            <div>
              <p className="font-display font-semibold">J Supreme Support</p>
              <p className="text-xs text-white/65">
                Choose an option or type a message
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-ink-950 text-white"
                      : "border border-line bg-ink-50 text-ink-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line p-4">
            <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
              Quick Select
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink-700 hover:border-ink-900 hover:bg-ink-50"
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
                className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-ink-900"
              />
              <button
                type="submit"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-white hover:bg-ink-800"
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
