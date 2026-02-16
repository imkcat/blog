'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, NavIcon } from '@/app/lib/config';
import { IconHome, IconTags, IconUser, IconBriefcase, IconMail, IconLink } from './Icons';

const iconMap: Record<NavIcon, React.ComponentType<{ className?: string }>> = {
  home: IconHome,
  tags: IconTags,
  user: IconUser,
  briefcase: IconBriefcase,
  mail: IconMail,
  link: IconLink,
};

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href.startsWith('/pages/')) {
      return pathname === href || pathname.startsWith(href + '/');
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <nav className="manga-nav px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink key={item.href} href={item.href} isActive={isActive(item.href)}>
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
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
        text-sm font-bold uppercase tracking-wider transition-all duration-100
        border-2 border-[var(--border-color)]
        ${isActive 
          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' 
          : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]'
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-2 font-manga">{children}</span>
    </Link>
  );
}

