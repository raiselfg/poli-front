import Image from 'next/image';
import { brandName } from '@/lib/brand';

export function BrandLogo() {
  return (
    <Image
      src="/images/alvin-logo.svg"
      alt={brandName}
      width={94}
      height={30}
      loading="eager"
      className="h-10 w-auto"
    />
  );
}
