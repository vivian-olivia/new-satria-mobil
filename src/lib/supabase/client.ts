import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Returns null when Supabase env vars aren't set, so the rest of the app
 * can fall back to local seed data (see src/lib/supabase/queries.ts).
 * See README.md for how to connect a real Supabase project.
 *
 * Uses the SSR-aware browser client (cookie-based session) so the admin
 * login state is visible to Server Components and Server Actions too —
 * see src/lib/supabase/server.ts.
 */
export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
