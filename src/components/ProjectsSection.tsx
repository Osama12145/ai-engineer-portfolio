import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Hotel Customer Service Agent — WhatsApp AI Bot",
    tags: ["n8n", "LangChain", "RAG", "WhatsApp API", "OpenAI", "ChromaDB"],
    description:
      "End-to-end Agentic AI system handling hotel inquiries via WhatsApp. RAG pipeline connects hotel knowledge base to an LLM for context-aware responses in Arabic and English.",
    badge: null,
    large: true,
  },
  {
    title: "Underwater Scene Segmentation",
    tags: ["PyTorch", "U-Net", "EfficientNet-B1", "Semantic Segmentation", "SUIM"],
    description:
      "Fine-tuned U-Net with EfficientNet-B1 encoder for 8-class underwater semantic segmentation. Full ML pipeline with custom Dataset class, training loops, and visualization.",
    badge: null,
  },
  {
    title: "YouHealth — AI Medical Chatbot",
    tags: ["Python", "LLM", "NLP", "SDAIA", "lablab MENA"],
    description:
      "AI assistant converting patient conversations into structured medical reports. Nominated for GAIA AI Accelerator.",
    badge: "🥈 2nd Place · SoundAI Hackathon (SDAIA)",
  },
  {
    title: "AI-Powered Crowd & Traffic Monitoring",
    tags: ["YOLOv8", "MoViNet", "SORT", "Computer Vision", "Python"],
    description:
      "Real-time smart city AI system combining object detection, action recognition, and zone-based heatmaps for safety analytics.",
    badge: null,
  },
  {
    title: "PhishWarden — Phishing Detection System",
    tags: ["Python", "Flask", "ML", "NLP", "HTML/CSS/JS"],
    description:
      "ML-based system detecting phishing emails and URLs via NLP feature extraction. Full-stack Flask implementation.",
    badge: "Graduation Project · GPA 4.95",
  },
  {
    title: "Arabic Sentiment Analysis Model",
    tags: ["Python", "NLTK", "scikit-learn", "NLP"],
    description:
      "High-accuracy sentiment analysis model for Arabic text — built during internship at Taibah Valley. Includes full data pipeline.",
    badge: null,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-heading font-bold mb-12"
      >
        Things I've Built
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.a
            key={project.title}
            href="#"
            variants={item}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`glass-card p-6 group cursor-pointer glow-blue-hover transition-shadow duration-300 ${
              project.large ? "md:col-span-2" : ""
            }`}
          >
            {project.badge && (
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3 medal-pulse">
                {project.badge}
              </span>
            )}
            <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded-full border border-border bg-secondary/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
              View Project <ArrowUpRight size={12} />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
