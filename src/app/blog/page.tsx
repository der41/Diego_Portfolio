import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import ThemeFilter from "@/components/blog/ThemeFilter";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog · Diego Rodriguez",
  description:
    "Essays on economics, machine learning, and analytics — insights and surprises along the way.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="max-w-[1100px] mx-auto px-12 pt-24">
        <BlogHero />
        <ThemeFilter featured={featured} posts={posts} />
      </main>
      <Footer />
    </>
  );
}
