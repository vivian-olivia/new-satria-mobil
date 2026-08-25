"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/format";
import { articleCategories } from "@/lib/data/article-categories";

export type ArticleFormState = { error: string } | undefined;

// Owned by the static /tips/simulasi-kredit route — never allow an article
// to claim this slug, since a static route always wins over /tips/[slug].
const RESERVED_SLUGS = ["simulasi-kredit"];

function parseArticlePayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const youtubeUrlInput = String(formData.get("youtubeUrl") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (
    !title ||
    !excerpt ||
    !body ||
    !articleCategories.includes(category as (typeof articleCategories)[number])
  ) {
    return { ok: false, error: "Lengkapi semua field wajib dengan nilai yang valid." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { ok: false, error: "Judul/slug tidak valid." } as const;
  }
  if (RESERVED_SLUGS.includes(slug)) {
    return {
      ok: false,
      error: "Slug ini dipakai oleh halaman kalkulator, gunakan slug lain.",
    } as const;
  }

  return {
    ok: true,
    row: {
      slug,
      title,
      excerpt,
      body,
      cover_image: coverImage,
      youtube_url: youtubeUrlInput || null,
      category,
      featured,
      published,
    },
  } as const;
}

export async function createArticleAction(
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseArticlePayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("articles").insert(parsed.row);
  if (error) return { error: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/tips");
  redirect("/admin/articles");
}

export async function updateArticleAction(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseArticlePayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("articles").update(parsed.row).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/tips");
  revalidatePath(`/tips/${parsed.row.slug}`);
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("articles").delete().eq("id", id);

  revalidatePath("/admin/articles");
  revalidatePath("/tips");
}
