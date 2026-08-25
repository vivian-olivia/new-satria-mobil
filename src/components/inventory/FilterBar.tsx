"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { vehicles } from "@/lib/data/vehicles";
import { cn } from "@/lib/utils/format";
import { Select } from "@/components/ui/Select";

const brandOptions = [
  { value: "", label: "Semua Merek" },
  ...Array.from(new Set(vehicles.map((v) => v.brand)))
    .sort()
    .map((brand) => ({ value: brand, label: brand })),
];

const transmisiOptions = [
  { value: "", label: "Semua Transmisi" },
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

const bahanBakarOptions = [
  { value: "", label: "Semua Bahan Bakar" },
  { value: "Bensin", label: "Bensin" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybrid", label: "Hybrid" },
];

const budgets = [
  { value: "", label: "Semua Budget" },
  { value: "0-200000000", label: "< Rp 200 juta" },
  { value: "200000000-400000000", label: "Rp 200 - 400 juta" },
  { value: "400000000-600000000", label: "Rp 400 - 600 juta" },
  { value: "600000000-", label: "> Rp 600 juta" },
];

const sortOptions = [
  { value: "", label: "Urutkan: Unggulan" },
  { value: "terbaru", label: "Urutkan: Tahun Terbaru" },
  { value: "termurah", label: "Urutkan: Harga Termurah" },
  { value: "termahal", label: "Urutkan: Harga Termahal" },
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

  function toggleKategori(slug: string) {
    const current = searchParams.get("kategori");
    updateParam("kategori", current === slug ? "" : slug);
  }

  const activeKategori = searchParams.get("kategori") ?? "";

  return (
    <div className="space-y-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => updateParam("kategori", "")}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            activeKategori === ""
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
            onClick={() => toggleKategori(cat.slug)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeKategori === cat.slug
                ? "bg-brand-red text-white"
                : "bg-white text-ink/70 border border-ink/12"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          className="w-[9.5rem]"
          options={brandOptions}
          value={searchParams.get("merek") ?? ""}
          onChange={(v) => updateParam("merek", v)}
        />

        <Select
          className="w-[9.5rem]"
          options={transmisiOptions}
          value={searchParams.get("transmisi") ?? ""}
          onChange={(v) => updateParam("transmisi", v)}
        />

        <Select
          className="w-[10.5rem]"
          options={bahanBakarOptions}
          value={searchParams.get("bahanBakar") ?? ""}
          onChange={(v) => updateParam("bahanBakar", v)}
        />

        <Select
          className="w-[11rem]"
          options={budgets}
          value={searchParams.get("budget") ?? ""}
          onChange={(v) => updateParam("budget", v)}
        />

        <Select
          className={cn("w-[11rem]", "sm:ml-auto")}
          options={sortOptions}
          value={searchParams.get("urutkan") ?? ""}
          onChange={(v) => updateParam("urutkan", v)}
        />
      </div>
    </div>
  );
}
