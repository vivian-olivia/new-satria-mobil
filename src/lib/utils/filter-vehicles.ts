import type { CategoryTag, FuelType, Transmission, UseCaseTag, Vehicle } from "@/lib/types";

export interface VehicleFilters {
  kategori?: CategoryTag[];
  merek?: string[];
  transmisi?: Transmission[];
  bahanBakar?: FuelType[];
  hargaMin?: number;
  hargaMax?: number;
  seats?: string[];
  useCase?: UseCaseTag[];
  urutkan?: "termurah" | "termahal" | "terbaru";
}

function parseList<T extends string>(raw: string | undefined): T[] | undefined {
  if (!raw) return undefined;
  const list = raw.split(",").filter(Boolean) as T[];
  return list.length > 0 ? list : undefined;
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>
): VehicleFilters {
  const get = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const hargaMinRaw = get("hargaMin");
  const hargaMaxRaw = get("hargaMax");

  return {
    kategori: parseList<CategoryTag>(get("kategori")),
    merek: parseList<string>(get("merek")),
    transmisi: parseList<Transmission>(get("transmisi")),
    bahanBakar: parseList<FuelType>(get("bahanBakar")),
    hargaMin: hargaMinRaw ? Number(hargaMinRaw) : undefined,
    hargaMax: hargaMaxRaw ? Number(hargaMaxRaw) : undefined,
    seats: parseList<string>(get("seats")),
    useCase: parseList<UseCaseTag>(get("useCase")),
    urutkan: (get("urutkan") as VehicleFilters["urutkan"]) || undefined,
  };
}

export function applyFilters(vehicles: Vehicle[], filters: VehicleFilters) {
  let result = vehicles;

  if (filters.kategori && filters.kategori.length > 0) {
    result = result.filter((v) => v.categoryTags.some((tag) => filters.kategori!.includes(tag)));
  }
  if (filters.merek && filters.merek.length > 0) {
    result = result.filter((v) => filters.merek!.includes(v.brand));
  }
  if (filters.transmisi && filters.transmisi.length > 0) {
    result = result.filter((v) => filters.transmisi!.includes(v.transmission));
  }
  if (filters.bahanBakar && filters.bahanBakar.length > 0) {
    result = result.filter((v) => filters.bahanBakar!.includes(v.fuelType));
  }
  if (filters.hargaMin !== undefined) {
    result = result.filter((v) => v.price >= filters.hargaMin!);
  }
  if (filters.hargaMax !== undefined) {
    result = result.filter((v) => v.price <= filters.hargaMax!);
  }
  if (filters.seats && filters.seats.length > 0) {
    result = result.filter((v) =>
      filters.seats!.some((s) => (s.endsWith("+") ? v.seats >= Number(s.slice(0, -1)) : v.seats === Number(s)))
    );
  }
  if (filters.useCase && filters.useCase.length > 0) {
    result = result.filter((v) => v.useCaseTags.some((tag) => filters.useCase!.includes(tag)));
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
