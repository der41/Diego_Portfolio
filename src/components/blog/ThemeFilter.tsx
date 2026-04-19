"use client";

import { useEffect, useMemo, useState } from "react";
import type { CategoryKey, PostMeta } from "@/lib/posts";
import FeaturedCard from "./FeaturedCard";
import PostListItem from "./PostListItem";
import YearGroup from "./YearGroup";

type FilterKey = "all" | CategoryKey;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "economy", label: "# Economy" },
  { key: "ml", label: "# ML" },
  { key: "analytics", label: "# Analytics" },
  { key: "ai", label: "# AI" },
  { key: "code", label: "# Code" },
];

const STORAGE_KEY = "blog-tag";

export default function ThemeFilter({
  featured,
  posts,
}: {
  featured: PostMeta[];
  posts: PostMeta[];
}) {
  const [active, setActive] = useState<FilterKey>("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as FilterKey | null;
      if (saved && FILTERS.some((f) => f.key === saved)) setActive(saved);
    } catch {}
  }, []);

  const select = (key: FilterKey) => {
    setActive(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  };

  const matches = (p: PostMeta) =>
    active === "all" || p.categories.includes(active);

  const visibleFeatured = useMemo(
    () => featured.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [featured, active],
  );
  const grouped = useMemo(() => {
    const filtered = posts.filter(matches);
    const byYear: Record<string, PostMeta[]> = {};
    for (const p of filtered) {
      const y = p.date.slice(0, 4);
      (byYear[y] ??= []).push(p);
    }
    return Object.entries(byYear).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, active]);

  return (
    <>
      <nav className="flex justify-center items-center flex-wrap gap-0 mb-14">
        {FILTERS.map((f, i) => (
          <span key={f.key} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className="text-[#424751]/30 text-base px-1 select-none"
              >
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => select(f.key)}
              className={`font-['Inter'] text-[0.8rem] font-semibold tracking-[0.02em] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                active === f.key
                  ? "bg-[#003c73] text-white"
                  : "text-[#424751] hover:bg-[#003c73] hover:text-white"
              }`}
            >
              {f.label}
            </button>
          </span>
        ))}
      </nav>

      {visibleFeatured.length > 0 && (
        <section className="pt-14">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#727782] mb-5">
            Selected
          </div>
          <div className="grid gap-5 mb-18 grid-cols-1 md:grid-cols-3">
            {visibleFeatured.slice(0, 3).map((p) => (
              <FeaturedCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <hr className="border-none border-t border-[#424751]/10 mb-12" />

      <section className="pb-24">
        {grouped.length === 0 ? (
          <p className="text-center text-[#424751]/60 py-12">
            No posts tagged with that theme yet.
          </p>
        ) : (
          grouped.map(([year, items]) => (
            <YearGroup key={year} year={year}>
              {items.map((p) => (
                <PostListItem key={p.slug} post={p} />
              ))}
            </YearGroup>
          ))
        )}
      </section>
    </>
  );
}
