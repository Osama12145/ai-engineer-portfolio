import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Let's Build Something
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Open to AI Engineering roles, freelance AI automation projects, and collaborations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
        </div>

        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} /> Based in Saudi Arabia 🇸🇦
        </p>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
