'use client';

import Link from "next/link";
import { motion } from "./Motion";

interface TagListProps {
  tags: string[];
  activeTag?: string;
}

export function TagList({ tags, activeTag }: TagListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      <TagPill href="/tags" isActive={!activeTag}>
        ALL TOPICS
      </TagPill>
      {tags.map((tag) => (
        <TagPill key={tag} href={`/tags/${tag}`} isActive={tag === activeTag}>
          {tag.toUpperCase()}
        </TagPill>
      ))}
    </motion.div>
  );
}

interface TagPillProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function TagPill({ href, isActive, children }: TagPillProps) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          inline-block px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-150
          border-2 border-[var(--border-color)]
          ${isActive
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-manga"
            : "bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
          }
        `}
      >
        {children}
      </motion.span>
    </Link>
  );
}
