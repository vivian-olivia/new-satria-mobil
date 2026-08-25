import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/layout/PageHero";
import { SellForm } from "@/components/sell/SellForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { sellTradeInWhatsAppMessage } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Jual & Tukar Tambah Mobil / Truk",
  description:
    "Jual mobil atau truk bekas Anda atau tukar tambah dengan unit di showroom New Satria Mobil Surabaya. Penawaran cepat, harga wajar, proses transparan.",
};

const steps = [
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

const benefits = [
  "Penawaran harga wajar sesuai kondisi pasar terkini",
  "Proses cek unit cepat, hasil di hari yang sama",
  "Bisa tukar tambah dengan ratusan unit di showroom kami",
  "Dana hasil penjualan cair langsung, tanpa menunggu lama",
  "Bantu urus dokumen dan balik nama sampai tuntas",
  "Tim berpengalaman sejak 1998, transaksi jujur dan transparan",
];

export default function SellTradeInPage() {
  return (
    <div>
      <PageHero
        title="Jual atau tukar tambah mobil dan truk Anda"
        description="Dapatkan penawaran harga wajar hari ini juga, proses cepat dan terpercaya sejak 1998."
      >
        <WhatsAppButton message={sellTradeInWhatsAppMessage} size="lg" />
      </PageHero>

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Prosesnya simpel, tiga langkah
          </h2>

          <div className="mt-10 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col border-b border-ink/10 py-7 pr-4 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <span className="font-display text-sm font-bold text-brand-red/70">
                  {step.index}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-grain relative overflow-hidden bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Kenapa jual ke kami
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] p-4 text-white/75 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09]"
              >
                <CheckCircle weight="fill" size={19} className="mt-0.5 shrink-0 text-brand-red-light" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Isi Data Mobil Anda
          </h2>
          <p className="mt-2 text-center text-ink/60">
            Berlaku untuk mobil maupun truk. Tim kami akan menghubungi Anda
            lewat WhatsApp untuk penawaran harga.
          </p>
          <div className="mt-8">
            <SellForm />
          </div>
        </div>
      </section>
    </div>
  );
}
