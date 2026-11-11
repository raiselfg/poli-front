import { Skeleton } from '@workspace/ui/components/skeleton';

export function ContactsSkeleton() {
  return (
    <div role="status" aria-label="Загружаем контакты" className="my-7">
      <div aria-hidden="true" className="flex flex-col gap-3">
        <Skeleton className="h-5 w-40 max-w-full bg-[#d8eaf2] motion-reduce:animate-none" />
        <Skeleton className="h-5 w-48 max-w-full bg-[#d8eaf2] motion-reduce:animate-none" />
        <Skeleton className="h-5 w-56 max-w-full bg-[#d8eaf2] motion-reduce:animate-none" />
      </div>
      <span className="sr-only">Загружаем контакты…</span>
    </div>
  );
}
