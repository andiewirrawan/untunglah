# Untunglah

Aplikasi web pencatatan transaksi dan laporan laba rugi untuk UMKM berbasis shift.

## Setup Lokal

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan environment variable

Copy file `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Lalu isi nilai berikut dari dashboard Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=isi_project_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi_anon_key_supabase
SUPABASE_SERVICE_ROLE_KEY=isi_service_role_key_supabase
SESSION_SECRET=isi_teks_rahasia_panjang
```

> `SUPABASE_SERVICE_ROLE_KEY` hanya dipakai di server untuk proses login. Jangan pernah menaruh key ini di kode frontend atau membagikannya ke publik.

### 3. Jalankan SQL setup di Supabase

Buka **Supabase Dashboard > SQL Editor > New query**.

Jangan paste nama file ini ke SQL Editor:

```sql
supabase/migrations/001_initial_auth.sql
```

Yang harus dipaste adalah **isi SQL di dalam file** `supabase/migrations/001_initial_auth.sql`.

Isi SQL-nya dimulai dari:

```sql
create extension if not exists "pgcrypto";
```

Cara paling mudah:

1. Buka file `supabase/migrations/001_initial_auth.sql` di editor kode.
2. Copy semua isi file tersebut.
3. Paste ke Supabase SQL Editor.
4. Klik **Run**.

SQL tersebut akan membuat tabel awal:

- `users`
- `audit_log`

Dan membuat akun Owner awal:

```text
username: owner
password: owner123
```

### 4. Jalankan aplikasi

```bash
npm run dev
```

Buka `http://localhost:3000/login`, lalu login dengan akun Owner awal di atas.

## Script

```bash
npm run dev
npm run build
npm run start
```
