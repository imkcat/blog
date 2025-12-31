"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "./DateFormatter";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  excerpt?: string;
  slug: string;
  tags?: string[];
  index?: number;
};

export default function PostCard({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-2xl dark:shadow-none dark:hover:bg-gray-800 transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
      <Link
        href={`/posts/${slug}`}
        className="block overflow-hidden aspect-video relative bg-gray-100 dark:bg-gray-800"
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-400 dark:text-gray-600">
            <svg
              className="w-12 h-12 opacity-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </Link>

      <div className="flex flex-col grow p-6">
        <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          <DateFormatter dateString={date} />
        </div>

        <Link
          href={`/posts/${slug}`}
          className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </Link>

        <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 grow text-sm">
          {excerpt || "No description available."}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
