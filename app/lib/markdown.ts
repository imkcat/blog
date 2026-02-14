import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      description: data.description,
      content: contentHtml,
      author: data.author,
      date: data.date,
      readTime: data.readTime,
      imageUrl: data.imageUrl,
      tags: data.tags,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        content: '',
        author: data.author,
        date: data.date,
        readTime: data.readTime,
        imageUrl: data.imageUrl,
        tags: data.tags,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap(p => p.tags)));
}

export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
