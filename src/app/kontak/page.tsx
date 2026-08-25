import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactInfo } from "@/components/kontak/ContactInfo";
import { buildWhatsAppLink } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi New Satria Mobil Surabaya via WhatsApp, telepon, atau kunjungi langsung showroom kami.",
};

const topics = [
  {
    label: "Tanya Ketersediaan Unit",
    message: "Halo New Satria Mobil, saya ingin tanya ketersediaan salah satu unit.",
  },
  {
    label: "Jadwalkan Test Drive",
    message: "Halo New Satria Mobil, saya ingin jadwalkan test drive.",
  },
  {
    label: "Jual / Tukar Tambah",
    message: "Halo New Satria Mobil, saya ingin jual/tukar tambah mobil saya.",
  },
  {
    label: "Pertanyaan Lainnya",
    message: "Halo New Satria Mobil, saya ingin bertanya lebih lanjut.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Hubungi kami"
        description="Tim kami siap bantu via WhatsApp, telepon, atau kunjungan langsung ke showroom Surabaya."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
          <ContactInfo />
        </div>
      </section>

      <section className="texture-grain relative overflow-hidden bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Pilih topik, langsung chat
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <a
                key={topic.label}
                href={buildWhatsAppLink(topic.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 text-center text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-brand-red-light/40 hover:bg-white/[0.09] hover:text-brand-red-light"
              >
                {topic.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
