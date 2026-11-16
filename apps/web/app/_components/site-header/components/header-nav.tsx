import { links } from '../constants/links';

export function HeaderNav() {
  return (
    <nav
      aria-label="Основная навигация"
      className="landing:flex hidden items-center gap-5 text-sm"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-ink-muted hover:text-ink py-2 font-medium whitespace-nowrap underline-offset-4 hover:underline"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
