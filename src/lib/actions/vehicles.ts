"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/format";

export type VehicleFormState = { error: string } | undefined;

function linesToArray(raw: FormDataEntryValue | null) {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

const CONDITION_STATUSES = ["baik", "perlu-perhatian"] as const;

// Parses the "Area | Status | Catatan" per-line textarea into structured
// condition-checklist entries; unrecognized status text defaults to "baik".
function linesToConditionPoints(raw: FormDataEntryValue | null) {
  return linesToArray(raw).map((line) => {
    const [area = "", statusRaw = "", note = ""] = line.split("|").map((s) => s.trim());
    const status = CONDITION_STATUSES.includes(statusRaw as (typeof CONDITION_STATUSES)[number])
      ? (statusRaw as (typeof CONDITION_STATUSES)[number])
      : "baik";
    return { area, status, note };
  });
}

function parseVehiclePayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const variant = String(formData.get("variant") ?? "").trim();
  const year = Number(formData.get("year"));
  const price = Number(formData.get("price"));
  const mileageKm = Number(formData.get("mileageKm") ?? 0);
  const transmission = String(formData.get("transmission") ?? "");
  const fuelType = String(formData.get("fuelType") ?? "");
  const color = String(formData.get("color") ?? "").trim();
  const categoryTags = formData.getAll("categoryTags").map(String);
  const status = String(formData.get("status") ?? "Tersedia");
  const featured = formData.get("featured") === "on";
  const images = linesToArray(formData.get("images"));
  const description = String(formData.get("description") ?? "").trim();
  const highlights = linesToArray(formData.get("highlights"));
  const location = String(formData.get("location") ?? "").trim() || "Showroom Surabaya";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const seats = Number(formData.get("seats") ?? 5);
  const useCaseTags = formData.getAll("useCaseTags").map(String);
  const videoUrl = String(formData.get("videoUrl") ?? "").trim() || null;
  const tiktokUrl = String(formData.get("tiktokUrl") ?? "").trim() || null;
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim() || null;
  const conditionPoints = linesToConditionPoints(formData.get("conditionPoints"));

  if (
    !title ||
    !brand ||
    !model ||
    !variant ||
    !color ||
    !Number.isFinite(year) ||
    year <= 0 ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !transmission ||
    !fuelType
  ) {
    return { ok: false, error: "Lengkapi semua field wajib dengan nilai yang valid." } as const;
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { ok: false, error: "Judul/slug tidak valid." } as const;
  }

  return {
    ok: true,
    row: {
      slug,
      title,
      brand,
      model,
      variant,
      year,
      price,
      mileage_km: Number.isFinite(mileageKm) ? mileageKm : 0,
      transmission,
      fuel_type: fuelType,
      color,
      category_tags: categoryTags,
      status,
      featured,
      images,
      description,
      highlights,
      location,
      seats: Number.isFinite(seats) && seats > 0 ? seats : 5,
      use_case_tags: useCaseTags,
      video_url: videoUrl,
      tiktok_url: tiktokUrl,
      instagram_url: instagramUrl,
      condition_points: conditionPoints,
    },
  } as const;
}

export async function createVehicleAction(
  _prevState: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseVehiclePayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("vehicles").insert(parsed.row);
  if (error) return { error: error.message };

  revalidatePath("/admin/vehicles");
  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/admin/vehicles");
}

export async function updateVehicleAction(
  id: string,
  _prevState: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid, silakan login ulang." };

  const parsed = parseVehiclePayload(formData);
  if (!parsed.ok) return { error: parsed.error };

  const { error } = await supabase.from("vehicles").update(parsed.row).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/vehicles");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${parsed.row.slug}`);
  revalidatePath("/");
  redirect("/admin/vehicles");
}

export async function deleteVehicleAction(id: string) {
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("vehicles").delete().eq("id", id);

  revalidatePath("/admin/vehicles");
  revalidatePath("/katalog");
  revalidatePath("/");
}
