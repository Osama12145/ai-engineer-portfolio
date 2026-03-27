import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

const titles = [
  "Senior AI Engineer",
  "Data Scientist",
  "Deep Learning Architect",
  "Computer Vision Engineer",
  "Agentic AI & RAG Specialist",
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 status-pulse" />
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              Open to Advanced AI Roles
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              OSAMA ALI NAJI
            </span>
          </h1>

          {/* Typing animation */}
          <div className="h-12 flex items-center justify-center mb-8">
            <span className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-primary typing-cursor">
              {displayed}
            </span>
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-12 text-base md:text-lg">
            AI Engineer with First-Class Honors building production-ready intelligent systems —
            from core ML/DL and Computer Vision to Agentic AI workflows and RAG pipelines.
            Based in Saudi Arabia.
          </p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue"
            >
              View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-secondary/50 backdrop-blur-sm text-secondary-foreground font-medium text-sm hover:bg-secondary hover:border-primary/30 transition-all"
            >
              Download CV <Download size={16} />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/osama--naji", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/osama--naji", label: "LinkedIn" },
              { icon: Mail, href: "mailto:osama12145@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
