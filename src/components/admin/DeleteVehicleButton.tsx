"use client";

import { Trash } from "@phosphor-icons/react/dist/ssr";
import { deleteVehicleAction } from "@/lib/actions/vehicles";

export function DeleteVehicleButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteVehicleAction.bind(null, id)}
      onSubmit={(e) => {
        if (!window.confirm(`Hapus "${title}"? Tindakan ini tidak bisa dibatalkan.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label={`Hapus ${title}`}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-brand-red-soft hover:text-brand-red"
      >
        <Trash size={16} />
      </button>
    </form>
  );
}
