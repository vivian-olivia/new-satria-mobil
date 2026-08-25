"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { vehicles } from "@/lib/data/vehicles";
import { useCases } from "@/lib/data/use-cases";
import { cn } from "@/lib/utils/format";
import { Select } from "@/components/ui/Select";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { PriceRangeFilter } from "@/components/inventory/PriceRangeFilter";

const brandOptions = Array.from(new Set(vehicles.map((v) => v.brand)))
  .sort()
  .map((brand) => ({ value: brand, label: brand }));

const transmisiOptions = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

const bahanBakarOptions = [
  { value: "Bensin", label: "Bensin" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybrid", label: "Hybrid" },
];

const seatOptions = [
  { value: "2", label: "2 Kursi" },
  { value: "4", label: "4 Kursi" },
  { value: "5", label: "5 Kursi" },
  { value: "7", label: "7 Kursi" },
  { value: "8+", label: "8+ Kursi" },
];

const useCaseOptions = useCases.map((u) => ({ value: u.slug, label: u.label }));

const sortOptions = [
  { value: "", label: "Urutkan: Unggulan" },
  { value: "terbaru", label: "Urutkan: Tahun Terbaru" },
  { value: "termurah", label: "Urutkan: Harga Termurah" },
  { value: "termahal", label: "Urutkan: Harga Termahal" },
];

const FILTER_KEYS = [
  "kategori",
  "merek",
  "transmisi",
  "bahanBakar",
  "hargaMin",
  "hargaMax",
  "seats",
  "useCase",
];

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function getList(key: string) {
    return searchParams.get(key)?.split(",").filter(Boolean) ?? [];
  }

  function toggleListValue(key: string, value: string) {
    const current = getList(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParam(key, next.join(","));
  }

  function clearAllFilters() {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of FILTER_KEYS) params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeKategori = getList("kategori");
  const activeMerek = getList("merek");
  const hargaMin = searchParams.get("hargaMin");
  const hargaMax = searchParams.get("hargaMax");

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.get(key));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button
            type="button"
            onClick={() => updateParam("kategori", "")}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeKategori.length === 0
                ? "bg-ink text-white"
                : "bg-white text-ink/70 border border-ink/12"
            )}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => toggleListValue("kategori", cat.slug)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeKategori.includes(cat.slug)
                  ? "bg-brand-red text-white"
                  : "bg-white text-ink/70 border border-ink/12"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Select
          className="w-full sm:ml-auto sm:w-[11rem]"
          options={sortOptions}
          value={searchParams.get("urutkan") ?? ""}
          onChange={(v) => updateParam("urutkan", v)}
        />
      </div>

      <div className="ggrid grid-cols-2 gap-2 sm:flex sm:items-start">
        <MultiSelect
          className="w-full sm:flex-1"
          options={brandOptions}
          values={activeMerek}
          onChange={(values) => updateParam("merek", values.join(","))}
          allLabel="Semua Merek"
          countLabel="Merek"
        />

        <MultiSelect
          className="w-full sm:flex-1"
          options={transmisiOptions}
          values={getList("transmisi")}
          onChange={(values) => updateParam("transmisi", values.join(","))}
          allLabel="Semua Transmisi"
          countLabel="Transmisi"
        />

        <MultiSelect
          className="w-full sm:flex-1"
          options={bahanBakarOptions}
          values={getList("bahanBakar")}
          onChange={(values) => updateParam("bahanBakar", values.join(","))}
          allLabel="Semua Bahan Bakar"
          countLabel="Bahan Bakar"
        />

        <PriceRangeFilter
          className="w-full sm:flex-1"
          min={hargaMin ? Number(hargaMin) : undefined}
          max={hargaMax ? Number(hargaMax) : undefined}
          onApply={(min, max) => {
            const params = new URLSearchParams(searchParams.toString());
            if (min !== undefined) params.set("hargaMin", String(min));
            else params.delete("hargaMin");
            if (max !== undefined) params.set("hargaMax", String(max));
            else params.delete("hargaMax");
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
        />

        <MultiSelect
          className="w-full sm:flex-1"
          options={seatOptions}
          values={getList("seats")}
          onChange={(values) => updateParam("seats", values.join(","))}
          allLabel="Semua Kursi"
          countLabel="Kursi"
        />

        <MultiSelect
          className="w-full sm:flex-1"
          options={useCaseOptions}
          values={getList("useCase")}
          onChange={(values) => updateParam("useCase", values.join(","))}
          allLabel="Semua Gaya Hidup"
          countLabel="Gaya Hidup"
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="col-span-2 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-ink/12 text-sm font-semibold text-ink/60 transition-colors hover:border-brand-red/40 hover:text-brand-red sm:col-span-1 sm:w-auto sm:px-4"
          >
            <X size={14} weight="bold" />
            Hapus Semua Filter
          </button>
        )}
      </div>
    </div>
  );
}
