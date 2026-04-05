import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const CertificationsSection = () => {
  const { t } = useTranslation();
  const certifications = t("certifications.items", { returnObjects: true }) as string[];

  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-12"
        >
          {t("certifications.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 max-w-2xl"
        >
          <ul className="space-y-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
