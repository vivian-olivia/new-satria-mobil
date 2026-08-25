"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CarProfile } from "@phosphor-icons/react/dist/ssr";
import { supabase } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase belum dikonfigurasi.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError("Email atau password salah.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-soft p-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-white">
            <CarProfile weight="fill" size={22} />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold text-white">
              <span className="text-brand-red-light">NEW SATRIA</span> MOBIL
            </p>
            <p className="text-xs text-white/40">Admin Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-white/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              placeholder="admin@newsatriamobil.id"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-semibold text-white/60">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-brand-red-soft">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-brand-red text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
