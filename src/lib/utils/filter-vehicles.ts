import type { CategoryTag, FuelType, Transmission, Vehicle } from "@/lib/types";

export interface VehicleFilters {
  kategori?: CategoryTag;
  merek?: string;
  transmisi?: Transmission;
  bahanBakar?: FuelType;
  budget?: string;
  urutkan?: "termurah" | "termahal" | "terbaru";
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>
): VehicleFilters {
  const get = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    kategori: get("kategori") as CategoryTag | undefined,
    merek: get("merek") || undefined,
    transmisi: get("transmisi") as Transmission | undefined,
    bahanBakar: get("bahanBakar") as FuelType | undefined,
    budget: get("budget") || undefined,
    urutkan: (get("urutkan") as VehicleFilters["urutkan"]) || undefined,
  };
}

export function applyFilters(vehicles: Vehicle[], filters: VehicleFilters) {
  let result = vehicles;

  if (filters.kategori) {
    result = result.filter((v) => v.categoryTags.includes(filters.kategori as CategoryTag));
  }
  if (filters.merek) {
    result = result.filter((v) => v.brand === filters.merek);
  }
  if (filters.transmisi) {
    result = result.filter((v) => v.transmission === filters.transmisi);
  }
  if (filters.bahanBakar) {
    result = result.filter((v) => v.fuelType === filters.bahanBakar);
  }
  if (filters.budget) {
    const [minStr, maxStr] = filters.budget.split("-");
    const min = minStr ? Number(minStr) : 0;
    const max = maxStr ? Number(maxStr) : Infinity;
    result = result.filter((v) => v.price >= min && v.price <= max);
  }

  const sorted = [...result];
  switch (filters.urutkan) {
    case "termurah":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "termahal":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "terbaru":
      sorted.sort((a, b) => b.year - a.year);
      break;
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
  }

  return sorted;
}
