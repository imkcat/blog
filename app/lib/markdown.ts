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

/**
 * 格式化日期字符串
 * 支持的输入格式：
 * - "2017-09-12" (纯日期)
 * - "2017-09-12 20:17" (日期 + 时间)
 * - "2017-09-12T20:17:00" (ISO 格式)
 * - "2017-09-12T20:17:00Z" (ISO 格式带时区)
 * 
 * 输出格式：
 * - 有时间："2017年9月12日 20:17"
 * - 无时间："2017年9月12日"
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // 标准化日期字符串，处理空格分隔的格式 ("2017-09-12 20:17")
  const normalizedStr = dateStr.trim().replace(' ', 'T');
  const date = new Date(normalizedStr);
  
  if (isNaN(date.getTime())) {
    // 如果解析失败，返回原字符串
    return dateStr;
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 检查原始字符串是否包含时间信息
  // 时间信息的标识：包含 ":" 且不是只有日期部分
  const hasTime = /[T ]\d{1,2}:\d{2}/.test(dateStr);
  
  if (hasTime) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  }
  
  return `${year}年${month}月${day}日`;
}

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
  rawDate?: string; // 原始日期字符串，用于排序
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
      date: formatDate(data.date),
      readTime: data.readTime,
      imageUrl: `/images/${slug}/index.jpg`,
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
        date: formatDate(data.date),
        rawDate: data.date, // 保留原始日期用于排序
        readTime: data.readTime,
        imageUrl: `/images/${slug}/index.jpg`,
        tags: data.tags,
      };
    });

  // Sort by date descending (use rawDate for correct sorting)
  posts.sort((a, b) => ((a.rawDate || '') < (b.rawDate || '') ? 1 : -1));
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
