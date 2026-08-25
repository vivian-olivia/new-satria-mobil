"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils/format";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim sm:aspect-[16/10]">
        {images[active] ? (
          <Image
            src={images[active]}
            alt={alt}
            fill
            unoptimized
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <ImagePlaceholder seed={`${alt}-${active}`} label={alt} iconSize={56} />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-brand-red" : "border-transparent"
              )}
            >
              <Image src={src} alt="" fill unoptimized sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
