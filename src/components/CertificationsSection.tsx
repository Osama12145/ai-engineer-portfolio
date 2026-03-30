import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

const CertificationsSection = () => (
  <section id="certifications" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-heading font-bold mb-12"
      >
        Certifications
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 max-w-2xl"
      >
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
  </section>
);

export default CertificationsSection;
