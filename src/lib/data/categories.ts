import type { CategoryDef } from "@/lib/types";

export const categories: CategoryDef[] = [
  { slug: "suv", label: "SUV", description: "Tangguh untuk segala medan" },
  { slug: "mpv", label: "MPV", description: "Lega untuk keluarga" },
  {
    slug: "double-cabin",
    label: "Double Cabin",
    description: "Pikap tangguh untuk kerja",
  },
  { slug: "truck", label: "Truck", description: "Armada niaga siap angkut" },
  { slug: "hiace", label: "Hiace", description: "Van kapasitas besar" },
  { slug: "fortuner", label: "Fortuner", description: "SUV premium Toyota" },
  { slug: "vellfire", label: "Vellfire", description: "MPV mewah Toyota" },
  { slug: "innova", label: "Innova", description: "MPV andalan keluarga" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
