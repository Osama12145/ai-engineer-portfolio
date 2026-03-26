import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "AI Engineer",
    company: "Tytan KSA",
    period: "Aug 2025 – Mar 2026",
    type: "Full-time · On-site",
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
    points: [
      "Developed high-accuracy Arabic sentiment analysis model",
      "Conducted full data acquisition and preprocessing pipeline",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-heading font-bold mb-12"
      >
        Where I've Worked
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12 md:pl-16"
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <div className="glass-card p-6 glow-blue-hover transition-all duration-300 hover:scale-[1.01]">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Briefcase size={14} className="text-primary" />
                  <h3 className="font-heading font-semibold">{exp.role}</h3>
                </div>
                <p className="text-sm text-primary font-medium">{exp.company}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {exp.period} · {exp.type}
                </p>
                <ul className="space-y-1.5">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">›</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
