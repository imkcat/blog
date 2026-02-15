# Kcat's Blog

A personal tech blog built with Next.js 15, featuring static site generation (SSG) and Markdown content management.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

## Features

- **Static Site Generation (SSG)** - Pre-rendered HTML for optimal performance
- **Markdown Content** - Write posts in Markdown with YAML frontmatter
- **Tag Filtering** - Organize and filter content by topics
- **Responsive Design** - Optimized for all screen sizes
- **Syntax Highlighting** - Code highlighting powered by rehype-highlight

## Project Structure

```
blog/
├── content/posts/          # Markdown blog posts
│   ├── flutter-widget-safearea.md
│   ├── getting-started-with-kubernetes.md
│   └── ...
├── app/
│   ├── lib/
│   │   └── markdown.ts     # Markdown parsing utilities
│   ├── components/
│   │   ├── Navigation.tsx  # Navigation component
│   │   ├── PostCard.tsx    # Post card component
│   │   └── TagList.tsx     # Tag list component
│   ├── page.tsx            # Homepage
│   ├── posts/[slug]/       # Post detail pages
│   └── tags/[tag]/         # Tag filtered pages
├── public/images/          # Post image assets
└── next.config.ts          # Next.js configuration
```

## Getting Started

**Prerequisites:** Node.js 18+ and [Bun](https://bun.sh)

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Creating New Posts

Create a new Markdown file in `content/posts/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
author: "Kcat"
date: "2025-01-01"
readTime: "5 min read"
tags: ["Tag1", "Tag2"]
---

Your post content here...
```

> **Note:** The `slug` is automatically derived from the filename (e.g., `my-post.md` → `my-post`), and `imageUrl` is computed as `/images/[slug]/index.jpg`.

## Build for Production

```bash
bun run build
```

This generates static files in the `out/` directory.

### Preview Build

```bash
bun run preview
```

## Deployment

The `out/` directory can be deployed to any static hosting service:

- **Vercel** - Recommended, connect your GitHub repository
- **GitHub Pages** - Push to `gh-pages` branch
- **Netlify** - Drag and drop the `out/` folder
- **Cloudflare Pages** - Connect your repository

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **gray-matter** - Frontmatter parsing
- **remark / rehype** - Markdown processing

## License

MIT
