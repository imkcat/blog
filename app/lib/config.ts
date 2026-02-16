export type NavIcon = 'home' | 'tags' | 'user' | 'briefcase' | 'mail' | 'link';

export interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

export const navItems: NavItem[] = [
  { label: 'HOME', href: '/', icon: 'home' },
  { label: 'TOPICS', href: '/tags', icon: 'tags' },
  { label: 'ABOUT ME', href: '/pages/about', icon: 'user' },
];
