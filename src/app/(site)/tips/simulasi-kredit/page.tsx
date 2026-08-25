import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CicilanCalculator } from "@/components/tips/CicilanCalculator";

export const metadata: Metadata = {
  title: "Simulasi Kredit Mobil",
  description:
    "Hitung estimasi DP dan cicilan bulanan mobil bekas sebelum mengajukan kredit di New Satria Mobil Surabaya.",
};

export default function SimulasiKreditPage() {
  return (
    <div>
      <PageHero
        title="Simulasi DP & Cicilan Mobil"
        description="Masukkan harga mobil, DP, dan tenor untuk melihat estimasi cicilan bulanan Anda."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <CicilanCalculator />
      </div>
    </div>
  );
}
