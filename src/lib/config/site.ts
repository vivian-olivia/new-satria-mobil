/**
 * Central, editable business configuration.
 * Update phone numbers, address, hours, and social links here — nothing else
 * in the codebase should hardcode these values.
 */

import { formatIDR } from "@/lib/utils/format";

export const siteConfig = {
  name: "New Satria Mobil",
  tagline: "Showroom Mobil Bekas Terpercaya Surabaya",
  foundedYear: 1998,
  description:
    "New Satria Mobil adalah showroom mobil dan truk bekas di Surabaya yang telah beroperasi sejak 1998. Jual beli, tukar tambah, dan kredit mobil dan truk bekas berkualitas dengan proses cepat dan terpercaya.",

  whatsapp: {
    // Digits only, international format, no leading +
    number: "6285100998812",
    displayNumber: "+62 851-0099-8812",
  },

  phone: {
    displayNumber: "+62 851-0099-8812",
    telHref: "tel:+6285100998812",
  },

  email: "info@newsatriamobil.id",

  facebook: {
    handle: "New Satria Mobil Surabaya",
    url: "https://www.facebook.com/newsatriamobilsurabaya/",
  },

  instagram: {
    handle: "@newsatriamobil",
    url: "https://www.instagram.com/newsatriamobil/",
  },

  tiktok: {
    handle: "@newsatriamobil",
    url: "https://www.tiktok.com/@newsatriamobil",
  },

  youtube: {
    handle: "@NewSatriaMobil",
    url: "https://www.youtube.com/@NewSatriaMobil",
  },

  address: {
    line1: "Jl. Mayjend Sungkono No. 88",
    line2: "Dukuh Pakis, Surabaya, Jawa Timur 60225",
    full: "Jl. Mayjend Sungkono No. 88, Dukuh Pakis, Surabaya, Jawa Timur 60225",
    mapsUrl: "https://maps.google.com/?q=New+Satria+Mobil+Surabaya",
  },

  // All showroom locations, shown in the footer, contact page, and the
  // floating WhatsApp panel. Keep the main address first.
  branches: [
    "Jl. Mayjend Sungkono No. 88, Dukuh Pakis, Surabaya, Jawa Timur 60225",
    "Jl. Baratajaya XIX/40, Surabaya",
    "Jl. Dharmawangsa 132, Surabaya",
    "Jl. Raya Jemursari 311, Surabaya, Indonesia 60299",
  ],

  hours: [
    { day: "Senin - Sabtu", time: "09.00 - 18.00 WIB" },
    { day: "Minggu", time: "10.00 - 16.00 WIB" },
  ],

  stats: [
    { label: "Tahun Beroperasi", value: "25+" },
    { label: "Mobil Terjual", value: "3.200+" },
  ],
} as const;

/**
 * Shared assumptions behind every "Cicilan mulai Rp X/bln" estimate shown
 * across cards, the detail page, and the calculator — kept in one place so
 * the displayed DP%/tenor text always matches what calculateCicilan (see
 * src/lib/utils/kredit.ts) actually used.
 */
export const financingAssumptions = {
  dpPercent: 30,
  tenorBulan: 60,
  tenorLabel: "5 Tahun",
  insuranceNote: "Asuransi TLO",
  requiredDocuments: ["KTP", "NPWP", "Bukti Penghasilan", "Surat Domisili"],
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encoded}`;
}

export function buildMapsLink(address: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function vehicleWhatsAppMessage(title: string) {
  return `Halo New Satria Mobil, saya tertarik dengan ${title}. Apakah unitnya masih tersedia?`;
}

export const sellTradeInWhatsAppMessage =
  "Halo New Satria Mobil, saya ingin jual/tukar tambah mobil saya. Mohon info prosesnya.";

export const generalWhatsAppMessage =
  "Halo New Satria Mobil, saya ingin bertanya tentang unit mobil yang tersedia.";

export function articleWhatsAppMessage(title: string) {
  return `Halo New Satria Mobil, saya baca artikel "${title}" dan ingin tanya lebih lanjut.`;
}

export function calculatorWhatsAppMessage(params: {
  harga: number;
  dpPercent: number;
  dpAmount: number;
  tenorBulan: number;
  cicilanPerBulan: number;
}) {
  return [
    "Halo New Satria Mobil, saya sudah simulasi kredit dengan rincian:",
    `Harga Mobil: ${formatIDR(params.harga)}`,
    `DP (${params.dpPercent}%): ${formatIDR(params.dpAmount)}`,
    `Tenor: ${params.tenorBulan} bulan`,
    `Estimasi Cicilan: ${formatIDR(params.cicilanPerBulan)}/bulan`,
    "",
    "Mohon info unit yang sesuai dan proses kreditnya.",
  ].join("\n");
}
