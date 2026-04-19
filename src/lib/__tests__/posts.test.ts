import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  getReadingTimeMin,
  normalizeTags,
} from "../posts";

describe("normalizeTags", () => {
  it("splits a space-separated string into display tags", () => {
    const { tags } = normalizeTags("Analytics Explainability Economy");
    expect(tags).toEqual(["Analytics", "Explainability", "Economy"]);
  });

  it("maps known labels to canonical category keys", () => {
    const { categories } = normalizeTags("Analytics Explainability Economy");
    expect(categories).toContain("analytics");
    expect(categories).toContain("explainability");
    expect(categories).toContain("economy");
  });

  it("ignores unknown tag labels for categories", () => {
    const { tags, categories } = normalizeTags("Foobar Economy");
    expect(tags).toEqual(["Foobar", "Economy"]);
    expect(categories).toEqual(["economy"]);
  });

  it("dedupes categories when multiple tags map to the same key", () => {
    const { categories } = normalizeTags("AI LLMs RAG");
    expect(categories).toEqual(["ai"]);
  });

  it("returns empty arrays for undefined input", () => {
    const { tags, categories } = normalizeTags(undefined);
    expect(tags).toEqual([]);
    expect(categories).toEqual([]);
  });
});

describe("getReadingTimeMin", () => {
  it("returns at least 1 minute for short text", () => {
    expect(getReadingTimeMin("a b c")).toBe(1);
  });

  it("scales with word count at ~200 wpm", () => {
    const words = Array.from({ length: 600 }, () => "word").join(" ");
    expect(getReadingTimeMin(words)).toBe(3);
  });
});

describe("getAllPosts / getPostSlugs", () => {
  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 0; i < posts.length - 1; i++) {
      expect(posts[i].date >= posts[i + 1].date).toBe(true);
    }
  });

  it("produces slug strings with no date prefix and no spaces", () => {
    const slugs = getPostSlugs();
    for (const slug of slugs) {
      expect(slug).not.toMatch(/^\d{4}-\d{2}-\d{2}-/);
      expect(slug).not.toContain(" ");
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("getPostBySlug", () => {
  it("returns parsed HTML and metadata for an existing slug", async () => {
    const slug = getPostSlugs()[0];
    const post = await getPostBySlug(slug);
    expect(post).not.toBeNull();
    expect(post!.meta.slug).toBe(slug);
    expect(typeof post!.html).toBe("string");
  });

  it("returns null for an unknown slug", async () => {
    expect(await getPostBySlug("does-not-exist")).toBeNull();
  });
});
