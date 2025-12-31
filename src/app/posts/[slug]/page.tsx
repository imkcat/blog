import DateFormatter from "@/components/DateFormatter";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <article className="container mx-auto px-5 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mb-6 text-gray-500 dark:text-gray-400 font-medium">
            <DateFormatter dateString={postData.date} />
          </div>
          <h1 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            {postData.title}
          </h1>

          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {postData.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {postData.coverImage && (
          <div className="mb-12 -mx-5 sm:mx-0">
            <div className="relative aspect-video overflow-hidden sm:rounded-2xl shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-800">
              <img
                src={postData.coverImage}
                alt={`Cover Image for ${postData.title}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div
          className="prose prose-lg prose-slate dark:prose-invert max-w-none mx-auto
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900 prose-pre:shadow-lg prose-pre:rounded-xl
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-strong:text-gray-900 dark:prose-strong:text-white
        "
        >
          <MDXRemote
            source={postData.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
