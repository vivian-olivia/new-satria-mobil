"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { categories } from "@/lib/data/categories";
import { useCases } from "@/lib/data/use-cases";
import { Select } from "@/components/ui/Select";
import type { Vehicle } from "@/lib/types";
import type { VehicleFormState } from "@/lib/actions/vehicles";

const transmissionOptions = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

const fuelOptions = [
  { value: "Bensin", label: "Bensin" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybrid", label: "Hybrid" },
];

const statusOptions = [
  { value: "Tersedia", label: "Tersedia" },
  { value: "Booking", label: "Booking" },
  { value: "Terjual", label: "Terjual" },
];

interface VehicleFormProps {
  action: (state: VehicleFormState, formData: FormData) => Promise<VehicleFormState>;
  vehicle?: Vehicle;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 rounded-xl bg-brand-red px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
    >
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold text-ink/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        min={type === "number" ? 0 : undefined}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/12 bg-white px-3 text-sm text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 3,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold text-ink/60">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3 py-2 text-sm text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      />
      {hint && <p className="mt-1 text-xs text-ink/40">{hint}</p>}
    </div>
  );
}

export function VehicleForm({ action, vehicle }: VehicleFormProps) {
  const [state, formAction] = useActionState(action, undefined);
  const [transmission, setTransmission] = useState<string>(vehicle?.transmission ?? "Automatic");
  const [fuelType, setFuelType] = useState<string>(vehicle?.fuelType ?? "Bensin");
  const [status, setStatus] = useState<string>(vehicle?.status ?? "Tersedia");

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="rounded-xl bg-brand-red-soft px-4 py-3 text-sm font-medium text-brand-red">
          {state.error}
        </p>
      )}

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2 sm:p-6">
        <Field label="Judul" name="title" defaultValue={vehicle?.title} required />
        <Field
          label="Slug (opsional)"
          name="slug"
          defaultValue={vehicle?.slug}
          placeholder="dibuat otomatis dari judul"
        />
        <Field label="Merek" name="brand" defaultValue={vehicle?.brand} required />
        <Field label="Model" name="model" defaultValue={vehicle?.model} required />
        <Field label="Varian" name="variant" defaultValue={vehicle?.variant} required />
        <Field label="Warna" name="color" defaultValue={vehicle?.color} required />
        <Field label="Tahun" name="year" type="number" defaultValue={vehicle?.year} required />
        <Field label="Harga (IDR)" name="price" type="number" defaultValue={vehicle?.price} required />
        <Field
          label="Kilometer"
          name="mileageKm"
          type="number"
          defaultValue={vehicle?.mileageKm ?? 0}
        />
        <Field
          label="Lokasi"
          name="location"
          defaultValue={vehicle?.location}
          placeholder="Showroom Surabaya"
        />
        <Field
          label="Jumlah Kursi"
          name="seats"
          type="number"
          defaultValue={vehicle?.seats ?? 5}
          required
        />
      </section>

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <label className="text-xs font-semibold text-ink/60">Transmisi</label>
          <input type="hidden" name="transmission" value={transmission} />
          <Select
            className="mt-1.5"
            options={transmissionOptions}
            value={transmission}
            onChange={setTransmission}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/60">Bahan Bakar</label>
          <input type="hidden" name="fuelType" value={fuelType} />
          <Select
            className="mt-1.5"
            options={fuelOptions}
            value={fuelType}
            onChange={setFuelType}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/60">Status</label>
          <input type="hidden" name="status" value={status} />
          <Select className="mt-1.5" options={statusOptions} value={status} onChange={setStatus} />
        </div>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <label className="text-xs font-semibold text-ink/60">Kategori</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5 text-sm text-ink/70 transition-colors has-[:checked]:border-brand-red has-[:checked]:bg-brand-red-soft has-[:checked]:text-brand-red"
            >
              <input
                type="checkbox"
                name="categoryTags"
                value={cat.slug}
                defaultChecked={vehicle?.categoryTags.includes(cat.slug)}
                className="sr-only"
              />
              {cat.label}
            </label>
          ))}
        </div>

        <label className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={vehicle?.featured}
            className="h-4 w-4 rounded border-ink/20 text-brand-red focus:ring-brand-red/30"
          />
          Tampilkan sebagai unit unggulan di beranda
        </label>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <label className="text-xs font-semibold text-ink/60">Gaya Hidup / Use Case</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {useCases.map((uc) => (
            <label
              key={uc.slug}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5 text-sm text-ink/70 transition-colors has-[:checked]:border-brand-red has-[:checked]:bg-brand-red-soft has-[:checked]:text-brand-red"
            >
              <input
                type="checkbox"
                name="useCaseTags"
                value={uc.slug}
                defaultChecked={vehicle?.useCaseTags.includes(uc.slug)}
                className="sr-only"
              />
              {uc.label}
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <TextAreaField
          label="Deskripsi"
          name="description"
          defaultValue={vehicle?.description}
          rows={4}
        />
        <TextAreaField
          label="Highlight"
          name="highlights"
          defaultValue={vehicle?.highlights.join("\n")}
          rows={4}
          hint="Satu poin per baris."
        />
        <TextAreaField
          label="URL Foto"
          name="images"
          defaultValue={vehicle?.images.join("\n")}
          rows={4}
          hint="Satu URL foto per baris. Kosongkan untuk pakai placeholder."
        />
        <TextAreaField
          label="Kondisi Kendaraan"
          name="conditionPoints"
          defaultValue={vehicle?.conditionPoints
            .map((p) => `${p.area} | ${p.status} | ${p.note}`)
            .join("\n")}
          rows={4}
          hint='Satu poin per baris, format: "Area | baik atau perlu-perhatian | Catatan". Contoh: Mesin & Transmisi | baik | Halus, tidak ada rembes oli.'
        />
      </section>

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-3 sm:p-6">
        <Field
          label="URL Video YouTube (opsional)"
          name="videoUrl"
          type="url"
          defaultValue={vehicle?.videoUrl ?? undefined}
          placeholder="https://youtu.be/..."
        />
        <Field
          label="URL Video TikTok (opsional)"
          name="tiktokUrl"
          type="url"
          defaultValue={vehicle?.tiktokUrl ?? undefined}
          placeholder="https://www.tiktok.com/..."
        />
        <Field
          label="URL Post Instagram (opsional)"
          name="instagramUrl"
          type="url"
          defaultValue={vehicle?.instagramUrl ?? undefined}
          placeholder="https://www.instagram.com/..."
        />
      </section>

      <SubmitButton label={vehicle ? "Simpan Perubahan" : "Tambah Unit"} />
    </form>
  );
}
