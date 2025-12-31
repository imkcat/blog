import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <main className="container mx-auto px-5 py-10">
      <h1 className="mb-12 text-4xl font-bold tracking-tighter leading-tight md:text-5xl">
        Tag: <span className="text-blue-600">{decodedTag}</span>
      </h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </main>
  );
}
