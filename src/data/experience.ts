export interface Experience {
  id: string;
  org: string;
  role: string;
  body: string;
}

export const experience: Experience[] = [
  {
    id: "central-bank",
    org: "Central Bank of Chile",
    role: "Senior Economic Analyst",
    body: "Led time-series analysis and macroeconomic modeling to support board-level monetary policy decisions.",
  },
  {
    id: "yodlee",
    org: "Yodlee",
    role: "Data Science Lead",
    body: "Architecting AI-ready data pipelines processing 1M+ transactions to drive fintech innovation.",
  },
  {
    id: "oecd-duke",
    org: "OECD / Duke Research",
    role: "Economist Researcher",
    body: "Conducting global-scale research on economic policy and social structural development.",
  },
];
