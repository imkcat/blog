import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  excerpt?: string;
  content: string;
}

export function getSortedPostsData(): Omit<PostData, "content">[] {
  // Get file names under /posts
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug: matterResult.data.slug || id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      coverImage: matterResult.data.coverImage,
      tags: matterResult.data.tags,
      author: matterResult.data.author,
      excerpt: matterResult.data.excerpt,
      ...matterResult.data,
    } as Omit<PostData, "content">;
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug: matterResult.data.slug,
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  // Find file by slug (since filename has date prefix)
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((fn) => {
    const fullPath = path.join(postsDirectory, fn);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return matterResult.data.slug === slug;
  });

  if (!fileName) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug: slug,
    content: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    coverImage: matterResult.data.coverImage,
    tags: matterResult.data.tags,
    author: matterResult.data.author,
    excerpt: matterResult.data.excerpt,
    ...matterResult.data,
  } as PostData;
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
}

export function getPostsByTag(tag: string): Omit<PostData, "content">[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}
