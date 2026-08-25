import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterBar } from "@/components/inventory/FilterBar";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllVehicles } from "@/lib/supabase/queries";
import { parseFilters, applyFilters } from "@/lib/utils/filter-vehicles";

export const metadata: Metadata = {
  title: "Inventaris Mobil Bekas",
  description:
    "Jelajahi seluruh unit mobil dan truk bekas berkualitas di New Satria Mobil Surabaya, lengkap dengan harga, tahun, kilometer, dan spesifikasi.",
};

interface InventoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const resolvedParams = await searchParams;
  const filters = parseFilters(resolvedParams);
  const allVehicles = await getAllVehicles();
  const results = applyFilters(allVehicles, filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Inventaris Mobil Bekas
        </h1>
        <p className="mt-2 text-ink/60">
          {results.length} unit tersedia, siap cek unit dan chat WhatsApp
          langsung.
        </p>
      </div>

      <Suspense>
        <FilterBar />
      </Suspense>

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
