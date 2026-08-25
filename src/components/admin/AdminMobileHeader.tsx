"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/Logo";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";

export function AdminMobileHeader({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-ink px-4 lg:hidden">
      <Logo dark />
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu admin"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
      >
        <List size={24} weight="bold" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex w-72 max-w-[80%] shrink-0 flex-col justify-between bg-ink p-4"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <div>
              <div className="flex items-center justify-between px-2 py-3">
                <Logo dark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu admin"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                >
                  <X size={22} weight="bold" />
                </button>
              </div>
              <div className="mt-6">
                <AdminSidebar />
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              <p className="truncate px-3 text-xs text-white/40">{userEmail}</p>
              <LogoutButton />
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup menu admin"
            onClick={() => setOpen(false)}
            className="flex-1 bg-ink/60 backdrop-blur-sm"
          />
        </div>
      )}
    </header>
  );
}
