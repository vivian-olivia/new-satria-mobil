import { CarProfile } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/format";

/**
 * Honest stand-in for real inventory photography. A quiet, single-tone panel
 * (not a colorful generated-art block) so the site reads as "real photos
 * pending" rather than a demo. Absolutely positioned to fill its (relatively
 * positioned) parent, matching how next/image `fill` will replace it later.
 */

interface ImagePlaceholderProps {
  seed: string;
  label?: string;
  iconSize?: number;
  className?: string;
}

export function ImagePlaceholder({
  label = "Foto segera hadir",
  iconSize = 32,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "texture-grain absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-paper-dim ring-1 ring-inset ring-ink/[0.06]",
        className
      )}
    >
      <CarProfile weight="thin" size={iconSize} className="relative text-ink/20" />
      {label && (
        <span className="relative px-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
          {label}
        </span>
      )}
    </div>
  );
}
