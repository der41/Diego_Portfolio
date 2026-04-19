import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { stripLinks } from "@/lib/html";

export default function FeaturedCard({ post }: { post: PostMeta }) {
  const year = post.date.slice(0, 4);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col bg-[#ededf6] rounded-xl p-6 border border-[#003c73]/[0.06] transition-all duration-200 hover:bg-[#e7e7f0] hover:shadow-[0_4px_20px_rgba(25,27,33,0.08)]"
    >
      <span
        aria-hidden
        className="absolute top-4 right-4 text-[#003c73] opacity-40 text-base font-bold transition-opacity group-hover:opacity-90"
      >
        ↗
      </span>
      <h3 className="font-['Noto_Serif'] text-[1.1rem] font-bold leading-[1.35] text-[#191b21] mb-2.5 pr-5 text-pretty">
        {post.title}
      </h3>
      <p
        className="flex-1 text-xs text-[#424751]/70 leading-[1.5] mb-3.5 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: stripLinks(post.description) }}
      />
      <div className="flex items-center gap-2 text-[0.75rem] text-[#424751]/55">
        <span>{post.readingTimeMin} min read</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px]">
            calendar_today
          </span>
          {year}
        </span>
      </div>
    </Link>
  );
}
