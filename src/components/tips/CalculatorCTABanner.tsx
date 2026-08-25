import Link from "next/link";
import { Calculator, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CalculatorCTABanner() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-ink px-6 py-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
          <Calculator size={22} weight="fill" className="text-brand-red-light" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold">
            Ingin tahu estimasi cicilan Anda?
          </h3>
          <p className="mt-0.5 text-sm text-white/60">
            Coba kalkulator simulasi DP dan cicilan, hasilnya langsung bisa dikonsultasikan via WhatsApp.
          </p>
        </div>
      </div>
      <Link
        href="/tips/simulasi-kredit"
        className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
      >
        Coba Kalkulator
        <ArrowRight size={16} weight="bold" />
      </Link>
    </div>
  );
}
