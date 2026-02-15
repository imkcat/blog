import { MangaBackground } from "@/app/components/MangaBackground";
import { Navigation } from "@/app/components/Navigation";
import { PostCard } from "@/app/components/PostCard";
import { TagList } from "@/app/components/TagList";
import { getAllTags, getPostsByTag } from "@/app/lib/markdown";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const [allTags, posts] = await Promise.all([
    getAllTags(),
    getPostsByTag(decodedTag),
  ]);

  if (!allTags.includes(decodedTag)) {
    notFound();
  }

  return (
    <>
      <MangaBackground />
      <Navigation />

      <main className="min-h-screen relative z-10 pb-32 pt-24 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-manga manga-title text-3xl md:text-5xl mb-3">
            <span className="text-[var(--text-tertiary)]">TOPIC:</span>{" "}
            <span className="text-[var(--text-primary)]">{decodedTag.toUpperCase()}</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-bold border-manga-thin inline-block px-4 py-2 shadow-manga">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <TagList tags={allTags} activeTag={decodedTag} />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
