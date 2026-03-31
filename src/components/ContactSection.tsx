import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, CheckCircle } from "lucide-react";

const JOTFORM_URL = "https://submit.jotform.com/submit/260885228071056";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData();
    form.append("q3_fullName", formData.name);
    form.append("q4_email", formData.email);
    form.append("q5_message", formData.message);

    try {
      // Submit via hidden iframe to avoid CORS
      const iframe = iframeRef.current;
      if (iframe) {
        const formEl = document.createElement("form");
        formEl.method = "POST";
        formEl.action = JOTFORM_URL;
        formEl.target = "jotform-iframe";
        formEl.style.display = "none";

        const fields = [
          { name: "q3_fullName", value: formData.name },
          { name: "q4_email", value: formData.email },
          { name: "q5_message", value: formData.message },
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
        document.body.removeChild(formEl);
      }

      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    } catch {
      setSubmitting(false);
    }
  };

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
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">GET IN TOUCH</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Contact</h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl glow-border-card p-12 text-center mb-12"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your message has been sent. I'll get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl glow-border-card p-8 space-y-6 mb-12"
          >
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-y"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
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
          <MapPin size={14} /> Based in Saudi Arabia 🇸🇦
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
