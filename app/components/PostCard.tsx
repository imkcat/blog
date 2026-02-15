'use client';

import type { PostData } from "@/app/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { motion } from "./Motion";
import { IconCalendar, IconClock } from "./Icons";

interface PostCardProps {
  post: PostData;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <motion.article
        whileHover={{ 
          y: -2, 
          x: -2,
          transition: { duration: 0.1 } 
        }}
        whileTap={{ 
          scale: 0.99,
          transition: { duration: 0.05 }
        }}
        className="manga-panel p-4 flex gap-4 items-center"
      >
        <div className="w-28 md:w-36 aspect-video overflow-hidden shrink-0 relative border-2 border-[var(--border-color)]">
          <div className="absolute inset-0 img-placeholder" />
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
          {/* Halftone overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-manga text-lg mb-1 truncate text-[var(--text-primary)] group-hover:underline decoration-2 underline-offset-2 transition-all duration-100">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] font-bold mt-2">
            <span className="flex items-center gap-1 border border-[var(--border-color)] px-2 py-0.5">
              <IconCalendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 border border-[var(--border-color)] px-2 py-0.5">
              <IconClock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
