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
    dates: "2025",
    body: "Architecting AI-ready data pipelines processing 1M+ transactions to drive fintech innovation.",
    bullets: [
      "**Built governed AI-ready pipelines** for **1M+ daily transactions** on AWS.",
      "Designed agentic workflows on AWS Bedrock, **cutting inference cost by 85%**.",
      "Deployed LLMs with vLLM and KV-cache on EC2, **cutting latency by 70%**.",
      "Built monitoring checks tying LLM outputs to business KPIs, **holding error rates below 5%**.",
    ],
  },
  {
    id: "central-bank",
    org: "Central Bank of Chile",
    role: "Senior Economic Analyst",
    dates: "2018–2024",
    body: "Led time-series analysis and macroeconomic modeling to support board-level monetary policy decisions.",
    bullets: [
      "**Built and governed a single source of truth dashboard** across **1,000+ indicators** used by **70+ senior stakeholders**.",
      "Forecasted commodity prices using time series analysis for the Quarterly Monetary Policy Report and meetings.",
      "**Published 5 ML studies** using supervised learning and time-series analysis with 7,000+ visualizations.",
      "**Cut reporting cycle time from 3 hours to 10 minutes** through automation and validation checks.",
      "Designed and maintained metrics to **monitor the impact of the COVID-19 pandemic** across countries **on a daily basis**.",
    ],
  },
  {
    id: "oecd-duke",
    org: "OECD",
    role: "Economist",
    dates: "2022–2023",
    body: "Conducting global-scale research on economic policy and social structural development.",
    bullets: [
      "**Built supervised ML forecasting** for Mexico across **100K+ row datasets** in MATLAB.",
      "Ran clustering and trend analysis translating LATAM signals into decision-ready narratives.",
      "**Contributed to 3 OECD working documents** shaping the regional outlook.",
    ],
  },
];
