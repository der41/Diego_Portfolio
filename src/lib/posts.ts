import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "public", "posts");

export type CategoryKey =
  | "economy"
  | "ml"
  | "analytics"
  | "ai"
  | "code"
  | "explainability";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  categories: CategoryKey[];
  featured: boolean;
  readingTimeMin: number;
};

export type PostContent = {
  meta: PostMeta;
  html: string;
};

type RawFrontmatter = {
  title?: string;
  description?: string;
  tags?: string | string[];
  date?: string | Date;
  featured?: boolean;
};

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

function slugify(filename: string): string {
  return filename
    .replace(/\.md$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function toIsoDate(date: string | Date | undefined): string {
  if (!date) return "1970-01-01";
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  return String(date).slice(0, 10);
}

export function normalizeTags(raw: string | string[] | undefined): {
  tags: string[];
  categories: CategoryKey[];
} {
  if (!raw) return { tags: [], categories: [] };
  const parts = Array.isArray(raw)
    ? raw
    : raw.split(/[\s,]+/).filter(Boolean);
  const tags = parts.map((t) => t.trim()).filter(Boolean);
  const seen = new Set<CategoryKey>();
  for (const t of tags) {
    const key = TAG_TO_CATEGORY[t.toLowerCase()];
    if (key) seen.add(key);
  }
  return { tags, categories: [...seen] };
}

export function getReadingTimeMin(markdown: string): number {
  const text = markdown.replace(/<[^>]+>/g, " ").replace(/[#>*_`\[\]\(\)]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function rewriteJekyllImages(markdown: string): string {
  const figureRe = /\{%\s*include\s+figure\.liquid[^%]*?path=["']([^"']+)["'][^%]*?%\}/g;
  return markdown
    .replace(figureRe, (_m, p: string) => {
      const src = p.startsWith("assets/img/")
        ? `/images/${p.slice("assets/img/".length)}`
        : p.startsWith("/")
          ? p
          : `/images/${p}`;
      return `<img src="${src}" alt="" class="post-figure" loading="lazy" />`;
    })
    .replace(/(["'(])assets\/img\//g, "$1/images/");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type NotebookCell = {
  cell_type: "code" | "markdown" | string;
  source: string | string[];
  outputs?: Array<{
    output_type?: string;
    data?: Record<string, string | string[]>;
    text?: string | string[];
  }>;
};

function renderNotebook(nbPath: string): string {
  let raw: string;
  try {
    raw = fs.readFileSync(nbPath, "utf-8");
  } catch {
    return "";
  }
  let nb: { cells?: NotebookCell[] };
  try {
    nb = JSON.parse(raw);
  } catch {
    return "";
  }
  const cells = nb.cells ?? [];
  const parts: string[] = ['<div class="nb-notebook">'];
  for (const cell of cells) {
    const src = Array.isArray(cell.source) ? cell.source.join("") : cell.source ?? "";
    if (cell.cell_type === "code") {
      parts.push(
        `<pre class="nb-input"><code class="language-python">${escapeHtml(src)}</code></pre>`
      );
      for (const out of cell.outputs ?? []) {
        const data = out.data ?? {};
        const html = data["text/html"];
        const text = data["text/plain"] ?? out.text;
        if (html) {
          const body = Array.isArray(html) ? html.join("") : html;
          parts.push(`<div class="nb-output nb-output-html">${body}</div>`);
        } else if (text) {
          const body = Array.isArray(text) ? text.join("") : text;
          parts.push(`<pre class="nb-output nb-output-text">${escapeHtml(body)}</pre>`);
        }
      }
    } else if (cell.cell_type === "markdown") {
      parts.push(`<div class="nb-markdown">${src}</div>`);
    }
  }
  parts.push("</div>");
  return parts.join("\n");
}

export function rewriteJupyterBlocks(markdown: string): string {
  const blockRe = /\{::nomarkdown\}[\s\S]*?\{:\/nomarkdown\}/g;
  return markdown.replace(blockRe, (block) => {
    const m = block.match(/([^\s'"`]+\.ipynb)/);
    if (!m) return "";
    const rel = m[1];
    const nbPath = rel.startsWith("assets/")
      ? path.join(process.cwd(), "public", rel.slice("assets/".length))
      : path.join(process.cwd(), "public", rel);
    return renderNotebook(nbPath);
  });
}

function readFilenames(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"));
}

function parseFile(filename: string): { meta: PostMeta; content: string } {
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as RawFrontmatter;
  const { tags, categories } = normalizeTags(fm.tags);
  const meta: PostMeta = {
    slug: slugify(filename),
    title: fm.title?.trim() ?? slugify(filename),
    description: fm.description?.trim() ?? "",
    date: toIsoDate(fm.date),
    tags,
    categories,
    featured: Boolean(fm.featured),
    readingTimeMin: getReadingTimeMin(content),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  return readFilenames()
    .map((f) => parseFile(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return readFilenames().map((f) => slugify(f));
}

export async function getPostBySlug(slug: string): Promise<PostContent | null> {
  const filename = readFilenames().find((f) => slugify(f) === slug);
  if (!filename) return null;
  const { meta, content } = parseFile(filename);
  const prepared = rewriteJekyllImages(rewriteJupyterBlocks(content));
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkMath, { singleDollarTextMath: false })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(prepared);
  return { meta, html: String(processed) };
}
