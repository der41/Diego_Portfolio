import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PostListItem from "../blog/PostListItem";
import type { PostMeta } from "@/lib/posts";

const post: PostMeta = {
  slug: "gradcam",
  title: "how to analyze the black box — a look into GradCAM",
  description: "Deep learning models are powerful but often opaque.",
  date: "2025-10-07",
  tags: ["ML", "AI"],
  categories: ["ml", "ai"],
  featured: true,
  readingTimeMin: 4,
};

describe("PostListItem", () => {
  it("renders title and excerpt", () => {
    render(<PostListItem post={post} />);
    expect(
      screen.getByText(/how to analyze the black box/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Deep learning models are powerful/),
    ).toBeInTheDocument();
  });

  it("links to /blog/[slug]", () => {
    render(<PostListItem post={post} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/gradcam");
  });

  it("renders read time and tags", () => {
    render(<PostListItem post={post} />);
    expect(screen.getByText(/4 min read/)).toBeInTheDocument();
    expect(screen.getByText(/# ML/)).toBeInTheDocument();
    expect(screen.getByText(/# AI/)).toBeInTheDocument();
  });
});
