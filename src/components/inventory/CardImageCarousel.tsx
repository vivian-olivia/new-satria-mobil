"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils/format";

export function CardImageCarousel({
  images,
  alt,
  seed,
}: {
  images: string[];
  alt: string;
  seed: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <ImagePlaceholder seed={seed} label={alt} className="transition-transform duration-500 group-hover:scale-105" />;
  }

  function go(delta: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setActive((i) => (i + delta + images.length) % images.length);
  }

  return (
    <>
      <Image
        src={images[active]}
        alt={alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => go(-1, e)}
            aria-label="Foto sebelumnya"
            className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => go(1, e)}
            aria-label="Foto berikutnya"
            className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <CaretRight size={14} weight="bold" />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  i === active ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
