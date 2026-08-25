import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/inventory/VehicleCard";

export function FeaturedVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Mobil Pilihan Minggu Ini
          </h2>
          <Link
            href="/katalog"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark sm:inline-flex"
          >
            Lihat semua
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <Link
          href="/katalog"
          className="mt-8 flex h-12 items-center justify-center rounded-full border border-ink/15 text-sm font-semibold text-ink sm:hidden"
        >
          Lihat semua katalog
        </Link>
      </div>
    </section>
  );
}
