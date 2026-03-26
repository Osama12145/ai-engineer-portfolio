import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2 } from "lucide-react";

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

const certifications = [
  "Machine Learning Specialization — Stanford (Dec 2025)",
  "IBM Machine Learning Professional — IBM (May 2025)",
  "Associate AI Engineer for Data Scientists — DataCamp (Jul 2025)",
  "Deep Learning Specialization — DeepLearning.AI (May 2025)",
  "AI Program (Intro & Advanced) — KAUST (Feb 2025)",
  "McKinsey Forward Program — McKinsey (Dec 2024)",
  "Python 3 Programming — University of Michigan (Nov 2024)",
  "Track of Artificial Intelligence — FutureX (Mar 2023)",
  "Apple Developer Academy — Apple (Nov 2025)",
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
        Education & Certifications
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
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

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="font-heading font-semibold text-sm text-primary mb-4 uppercase tracking-wider">
            Certifications
          </h3>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default EducationSection;
