import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

const titles = [
  "AI Engineer",
  "Agentic AI Specialist",
  "RAG & LLM Builder",
  "Computer Vision Engineer",
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
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 status-pulse" />
            <span className="text-xs text-muted-foreground">Open for AI Architect opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-4">
            OSAMA ALI NAJI
          </h1>

          {/* Typing animation */}
          <div className="h-10 flex items-center justify-center mb-6">
            <span className="text-xl md:text-2xl font-heading font-semibold text-primary typing-cursor">
              {displayed}
            </span>
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-10">
            AI Engineer with First-Class Honors building production-ready intelligent systems —
            from Agentic AI workflows and RAG pipelines to real-time Computer Vision.
            Based in Saudi Arabia.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-blue"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary text-secondary-foreground font-medium text-sm hover:bg-border transition-all"
            >
              Download CV <Download size={16} />
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-5">
            {[
              { icon: Github, href: "https://github.com/osama--naji" },
              { icon: Linkedin, href: "https://linkedin.com/in/osama--naji" },
              { icon: Mail, href: "mailto:osama12145@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
