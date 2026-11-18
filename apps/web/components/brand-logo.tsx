import { brandName } from '@/lib/brand';

export function BrandLogo() {
  return (
    <svg
      role="img"
      aria-label={brandName}
      viewBox="0 0 94 30"
      width={94}
      height={30}
      className="block h-10 w-auto"
    >
      <use href="/images/alvin-logo.svg#brand-logo" />
    </svg>
  );
}
