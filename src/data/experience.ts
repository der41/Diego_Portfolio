export interface Experience {
  id: string;
  org: string;
  role: string;
  dates?: string;
  body: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    id: "yodlee",
    org: "Yodlee",
    role: "Data Science Intern",
    dates: "2025 | Raleigh, NC",
    body: "Built AI-ready data pipelines and LLM systems to improve cost, latency, and reliability in fintech workflows.",
    bullets: [
      "**Built governed AI-ready pipelines** processing **1M+ daily transactions** on AWS.",
      "Designed agentic workflows on AWS Bedrock, **reducing inference costs by 85%**.",
      "Deployed LLMs with vLLM and KV-cache on EC2, **reducing latency by 70%**.",
      "Built monitoring checks linking LLM outputs to business KPIs, **keeping error rates below 5%**.",
    ],
  },
  {
    id: "central-bank",
    org: "Central Bank of Chile",
    role: "Senior Analyst",
    dates: "2018–2024 | Santiago, Chile",
    body: "Led macroeconomic analysis, forecasting, and reporting systems that supported monetary policy and senior decision-making.",
    bullets: [
      "**Built and governed a single source of truth dashboard** spanning **1,000+ indicators** used by **70+ senior stakeholders**.",
      "**Reduced reporting cycle time from 3 hours to 10 minutes** through automation and validation checks.",
      "Forecasted financial prices using **interpretable ML models ** for the **Quarterly Monetary Policy Report**.",
      "Developed ** 5 machine learning studies** used by leadership to evaluate macroeconomic risks and scenarios.",
      "Built **cross-country monitoring systems** to track pandemic shocks and support rapid policy analysis.",
    ],
  },
  {
    id: "oecd-duke",
    org: "OECD",
    role: "Economist",
    dates: "2022–2023 | Paris, France",
    body: "Conducted applied economic research on regional development and policy trends across Latin America.",
    bullets: [
      "**Built supervised learning forecasts** for Mexico using **100K+ row datasets** in MATLAB.",
      "Ran clustering and trend analyses to translate regional signals into decision-ready narratives.",
      "**Contributed to 3 OECD working documents** informing the regional outlook.",
    ],
  },
];
