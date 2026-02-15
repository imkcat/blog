'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, StaggerContainer, StaggerItem } from './components/Motion';
import { IconCalendar, IconClock } from './components/Icons';

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

interface HomeClientProps {
  posts: Post[];
}

export function HomeClient({ posts }: HomeClientProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center space-y-6 pt-8"
      >
        {/* Title with manga shock frame effect */}
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="font-manga manga-title text-6xl md:text-8xl">I'm Kcat</span>
          </h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="text-lg text-[var(--text-secondary)] font-bold tracking-wide max-w-lg mx-auto border-manga-thin p-4 bg-[var(--bg-primary)] shadow-manga"
        >
          Fancy mind, fancy life
        </motion.p>
      </motion.div>

      {/* Posts Grid */}
      <StaggerContainer className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="block group h-full">
              <motion.article
                whileHover={{ 
                  y: -3, 
                  x: -3,
                  transition: { duration: 0.1 } 
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.05 }
                }}
                className="manga-panel overflow-hidden h-full flex flex-col"
              >
                <div className="relative overflow-hidden shrink-0 aspect-video border-b-3 border-[var(--border-color)]">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 img-placeholder" />
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Halftone overlay on image */}
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }} />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="manga-tag px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 bg-[var(--bg-primary)]">
                  <h2 className="font-manga text-2xl leading-tight transition-all group-hover:underline decoration-4 underline-offset-4">
                    {post.title}
                  </h2>

                  <div className="flex items-center gap-4 text-[var(--text-tertiary)] text-xs mt-auto pt-4 font-bold">
                    <span className="flex items-center gap-1.5 border border-[var(--border-color)] px-2 py-1">
                      <IconCalendar />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 border border-[var(--border-color)] px-2 py-1">
                      <IconClock />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
