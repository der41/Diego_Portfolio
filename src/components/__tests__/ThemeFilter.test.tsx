import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import ThemeFilter from "../blog/ThemeFilter";
import type { PostMeta } from "@/lib/posts";

const posts: PostMeta[] = [
  {
    slug: "ml-post",
    title: "ML post",
    description: "about ML",
    date: "2025-10-01",
    tags: ["ML"],
    categories: ["ml"],
    featured: true,
    readingTimeMin: 5,
  },
  {
    slug: "econ-post",
    title: "Econ post",
    description: "about economy",
    date: "2024-05-01",
    tags: ["Economy"],
    categories: ["economy"],
    featured: false,
    readingTimeMin: 7,
  },
];

describe("ThemeFilter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows every post under the All filter", () => {
    render(<ThemeFilter featured={[posts[0]]} posts={posts} />);
    // "ML post" appears in both Featured grid and post list when filter is All
    expect(screen.getAllByText("ML post").length).toBeGreaterThan(0);
    expect(screen.getByText("Econ post")).toBeInTheDocument();
  });

  it("filters posts by category when a chip is clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeFilter featured={[posts[0]]} posts={posts} />);
    await user.click(screen.getByRole("button", { name: /# Economy/i }));
    expect(screen.queryByText("ML post")).not.toBeInTheDocument();
    expect(screen.getByText("Econ post")).toBeInTheDocument();
  });

  it("persists the active filter to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeFilter featured={[posts[0]]} posts={posts} />);
    await user.click(screen.getByRole("button", { name: /# ML/i }));
    expect(localStorage.getItem("blog-tag")).toBe("ml");
  });
});
