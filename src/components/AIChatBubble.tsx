import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_PORTFOLIO_AGENT_URL ||
  (import.meta.env.VITE_ENABLE_N8N_FALLBACK === "true"
    ? import.meta.env.VITE_N8N_WEBHOOK_URL
    : "") ||
  "";

/*
 * ── SECURITY NOTE ─────────────────────────────────────────
 * VITE_N8N_API_KEY is intentionally NOT imported here.
 * Any VITE_ prefixed env var gets embedded into the client-side
 * JS bundle, making it visible to anyone in the browser DevTools.
 *
 * The n8n webhook should validate requests via:
 *   - IP allowlist / rate limiting on the n8n side
 *   - CORS origin restriction on the n8n webhook settings
 *   - A server-side proxy with the API key hidden
 *
 * If you must use a key, proxy requests through a backend.
 */

const RATE_LIMIT_MS = 3000;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;
const AUTO_OPEN_DELAY = 3000;

/* ── Sanitization helpers ────────────────────────────────── */
function sanitizeInput(str: string): string {
  return str
    .replace(/[<>]/g, "")      // strip angle brackets
    .replace(/javascript:/gi, "") // strip JS protocol
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

const AIChatBubble = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("chat.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSentRef = useRef(0);
  const autoOpenedRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-open chat after 3 seconds (only once)
  useEffect(() => {
    if (autoOpenedRef.current) return;
    const timer = setTimeout(() => {
      setOpen(true);
      autoOpenedRef.current = true;
    }, AUTO_OPEN_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    const sanitized = sanitizeInput(input);
    if (!sanitized || loading || rateLimited) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastSentRef.current < RATE_LIMIT_MS) {
      setRateLimited(true);
      setTimeout(() => setRateLimited(false), RATE_LIMIT_MS);
      return;
    }
    lastSentRef.current = now;

    const userMsg: Message = { role: "user", content: sanitized };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!CHAT_WEBHOOK_URL) throw new Error("Chat service unavailable");

      // Send only last N messages to limit payload size
      const recentHistory = messages.slice(-MAX_HISTORY);

      const res = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: sanitized, history: recentHistory }),
      });

      if (!res.ok) throw new Error("Request failed");

      // Robust response parsing — handle JSON or plain text
      const text = await res.text();
      let output = "";
      try {
        const data = JSON.parse(text);
        output = Array.isArray(data)
          ? data[0]?.output ?? ""
          : data.output ?? data.reply ?? "";
      } catch {
        output = text;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: output || t("chat.noResponse") }]);
    } catch (error) {
      const message =
        error instanceof Error && error.message === "Chat service unavailable"
          ? "Chat service is not configured. Please set VITE_PORTFOLIO_AGENT_URL and redeploy."
          : t("chat.errorMessage");
      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble — increased size for better visibility */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-blue hover:brightness-110 transition-all shadow-lg shadow-primary/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 24px hsl(217 91% 60% / 0.35)", "0 0 48px hsl(217 91% 60% / 0.55)", "0 0 24px hsl(217 91% 60% / 0.35)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[6.5rem] right-6 z-50 w-[360px] max-h-[500px] rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 40px hsl(217 91% 60% / 0.15)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 bg-card/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 status-pulse" />
                <span className="text-sm font-heading font-semibold text-foreground">{t("chat.headerTitle")}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{t("chat.headerSubtitle")}</p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary/50 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        {/* ReactMarkdown with HTML disabled (XSS safe) */}
                        <ReactMarkdown
                          disallowedElements={["script", "iframe", "object", "embed", "form", "input"]}
                          unwrapDisallowed
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      /* User messages rendered as plain text — no HTML interpretation */
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/50 px-3 py-2 rounded-xl rounded-bl-sm text-sm text-muted-foreground">
                    {t("chat.thinking")}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border/50 bg-card/60">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={t("chat.placeholder")}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || rateLimited || !input.trim()}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBubble;
