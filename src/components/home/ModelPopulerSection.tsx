import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/inventory/VehicleCard";

function ModelRow({ title, vehicles }: { title: string; vehicles: Vehicle[] }) {
  if (vehicles.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

export function ModelPopulerSection({ vehicles }: { vehicles: Vehicle[] }) {
  const available = vehicles.filter((v) => v.status !== "Terjual");

  const terbaru = [...available].sort((a, b) => b.year - a.year).slice(0, 4);
  const terpopuler = available
    .filter((v) => v.featured)
    .slice(0, 4);

  if (terbaru.length === 0 && terpopuler.length === 0) return null;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Model Mobil Terbaru &amp; Terpopuler
          </h2>
        </div>

        <ModelRow title="Model Terbaru" vehicles={terbaru} />
        <ModelRow title="Model Terpopuler" vehicles={terpopuler} />
      </div>
    </section>
  );
}
