<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumina Blog - iOS 26 Concept

A futuristic blog concept showcasing iOS 26 design language with spatial computing aesthetics. Built with Next.js 15, Tailwind CSS, and static site generation.

![Static Site](https://img.shields.io/badge/Static-SSG-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

## Features

- **Static Site Generation (SSG)** - Pre-rendered HTML for optimal performance
- **Markdown Content** - Write posts in Markdown with YAML frontmatter
- **Zero Runtime** - No Node.js server needed for deployment
- **Glassmorphism UI** - iOS 26 inspired translucent design
- **Dynamic Tag Filtering** - Organize content by topics
- **Fully Responsive** - Optimized for all screen sizes

## Project Structure

```
lumina-blog/
├── content/posts/          # Markdown blog posts
│   ├── the-spatial-web-interface.md
│   ├── neural-architectures-in-2030.md
│   └── ...
├── app/
│   ├── lib/
│   │   └── markdown.ts     # Markdown parsing utilities
│   ├── components/
│   │   ├── Navigation.tsx  # Client navigation
│   │   └── Icons.tsx       # SVG icons
│   ├── page.tsx            # Homepage
│   ├── posts/[slug]/       # Dynamic post pages
│   └── tags/[tag]/         # Tag filtered pages
├── out/                    # Static export output
└── next.config.ts          # Static export config
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
description: "A brief description for the post preview"
author: "Your Name"
date: "2033-01-26"
readTime: "5 min read"
imageUrl: "https://picsum.photos/800/600?random=5"
tags: ["Tag1", "Tag2"]
slug: "your-post-slug"
---

Your post content here...
```

## Build for Production

```bash
bun run build
```

This generates a static `out/` directory containing all HTML files.

### Preview Static Build

```bash
npx serve@latest out
```

## Deployment

The `out/` directory can be deployed to any static hosting service:

- **GitHub Pages** - Push to `gh-pages` branch
- **Netlify** - Drag and drop the `out/` folder
- **Vercel** - Set output mode to "static"
- **Cloudflare Pages** - Connect your repository
- **AWS S3** - Upload to a public bucket

## Configuration

### Static Export

The `next.config.ts` is configured for static export:

```typescript
output: 'export'           // Enable static export
images.unoptimized: true   // Disable image optimization for static export
```

### Adding Dependencies

```bash
bun add <package>
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **gray-matter** - Frontmatter parsing
- **remark** - Markdown processing
- **remark-html** - Markdown to HTML conversion

## License

MIT
