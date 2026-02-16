"use client";

import { MangaBackground } from "@/app/components/MangaBackground";
import { Navigation } from "@/app/components/Navigation";

interface PageData {
  slug: string;
  title: string;
  content: string;
  description?: string;
}

interface PageClientProps {
  page: PageData;
}

export function PageClient({ page }: PageClientProps) {
  return (
    <>
      <MangaBackground />
      <Navigation />

      <div className="min-h-screen relative z-10 pt-24">
        <article className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="manga-panel-double no-float p-8 md:p-12 bg-[var(--bg-primary)]">
            {/* Title */}
            <h1 className="font-manga manga-title text-3xl md:text-5xl leading-tight mb-8 text-[var(--text-primary)]">
              {page.title}
            </h1>

            {/* Page Body */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-[var(--text-primary)] prose-headings:font-manga
                prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-2
                prose-strong:text-[var(--text-primary)]
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--border-color)] prose-blockquote:text-[var(--text-secondary)]
                prose-code:text-[var(--text-primary)] prose-code:bg-[var(--bg-tertiary)] prose-code:border prose-code:border-[var(--border-color)] prose-code:px-1.5 prose-code:py-0.5
                prose-pre:bg-[var(--bg-tertiary)] prose-pre:border-3 prose-pre:border-[var(--border-color)] prose-pre:shadow-manga
                prose-ul:text-[var(--text-secondary)] prose-ol:text-[var(--text-secondary)]
                prose-li:text-[var(--text-secondary)]
                dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </article>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </>
  );
}
