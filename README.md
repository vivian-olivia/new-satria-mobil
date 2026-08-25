# New Satria Mobil

Website showroom mobil bekas New Satria Mobil, Surabaya (Est. 1998). Next.js
16 (App Router) + TypeScript + Tailwind CSS v4, siap dihubungkan ke Supabase
untuk data inventori dan dashboard admin.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Tanpa konfigurasi tambahan, situs berjalan dengan **data contoh (sample
data)** di `src/lib/data/vehicles.ts` — 13 unit placeholder lintas kategori,
lengkap dengan foto placeholder bermerek (bukan foto asli).

## Yang paling sering diedit

| Yang mau diubah | Berkas |
|---|---|
| Nomor WhatsApp, telepon, alamat, jam buka, Instagram | `src/lib/config/site.ts` |
| Daftar mobil (harga, tahun, spek, dll) | `src/lib/data/vehicles.ts` |
| Kategori di homepage (SUV, MPV, Hiace, dst.) | `src/lib/data/categories.ts` |
| Warna, font | `src/app/globals.css` (token `@theme`) |

Setiap perubahan di atas otomatis muncul di seluruh halaman (kartu mobil,
halaman detail, filter, footer, dsb.) karena semuanya menarik dari sumber
data yang sama.

## Foto kendaraan

Situs ini belum memakai foto asli. Setiap slot foto (kartu mobil, galeri
detail, hero, kategori, feed Instagram) menampilkan panel placeholder
bermerek (ikon mobil + warna brand) lewat komponen
`src/components/ui/ImagePlaceholder.tsx` — supaya tidak menampilkan foto
generik yang tidak relevan.

Untuk memakai foto asli: ganti isi array `images` pada
`src/lib/data/vehicles.ts` (atau kolom `images` di Supabase) dengan URL
foto sungguhan, lalu ganti pemanggilan `<ImagePlaceholder />` di komponen
terkait (`VehicleCard`, `ImageGallery`, `Hero`, dll.) dengan `next/image`
seperti biasa.

## Menghubungkan Supabase (opsional)

Secara default situs memakai data lokal di atas. Untuk mengelola inventori
lewat database sungguhan:

1. Buat project di [supabase.com](https://supabase.com).
2. Jalankan `supabase/schema.sql` di SQL Editor project tersebut.
3. Salin `.env.example` menjadi `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL`
   dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Restart `npm run dev`. Situs otomatis membaca dari Supabase; kalau data
   kosong atau terjadi error, situs otomatis kembali ke data contoh (lihat
   `src/lib/supabase/queries.ts`).

## Dashboard admin

Setelah Supabase terhubung (langkah di atas), inventori bisa dikelola dari
`/admin` — tambah, ubah, hapus unit, tanpa perlu buka Supabase dashboard.

1. Buat login admin: Supabase dashboard &rarr; **Authentication &rarr; Users
   &rarr; Add user** (email + password). Siapa pun yang berhasil login
   dianggap admin (lihat kebijakan RLS di `supabase/schema.sql`) — jangan
   bagikan login ke pihak luar.
2. Buka `/admin/login`, masuk pakai akun tadi.
3. Kelola unit di `/admin/vehicles` (tambah, ubah, hapus, tandai unggulan).

Tanpa Supabase terkonfigurasi, `/admin` menampilkan pesan setup dan tidak
bisa dipakai — dashboard ini butuh database sungguhan.

## Struktur halaman

- `/` — Beranda: hero, pencarian cepat, kategori, unit unggulan, layanan, IG
- `/katalog` — Daftar semua unit + filter (kategori, merek, transmisi, bahan bakar, budget)
- `/katalog/[slug]` — Detail unit + tombol WhatsApp
- `/jual-tukar-tambah` — Jual / tukar tambah mobil (form ke WhatsApp)
- `/kontak` — Kontak, peta, showroom info
- `/admin` — Dashboard admin (kelola inventori, lihat "Dashboard admin" di atas)

## Deploy

Proyek Next.js standar, bisa dideploy ke Vercel, Netlify, atau platform
Node lain mana pun. Set environment variable Supabase (jika dipakai) di
dashboard platform hosting.
