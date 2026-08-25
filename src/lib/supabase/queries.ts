import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  vehicles as localVehicles,
  getFeaturedVehicles as getLocalFeatured,
  getVehicleBySlug as getLocalBySlug,
  getRelatedVehicles as getLocalRelated,
} from "@/lib/data/vehicles";
import type { Vehicle } from "@/lib/types";

/**
 * Data access layer for vehicle inventory.
 *
 * When NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set
 * (see supabase/schema.sql for the table definition), these functions read
 * live from Supabase. Otherwise they transparently fall back to the local
 * sample data in src/lib/data/vehicles.ts, so the site works immediately
 * with zero setup.
 */

type VehicleRow = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage_km: number;
  transmission: Vehicle["transmission"];
  fuel_type: Vehicle["fuelType"];
  color: string;
  category_tags: Vehicle["categoryTags"];
  status: Vehicle["status"];
  featured: boolean;
  images: string[];
  description: string;
  highlights: string[];
  location: string;
};

function mapRow(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    model: row.model,
    variant: row.variant,
    year: row.year,
    price: row.price,
    mileageKm: row.mileage_km,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    color: row.color,
    categoryTags: row.category_tags,
    status: row.status,
    featured: row.featured,
    images: row.images,
    description: row.description,
    highlights: row.highlights,
    location: row.location,
  };
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getAllVehicles error, falling back to local data:", error.message);
      return localVehicles;
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return localVehicles;
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getFeaturedVehicles error, falling back to local data:", error.message);
      return getLocalFeatured();
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return getLocalFeatured();
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) {
      if (error) console.error("Supabase getVehicleBySlug error, falling back to local data:", error.message);
      return getLocalBySlug(slug);
    }
    return mapRow(data as VehicleRow);
  }
  return getLocalBySlug(slug);
}

/**
 * Admin-only lookup (by primary key, not slug). Requires Supabase — there's
 * no local-data fallback since the admin dashboard only makes sense against
 * a real database.
 */
export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  if (!isSupabaseConfigured || !supabase) return undefined;

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Supabase getVehicleById error:", error.message);
    return undefined;
  }
  return mapRow(data as VehicleRow);
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 3): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .neq("id", vehicle.id)
      .overlaps("category_tags", vehicle.categoryTags)
      .limit(limit);
    if (error) {
      console.error("Supabase getRelatedVehicles error, falling back to local data:", error.message);
      return getLocalRelated(vehicle, limit);
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return getLocalRelated(vehicle, limit);
}
