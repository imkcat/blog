import { MangaBackground } from "@/app/components/MangaBackground";
import { Navigation } from "@/app/components/Navigation";
import { getAllPosts } from "@/app/lib/markdown";
import { HomeClient } from "./HomeClient";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <MangaBackground />
      <Navigation />

      <main className="min-h-screen relative z-10 pb-32 pt-24 px-4 md:px-8 max-w-6xl mx-auto">
        <HomeClient posts={posts} />
      </main>
    </>
  );
}
