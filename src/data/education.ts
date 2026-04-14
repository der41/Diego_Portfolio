export interface EducationItem {
  id: string;
  label: string;
  title: string;
  institution?: string;
  body: string;
  imageUrl?: string;
}

export const education: EducationItem[] = [
  {
    id: "duke-main",
    label: "Academic Foundation",
    title: "The Theory of Systems",
    institution: "Duke University",
    body: "Specializing in the intersection of Economics and Statistics, developing the mathematical frameworks necessary for complex system analysis.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBASz27XusrJBEELQm4eV409WT9fTZqTAoKtDuw66N3sUZXWuFmvJbi9HGi-b76rm-2lxQOmVno_eY_cTk2vdf69DK24VUgJ77MYsEvYzwJFFB8G9bQJ9626J_oTG6_1PU6MbTtWqygDV58Grij3XoE02qa0k9rUrbdEF9RSkxDOFExBmQJt4i3z6mv9MNLaddKn6_6dBrlRBWWvku38dqrTQNomUM0e1AYIyD62NqkHY3D-D4tSOX5GQ8QEYDhhiM_fRW20xbKy3Om",
  },
  {
    id: "duke-data-plus",
    label: "Duke Data+",
    title: "Research Assistant",
    body: "Applying Behavioral Science frameworks to data-driven research projects through Duke's Data+ program.",
  },
];
