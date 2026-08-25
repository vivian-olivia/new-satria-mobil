import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-dim p-6">
        <div className="max-w-md rounded-2xl border border-ink/10 bg-white p-8 text-center">
          <h1 className="font-display text-xl font-bold text-ink">
            Supabase belum dikonfigurasi
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Dashboard admin butuh database untuk menyimpan data. Isi
            NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di
            .env.local, lalu jalankan supabase/schema.sql di Supabase SQL
            editor.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-paper-dim">
      <aside className="flex w-64 shrink-0 flex-col justify-between bg-ink p-4">
        <div>
          <div className="px-2 py-3">
            <Logo dark />
          </div>
          <div className="mt-6">
            <AdminSidebar />
          </div>
        </div>

        <div className="space-y-3 border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-white/40">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
