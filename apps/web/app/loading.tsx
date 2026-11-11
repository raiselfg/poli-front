import { Skeleton } from '@workspace/ui/components/skeleton';
import { CatalogSkeleton } from './_components/catalog/components/catalog-skeleton';
import { wrap } from './_components/landing-styles';

export default function Loading() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(160deg,#fff_0%,#f6fbfe_38%,#fff_68%,#eff8fc_100%)] font-sans text-[#213b50]">
      <div role="status" aria-label="Загружаем страницу">
        <span className="sr-only">Загружаем страницу…</span>
        <div aria-hidden="true">
          <div
            className={`${wrap} mt-5 flex min-h-[68px] items-center justify-between gap-6 rounded-full border border-[#e0edf3] bg-white px-5 shadow-[0_16px_40px_rgb(79_141_174_/_12%)] max-[700px]:mt-3 max-[700px]:min-h-[62px] max-[700px]:gap-3 max-[700px]:px-[14px]`}
          >
            <Skeleton className="h-[34px] w-[165px] bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:w-[110px]" />
            <div className="flex gap-[38px] max-[700px]:hidden">
              <Skeleton className="h-4 w-20 bg-[#e4f2f8] motion-reduce:animate-none" />
              <Skeleton className="h-4 w-20 bg-[#e4f2f8] motion-reduce:animate-none" />
              <Skeleton className="h-4 w-20 bg-[#e4f2f8] motion-reduce:animate-none" />
            </div>
            <Skeleton className="h-11 w-[165px] rounded-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:w-[100px]" />
          </div>
          <div
            className={`${wrap} pt-[67px] pb-[30px] max-[700px]:pt-[37px] max-[700px]:pb-5`}
          >
            <div className="mx-auto flex max-w-[800px] flex-col items-center py-20 max-[700px]:pt-[35px] max-[700px]:pb-5">
              <div className="my-[30px] flex w-full flex-col items-center gap-3 max-[700px]:my-[25px]">
                <Skeleton className="h-[68px] w-[380px] max-w-[80%] bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-10" />
                <Skeleton className="h-[68px] w-[560px] max-w-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-10" />
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <Skeleton className="h-4 w-[440px] max-w-full bg-[#e4f2f8] motion-reduce:animate-none" />
                <Skeleton className="h-4 w-[340px] max-w-[80%] bg-[#e4f2f8] motion-reduce:animate-none" />
              </div>
              <div className="mt-[38px] flex flex-wrap justify-center gap-7 max-[700px]:mt-7 max-[700px]:gap-[18px]">
                <Skeleton className="h-[58px] w-[200px] rounded-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-[54px]" />
                <Skeleton className="h-[58px] w-[170px] rounded-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-[54px]" />
              </div>
            </div>
          </div>
          <div className={`${wrap} pt-[145px] max-[700px]:pt-[95px]`}>
            <div className="mb-20 grid grid-cols-[1fr_330px] items-end gap-[50px] max-[700px]:mb-[45px] max-[700px]:grid-cols-1 max-[700px]:gap-[25px]">
              <div className="mt-[26px] space-y-3">
                <Skeleton className="h-[60px] w-[440px] max-w-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-11" />
                <Skeleton className="h-[60px] w-[320px] max-w-full bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-11" />
              </div>
              <div className="space-y-3 border-t border-[#d0e1e9] pt-[47px] max-[700px]:pt-[35px]">
                <Skeleton className="h-4 w-full bg-[#e4f2f8] motion-reduce:animate-none" />
                <Skeleton className="h-4 w-4/5 bg-[#e4f2f8] motion-reduce:animate-none" />
                <Skeleton className="h-5 w-3/4 bg-[#e4f2f8] motion-reduce:animate-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${wrap} pb-[145px] max-[700px]:pb-[95px]`}>
        <CatalogSkeleton />
      </div>
    </main>
  );
}
