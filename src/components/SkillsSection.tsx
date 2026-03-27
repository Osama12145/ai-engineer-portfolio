import { motion } from "framer-motion";

const skillCategories = [
  {
    label: "Agentic AI & Automation",
    skills: ["n8n", "LangChain", "CrewAI", "AutoGen", "OpenWebUI", "AI Agents"],
  },
  {
    label: "LLMs & RAG Pipelines",
    skills: ["RAG Pipelines", "Prompt Engineering", "OpenAI API", "Ollama", "ChromaDB", "Embeddings", "Fine-Tuning"],
  },
  {
    label: "Computer Vision",
    skills: ["YOLOv8", "U-Net", "Semantic Segmentation", "Object Detection", "PyTorch", "OpenCV"],
  },
  {
    label: "ML & Deep Learning",
    skills: ["TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "NLP", "NLTK", "Keras", "XGBoost"],
  },
  {
    label: "Data Science",
    skills: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Data Pipelines", "Feature Engineering"],
  },
  {
    label: "Engineering & DevOps",
    skills: ["Python", "SQL", "Flask", "FastAPI", "REST APIs", "Git", "Linux", "Docker", "AWS", "Coolify"],
  },
];

const pillVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.03,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const SkillsSection = () => {
  let globalIndex = 0;

  return (
    <section id="skills" className="py-28 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Expertise & Stack
          </h2>
          <p className="text-muted-foreground max-w-lg">
            From core ML foundations to production AI systems — tools I use to build intelligent solutions.
          </p>
        </motion.div>

        <div className="space-y-10">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => {
                  const idx = globalIndex++;
                  return (
                    <motion.span
                      key={skill}
                      custom={idx}
                      variants={pillVariant}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="floating-pill px-5 py-2.5 text-sm rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 cursor-default transition-colors duration-300"
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
