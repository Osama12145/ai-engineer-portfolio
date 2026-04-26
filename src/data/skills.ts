export interface SkillCategory {
  labelKey: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    labelKey: "skills.categories.agenticAi",
    skills: [
      "n8n",
      "LangGraph",
      "LangChain",
      "AI Agents",
      "Workflow Automation",
      "EvolutionAPI",
      "OpenAI API",
    ],
  },
  {
    labelKey: "skills.categories.ragSystems",
    skills: [
      "RAG Pipelines",
      "Qdrant",
      "ChromaDB",
      "Cohere API",
      "Embeddings",
      "Vector Search",
      "Semantic Search",
      "Prompt Engineering",
    ],
  },
  {
    labelKey: "skills.categories.computerVision",
    skills: [
      "PyTorch",
      "EfficientNet-B1",
      "EfficientNetV2-S",
      "U-Net",
      "DeepLabV3+",
      "SegFormer",
      "CNN",
      "Triplet Loss",
      "Grad-CAM",
      "Image Retrieval",
      "Semantic Segmentation",
      "OpenCV",
      "t-SNE",
    ],
  },
  {
    labelKey: "skills.categories.ml",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "scikit-learn",
      "TensorFlow",
      "Hugging Face",
      "Feature Engineering",
      "Data Pipelines",
    ],
  },
  {
    labelKey: "skills.categories.data",
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Power BI",
      "SQL",
      "Analytics",
    ],
  },
  {
    labelKey: "skills.categories.engineering",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "Gradio",
      "Streamlit",
      "REST APIs",
      "Docker",
      "Docker Compose",
      "Git",
      "Linux",
      "AWS",
      "Coolify",
    ],
  },
];

const allSkills = skillCategories.flatMap((category) => category.skills);

export const uniqueSkills = Array.from(new Set(allSkills));

export const marqueeRows = [
  uniqueSkills.filter((_, index) => index % 2 === 0),
  uniqueSkills.filter((_, index) => index % 2 !== 0),
];
