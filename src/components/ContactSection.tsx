import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, CheckCircle } from "lucide-react";

const JOTFORM_URL = import.meta.env.VITE_JOTFORM_URL || "";

/* ── Validation helpers ──────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const DEBOUNCE_MS = 2000;

function sanitize(str: string): string {
  return str
    .replace(/[<>]/g, "") // strip angle brackets (basic XSS prevention)
    .trim();
}

function validateForm(data: { name: string; email: string; message: string }) {
  const name = sanitize(data.name);
  const email = sanitize(data.email);
  const message = sanitize(data.message);

  if (!name || name.length > MAX_NAME) return null;
  if (!email || !EMAIL_RE.test(email) || email.length > MAX_EMAIL) return null;
  if (!message || message.length > MAX_MESSAGE) return null;

  return { name, email, message };
}

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastSubmitRef = useRef(0);

  /* ── Debounced submit ──────────────────────────────────── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!JOTFORM_URL) return;

      // Debounce: block rapid resubmissions
      const now = Date.now();
      if (now - lastSubmitRef.current < DEBOUNCE_MS) return;
      lastSubmitRef.current = now;

      setError("");
      setSubmitting(true);

      // Validate & sanitize
      const clean = validateForm(formData);
      if (!clean) {
        setError(t("contact.validationError", "Please fill all fields correctly."));
        setSubmitting(false);
        return;
      }

      try {
        const body = new URLSearchParams();
        body.append("q6_name", clean.name);
        body.append("q7_email", clean.email);
        body.append("q9_typeA", clean.message);

        await fetch(JOTFORM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
          mode: "no-cors",
        });

        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } catch {
        // Fallback to hidden-iframe approach
        try {
          const formEl = document.createElement("form");
          formEl.method = "POST";
          formEl.action = JOTFORM_URL;
          formEl.target = "jotform-iframe";
          formEl.enctype = "application/x-www-form-urlencoded";
          formEl.style.display = "none";

          const fields = [
            { name: "q6_name", value: clean.name },
            { name: "q7_email", value: clean.email },
            { name: "q9_typeA", value: clean.message },
          ];

          fields.forEach(({ name, value }) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            formEl.appendChild(input);
          });

          document.body.appendChild(formEl);
          formEl.submit();
          setTimeout(() => document.body.removeChild(formEl), 2000);

          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
        } catch {
          setError(t("contact.errorMessage", "Something went wrong. Please try again."));
        }
      } finally {
        setSubmitting(false);
      }
    },
    [formData, t],
  );

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <section id="contact" className="py-24">
      <iframe
        ref={iframeRef}
        name="jotform-iframe"
        style={{ display: "none" }}
        title="Jotform submission"
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">
            {t("contact.sectionLabel")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">{t("contact.title")}</h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl glow-border-card p-12 text-center mb-12"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-2">{t("contact.thankYouTitle")}</h3>
            <p className="text-muted-foreground">{t("contact.thankYouMessage")}</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl glow-border-card p-8 space-y-6 mb-12"
          >
            {/* ── Honeypot field (invisible to users, catches bots) ── */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                onChange={(e) => {
                  // If a bot fills this hidden field, silently block submission
                  if (e.target.value) {
                    (e.target as HTMLInputElement).dataset.bot = "true";
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">{t("contact.nameLabel")}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("contact.namePlaceholder")}
                required
                maxLength={MAX_NAME}
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">{t("contact.emailLabel")}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t("contact.emailPlaceholder")}
                required
                maxLength={MAX_EMAIL}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">{t("contact.messageLabel")}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t("contact.messagePlaceholder")}
                required
                maxLength={MAX_MESSAGE}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-y"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue disabled:opacity-50"
              >
                {submitting ? t("contact.sending") : t("contact.sendMessage")}
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/osama--naji"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-lg border border-border/50 bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:osama12145@gmail.com"
                  aria-label="Email"
                  className="p-2.5 rounded-lg border border-border/50 bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.form>
        )}

        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} /> {t("contact.location")}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
