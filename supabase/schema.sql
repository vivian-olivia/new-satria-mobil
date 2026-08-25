-- New Satria Mobil — inventory schema
-- Run this in the Supabase SQL editor once you've created a project.
-- After running it, set NEXT_PUBLIC_SUPABASE_URL and
-- NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to switch the site from
-- local sample data to this table.

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  brand text not null,
  model text not null,
  variant text not null,
  year integer not null,
  price bigint not null,
  mileage_km integer not null,
  transmission text not null check (transmission in ('Automatic', 'Manual')),
  fuel_type text not null check (fuel_type in ('Bensin', 'Diesel', 'Hybrid')),
  color text not null,
  category_tags text[] not null default '{}',
  status text not null default 'Tersedia' check (status in ('Tersedia', 'Terjual', 'Booking')),
  featured boolean not null default false,
  images text[] not null default '{}',
  description text not null default '',
  highlights text[] not null default '{}',
  location text not null default 'Showroom Surabaya',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_category_tags_idx on vehicles using gin (category_tags);
create index if not exists vehicles_status_idx on vehicles (status);
create index if not exists vehicles_featured_idx on vehicles (featured);

alter table vehicles enable row level security;

-- Public read access (inventory is public marketing data).
create policy "Public can read vehicles"
  on vehicles for select
  using (true);

-- Any authenticated Supabase user can manage inventory. This is the admin
-- dashboard's authorization model: there's no separate roles table, so
-- creating a login (Authentication -> Users -> Add User, in the Supabase
-- dashboard) is what grants admin access at /admin.
create policy "Authenticated users can insert vehicles"
  on vehicles for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update vehicles"
  on vehicles for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete vehicles"
  on vehicles for delete
  to authenticated
  using (true);
