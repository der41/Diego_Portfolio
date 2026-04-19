import type { CategoryKey } from "@/lib/posts";

const STYLES: Record<CategoryKey, string> = {
  economy: "bg-[#003c73]/10 text-[#003c73]",
  ml: "bg-[#6f2100]/10 text-[#6f2100]",
  analytics: "bg-[#006971]/[0.12] text-[#006971]",
  ai: "bg-[#2F8F98]/[0.12] text-[#2F8F98]",
  code: "bg-[#006f78]/10 text-[#006f78]",
  explainability: "bg-[#953102]/10 text-[#953102]",
};

const DEFAULT_STYLE = "bg-[#424751]/10 text-[#424751]";

const TAG_TO_CATEGORY: Record<string, CategoryKey> = {
  economy: "economy",
  economics: "economy",
  inflation: "economy",
  ml: "ml",
  rag: "ai",
  llms: "ai",
  ai: "ai",
  analytics: "analytics",
  data: "analytics",
  global: "analytics",
  code: "code",
  explainability: "explainability",
};

export default function TagChip({ label }: { label: string }) {
  const category = TAG_TO_CATEGORY[label.toLowerCase()];
  const style = category ? STYLES[category] : DEFAULT_STYLE;
  return (
    <span
      className={`inline-block text-[0.7rem] font-semibold tracking-[0.06em] uppercase px-2 py-[2px] rounded-full ${style}`}
    >
      # {label}
    </span>
  );
}
