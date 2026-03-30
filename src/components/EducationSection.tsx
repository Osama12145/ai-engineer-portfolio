import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    institution: "Taibah University",
    degree: "BSc Computer Science — First Class Honors",
    period: "2020 – 2024",
    detail: "GPA 4.95/5.0 · Graduation Project: PhishWarden",
  },
  {
    institution: "KAUST",
    degree: "Specialization — Artificial Intelligence",
    period: "Oct 2024 – Feb 2025",
  },
  {
    institution: "Apple Developer Academy | TUWAIQ",
    degree: "Education Scholarship — iOS Dev, Swift, UI/UX",
    period: "Oct 2025 – Nov 2025",
  },
];

const EducationSection = () => (
  <section id="education" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-heading font-bold mb-12"
      >
        Education
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 max-w-2xl"
      >
        {education.map((edu) => (
          <div key={edu.institution} className="glass-card p-6 glow-blue-hover transition-all hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className="text-primary" />
              <h3 className="font-heading font-semibold text-sm">{edu.institution}</h3>
            </div>
            <p className="text-sm text-foreground">{edu.degree}</p>
            <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
            {edu.detail && (
              <p className="text-xs text-primary mt-1">{edu.detail}</p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default EducationSection;
