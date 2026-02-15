'use client';

import Link from 'next/link';
import { MangaBackground } from './components/MangaBackground';
import { motion } from './components/Motion';
import { IconArrowLeft } from './components/Icons';

export default function NotFound() {
  return (
    <>
      <MangaBackground />

      <main className="min-h-screen relative z-10 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Shock frame effect around 404 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="manga-shock-frame inline-block p-8 mb-8"
          >
            <h1 className="manga-404 text-[var(--text-primary)]">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="manga-panel-double p-8 max-w-md mx-auto"
          >
            <h2 className="font-manga text-2xl md:text-3xl text-[var(--text-primary)] mb-4">
              PAGE NOT FOUND!
            </h2>
            
            <p className="text-[var(--text-secondary)] mb-8 font-bold">
              The page you're looking for has vanished into another dimension...
            </p>

            <Link
              href="/"
              className="manga-button-impact inline-flex items-center gap-3 px-6 py-3"
            >
              <IconArrowLeft className="w-5 h-5" />
              <span className="font-manga">BACK TO HOME</span>
            </Link>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-[var(--text-tertiary)] font-manga text-sm"
          >
            — ERROR —
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
