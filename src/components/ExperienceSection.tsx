import { motion } from "framer-motion";
import { Briefcase, Cpu, BookOpen, Lightbulb } from "lucide-react";

const experiences = [
  {
    role: "AI Engineer",
    company: "Tytan KSA",
    period: "Aug 2025 – Mar 2026",
    type: "Full-time · On-site",
    icon: Cpu,
    points: [
      "Independently led the AI division — designed & deployed ML/DL models for delivery optimization",
      "Built AI automation agents using n8n to streamline internal workflows",
      "Developed Power BI dashboards for real-time delivery KPI visibility",
    ],
  },
  {
    role: "AI, Backend & Database Intern",
    company: "SIT – IT Solutions",
    period: "Feb 2025 – May 2025",
    type: "Internship",
    icon: Briefcase,
    points: [
      "Built AI-integrated apps, designed relational databases, developed RESTful APIs",
      "Hands-on experience in data science, AI integration, and backend development",
    ],
  },
  {
    role: "Research & Development Leader",
    company: "Wae (وعي)",
    period: "Nov 2024 – Jun 2025",
    type: "Volunteer · Riyadh, Hybrid",
    icon: Lightbulb,
    points: [
      "Led AI awareness workshops across Saudi Arabia",
      "Directed AI-driven R&D projects and developed educational content",
    ],
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Taibah Valley",
    period: "Jul 2023 – Aug 2023",
    type: "Internship · Medina",
    icon: BookOpen,
    points: [
      "Developed high-accuracy Arabic sentiment analysis model",
      "Conducted full data acquisition and preprocessing pipeline",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-28 section-gradient">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Where I've Worked
        </h2>
        <p className="text-muted-foreground max-w-lg">
          My journey through AI — from research intern to leading an AI division.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Animated timeline line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent timeline-line-glow"
          style={{ transform: "translateX(-50%)" }}
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const Icon = exp.icon;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-6 ${
                  /* mobile: always right of line; desktop: alternate */
                  "md:flex-row"
                } ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                {/* Node dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center z-10">
                  <Icon size={18} className="text-primary" />
                </div>

                {/* Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div className="glow-border-card p-6">
                    <h3 className="font-heading font-semibold text-foreground text-base mb-0.5">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {exp.period} · {exp.type}
                    </p>
                    <ul className={`space-y-2 ${isLeft ? "md:text-right" : ""}`}>
                      {exp.points.map((point, j) => (
                        <li
                          key={j}
                          className={`text-sm text-muted-foreground flex items-start gap-2 ${
                            isLeft ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-primary mt-0.5 shrink-0">›</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
