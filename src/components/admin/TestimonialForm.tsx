"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Select } from "@/components/ui/Select";
import type { Testimonial } from "@/lib/types";
import type { TestimonialFormState } from "@/lib/actions/testimonials";

const ratingOptions = [5, 4, 3, 2, 1].map((v) => ({ value: String(v), label: `${v} Bintang` }));

interface TestimonialFormProps {
  action: (state: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  testimonial?: Testimonial;
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
  defaultValue?: string;
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
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/12 bg-white px-3 text-sm text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      />
    </div>
  );
}

export function TestimonialForm({ action, testimonial }: TestimonialFormProps) {
  const [state, formAction] = useActionState(action, undefined);
  const [rating, setRating] = useState<string>(String(testimonial?.rating ?? 5));

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="rounded-xl bg-brand-red-soft px-4 py-3 text-sm font-medium text-brand-red">
          {state.error}
        </p>
      )}

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2 sm:p-6">
        <Field
          label="Nama Pelanggan"
          name="customerName"
          defaultValue={testimonial?.customerName}
          required
        />
        <Field
          label="Unit yang Dibeli (opsional)"
          name="vehiclePurchased"
          defaultValue={testimonial?.vehiclePurchased ?? undefined}
          placeholder="Toyota Fortuner VRZ 2021"
        />
        <div>
          <label className="text-xs font-semibold text-ink/60">Rating</label>
          <input type="hidden" name="rating" value={rating} />
          <Select className="mt-1.5" options={ratingOptions} value={rating} onChange={setRating} />
        </div>
        <Field
          label="URL Foto (opsional)"
          name="photoUrl"
          type="url"
          defaultValue={testimonial?.photoUrl ?? undefined}
          placeholder="https://..."
        />
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <label htmlFor="quote" className="text-xs font-semibold text-ink/60">
          Ulasan
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3 py-2 text-sm text-ink focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
        />
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={testimonial?.featured}
            className="h-4 w-4 rounded border-ink/20 text-brand-red focus:ring-brand-red/30"
          />
          Tampilkan sebagai ulasan unggulan di beranda
        </label>

        <label className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={testimonial?.published ?? true}
            className="h-4 w-4 rounded border-ink/20 text-brand-red focus:ring-brand-red/30"
          />
          Publikasikan
        </label>
      </section>

      <SubmitButton label={testimonial ? "Simpan Perubahan" : "Tambah Testimoni"} />
    </form>
  );
}
