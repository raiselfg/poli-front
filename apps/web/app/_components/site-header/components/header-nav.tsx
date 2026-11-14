import { links } from '../constants/links';

export function HeaderNav() {
  return (
    <nav
      aria-label="Основная навигация"
      className="pointer-events-auto flex items-center gap-5 text-[length:calc(13px*var(--text-scale))] max-[900px]:gap-4 max-[700px]:hidden"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="relative py-2 font-medium text-[#36556a] transition-colors duration-200 ease-in-out after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out hover:text-[#174d71] hover:after:opacity-100 focus-visible:text-[#174d71] focus-visible:after:opacity-100"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
