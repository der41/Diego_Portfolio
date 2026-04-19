import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { stripLinks } from "@/lib/html";
import TagChip from "./TagChip";

const LONG = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
const SHORT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export default function PostListItem({ post }: { post: PostMeta }) {
  const d = new Date(`${post.date}T00:00:00`);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[1fr_auto] items-start gap-6 py-6 border-b border-[#424751]/[0.06] text-inherit no-underline"
    >
      <div>
        <h2 className="font-['Noto_Serif'] text-xl font-bold leading-[1.3] tracking-[-0.01em] text-[#191b21] mb-2 text-pretty transition-colors group-hover:text-[#003c73]">
          {post.title}
        </h2>
        <p
          className="text-sm text-[#424751] leading-relaxed mb-3.5 max-w-[680px]"
          dangerouslySetInnerHTML={{ __html: stripLinks(post.description) }}
        />
        <div className="flex items-center gap-3 flex-wrap text-[0.75rem] text-[#424751]/50">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">
              schedule
            </span>
            {post.readingTimeMin} min read
          </span>
          <span className="text-[#424751]/25">·</span>
          <span>{LONG.format(d)}</span>
          {post.tags.length > 0 && (
            <>
              <span className="text-[#424751]/25">·</span>
              <span className="flex items-center gap-1.5 flex-wrap">
                {post.tags.map((t) => (
                  <TagChip key={t} label={t} />
                ))}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="text-[0.75rem] text-[#424751]/40 tabular-nums whitespace-nowrap pt-1">
        {SHORT.format(d)}
      </div>
    </Link>
  );
}
