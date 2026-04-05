import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, Cpu, BookOpen, Lightbulb } from "lucide-react";

const icons = [Cpu, Briefcase, Lightbulb, BookOpen];

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
}

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const experiences = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experience" className="py-28 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            {t("experience.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute ${isRTL ? "right-6 md:right-1/2" : "left-6 md:left-1/2"} top-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent timeline-line-glow`}
            style={{ transform: "translateX(-50%)" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const Icon = icons[i] || Cpu;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:flex-row ${
                    isLeft ? "md:flex-row-reverse md:text-right" : ""
                  } ${isRTL ? "[direction:rtl]" : ""}`}
                >
                  {/* Node dot */}
                  <div className={`absolute ${isRTL ? "right-6 md:right-1/2" : "left-6 md:left-1/2"} -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center z-10`}>
                    <Icon size={18} className="text-primary" />
                  </div>

                  {/* Card */}
                  <div
                    className={`${isRTL ? "mr-20 md:mr-0" : "ml-20 md:ml-0"} md:w-[calc(50%-3rem)] ${
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
};

export default ExperienceSection;
