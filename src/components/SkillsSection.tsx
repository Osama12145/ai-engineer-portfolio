import { motion } from "framer-motion";

const skillCategories = [
  {
    label: "Agentic AI",
    skills: ["n8n", "LangChain", "CrewAI", "AutoGen", "OpenWebUI"],
  },
  {
    label: "LLMs & RAG",
    skills: ["RAG Pipelines", "Prompt Engineering", "OpenAI API", "Ollama", "ChromaDB", "Embeddings"],
  },
  {
    label: "Computer Vision",
    skills: ["YOLOv8", "U-Net", "Semantic Segmentation", "Object Detection", "PyTorch"],
  },
  {
    label: "ML / Deep Learning",
    skills: ["TensorFlow", "scikit-learn", "Hugging Face", "NLP", "NLTK", "Deep Learning"],
  },
  {
    label: "Engineering",
    skills: ["Python", "SQL", "Flask", "FastAPI", "REST APIs", "Git", "Linux", "Docker", "AWS", "Power BI"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-heading font-bold mb-12"
      >
        What I Build With
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.label}
            variants={item}
            className="glass-card p-6 glow-blue-hover transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full border border-border bg-secondary/50 text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
