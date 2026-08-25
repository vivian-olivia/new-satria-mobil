import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { updateVehicleAction } from "@/lib/actions/vehicles";
import { getVehicleById } from "@/lib/supabase/queries";

interface EditVehiclePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Unit",
};

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) notFound();

  const boundAction = updateVehicleAction.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/vehicles"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Kendaraan
      </Link>

      <h1 className="mt-3 line-clamp-1 font-display text-2xl font-extrabold text-ink">
        {vehicle.title}
      </h1>

      <div className="mt-6 max-w-3xl">
        <VehicleForm action={boundAction} vehicle={vehicle} />
      </div>
    </div>
  );
}
