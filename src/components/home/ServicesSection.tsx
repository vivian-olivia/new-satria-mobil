import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const services = [
  {
    index: "01",
    title: "Beli Mobil & Truk",
    description:
      "Jelajahi ratusan unit siap pakai, mulai SUV hingga truk untuk kebutuhan niaga, dengan riwayat servis yang jelas.",
    href: "/katalog",
  },
  {
    index: "02",
    title: "Jual Mobil",
    description:
      "Jual mobil Anda dengan penawaran harga wajar, proses cepat, dan pembayaran langsung cair.",
    href: "/jual-tukar-tambah",
  },
  {
    index: "03",
    title: "Tukar Tambah",
    description:
      "Tukarkan mobil lama Anda dengan unit incaran di showroom kami, tanpa ribet dan estimasi instan.",
    href: "/jual-tukar-tambah",
  },
  {
    index: "04",
    title: "Cash & Kredit",
    description:
      "Bayar tunai atau ajukan kredit dengan simulasi cicilan fleksibel bersama tim konsultan kami.",
    href: "/kontak",
  },
];

export function ServicesSection() {
  return (
    <section className="texture-grain relative overflow-hidden bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
          Layanan lengkap satu pintu
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09]"
            >
              <span className="font-display text-sm font-bold text-brand-red-light/80">
                {service.index}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors group-hover:text-brand-red-light">
                Selengkapnya
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
