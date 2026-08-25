export interface Faq {
  question: string;
  answer: string;
}

/**
 * Static, general dealership FAQ (not admin-managed — content here changes
 * rarely and isn't tied to a specific vehicle or article). Edit directly to
 * update.
 */
export const faqs: Faq[] = [
  {
    question: "Berapa DP minimal untuk kredit mobil bekas di New Satria Mobil?",
    answer:
      "DP yang umum diminta berkisar 20-30% dari harga unit, tergantung usia kendaraan dan kebijakan leasing/bank rekanan. Gunakan kalkulator simulasi cicilan di setiap halaman detail mobil untuk perkiraan cepat, lalu konsultasikan skema yang paling sesuai lewat WhatsApp.",
  },
  {
    question: "Dokumen apa saja yang perlu disiapkan untuk pengajuan kredit?",
    answer:
      "Secara umum: KTP, NPWP, bukti penghasilan (slip gaji atau mutasi rekening), dan bukti domisili. Tim kami membantu memeriksa kelengkapan dokumen sebelum diajukan ke leasing agar prosesnya lebih cepat.",
  },
  {
    question: "Apakah bisa tukar tambah mobil lama dengan unit di showroom?",
    answer:
      "Bisa. Kirim data dan foto mobil Anda via WhatsApp atau formulir di halaman Jual & Tukar Tambah, tim kami cek unit dan memberi penawaran harga di hari yang sama, lalu selisihnya bisa dibayar tunai atau kredit.",
  },
  {
    question: "Apakah semua unit sudah dicek kondisinya sebelum dijual?",
    answer:
      "Ya, setiap unit yang dipajang sudah melalui pemeriksaan kondisi dasar (mesin, body, kaki-kaki, dokumen). Ringkasan kondisi ditampilkan di bagian \"Kondisi Kendaraan\" pada setiap halaman detail mobil.",
  },
  {
    question: "Bisa test drive sebelum memutuskan membeli?",
    answer:
      "Tentu. Hubungi tim kami via WhatsApp untuk membuat janji, dan Anda bisa langsung mengecek serta mencoba unit di showroom sebelum deal.",
  },
  {
    question: "Berapa lama proses kredit sampai unit bisa dibawa pulang?",
    answer:
      "Untuk dokumen lengkap dan pengajuan yang lancar, proses persetujuan kredit umumnya selesai dalam 1-3 hari kerja. Tim kami akan mengabari perkembangan pengajuan Anda setiap saat.",
  },
];
