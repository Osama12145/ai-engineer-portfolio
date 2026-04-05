import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

const EducationSection = () => {
  const { t } = useTranslation();
  const education = t("education.items", { returnObjects: true }) as EducationItem[];

  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-12"
        >
          {t("education.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 max-w-2xl"
        >
          {education.map((edu, i) => (
            <div key={i} className="glass-card p-6 glow-blue-hover transition-all hover:scale-[1.01]">
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
};

export default EducationSection;
