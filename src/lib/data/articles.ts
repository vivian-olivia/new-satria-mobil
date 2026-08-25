import type { Article } from "@/lib/types";

/**
 * SAMPLE ARTICLE DATA
 * Placeholder Tips & Kredit content so the section is fully functional out
 * of the box. `coverImage` holds a placeholder token (rendered as an
 * on-brand placeholder panel by <ImagePlaceholder>) rather than a real photo
 * URL, matching src/lib/data/vehicles.ts. Replace with real photo URLs and
 * content once connected to Supabase (see src/lib/supabase/queries.ts) or by
 * editing this file directly.
 *
 * "simulasi-kredit" is reserved for the static calculator route at
 * /tips/simulasi-kredit and must never be used as an article slug — enforced
 * again in src/lib/actions/articles.ts.
 */

function img(seed: string) {
  return `placeholder:${seed}`;
}

export const articles: Article[] = [
  {
    id: "a1",
    slug: "dp-dan-cicilan-mobil-bekas-panduan-lengkap",
    title: "DP dan Cicilan Mobil Bekas: Panduan Lengkap Sebelum Kredit",
    excerpt:
      "Bingung berapa DP ideal dan bagaimana cicilan mobil bekas dihitung? Simak panduan lengkapnya sebelum Anda mengajukan kredit.",
    body: [
      "Uang muka atau DP (down payment) adalah pembayaran awal yang dibayarkan saat mengambil kredit mobil, sebelum sisa harga dicicil setiap bulan melalui leasing atau bank. Untuk mobil bekas, DP yang umum diminta berkisar 20-30% dari harga unit, meskipun beberapa leasing menawarkan DP lebih ringan tergantung usia kendaraan dan profil kredit pembeli.",
      "Semakin besar DP yang dibayarkan, semakin kecil pokok pinjaman yang harus dicicil, sehingga cicilan bulanan juga lebih ringan dan total bunga yang dibayarkan selama masa tenor menjadi lebih kecil. Sebaliknya, DP minim membuat cicilan bulanan lebih besar meski beban di awal lebih ringan.",
      "Tenor kredit mobil bekas umumnya tersedia mulai 12 hingga 60 bulan (1-5 tahun). Tenor yang lebih panjang membuat cicilan per bulan terasa ringan, tapi total bunga yang dibayarkan sepanjang masa kredit akan lebih besar dibanding tenor pendek.",
      "Sebelum mengajukan kredit, ada baiknya menghitung dulu perkiraan cicilan bulanan berdasarkan harga unit, DP, dan tenor yang Anda inginkan, supaya bisa disesuaikan dengan kemampuan bayar bulanan. Gunakan kalkulator simulasi cicilan kami untuk mendapatkan gambaran cepat sebelum berkonsultasi langsung dengan tim kami.",
      "Perlu diingat, suku bunga dan kebijakan DP setiap leasing atau bank bisa berbeda-beda, dan biasanya juga dipengaruhi oleh usia kendaraan saat kredit berakhir. Tim New Satria Mobil siap membantu mencarikan skema kredit yang paling sesuai dengan kondisi Anda.",
    ].join("\n\n"),
    coverImage: img("tips-dp-cicilan-1"),
    youtubeUrl: null,
    category: "Kredit & Pembiayaan",
    featured: true,
    published: true,
    createdAt: "2026-06-02T03:00:00.000Z",
  },
  {
    id: "a2",
    slug: "dokumen-wajib-kredit-mobil-bekas",
    title: "Dokumen yang Dibutuhkan untuk Kredit Mobil Bekas",
    excerpt:
      "Siapkan dokumen ini sebelum mengajukan kredit mobil bekas agar proses persetujuan lebih cepat dan lancar.",
    body: [
      "Mengajukan kredit mobil bekas membutuhkan sejumlah dokumen pribadi dan pendukung yang akan diverifikasi oleh pihak leasing atau bank. Menyiapkannya lebih awal akan mempercepat proses persetujuan.",
      "Dokumen dasar yang wajib disiapkan antara lain KTP pemohon, KTP pasangan (jika sudah menikah), Kartu Keluarga, NPWP, dan slip gaji atau bukti penghasilan tiga bulan terakhir bagi karyawan. Untuk wiraswasta, biasanya diminta mutasi rekening tiga hingga enam bulan terakhir sebagai pengganti slip gaji.",
      "Selain dokumen identitas dan penghasilan, calon debitur juga perlu menyiapkan bukti domisili seperti tagihan listrik atau PBB, serta rekening tabungan aktif untuk keperluan autodebet cicilan bulanan.",
      "Untuk mempercepat proses, pastikan seluruh dokumen dalam kondisi jelas terbaca dan masih berlaku. Tim New Satria Mobil akan membantu memeriksa kelengkapan dokumen Anda sebelum diajukan ke leasing rekanan, sehingga peluang disetujui lebih besar dan prosesnya lebih cepat.",
    ].join("\n\n"),
    coverImage: img("tips-dokumen-kredit-1"),
    youtubeUrl: null,
    category: "Kredit & Pembiayaan",
    featured: false,
    published: true,
    createdAt: "2026-05-20T03:00:00.000Z",
  },
  {
    id: "a3",
    slug: "tips-wajib-sebelum-beli-mobil-bekas",
    title: "10 Tips Wajib Sebelum Beli Mobil Bekas",
    excerpt:
      "Sebelum deal, kenali dulu poin-poin penting saat memeriksa mobil bekas supaya tidak menyesal di kemudian hari.",
    body: [
      "Membeli mobil bekas butuh ketelitian ekstra dibanding mobil baru, karena kondisi setiap unit bisa sangat berbeda tergantung riwayat pemakaian dan perawatannya. Berikut beberapa hal penting yang perlu diperiksa sebelum memutuskan membeli.",
      "Periksa riwayat servis dan buku manual, cek kondisi rangka dan cat untuk memastikan tidak ada bekas benturan atau banjir, nyalakan mesin dalam kondisi dingin untuk mendengar suara aslinya, cek kebocoran oli dan air radiator, serta pastikan seluruh fitur kelistrikan dan AC berfungsi normal.",
      "Jangan lupa juga memeriksa kondisi ban dan kaki-kaki, mencoba unit langsung di jalan (test drive) untuk merasakan performa mesin dan transmisi, serta mengecek kelengkapan dan keaslian dokumen seperti STNK, BPKB, dan faktur pajak.",
      "Video di bawah ini membahas lebih lengkap poin-poin yang wajib dicek sebelum membeli mobil bekas, cocok ditonton sebagai referensi tambahan sebelum Anda datang langsung ke showroom.",
      "Di New Satria Mobil, setiap unit sudah melalui pemeriksaan kondisi sebelum dipajang, dan tim kami akan dengan senang hati menemani Anda memeriksa unit secara langsung di showroom.",
    ].join("\n\n"),
    coverImage: img("tips-beli-mobil-bekas-1"),
    youtubeUrl: "https://youtu.be/i8nxSiaXnY8",
    category: "Tips Membeli",
    featured: true,
    published: true,
    createdAt: "2026-06-10T03:00:00.000Z",
  },
  {
    id: "a4",
    slug: "cara-menentukan-harga-jual-mobil-bekas",
    title: "Cara Menentukan Harga Jual Mobil Bekas yang Tepat",
    excerpt:
      "Ingin jual atau tukar tambah mobil? Kenali dulu faktor-faktor yang menentukan harga pasaran mobil bekas Anda.",
    body: [
      "Menentukan harga jual mobil bekas yang tepat penting agar unit cepat laku namun tetap mendapat nilai yang wajar. Beberapa faktor utama menentukan harga pasaran sebuah unit.",
      "Tahun produksi dan kilometer tempuh menjadi faktor paling berpengaruh, semakin muda tahun dan semakin rendah kilometer biasanya semakin tinggi nilainya. Kondisi fisik, kelengkapan servis, serta riwayat kecelakaan atau banjir juga sangat mempengaruhi harga.",
      "Popularitas model dan ketersediaan suku cadang di pasaran turut menentukan seberapa cepat unit tersebut diminati calon pembeli. Model-model yang banyak dicari seperti Fortuner, Innova, atau Avanza umumnya memiliki nilai jual kembali yang lebih stabil.",
      "Kelengkapan dokumen seperti pajak yang masih panjang, STNK dan BPKB atas nama sendiri, serta buku servis resmi juga bisa menaikkan nilai tawar dibanding unit dengan dokumen tidak lengkap.",
      "Jika Anda ingin menjual atau tukar tambah mobil, tim New Satria Mobil siap melakukan pengecekan unit dan memberikan penawaran harga wajar sesuai kondisi pasar terkini, prosesnya cepat dan bisa selesai hari itu juga.",
    ].join("\n\n"),
    coverImage: img("tips-jual-mobil-bekas-1"),
    youtubeUrl: null,
    category: "Tips Menjual",
    featured: false,
    published: true,
    createdAt: "2026-05-05T03:00:00.000Z",
  },
  {
    id: "a5",
    slug: "perawatan-rutin-mobil-bekas-tetap-prima",
    title: "Perawatan Rutin agar Mobil Bekas Tetap Prima",
    excerpt:
      "Rawat mobil bekas Anda dengan langkah-langkah sederhana ini agar tetap nyaman dipakai dan awet jangka panjang.",
    body: [
      "Mobil bekas tetap bisa terasa seperti baru jika dirawat dengan konsisten. Berikut beberapa langkah perawatan rutin yang sebaiknya tidak dilewatkan.",
      "Ganti oli mesin secara berkala sesuai anjuran pabrikan, biasanya setiap 5.000-10.000 km tergantung jenis oli yang digunakan. Jangan lupa juga memeriksa filter udara dan filter oli agar performa mesin tetap optimal.",
      "Periksa tekanan dan kondisi ban secara rutin, termasuk melakukan spooring dan balancing setiap beberapa bulan sekali untuk menjaga kenyamanan berkendara dan mencegah keausan ban yang tidak merata.",
      "Cuci mobil secara rutin, terutama bagian kolong, untuk mencegah karat akibat kotoran atau air hujan yang menempel. Perawatan interior seperti membersihkan jok dan dashboard juga membantu menjaga nilai jual kembali unit.",
      "Servis berkala di bengkel terpercaya dan menyimpan bukti servisnya juga penting, selain menjaga performa kendaraan, riwayat servis yang lengkap akan sangat membantu saat suatu saat Anda ingin menjual kembali mobil tersebut.",
    ].join("\n\n"),
    coverImage: img("tips-perawatan-mobil-1"),
    youtubeUrl: null,
    category: "Perawatan",
    featured: false,
    published: true,
    createdAt: "2026-04-18T03:00:00.000Z",
  },
];

export function getPublishedArticles() {
  return articles
    .filter((a) => a.published)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getFeaturedArticles(limit = 3) {
  return getPublishedArticles()
    .filter((a) => a.featured)
    .slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  return getPublishedArticles().find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getPublishedArticles()
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, limit);
}
