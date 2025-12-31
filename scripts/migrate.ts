import fs from "fs";
import path from "path";

const GHOST_DATA_PATH = path.join(
  process.cwd(),
  "../data/ghost/data/im-kcat.ghost.2025-11-19-14-10-37.json"
);
const OUTPUT_DIR = path.join(process.cwd(), "content/posts");

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface PostTag {
  post_id: string;
  tag_id: string;
}

interface Tag {
  id: string;
  name: string;
}

interface PostAuthor {
  post_id: string;
  author_id: string;
}

interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  status: string;
  title: string;
  mobiledoc?: string;
  html?: string;
  published_at?: string;
  slug: string;
  feature_image?: string;
  custom_excerpt?: string;
}

const rawData = fs.readFileSync(GHOST_DATA_PATH, "utf-8");
const ghostData = JSON.parse(rawData);
// Ghost export structure: { db: [ { data: { ... } } ] }
// The previous analysis said { db: ... } but the head command showed { meta: ..., data: ... }
// Wait, the head command showed: {"meta":{...},"data":{...}}
// So it is NOT { db: ... } in this specific file?
// Let's check the head output again.
// {"meta":{"exported_on":1763561437544,"version":"6.8.1"},"data":{"benefits":[],"custom_theme_settings":...
// It seems this export format is directly `data`.
// Standard Ghost backup (from labs) is usually `{ db: [...] }`.
// But maybe this is a different export or newer version (6.8.1).
// I will assume `ghostData.data` contains `posts`, `tags` etc.
// Let's verify if `posts` is in `ghostData.data`.
// I'll add a check.

const data = ghostData.data;

if (!data.posts) {
  // Try db format
  if (ghostData.db && ghostData.db[0] && ghostData.db[0].data) {
    // It's the db format
    // But the head output strongly suggests it's direct data.
    // I'll stick to data.posts but maybe log keys if missing.
    console.error(
      "Could not find posts in data. Available keys:",
      Object.keys(data)
    );
    process.exit(1);
  }
}

const posts = data.posts || [];
const tags = data.tags || [];
const users = data.users || [];
const posts_tags = data.posts_tags || [];
const posts_authors = data.posts_authors || [];

console.log(`Found ${posts.length} posts.`);

// Helper to find tags for a post
const getTags = (postId: string) => {
  const tagIds = posts_tags
    .filter((pt: PostTag) => pt.post_id === postId)
    .map((pt: PostTag) => pt.tag_id);
  return tags.filter((t: Tag) => tagIds.includes(t.id)).map((t: Tag) => t.name);
};

// Helper to find authors for a post
const getAuthors = (postId: string) => {
  const authorIds = posts_authors
    .filter((pa: PostAuthor) => pa.post_id === postId)
    .map((pa: PostAuthor) => pa.author_id);
  return users
    .filter((u: User) => authorIds.includes(u.id))
    .map((u: User) => u.name);
};

posts.forEach((post: Post) => {
  if (post.status !== "published") return;

  const postTags = getTags(post.id);
  const postAuthors = getAuthors(post.id);

  let content = "";
  if (post.mobiledoc) {
    try {
      const mobiledoc = JSON.parse(post.mobiledoc);
      // Try to extract markdown card
      const markdownCard = mobiledoc.cards.find(
        (c: [string, { markdown: string }]) => c[0] === "markdown"
      );
      if (markdownCard) {
        content = markdownCard[1].markdown;
      } else {
        // If no markdown card, check for html card?
        // Or maybe it's rich text.
        // For now, if empty, we might fallback to html field if it exists in the export (some exports have it)
        if (post.html) {
          content = post.html;
        }
      }
    } catch (e) {
      console.error(`Error parsing mobiledoc for post ${post.title}`, e);
    }
  }

  if (!content && post.html) {
    content = post.html;
  }

  // Fix image paths
  content = content.replace(/__GHOST_URL__\/content\/images\//g, "/images/");
  content = content.replace(/\/content\/images\//g, "/images/");

  let featureImage = post.feature_image || "";
  featureImage = featureImage.replace(
    /__GHOST_URL__\/content\/images\//g,
    "/images/"
  );
  featureImage = featureImage.replace(/\/content\/images\//g, "/images/");

  if (!post.published_at) {
    console.warn(
      `Skipping post ${post.title} because it has no published_at date`
    );
    return;
  }

  const date = new Date(post.published_at);
  const dateStr = date.toISOString().split("T")[0];
  const filename = `${dateStr}-${post.slug}.md`;

  const frontmatter = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: "${post.published_at}"`,
    `slug: "${post.slug}"`,
    featureImage ? `coverImage: "${featureImage}"` : "",
    `tags: [${postTags.map((t: string) => `"${t}"`).join(", ")}]`,
    `author: "${postAuthors.join(", ")}"`,
    `excerpt: "${(post.custom_excerpt || "")
      .replace(/"/g, '\\"')
      .replace(/\n/g, " ")}"`,
    "---",
    "",
    content,
  ]
    .filter((l) => l !== "")
    .join("\n");

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), frontmatter);
  // console.log(`Generated ${filename}`);
});

console.log("Migration complete.");
