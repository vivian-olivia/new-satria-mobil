import type { Metadata } from "next";
import Link from "next/link";
import { Car, CheckCircle, Handshake, Star } from "@phosphor-icons/react/dist/ssr";
import { getAllVehicles } from "@/lib/supabase/queries";
import { formatIDR } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const vehicles = await getAllVehicles();

  const stats = [
    {
      label: "Total Unit",
      value: vehicles.length,
      icon: Car,
    },
    {
      label: "Tersedia",
      value: vehicles.filter((v) => v.status === "Tersedia").length,
      icon: CheckCircle,
    },
    {
      label: "Booking",
      value: vehicles.filter((v) => v.status === "Booking").length,
      icon: Handshake,
    },
    {
      label: "Unggulan",
      value: vehicles.filter((v) => v.featured).length,
      icon: Star,
    },
  ];

  // getAllVehicles already orders by created_at desc.
  const recent = vehicles.slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink/60">Ringkasan inventori New Satria Mobil.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-ink/10 bg-white p-5"
          >
            <div className="flex items-center gap-2 text-ink/50">
              <Icon size={18} />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {label}
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-ink">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Unit Terbaru</h2>
          <Link
            href="/admin/vehicles"
            className="text-sm font-semibold text-brand-red hover:text-brand-red-dark"
          >
            Lihat semua
          </Link>
        </div>

        <div className="mt-4 divide-y divide-ink/8">
          {recent.length === 0 && (
            <p className="py-6 text-sm text-ink/50">Belum ada unit kendaraan.</p>
          )}
          {recent.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/admin/vehicles/${vehicle.id}/edit`}
              className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-brand-red"
            >
              <span className="truncate font-medium text-ink">{vehicle.title}</span>
              <span className="shrink-0 text-ink/50">{formatIDR(vehicle.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
