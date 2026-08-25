import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonialAction } from "@/lib/actions/testimonials";

export const metadata: Metadata = {
  title: "Tambah Testimoni",
};

export default function NewTestimonialPage() {
  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Testimoni
      </Link>

      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink">Tambah Testimoni</h1>

      <div className="mt-6 max-w-3xl">
        <TestimonialForm action={createTestimonialAction} />
      </div>
    </div>
  );
}
