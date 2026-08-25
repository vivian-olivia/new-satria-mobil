export interface CicilanInput {
  harga: number;
  dpPercent: number;
  tenorBulan: number;
}

export interface CicilanResult {
  dpAmount: number;
  pokokPinjaman: number;
  totalBunga: number;
  totalPembayaran: number;
  cicilanPerBulan: number;
}

/**
 * Flat-rate assumption for a display-only estimate — actual leasing/bank
 * rates vary and are always confirmed case-by-case. Kept as a named
 * constant so it's easy to tune without touching the formula.
 */
const ANNUAL_FLAT_RATE = 0.07;

export function calculateCicilan({ harga, dpPercent, tenorBulan }: CicilanInput): CicilanResult {
  const dpAmount = Math.round((harga * dpPercent) / 100);
  const pokokPinjaman = harga - dpAmount;
  const totalBunga = Math.round(pokokPinjaman * ANNUAL_FLAT_RATE * (tenorBulan / 12));
  const totalPembayaran = pokokPinjaman + totalBunga;
  const cicilanPerBulan = tenorBulan > 0 ? Math.round(totalPembayaran / tenorBulan) : 0;

  return { dpAmount, pokokPinjaman, totalBunga, totalPembayaran, cicilanPerBulan };
}
