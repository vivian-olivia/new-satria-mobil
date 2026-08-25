import type { Metadata } from "next";
import Link from "next/link";
import { Plus, PencilSimple, Star } from "@phosphor-icons/react/dist/ssr";
import { getAllVehicles } from "@/lib/supabase/queries";
import { formatIDR, formatKm } from "@/lib/utils/format";
import { DeleteVehicleButton } from "@/components/admin/DeleteVehicleButton";

export const metadata: Metadata = {
  title: "Kendaraan",
};

const statusStyles: Record<string, string> = {
  Tersedia: "bg-brand-blue-soft text-brand-blue",
  Booking: "bg-ink/10 text-ink",
  Terjual: "bg-paper-dim text-ink/50",
};

export default async function AdminVehiclesPage() {
  const vehicles = await getAllVehicles();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Kendaraan</h1>
          <p className="mt-1 text-sm text-ink/60">{vehicles.length} unit di inventori.</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          <Plus size={16} weight="bold" />
          Tambah Unit
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-ink/40">
              <th className="px-5 py-3">Unit</th>
              <th className="px-5 py-3">Harga</th>
              <th className="px-5 py-3">Tahun / KM</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink/50">
                  Belum ada unit kendaraan. Klik &quot;Tambah Unit&quot; untuk mulai.
                </td>
              </tr>
            )}
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="align-middle">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 font-medium text-ink">
                    {vehicle.featured && (
                      <Star size={14} weight="fill" className="shrink-0 text-brand-red" />
                    )}
                    <span className="line-clamp-1">{vehicle.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink/70">{formatIDR(vehicle.price)}</td>
                <td className="px-5 py-3 text-ink/70">
                  {vehicle.year} &middot; {formatKm(vehicle.mileageKm)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[vehicle.status] ?? ""}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/vehicles/${vehicle.id}/edit`}
                      aria-label={`Edit ${vehicle.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-paper-dim hover:text-ink"
                    >
                      <PencilSimple size={16} />
                    </Link>
                    <DeleteVehicleButton id={vehicle.id} title={vehicle.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
