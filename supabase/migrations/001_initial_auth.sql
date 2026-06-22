create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  username text not null unique,
  password_hash text not null,
  role text not null check (role in ('kasir', 'spv', 'owner')),
  status text not null default 'aktif' check (status in ('aktif', 'nonaktif')),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid,
  action text not null,
  data_lama jsonb,
  data_baru jsonb,
  user_id uuid references public.users(id),
  role text check (role in ('kasir', 'spv', 'owner')),
  timestamp timestamptz not null default now()
);

create index if not exists users_username_idx on public.users(username);
create index if not exists users_role_idx on public.users(role);
create index if not exists users_status_idx on public.users(status);
create index if not exists audit_log_user_id_idx on public.audit_log(user_id);
create index if not exists audit_log_timestamp_idx on public.audit_log(timestamp);

insert into public.users (nama, username, password_hash, role, status)
values
  ('Owner Untunglah', 'owner', '43a0d17178a9d26c9e0fe9a74b0b45e38d32f27aed887a008a54bf6e033bf7b9', 'owner', 'aktif')
on conflict (username) do nothing;
