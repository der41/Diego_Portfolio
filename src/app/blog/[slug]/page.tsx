import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TagChip from "@/components/blog/TagChip";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import "katex/dist/katex.min.css";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.meta.title} · Diego Rodriguez`,
    description: post.meta.description.replace(/<[^>]+>/g, ""),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const { meta, html } = post;
  const date = new Date(`${meta.date}T00:00:00`);

  return (
    <>
      <Navigation />
      <main className="max-w-[760px] mx-auto px-12 pt-24 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[#424751]/70 hover:text-[#003c73] transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          Back to all posts
        </Link>

        <header className="mb-12 pb-8 border-b border-[#424751]/10">
          <h1 className="font-['Noto_Serif'] text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#191b21] mb-5 text-pretty">
            {meta.title}
          </h1>
          <p
            className="font-['Inter'] text-lg text-[#424751] leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: meta.description }}
          />
          <div className="flex items-center gap-3 flex-wrap text-[0.8rem] text-[#424751]/60">
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                schedule
              </span>
              {meta.readingTimeMin} min read
            </span>
            <span className="text-[#424751]/25">·</span>
            <span>{DATE_FORMAT.format(date)}</span>
            {meta.tags.length > 0 && (
              <>
                <span className="text-[#424751]/25">·</span>
                <span className="flex items-center gap-1.5 flex-wrap">
                  {meta.tags.map((t) => (
                    <TagChip key={t} label={t} />
                  ))}
                </span>
              </>
            )}
          </div>
        </header>

        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Footer />
    </>
  );
}
