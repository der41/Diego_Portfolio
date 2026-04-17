export interface EducationItem {
  id: string;
  label: string;
  title: string;
  institution: string;
  dates?: string;
  formation?: string;
  bullets: string[];
  imageUrl?: string;
}

export const education: EducationItem[] = [
  {
    id: "duke-ms",
    label: "Graduate Degree",
    title: "Master of Science — Data Science",
    institution: "Duke University",
    dates: "2024–2026",
    formation:
      "Principles of Machine Learning, Causal Inference, Database Systems, Explainable AI, Data Engineering, Natural Language Processing, and Deep Learning.",
    bullets: [
      "Developed projects at the intersection of financial markets, NLP, data engineering, explainability, and visualization.",
      "Pushed causal inference research into UX design and big-data analysis.",
      "Teaching Assistant for Practical Data Science — guiding students through Python analytical pipelines.",
      "Teaching Assistant for Solving Problems with Data — helping students translate business challenges into data solutions.",
      "Research Assistant at the Behavioral Lab — collaborating on A/B tests to change behavior in the debt payment industry.",
    ],
    imageUrl: "/images/Duke.png",
  },
  {
    id: "mit-data-analytics",
    label: "Certificate",
    title: "Data Analytics",
    institution: "Massachusetts Institute of Technology",
    dates: "2019–2020",
    formation:
      "Project Management, Knowledge Discovery in Data, and Data Analytics Process.",
    bullets: [
      "Certificate focused on leading data-related projects through a combination of classes and industry case studies.",
      "Applied methodologies for solving complex industry problems: CRISP-DM, KDD, and the Double Diamond Process.",
      "Framed data initiatives around business value, stakeholder alignment, and delivery discipline.",
    ],
    imageUrl: "/images/MIT.png",
  },
  {
    id: "uchile-undergrad",
    label: "Undergraduate Degree",
    title: "Bachelor's — Management and Economics",
    institution: "Universidad de Chile",
    dates: "2014–2018",
    formation:
      "Statistics, Econometrics, Forecasting, Economics, Marketing, and Product Analytics.",
    bullets: [
      "Worked on social-impact projects promoting research and science at the secondary-education level.",
      "Estimated health expenditure savings from incentivizing physical activity across the population.",
      "Profiled risk aversion by analyzing gambling and lottery behavior among Chilean households.",
    ],
  },
];
