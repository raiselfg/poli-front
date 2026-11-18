import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';

export function RequestImagePreview({ file }: { file: Blob }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const fullscreenImageRef = useRef<HTMLImageElement>(null);
  const [failedFile, setFailedFile] = useState<Blob | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;
    const url = URL.createObjectURL(file);
    imageRef.current.src = url;
    if (fullscreenImageRef.current) fullscreenImageRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Открыть изображение на весь экран"
        hidden={failedFile === file}
        render={
          <Button
            variant="ghost"
            className="relative h-auto max-w-full cursor-zoom-in rounded-md border-0 p-0 motion-reduce:transition-none"
          />
        }
      >
        <img
          ref={imageRef}
          alt="Изображение из заявки"
          className="max-h-112 max-w-full rounded-md object-contain"
          onError={() => setFailedFile(file)}
        />
        <span
          aria-hidden="true"
          className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full bg-background/90 text-foreground"
        >
          <Maximize2 />
        </span>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="top-0 grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 data-[side=bottom]:h-dvh data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-0 data-[side=bottom]:data-starting-style:translate-y-0 motion-reduce:transition-none sm:p-6"
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="pointer-events-none flex items-center justify-between gap-4">
          <SheetTitle className="pointer-events-auto">
            Изображение из заявки
          </SheetTitle>
          <SheetClose
            aria-label="Закрыть просмотр изображения"
            render={
              <Button
                variant="secondary"
                size="icon-lg"
                className="pointer-events-auto size-11"
              />
            }
          >
            <X aria-hidden="true" />
          </SheetClose>
        </div>
        <img
          ref={(image) => {
            fullscreenImageRef.current = image;
            if (image && imageRef.current) image.src = imageRef.current.src;
          }}
          alt="Изображение из заявки"
          className="size-full min-h-0 min-w-0 object-contain"
          onClick={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (!naturalWidth || !naturalHeight) {
              setOpen(false);
              return;
            }
            // object-contain оставляет поля внутри элемента img.
            const { left, top, width, height } =
              event.currentTarget.getBoundingClientRect();
            const scale = Math.min(
              width / naturalWidth,
              height / naturalHeight
            );
            const x = event.clientX - left - width / 2;
            const y = event.clientY - top - height / 2;
            if (
              Math.abs(x) > (naturalWidth * scale) / 2 ||
              Math.abs(y) > (naturalHeight * scale) / 2
            ) {
              setOpen(false);
            }
          }}
        />
      </SheetContent>
      {failedFile === file && (
        <p role="alert" className="text-muted-foreground">
          Не удалось показать изображение.
        </p>
      )}
    </Sheet>
  );
}
