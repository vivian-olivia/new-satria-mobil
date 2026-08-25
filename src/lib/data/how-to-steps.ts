export interface HowToStep {
  index: string;
  title: string;
  description: string;
}

/**
 * Step content for the jual/tukar-tambah flow explainer on the
 * /jual-tukar-tambah page.
 */
export const sellSteps: HowToStep[] = [
  {
    index: "01",
    title: "Kirim data mobil",
    description:
      "Isi formulir singkat atau kirim foto dan detail mobil Anda langsung via WhatsApp.",
  },
  {
    index: "02",
    title: "Cek unit & penawaran",
    description:
      "Tim kami mengecek kondisi mobil dan memberikan penawaran harga terbaik hari itu juga.",
  },
  {
    index: "03",
    title: "Deal, bayar langsung cair",
    description:
      "Setuju harga, tanda tangan dokumen, dan dana langsung cair atau unit tukar tambah siap dibawa pulang.",
  },
];
