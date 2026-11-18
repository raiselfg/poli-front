import Link from 'next/link';
import { links } from '../constants/links';

export function HeaderNav() {
  return (
    <nav
      aria-label="Основная навигация"
      className="landing:flex hidden items-center gap-5 text-sm"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="landing-link text-ink-muted hover:text-ink py-2 font-medium whitespace-nowrap underline decoration-transparent underline-offset-4 hover:decoration-current"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
