export type Transmission = "Automatic" | "Manual";
export type FuelType = "Bensin" | "Diesel" | "Hybrid";
export type VehicleStatus = "Tersedia" | "Terjual" | "Booking";

/**
 * Category tags double as the homepage category-grid slugs and as
 * inventory filter values, matching how the dealership itself groups
 * stock (mixing body style like "suv" with popular model lines like
 * "fortuner").
 */
export type CategoryTag =
  | "suv"
  | "mpv"
  | "double-cabin"
  | "truck"
  | "hiace"
  | "fortuner"
  | "vellfire"
  | "innova";

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileageKm: number;
  transmission: Transmission;
  fuelType: FuelType;
  color: string;
  categoryTags: CategoryTag[];
  status: VehicleStatus;
  featured: boolean;
  images: string[];
  description: string;
  highlights: string[];
  location: string;
}

export interface CategoryDef {
  slug: CategoryTag;
  label: string;
  description: string;
}
