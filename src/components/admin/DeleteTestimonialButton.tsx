"use client";

import { Trash } from "@phosphor-icons/react/dist/ssr";
import { deleteTestimonialAction } from "@/lib/actions/testimonials";

export function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteTestimonialAction.bind(null, id)}
      onSubmit={(e) => {
        if (!window.confirm(`Hapus testimoni dari "${name}"? Tindakan ini tidak bisa dibatalkan.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label={`Hapus testimoni ${name}`}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-brand-red-soft hover:text-brand-red"
      >
        <Trash size={16} />
      </button>
    </form>
  );
}
