import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Webhook integration placeholder
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">GET IN TOUCH</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Contact
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-8 mb-12"
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
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-y"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue"
            >
              <Send size={16} /> Say Hello
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

        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} /> Based in Saudi Arabia 🇸🇦
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
