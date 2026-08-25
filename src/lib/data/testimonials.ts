import type { Testimonial } from "@/lib/types";

/**
 * SAMPLE TESTIMONIAL DATA
 * Placeholder customer reviews so the "Ulasan" section is fully functional
 * out of the box, matching the src/lib/data/vehicles.ts / articles.ts
 * pattern. Replace with real reviews once connected to Supabase (see
 * src/lib/supabase/queries.ts) or by editing this file directly.
 */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customerName: "Budi Santoso",
    vehiclePurchased: "Toyota Fortuner VRZ 2021",
    rating: 5,
    quote:
      "Prosesnya cepat dan transparan, unit sesuai deskripsi. Tim New Satria Mobil bantu urus dokumen sampai tuntas. Puas banget.",
    photoUrl: null,
    featured: true,
    published: true,
    createdAt: "2026-07-18T03:00:00.000Z",
  },
  {
    id: "t2",
    customerName: "Siti Rahayu",
    vehiclePurchased: "Toyota Avanza Veloz 2021",
    rating: 5,
    quote:
      "Saya tukar tambah mobil lama dan dapat harga wajar. Simulasi kreditnya juga dijelaskan detail sebelum deal, tidak ada biaya tersembunyi.",
    photoUrl: null,
    featured: true,
    published: true,
    createdAt: "2026-07-02T03:00:00.000Z",
  },
  {
    id: "t3",
    customerName: "Hendra Wijaya",
    vehiclePurchased: "Mitsubishi Triton Exceed 2019",
    rating: 4,
    quote:
      "Unit untuk kerja, kondisi sesuai yang dijanjikan. Konsultasi via WhatsApp responsif, tim showroom ramah dan sabar jawab pertanyaan.",
    photoUrl: null,
    featured: true,
    published: true,
    createdAt: "2026-06-15T03:00:00.000Z",
  },
  {
    id: "t4",
    customerName: "Anisa Putri",
    vehiclePurchased: "Toyota Innova Reborn Venturer 2020",
    rating: 5,
    quote:
      "Sudah langganan sejak 2019, selalu balik lagi karena harga jujur dan unit terawat. Recommended untuk keluarga.",
    photoUrl: null,
    featured: false,
    published: true,
    createdAt: "2026-05-28T03:00:00.000Z",
  },
];

export function getPublishedTestimonials() {
  return testimonials
    .filter((t) => t.published)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getFeaturedTestimonials(limit = 3) {
  return getPublishedTestimonials()
    .filter((t) => t.featured)
    .slice(0, limit);
}
