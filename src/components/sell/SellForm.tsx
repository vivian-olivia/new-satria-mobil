"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { buildWhatsAppLink } from "@/lib/config/site";
import { Select } from "@/components/ui/Select";

const conditions = ["Sangat Baik", "Baik", "Cukup Baik", "Perlu Perbaikan"];
const conditionOptions = conditions.map((c) => ({ value: c, label: c }));

export function SellForm() {
  const [form, setForm] = useState({
    merek: "",
    model: "",
    tahun: "",
    kondisi: conditions[0],
    nama: "",
    telepon: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = [
      "Halo New Satria Mobil, saya ingin jual/tukar tambah mobil dengan detail berikut:",
      `Merek/Model: ${form.merek} ${form.model}`.trim(),
      `Tahun: ${form.tahun}`,
      `Kondisi: ${form.kondisi}`,
      `Nama: ${form.nama}`,
      `No. HP: ${form.telepon}`,
    ].join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-ink/12 bg-paper px-3.5 text-sm text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20";
  const labelClass = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_12px_28px_-10px_rgba(11,14,20,0.1)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="merek">
            Merek Mobil
          </label>
          <input
            id="merek"
            required
            placeholder="Contoh: Toyota"
            className={inputClass}
            value={form.merek}
            onChange={(e) => setForm({ ...form, merek: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="model">
            Model / Tipe
          </label>
          <input
            id="model"
            required
            placeholder="Contoh: Innova Reborn"
            className={inputClass}
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="tahun">
            Tahun Kendaraan
          </label>
          <input
            id="tahun"
            required
            type="number"
            min={1990}
            max={2026}
            placeholder="Contoh: 2019"
            className={inputClass}
            value={form.tahun}
            onChange={(e) => setForm({ ...form, tahun: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="kondisi">
            Kondisi Mobil
          </label>
          <Select
            options={conditionOptions}
            value={form.kondisi}
            onChange={(kondisi) => setForm({ ...form, kondisi })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="nama">
            Nama Anda
          </label>
          <input
            id="nama"
            required
            placeholder="Nama lengkap"
            className={inputClass}
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="telepon">
            Nomor HP / WhatsApp
          </label>
          <input
            id="telepon"
            required
            type="tel"
            placeholder="08xx-xxxx-xxxx"
            className={inputClass}
            value={form.telepon}
            onChange={(e) => setForm({ ...form, telepon: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-red font-bold text-white transition-colors hover:bg-brand-red-dark"
      >
        <PaperPlaneTilt weight="fill" size={18} />
        Kirim & Lanjut ke WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Data Anda akan dikirim langsung ke WhatsApp tim kami, bukan disimpan
        di server.
      </p>
    </form>
  );
}
