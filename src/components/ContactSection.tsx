import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/260885228071056";
    script.type = "text/javascript";
    script.async = true;
    formRef.current.appendChild(script);

    return () => {
      if (formRef.current) {
        formRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">GET IN TOUCH</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Open to AI Engineering roles, freelance AI automation projects, and collaborations.
          </p>
        </motion.div>

        {/* Jotform embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card p-6 md:p-8 rounded-2xl mb-10"
        >
          <div ref={formRef} className="jotform-container" />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="mailto:osama12145@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue"
          >
            <Mail size={16} /> osama12145@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/osama--naji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary text-secondary-foreground font-medium text-sm hover:bg-border transition-all"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </motion.div>

        <p className="text-center inline-flex items-center gap-1.5 text-sm text-muted-foreground w-full justify-center">
          <MapPin size={14} /> Based in Saudi Arabia 🇸🇦
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
