'use client';

import { useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ошибка загрузки страницы', error);
  }, [error]);
  return (
    <main className="mx-auto flex max-w-[1320px] flex-col items-start gap-5 px-6 py-20 text-[#213b50]">
      <h1 className="text-3xl font-medium">Не удалось загрузить страницу</h1>
      <p>Попробуйте ещё раз.</p>
      <Button onClick={reset}>Повторить</Button>
    </main>
  );
}
