export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  bullets: string[];
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
    bullets: [
      "LangGraph agent on Claude Sonnet 3.5 analyzing 1M+ daily investment transactions.",
      "AWS Bedrock deployment achieving 95%+ evaluation accuracy.",
      "Coordinated engineers to cut cost 85% and latency 70%.",
      "Built a testing framework enabling continuous LLM improvement.",
    ],
  },
  {
    id: "llm-fairness",
    title: "LLM Fairness Dashboard",
    description: "Visualizing gender bias in large language models for ethical AI deployment.",
    tag: "View Live Project",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgNS6GMzaTfkAWZ8WwZFOzt7bcsVfiGIvS_dboZfrfiWdNRuej3ikKJ64imQ4LiFH9_TkL1q-y0sg-HzklpvnechRL7nHUQesWuzcqbxotJ2c0zun-2pxB56P-x0G7wdP0qof4fjPy8C20CH2ZkLcXwLU8BAQDlhXC0PQFRP1QNtCFoKYhVxXLzM3814bZElB-8JC7saUNOeJbPR8KHKkaBgJaZVctPmlxdoIiykAyosi7__KSizjd-HdvqeCbXllWDglAJ163nfP",
    link: "https://llmgenderfairness.vercel.app/",
    bullets: [
      "LLM-as-a-Judge framework with Gemini Flash 2.5 scoring bias and output quality.",
      "Scalable metrics validating unstructured model outputs over time.",
      "Explainable AI surfacing fairness patterns for stakeholders.",
      "Interactive dashboard estimating production impact by query type.",
    ],
  },
  {
    id: "skill-recommendations",
    title: "Skill Recommendations",
    description: "NLP-driven system providing 60% better recommendations than traditional baselines.",
    tag: "Machine Learning",
    icon: "recommend",
    bullets: [
      "Gemini-based NLP recommender trained on 200K+ rows of job data.",
      "Outperformed a Word2Vec similarity baseline by 60% on skill matching.",
      "Docker + AWS CI/CD pipeline for reproducible deployments.",
      "Surfaces personalized skill development paths for end users.",
    ],
  },
  {
    id: "causal-impact",
    title: "Causal Impact Study",
    description: "CEP study analyzing over 100M+ student records to evaluate educational outcomes.",
    tag: "Economics × Data Science",
    icon: "groups",
    bullets: [
      "Difference-in-Differences and Regression Discontinuity on 100M+ student records across 2,000 schools.",
      "10-year panel with staggered adoption preserving causal integrity.",
      "Partnered with Sanford World Food Policy Center on CEP evaluation.",
      "Evidence informing North Carolina state-level education policy.",
    ],
  },
];
