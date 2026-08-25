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

/**
 * Lifestyle/use-case tags so shoppers can filter by "what I'll use it for"
 * rather than just body style (see CategoryTag above).
 */
export type UseCaseTag =
  | "keluarga"
  | "harian-kantor"
  | "offroad-adventure"
  | "niaga";

export type ConditionStatus = "baik" | "perlu-perhatian";

export interface ConditionPoint {
  area: string;
  status: ConditionStatus;
  note: string;
}

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
  seats: number;
  useCaseTags: UseCaseTag[];
  videoUrl: string | null;
  tiktokUrl: string | null;
  instagramUrl: string | null;
  conditionPoints: ConditionPoint[];
}

export interface CategoryDef {
  slug: CategoryTag;
  label: string;
  description: string;
}

export interface UseCaseDef {
  slug: UseCaseTag;
  label: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  vehiclePurchased: string | null;
  rating: number;
  quote: string;
  photoUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export type ArticleCategory =
  | "Kredit & Pembiayaan"
  | "Tips Membeli"
  | "Tips Menjual"
  | "Perawatan";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  youtubeUrl: string | null;
  category: ArticleCategory;
  featured: boolean;
  published: boolean;
  createdAt: string;
}
