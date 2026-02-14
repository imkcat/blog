'use client';

import Link from 'next/link';
import { MeshGradient } from './components/MeshGradient';
import { motion } from './components/Motion';

export default function NotFound() {
  return (
    <>
      <MeshGradient />

      <main className="min-h-screen relative z-10 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-8xl md:text-9xl font-bold text-gradient mb-4"
          >
            404
          </motion.h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-4">
            Page Not Found
          </h2>
          
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient text-white font-medium transition-transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </main>
    </>
  );
}
