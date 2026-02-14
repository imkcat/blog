'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from './Motion';
import { IconHome, IconTags } from './Icons';

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isTags = pathname.startsWith('/tags');

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <nav className="manga-nav px-2 py-2 flex items-center gap-1">
        <NavLink href="/" isActive={isHome}>
          <IconHome className="w-4 h-4" />
          <span>HOME</span>
        </NavLink>
        <NavLink href="/tags" isActive={isTags}>
          <IconTags className="w-4 h-4" />
          <span>TOPICS</span>
        </NavLink>
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center gap-2 px-4 py-2
        text-sm font-bold uppercase tracking-wider transition-all duration-150
        border-2 border-[var(--border-color)]
        ${isActive 
          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' 
          : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]'
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-[var(--text-primary)]"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2 font-manga">{children}</span>
    </Link>
  );
}

