import { motion } from "framer-motion";

const tools = [
  "AI Agents", "LangChain", "NLP", "NumPy", "Pandas", "PyTorch",
  "Python", "SQL", "Flask", "FastAPI", "REST APIs", "Git",
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="marquee-track overflow-hidden">
    <div className={`marquee-content ${reverse ? "marquee-reverse" : ""}`}>
      {[...tools, ...tools].map((tool, i) => (
        <span key={i} className="inline-flex items-center gap-3 px-6 py-3 text-lg md:text-xl font-heading font-semibold text-foreground/80 whitespace-nowrap">
          {tool}
          <span className="text-primary text-base">✦</span>
        </span>
      ))}
    </div>
  </div>
);

const SkillsMarquee = () => (
  <section id="skills" className="py-20 section-gradient overflow-hidden">
    <div className="container mx-auto px-6 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Expertise & Stack
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Tools I use to build intelligent solutions.
        </p>
      </motion.div>
    </div>

    <div className="space-y-4">
      <div className="marquee-wrapper bg-card/30 backdrop-blur-md border-y border-border/30">
        <MarqueeRow />
      </div>
      <div className="marquee-wrapper bg-card/20 backdrop-blur-md border-y border-border/20">
        <MarqueeRow reverse />
      </div>
    </div>
  </section>
);

export default SkillsMarquee;
