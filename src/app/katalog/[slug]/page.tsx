import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarBlank,
  Gauge,
  GearFine,
  GasPump,
  Palette,
  MapPin,
  CheckCircle,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { ImageGallery } from "@/components/inventory/ImageGallery";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatIDR, formatKm } from "@/lib/utils/format";
import { vehicleWhatsAppMessage, siteConfig } from "@/lib/config/site";
import { getVehicleBySlug, getRelatedVehicles, getAllVehicles } from "@/lib/supabase/queries";

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await getAllVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.title,
    description: vehicle.description,
  };
}

const statusStyles: Record<string, string> = {
  Tersedia: "bg-brand-blue text-white",
  Booking: "bg-ink text-white",
  Terjual: "border border-ink/15 bg-paper text-ink/55",
};

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = await getRelatedVehicles(vehicle, 3);
  const sold = vehicle.status === "Terjual";

  const specs = [
    { icon: CalendarBlank, label: "Tahun", value: String(vehicle.year) },
    { icon: Gauge, label: "Kilometer", value: formatKm(vehicle.mileageKm) },
    { icon: GearFine, label: "Transmisi", value: vehicle.transmission },
    { icon: GasPump, label: "Bahan Bakar", value: vehicle.fuelType },
    { icon: Palette, label: "Warna", value: vehicle.color },
    { icon: MapPin, label: "Lokasi", value: vehicle.location },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-5 text-sm text-ink/50">
        <Link href="/katalog" className="hover:text-ink">
          Inventaris
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink/70">{vehicle.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <ImageGallery images={vehicle.images} alt={vehicle.title} />
        </div>

        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Deskripsi
            </h2>
            <p className="mt-2 leading-relaxed text-ink/70">
              {vehicle.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-bold text-ink">
              Kondisi &amp; Kelengkapan
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {vehicle.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm text-ink/70 border border-ink/10"
                >
                  <CheckCircle weight="fill" size={17} className="shrink-0 text-brand-red" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-ink/10 bg-white p-4"
              >
                <spec.icon size={20} className="text-brand-red" />
                <p className="mt-2 text-xs text-ink/50">{spec.label}</p>
                <p className="text-sm font-semibold text-ink">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="sticky top-24 rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_12px_28px_-10px_rgba(11,14,20,0.12)]">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[vehicle.status]}`}
            >
              {vehicle.status}
            </span>
            <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink">
              {vehicle.title}
            </h1>
            <p className="mt-2 font-display text-3xl font-extrabold text-brand-red">
              {formatIDR(vehicle.price)}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {!sold ? (
                <>
                  <WhatsAppButton
                    message={vehicleWhatsAppMessage(vehicle.title)}
                    label="Tanya via WhatsApp"
                    size="lg"
                    className="w-full"
                  />
                  <a
                    href={siteConfig.phone.telHref}
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-semibold text-ink"
                  >
                    <Phone size={17} weight="fill" />
                    Telepon Showroom
                  </a>
                </>
              ) : (
                <p className="rounded-xl bg-paper-dim p-4 text-center text-sm text-ink/60">
                  Unit ini sudah terjual. Lihat unit serupa di bawah, atau
                  hubungi kami untuk info unit baru.
                </p>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-ink/40">
              Harga dapat berubah sewaktu-waktu, konfirmasi ketersediaan via
              WhatsApp sebelum berkunjung.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Unit Serupa
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
