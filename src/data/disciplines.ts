export interface Discipline {
  id: string;
  name: string;
  colorVar: string; // CSS custom property name
  hex: string;
  connections: string[]; // ids of disciplines this one connects to
}

export const disciplines: Discipline[] = [
  {
    id: "economics",
    name: "Economics",
    colorVar: "--color-disc-economics",
    hex: "#003c73",
    connections: ["statistics", "communication", "arts"],
  },
  {
    id: "statistics",
    name: "Statistics",
    colorVar: "--color-disc-statistics",
    hex: "#6f2100",
    connections: ["economics", "cs", "engineering"],
  },
  {
    id: "engineering",
    name: "Engineering",
    colorVar: "--color-disc-engineering",
    hex: "#953102",
    connections: ["statistics", "cs", "communication"],
  },
  {
    id: "cs",
    name: "Computer Science",
    colorVar: "--color-disc-cs",
    hex: "#006971",
    connections: ["engineering", "statistics", "arts"],
  },
  {
    id: "communication",
    name: "Communication",
    colorVar: "--color-disc-communication",
    hex: "#2F8F98",
    connections: ["economics", "engineering", "arts"],
  },
  {
    id: "arts",
    name: "Arts",
    colorVar: "--color-disc-arts",
    hex: "#006f78",
    connections: ["economics", "cs", "communication"],
  },
];
