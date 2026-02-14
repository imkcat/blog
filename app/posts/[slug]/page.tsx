import { getAllPosts, getPostBySlug } from "@/app/lib/markdown";
import { notFound } from "next/navigation";
import { PostClient } from "./PostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostClient post={post} />;
}
