"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TestimonialFormState = { error: string } | undefined;

function parseTestimonialPayload(formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const vehiclePurchased = String(formData.get("vehiclePurchased") ?? "").trim() || null;
  const rating = Number(formData.get("rating") ?? 5);
  const quote = String(formData.get("quote") ?? "").trim();
  const photoUrl = String(formData.get("photoUrl") ?? "").trim() || null;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!customerName || !quote || !Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Lengkapi semua field wajib dengan nilai yang valid." } as const;
  }

  return {
    ok: true,
    row: {
      customer_name: customerName,
      vehicle_purchased: vehiclePurchased,
      rating,
      quote,
      photo_url: photoUrl,
      featured,
      published,
    },
  } as const;
}

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseTestimonialPayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("testimonials").insert(parsed.row);
  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseTestimonialPayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("testimonials").update(parsed.row).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("testimonials").delete().eq("id", id);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
