"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils/format";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim sm:aspect-[16/10]">
        <ImagePlaceholder seed={`${alt}-${active}`} label={alt} iconSize={56} />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-brand-red" : "border-transparent"
              )}
            >
              <ImagePlaceholder seed={`${alt}-${i}`} label="" iconSize={20} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
