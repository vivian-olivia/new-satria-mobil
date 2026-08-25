"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { articleCategories } from "@/lib/data/article-categories";
import { Select } from "@/components/ui/Select";
import type { Article } from "@/lib/types";
import type { ArticleFormState } from "@/lib/actions/articles";

const categoryOptions = articleCategories.map((c) => ({ value: c, label: c }));

interface ArticleFormProps {
  action: (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  article?: Article;
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

export function ArticleForm({ action, article }: ArticleFormProps) {
  const [state, formAction] = useActionState(action, undefined);
  const [category, setCategory] = useState<string>(article?.category ?? articleCategories[0]);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="rounded-xl bg-brand-red-soft px-4 py-3 text-sm font-medium text-brand-red">
          {state.error}
        </p>
      )}

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2 sm:p-6">
        <Field label="Judul" name="title" defaultValue={article?.title} required />
        <Field
          label="Slug (opsional)"
          name="slug"
          defaultValue={article?.slug}
          placeholder="dibuat otomatis dari judul"
        />
        <div>
          <label className="text-xs font-semibold text-ink/60">Kategori</label>
          <input type="hidden" name="category" value={category} />
          <Select
            className="mt-1.5"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />
        </div>
        <Field
          label="URL Cover Image (opsional)"
          name="coverImage"
          type="url"
          defaultValue={article?.coverImage}
          placeholder="https://..."
        />
        <Field
          label="URL Video YouTube (opsional)"
          name="youtubeUrl"
          type="url"
          defaultValue={article?.youtubeUrl ?? undefined}
          placeholder="https://youtu.be/..."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <TextAreaField
          label="Ringkasan"
          name="excerpt"
          defaultValue={article?.excerpt}
          rows={2}
          hint="Tampil di daftar artikel."
        />
        <TextAreaField
          label="Isi Artikel"
          name="body"
          defaultValue={article?.body}
          rows={12}
          hint="Pisahkan paragraf dengan baris kosong (Enter dua kali)."
        />
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={article?.featured}
            className="h-4 w-4 rounded border-ink/20 text-brand-red focus:ring-brand-red/30"
          />
          Tampilkan sebagai artikel unggulan
        </label>

        <label className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={article?.published ?? false}
            className="h-4 w-4 rounded border-ink/20 text-brand-red focus:ring-brand-red/30"
          />
          Publikasikan (tampil di halaman Tips &amp; Kredit)
        </label>
      </section>

      <SubmitButton label={article ? "Simpan Perubahan" : "Tambah Artikel"} />
    </form>
  );
}
