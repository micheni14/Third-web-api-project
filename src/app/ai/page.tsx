"use client";

import { useState, useRef, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Send, Bot, User, Loader2, AlertCircle, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
};

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your AI DeFi assistant on Base. Here's what I can help you with:\n\n• Check your token balances and portfolio\n• Swap tokens at the best rates\n• Get market insights and recommendations\n• Execute on-chain transactions\n\nWhat would you like to do?",
};

export default function AIPage() {
  const account = useActiveAccount();
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId,
          from: account?.address,
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setSessionId(data.session_id || sessionId);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        reasoning: data.reasoning,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">AI Assistant</h1>
          <p className="text-xs sm:text-sm text-zinc-500">Your personal DeFi agent</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs text-zinc-500">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--accent)]" />
          <span className="hidden xs:inline">Powered by Thirdweb AI</span>
          <span className="xs:hidden">Thirdweb AI</span>
        </div>
      </div>

      {!account && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-amber-400">
          <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          Connect your wallet to enable on-chain transactions via AI
        </div>
      )}

      <div className="flex h-[400px] sm:h-[500px] md:h-[560px] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)]"
                      : "bg-zinc-800"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--accent)]" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-white rounded-tr-md"
                      : "bg-zinc-800/50 text-zinc-200 rounded-tl-md"
                  }`}
                >
                  {msg.reasoning && (
                    <details className="mb-1.5 sm:mb-2">
                      <summary className="cursor-pointer text-[11px] sm:text-xs text-zinc-500 hover:text-zinc-400">
                        Reasoning
                      </summary>
                      <p className="mt-1 text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                        {msg.reasoning}
                      </p>
                    </details>
                  )}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                  <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--accent)]" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-zinc-800/50 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-zinc-400">
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin text-[var(--accent)]" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-[var(--border)] p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                account
                  ? "Ask about your portfolio or request a swap..."
                  : "Connect wallet to get started..."
              }
              className="input-field text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary !px-2.5 sm:!px-3 !py-2.5 sm:!py-2.5"
            >
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
