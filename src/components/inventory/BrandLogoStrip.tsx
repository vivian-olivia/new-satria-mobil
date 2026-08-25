import Link from "next/link";
import type { Vehicle } from "@/lib/types";

/**
 * Quick brand-jump strip. No real logo image assets exist in the repo, so
 * each brand renders as a bold wordmark badge (rather than a fabricated
 * logo graphic) that deep-links into the filtered katalog.
 */
export function BrandLogoStrip({ vehicles }: { vehicles: Vehicle[] }) {
  const brands = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
  if (brands.length === 0) return null;

  return (
    <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {brands.map((brand) => (
        <Link
          key={brand}
          href={`/katalog?merek=${encodeURIComponent(brand)}`}
          className="flex h-14 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white px-6 font-display text-base font-extrabold text-ink/70 transition-colors hover:border-brand-red/40 hover:text-brand-red"
        >
          {brand}
        </Link>
      ))}
    </div>
  );
}
