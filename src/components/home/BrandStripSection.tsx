import type { Vehicle } from "@/lib/types";
import { BrandLogoStrip } from "@/components/inventory/BrandLogoStrip";

export function BrandStripSection({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="bg-paper pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Cari Berdasarkan Merek
        </h2>
        <div className="mt-6">
          <BrandLogoStrip vehicles={vehicles} />
        </div>
      </div>
    </section>
  );
}
