export interface AboutItem {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const about: AboutItem[] = [
  {
    id: "data-foundations",
    label: "Background",
    title: "Data Foundations",
    body: "Over 5 years of experience building scalable data foundations and ML systems that drive organizational performance through quantitative rigor.",
  },
  {
    id: "product-data-scientist",
    label: "What I Do",
    title: "Product Data Scientist",
    body: "I architect information environments that bridge the gap between machine logic and human intuition, ensuring data products serve real-world needs.",
  },
  {
    id: "applied-research",
    label: "Insights",
    title: "Applied Research",
    body: "Integrating Behavioral Science to uncover deep insights into human decision-making and algorithmic interaction.",
  },
];
