"use client";

import { useState } from "react";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { Select } from "@/components/ui/Select";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatIDR } from "@/lib/utils/format";
import { calculatorWhatsAppMessage } from "@/lib/config/site";
import { calculateCicilan } from "@/lib/utils/kredit";

const dpOptions = [10, 20, 30, 40, 50].map((v) => ({ value: String(v), label: `${v}%` }));
const tenorOptions = [12, 24, 36, 48, 60].map((v) => ({
  value: String(v),
  label: `${v} Bulan`,
}));

function parseHarga(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function formatHargaInput(harga: number) {
  return harga ? `Rp ${harga.toLocaleString("id-ID")}` : "";
}

export function CicilanCalculator({ initialHarga = 300000000 }: { initialHarga?: number }) {
  const [harga, setHarga] = useState(initialHarga);
  const [dpPercent, setDpPercent] = useState("20");
  const [tenorBulan, setTenorBulan] = useState("36");

  const result = calculateCicilan({
    harga,
    dpPercent: Number(dpPercent),
    tenorBulan: Number(tenorBulan),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="space-y-5 rounded-2xl border border-ink/10 bg-white p-6">
        <div>
          <label htmlFor="harga" className="text-xs font-semibold text-ink/60">
            Harga Mobil (IDR)
          </label>
          <input
            id="harga"
            inputMode="numeric"
            value={formatHargaInput(harga)}
            onChange={(e) => setHarga(parseHarga(e.target.value))}
            placeholder="Rp 300.000.000"
            className="mt-1.5 h-12 w-full rounded-xl border border-ink/12 bg-white px-3 text-base font-semibold text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink/60">Uang Muka (DP)</label>
          <Select className="mt-1.5" options={dpOptions} value={dpPercent} onChange={setDpPercent} />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink/60">Tenor</label>
          <Select
            className="mt-1.5"
            options={tenorOptions}
            value={tenorBulan}
            onChange={setTenorBulan}
          />
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-ink p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Estimasi Cicilan per Bulan
        </p>
        <p className="mt-1.5 font-display text-4xl font-extrabold text-brand-red-light">
          {formatIDR(result.cicilanPerBulan)}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-white/50">DP ({dpPercent}%)</dt>
            <dd className="mt-0.5 font-semibold">{formatIDR(result.dpAmount)}</dd>
          </div>
          <div>
            <dt className="text-white/50">Tenor</dt>
            <dd className="mt-0.5 font-semibold">{tenorBulan} bulan</dd>
          </div>
          <div>
            <dt className="text-white/50">Pokok Pinjaman</dt>
            <dd className="mt-0.5 font-semibold">{formatIDR(result.pokokPinjaman)}</dd>
          </div>
          <div>
            <dt className="text-white/50">Total Pembayaran</dt>
            <dd className="mt-0.5 font-semibold">{formatIDR(result.totalPembayaran)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-start gap-2 rounded-xl bg-white/5 p-3 text-xs text-white/60">
          <Info size={16} className="mt-0.5 shrink-0" />
          Simulasi ini hanya estimasi berdasarkan asumsi bunga flat. Bukan
          penawaran resmi — suku bunga dan tenor sebenarnya tergantung
          kebijakan leasing/bank yang bekerja sama dengan showroom.
        </div>

        <WhatsAppButton
          message={calculatorWhatsAppMessage({
            harga,
            dpPercent: Number(dpPercent),
            dpAmount: result.dpAmount,
            tenorBulan: Number(tenorBulan),
            cicilanPerBulan: result.cicilanPerBulan,
          })}
          label="Konsultasi Hasil Simulasi"
          size="lg"
          className="mt-6 w-full"
        />
      </div>
    </div>
  );
}
