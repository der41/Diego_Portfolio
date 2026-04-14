export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon?: string;       // Material Symbol name (if no image)
  imageUrl?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI Chatbot",
    description: "An analytical chatbot built with LangGraph and LangChain achieving 95% response accuracy.",
    tag: "NLP & Engineering",
    icon: "smart_toy",
  },
  {
    id: "llm-fairness",
    title: "LLM Fairness Dashboard",
    description: "Visualizing gender bias in large language models for ethical AI deployment.",
    tag: "View Live Project",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgNS6GMzaTfkAWZ8WwZFOzt7bcsVfiGIvS_dboZfrfiWdNRuej3ikKJ64imQ4LiFH9_TkL1q-y0sg-HzklpvnechRL7nHUQesWuzcqbxotJ2c0zun-2pxB56P-x0G7wdP0qof4fjPy8C20CH2ZkLcXwLU8BAQDlhXC0PQFRP1QNtCFoKYhVxXLzM3814bZElB-8JC7saUNOeJbPR8KHKkaBgJaZVctPmlxdoIiykAyosi7__KSizjd-HdvqeCbXllWDglAJ163nfP",
    link: "https://llmgenderfairness.vercel.app/",
  },
  {
    id: "skill-recommendations",
    title: "Skill Recommendations",
    description: "NLP-driven system providing 60% better recommendations than traditional baselines.",
    tag: "Machine Learning",
    icon: "recommend",
  },
  {
    id: "causal-impact",
    title: "Causal Impact Study",
    description: "CEP study analyzing over 100M+ student records to evaluate educational outcomes.",
    tag: "Economics × Data Science",
    icon: "groups",
  },
];
