import Link from "next/link";
import {
  Gauge,
  GasPump,
  CalendarBlank,
  GearFine,
} from "@phosphor-icons/react/dist/ssr";
import type { Vehicle } from "@/lib/types";
import { formatIDR, formatKm } from "@/lib/utils/format";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CardImageCarousel } from "@/components/inventory/CardImageCarousel";
import { vehicleWhatsAppMessage } from "@/lib/config/site";

const statusStyles: Record<Vehicle["status"], string> = {
  Tersedia: "bg-brand-blue/85 text-white backdrop-blur-md border border-white/20",
  Booking: "bg-ink/75 text-white backdrop-blur-md border border-white/20",
  Terjual: "border border-ink/15 bg-paper text-ink/55",
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const sold = vehicle.status === "Terjual";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-10px_rgba(11,14,20,0.18)]">
      <Link
        href={`/katalog/${vehicle.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-dim"
      >
        <CardImageCarousel images={vehicle.images} alt={vehicle.title} seed={vehicle.id} />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[vehicle.status]}`}
        >
          {vehicle.status}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {vehicle.year}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/katalog/${vehicle.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-red">
            {vehicle.title}
          </h3>
        </Link>

        <p className="mt-1.5 font-display text-xl font-extrabold text-ink">
          {formatIDR(vehicle.price)}
        </p>

        <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-ink/60">
          <div className="flex items-center gap-1.5">
            <CalendarBlank size={15} />
            {vehicle.year}
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={15} />
            {formatKm(vehicle.mileageKm)}
          </div>
          <div className="flex items-center gap-1.5">
            <GearFine size={15} />
            {vehicle.transmission}
          </div>
          <div className="flex items-center gap-1.5">
            <GasPump size={15} />
            {vehicle.fuelType}
          </div>
        </dl>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/katalog/${vehicle.slug}`}
            className="flex h-10 flex-1 items-center justify-center rounded-full border border-ink/15 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
          >
            Detail
          </Link>
          {!sold && (
            <WhatsAppButton
              message={vehicleWhatsAppMessage(vehicle.title)}
              label="WhatsApp"
              size="sm"
              className="flex-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}
