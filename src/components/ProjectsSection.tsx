import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projectMeta = [
  { tags: ["n8n", "LangChain", "RAG", "WhatsApp API", "OpenAI", "ChromaDB"], large: true },
  { tags: ["PyTorch", "U-Net", "EfficientNet-B1", "Semantic Segmentation", "SUIM"], large: false },
  { tags: ["Python", "LLM", "NLP", "SDAIA", "lablab MENA"], large: false },
  { tags: ["YOLOv8", "MoViNet", "SORT", "Computer Vision", "Python"], large: false },
  { tags: ["Python", "Flask", "ML", "NLP", "HTML/CSS/JS"], large: false },
  { tags: ["Python", "NLTK", "scikit-learn", "NLP"], large: false },
];

interface ProjectItem {
  title: string;
  description: string;
  badge: string | null;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const projects = t("projects.items", { returnObjects: true }) as ProjectItem[];

  return (
    <section id="projects" className="py-28 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => {
            const meta = projectMeta[i] || { tags: [], large: false };
            return (
              <motion.a
                key={i}
                href="#"
                variants={item}
                className={`glow-border-card tilt-card p-6 group cursor-pointer ${
                  meta.large ? "md:col-span-2" : ""
                }`}
              >
                {project.badge && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3 medal-pulse">
                    {project.badge}
                  </span>
                )}
                <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] rounded-full border border-border/50 bg-secondary/30 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all duration-300">
                  {t("projects.viewProject")} <ArrowUpRight size={12} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
