"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/app/components/Motion";
import { MangaBackground } from "@/app/components/MangaBackground";
import { IconArrowLeft, IconCalendar, IconClock } from "@/app/components/Icons";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  imageUrl: string;
  content: string;
}

interface PostClientProps {
  post: Post;
}

export function PostClient({ post }: PostClientProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${scrollPercent})`;
      }
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <MangaBackground />

      {/* Reading Progress Bar */}
      <div
        ref={progressRef}
        className="reading-progress"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="fixed top-4 left-4 z-50"
      >
        <Link
          href="/"
          className="manga-button flex items-center gap-2 px-4 py-2"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span className="text-sm font-manga">BACK</span>
        </Link>
      </motion.div>

      <div className="min-h-screen relative z-10">
        {/* Hero Image */}
        <div className="w-full aspect-video relative border-b-4 border-[var(--border-color)]">
          <div className="absolute inset-0 img-placeholder" />
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          {/* Halftone overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 md:px-8 mt-0 md:-mt-16 relative z-10">
          <div>
            <div className="manga-panel-double no-float p-8 md:p-12 bg-[var(--bg-primary)]">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="manga-tag px-3 py-1 text-xs"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-manga manga-title text-3xl md:text-5xl leading-tight mb-6 text-[var(--text-primary)]">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-6 mb-10 pb-8 border-b-3 border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[var(--border-color)] flex items-center justify-center font-manga text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] font-bold">
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
                </div>
              </div>

              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-[var(--text-primary)] prose-headings:font-manga
                  prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                  prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-2
                  prose-strong:text-[var(--text-primary)]
                  prose-blockquote:border-l-4 prose-blockquote:border-[var(--border-color)] prose-blockquote:text-[var(--text-secondary)]
                  prose-code:text-[var(--text-primary)] prose-code:bg-[var(--bg-tertiary)] prose-code:border prose-code:border-[var(--border-color)] prose-code:px-1.5 prose-code:py-0.5
                  prose-pre:bg-[var(--bg-tertiary)] prose-pre:border-3 prose-pre:border-[var(--border-color)] prose-pre:shadow-manga
                  dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Footer */}
              <div className="mt-16 pt-8 border-t-3 border-[var(--border-color)] text-center">
                <p className="text-[var(--text-tertiary)] font-manga text-lg">
                  — THE END —
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Bottom Spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
