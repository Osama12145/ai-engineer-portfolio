import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { marqueeRows } from "@/data/skills";

const MarqueeRow = ({ tools, reverse = false }: { tools: string[]; reverse?: boolean }) => (
  <div className="marquee-track overflow-hidden">
    <div className={`marquee-content ${reverse ? "marquee-reverse" : ""}`}>
      {[...tools, ...tools].map((tool, index) => (
        <span
          key={`${tool}-${index}`}
          className="inline-flex items-center gap-3 px-6 py-3 text-lg md:text-xl font-heading font-semibold text-foreground/80 whitespace-nowrap"
        >
          {tool}
          <Sparkles size={14} className="text-primary shrink-0" />
        </span>
      ))}
    </div>
  </div>
);

const SkillsMarquee = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 section-gradient overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            {t("skillsMarquee.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t("skillsMarquee.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="marquee-wrapper bg-card/30 backdrop-blur-md border-y border-border/30">
          <MarqueeRow tools={marqueeRows[0]} />
        </div>
        <div className="marquee-wrapper bg-card/20 backdrop-blur-md border-y border-border/20">
          <MarqueeRow tools={marqueeRows[1]} reverse />
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
