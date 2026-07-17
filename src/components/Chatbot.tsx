"use client";

import { FormEvent, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "assistant" | "user"; content: string };

const QUICK_REPLIES = [
  "I need a website",
  "I need a mobile app",
  "I need social media management",
  "I need business automation",
  "I need email marketing",
  "What are your prices?",
  "I want to start a project",
];

function renderText(text: string) {
  const waRegex = /(https:\/\/wa\.me\/\S+)/g;
  const parts = text.split(waRegex);
  return parts.map((part, i) =>
    waRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 font-medium hover:opacity-80"
      >
        Chat on WhatsApp →
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the J Supreme Tech assistant. What can we help you build or grow today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong on my end. Reach Jordan directly on WhatsApp: https://wa.me/16582182282",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-white shadow-[0_14px_40px_-10px_rgba(0,0,0,0.55)] transition-transform hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 z-[70] flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink-900 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.45)] sm:left-auto sm:right-6 sm:h-[620px] sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-ink-950 p-4 text-white">
            <div>
              <p className="font-display font-semibold">J Supreme Support</p>
              <p className="text-xs text-white/65">Powered by AI · Usually replies instantly</p>
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

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    m.role === "user"
                      ? "bg-ink-950 text-white"
                      : "border border-line bg-ink-50 text-ink-800"
                  }`}
                >
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-line bg-ink-50 px-4 py-3 text-sm text-ink-400">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies + input */}
          <div className="border-t border-line p-4">
            <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
              Quick Select
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {QUICK_REPLIES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => sendMessage(r)}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-900 hover:bg-ink-50"
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-ink-900"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-white hover:bg-ink-800 disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
