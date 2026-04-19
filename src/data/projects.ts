export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  bullets: string[];
  icon?: string;       // Material Symbol name (if no image)
  imageUrl?: string;
  imageClassName?: string;
  link?: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    id: "agentic-ai",
    title: "Agentic End-to-End Website",
    description: "Data solution with end-to-end architecture for an e-commerce experience.",
    tag: "AI, NLP, Engineering",
    imageUrl: "/images/Full_Stack_Store.png",
    imageClassName: "object-top",
    link: "https://eventory-vercel.vercel.app/",
    linkLabel: "Live Demo",
    bullets: [
      "Data solution with end-to-end architecture in e-commerce.",
      "PostgreSQL backend deployed in Neon with granular database schema.",
      "RAG-powered LLM guiding the consumer experience through chat.",
      "Production-ready full-stack workflow connecting data, retrieval, and user experience.",
    ],
  },
  {
    id: "llm-fairness",
    title: "LLM Risk Assessment",
    description: "Interactive bias analysis demo focused on job-description fairness and model-risk evaluation.",
    tag: "AI, NLP, Statistics",
    imageUrl: "/images/LLM_fairness.png",
    link: "https://llmgenderfairness.vercel.app/",
    linkLabel: "Live Demo",
    bullets: [
      "LLM-as-a-Judge framework with Gemini Flash 2.5 scoring bias and output quality.",
      "Used NLP and stochastic metrics validating chatbot output over time.",
      "Applied explainable AI principles to surface response patterns for evaluation.",
      "Interactive dashboard comparing fairness trends across topics.",
    ],
  },
  {
    id: "skill-recommendations",
    title: "Skills Recommendation System",
    description: "LLM-based and NLP-driven recommendation engine for skill analysis and development.",
    tag: "AI, NLP, CS",
    imageUrl: "/images/Career_catalyst.png",
    link: "https://career-catalyst-nlp.vercel.app/",
    linkLabel: "Live Demo",
    bullets: [
      "LLM-based and NLP-driven recommendation system for skill analysis and development.",
      "Training data covered more than 200K LinkedIn job postings from 2024.",
      "Custom embedding space outperformed a pre-trained model by 60% on skill matching.",
      "Surfaces personalized skill development paths based on cosine similarity.",
    ],
  },
  {
    id: "knowledge-distillation",
    title: "Knowledge Distillation for LLMs",
    description: "Resource-efficient distillation framework compressing large language models across English, Spanish, and code tasks.",
    tag: "LLMs, Distillation, RL",
    imageUrl: "/images/KD_LLM.png",
    imageClassName: "object-contain",
    link: "https://github.com/der41/Distill_LLM",
    linkLabel: "GitHub Repo",
    bullets: [
      "Compressed a GPT-2 1.5B into a GPT-2 125M while retaining 75% of teacher Rouge-L on English prompts.",
      "Reached within 95% of teacher Rouge-L on Spanish tasks with 10% of the parameters and beat the fine-tuned baseline by to 10% early in training.",
      "Extended the setup with Chain-of-Thought and GRPO for code generation, improving reasoning coherence and correctness beyond KD alone.",
    ],
  },
  {
    id: "causal-impact",
    title: "Causal Impact Study",
    description: "CEP study analyzing over 100M+ student records to evaluate educational outcomes.",
    tag: "Causal Inference, Economics",
    imageUrl: "/images/Difference_Difference.png",
    imageClassName: "object-contain",
    bullets: [
      "First working document using staggered-adoption DiD (Sun, Abraham, and Callaway Sant'Anna) on CEP evaluation.",
      "Without contamination bias, we found that student scores improved after CEP adoption in end-of-grade (EOG) tests.",
      "Effects are 3x higher over time in vulnerable populations.",
      "In a world where non-CEP adopters join the program, a further 4.5 percent of NC students would pass their EOGs.",
    ],
  },
];
