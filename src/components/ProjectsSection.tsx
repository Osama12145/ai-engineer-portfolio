import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Database,
  ExternalLink,
  FolderGit2,
  Github,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  badge: string | null;
  category: string;
  outcome: string;
  tags: string[];
  highlights: string[];
  url: string;
  demoUrl?: string;
  featured?: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const getRepoPath = (url: string) => {
  try {
    return new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return url;
  }
};

const getShowcaseIcon = (category: string) => {
  if (/rag/i.test(category)) return Database;
  if (/agent/i.test(category)) return MessageCircle;
  return Bot;
};

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const projects = t("projects.items", { returnObjects: true }) as ProjectItem[];
  const documentChatbot = projects.find((project) => project.title.includes("Company Document Chatbot"));
  const whatsappBot = projects.find((project) => project.title.includes("WhatsApp AI Bot"));
  const showcaseProjects = [documentChatbot, whatsappBot].filter(Boolean) as ProjectItem[];
  const remainingProjects = projects.filter((project) => !showcaseProjects.includes(project));
  const isRTL = i18n.language === "ar";

  return (
    <section id="projects" className="py-28 section-gradient overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.24em] mb-3">
              {t("projects.featuredLabel")}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              {t("projects.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-7">
              {t("projects.subtitle")}
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-3 text-sm text-primary">
            <Sparkles size={16} />
            {t("projects.showcaseLabel")}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mb-14 grid gap-6 lg:grid-cols-2"
        >
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          {showcaseProjects.map((project, index) => {
            const Icon = getShowcaseIcon(project.category);
            return (
              <motion.article
                key={project.title}
                variants={item}
                className={`group relative min-h-[620px] overflow-hidden rounded-[2rem] border bg-card/45 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 md:p-8 ${
                  index === 0
                    ? "border-primary/35 lg:min-h-[700px]"
                    : "border-cyan-400/25 lg:mt-16"
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(217_91%_60%_/_0.18),transparent_42%),radial-gradient(circle_at_85%_15%,hsl(188_85%_45%_/_0.22),transparent_32%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-cyan-300 to-transparent" />
                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Icon size={14} />
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="inline-flex rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-foreground/80">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-heading text-4xl font-bold text-primary/20 md:text-5xl">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h3 className="mb-4 text-3xl font-heading font-bold leading-tight md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mb-5 text-base font-medium text-primary/90 md:text-lg">
                      {project.subtitle}
                    </p>
                    <p className="max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-8 rounded-2xl border border-primary/20 bg-background/45 p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {t("projects.outcomeLabel")}
                    </p>
                    <p className="text-base font-semibold text-foreground md:text-lg">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="mb-8 grid gap-3">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3 border-l border-primary/35 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(217_91%_60%_/_0.8)] shrink-0" />
                        <p className="text-sm leading-7 text-foreground/85">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="mb-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/50 bg-background/55 px-3 py-1.5 text-xs text-foreground/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-blue"
                        >
                          <ExternalLink size={16} />
                          {t("projects.liveDemo")}
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/45 px-5 py-3 text-sm font-semibold text-foreground/85 transition-all hover:border-primary/40 hover:text-primary"
                      >
                        <Github size={16} />
                        {t("projects.openRepo")}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.24em] mb-2">
              {t("projects.moreLabel")}
            </p>
            <p className="text-sm text-muted-foreground">{t("projects.labLabel")}</p>
          </div>
          <p className="text-sm text-muted-foreground shrink-0">{remainingProjects.length} projects</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5"
        >
          {remainingProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={item}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/35 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 ${
                index === 0 ? "xl:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(217_91%_60%_/_0.16),transparent_30%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                    {project.category}
                  </span>
                  <span className="inline-flex rounded-full border border-border/50 bg-background/40 px-3 py-1 text-[11px] text-foreground/70">
                    {project.outcome}
                  </span>
                </div>

                {project.badge && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 medal-pulse">
                    {project.badge}
                  </span>
                )}
                <h3 className="text-xl font-heading font-semibold mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-primary/80 font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                  {project.description}
                </p>
                <div className="space-y-2 mb-5">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <p className="text-sm text-foreground/80 leading-6">{highlight}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] rounded-full border border-border/50 bg-secondary/30 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/40">
                  <span className="text-xs text-muted-foreground truncate">
                    {getRepoPath(project.url)}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-300 shrink-0"
                  >
                    <FolderGit2 size={15} />
                    {t("projects.viewProject")}
                    <ArrowUpRight size={14} className={isRTL ? "rotate-180" : ""} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
