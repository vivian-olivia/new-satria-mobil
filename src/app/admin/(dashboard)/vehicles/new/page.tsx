import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicleAction } from "@/lib/actions/vehicles";

export const metadata: Metadata = {
  title: "Tambah Unit",
};

export default function NewVehiclePage() {
  return (
    <div>
      <Link
        href="/admin/vehicles"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Kendaraan
      </Link>

      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink">Tambah Unit</h1>

      <div className="mt-6 max-w-3xl">
        <VehicleForm action={createVehicleAction} />
      </div>
    </div>
  );
}
