import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { updateTestimonialAction } from "@/lib/actions/testimonials";
import { getTestimonialById } from "@/lib/supabase/queries";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Testimoni",
};

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) notFound();

  const boundAction = updateTestimonialAction.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Testimoni
      </Link>

      <h1 className="mt-3 line-clamp-1 font-display text-2xl font-extrabold text-ink">
        {testimonial.customerName}
      </h1>

      <div className="mt-6 max-w-3xl">
        <TestimonialForm action={boundAction} testimonial={testimonial} />
      </div>
    </div>
  );
}
