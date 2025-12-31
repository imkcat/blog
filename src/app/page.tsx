import PostCard from "@/components/PostCard";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative container mx-auto px-5 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Blog<span className="text-blue-600">.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Exploring technology, design, and the future.{" "}
              <br className="hidden sm:block" />
              Thoughts, stories, and ideas from the digital frontier.
            </p>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <main className="container mx-auto px-5 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map((post, index) => (
            <PostCard
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
              tags={post.tags}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
