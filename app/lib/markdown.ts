import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import sanitizeHtml from 'sanitize-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const allowedIframeHostnames = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
  'vimeo.com',
  'player.bilibili.com',
  'music.163.com',
];

function sanitizePostHtml(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'iframe', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del', 'input'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      code: ['class'],
      pre: ['class'],
      span: ['class'],
      div: ['align', 'class', 'style'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style'],
      table: ['class'],
      th: ['align', 'class'],
      td: ['align', 'class'],
      input: ['type', 'checked', 'disabled', 'class'],
      iframe: [
        'src',
        'width',
        'height',
        'frameborder',
        'allow',
        'allowfullscreen',
        'scrolling',
        'marginwidth',
        'marginheight',
        'border',
        'framespacing',
        'title',
        'loading',
        'referrerpolicy',
      ],
    },
    allowedSchemesByTag: {
      ...sanitizeHtml.defaults.allowedSchemesByTag,
      iframe: ['http', 'https'],
    },
    allowProtocolRelative: true,
    allowedIframeHostnames,
  });
}

export interface PostData {
  slug: string;
  title: string;
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

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);
    const contentHtml = sanitizePostHtml(processedContent.toString());

    return {
      slug,
      title: data.title,
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
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        content: '',
        author: data.author,
        date: data.date,
        readTime: data.readTime,
        imageUrl: data.imageUrl,
        tags: data.tags,
      };
    });

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap(p => p.tags)));
}

export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
