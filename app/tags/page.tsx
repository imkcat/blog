import { MeshGradient } from "@/app/components/MeshGradient";
import { Navigation } from "@/app/components/Navigation";
import { PostCard } from "@/app/components/PostCard";
import { TagList } from "@/app/components/TagList";
import { getAllPosts, getAllTags } from "@/app/lib/markdown";

export default async function TagsPage() {
  const [allTags, posts] = await Promise.all([getAllTags(), getAllPosts()]);

  return (
    <>
      <MeshGradient />
      <Navigation />

      <main className="min-h-screen relative z-10 pb-32 pt-24 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-manga manga-title text-4xl md:text-5xl mb-3 text-[var(--text-primary)]">
            TOPICS
          </h1>
          <p className="text-[var(--text-secondary)] font-bold border-manga-thin inline-block px-4 py-2" style={{ boxShadow: '3px 3px 0 var(--border-color)' }}>
            Browse articles by category
          </p>
        </div>

        <TagList tags={allTags} />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
