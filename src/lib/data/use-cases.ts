import type { UseCaseDef } from "@/lib/types";

export const useCases: UseCaseDef[] = [
  { slug: "keluarga", label: "Keluarga" },
  { slug: "harian-kantor", label: "Harian & Kantor" },
  { slug: "offroad-adventure", label: "Offroad & Adventure" },
  { slug: "niaga", label: "Niaga" },
];

export function getUseCaseBySlug(slug: string) {
  return useCases.find((u) => u.slug === slug);
}
