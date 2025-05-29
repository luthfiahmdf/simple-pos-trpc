# 🚀 Setup Project

Sebelum menjalankan proyek ini, Anda perlu **mendaftar akun di Clerk dan Supabase** untuk mendapatkan kredensial yang dibutuhkan.

## 🔐 Clerk Setup

1. Daftar akun di [https://clerk.com](https://clerk.com)
2. Buat aplikasi baru
3. Setelah aplikasi dibuat, dapatkan nilai berikut dari dashboard Clerk:

   * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   * `CLERK_SECRET_KEY`

Tambahkan ke dalam file `.env`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 📂 Supabase Setup

1. Daftar akun di [https://supabase.com](https://supabase.com)
2. Buat project baru
3. Di dashboard Supabase, klik nama project Anda di topbar
4. Klik tombol **Connect** di kanan atas
5. Buka tab **ORMs**
6. Salin file .env.local  yang tersedia, dan masukkan ke dalam variabel di bawah ini
7. Jangan lupa mengganti `YOUR_PASSWORD` pada string tersebut dengan password database Anda (bisa dilihat di halaman **Project Settings > Database**)
8. Untuk Mendapatkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_ANON_KEY ,klik tombol **Connect** di kanan atas,buka tab App Frameworks lalu copy isi dari .env.local ke file .env anda
9. Untuk Mendapatkan SUPABASE_ROLE_KEY , buka halaman Project Setting, lalu buka tab API KEY ,copy isi dari service_role ke file .env anda
Tambahkan ke dalam file `.env`:

```env
# Connect to Supabase via connection pooling
DATABASE_URL=your_supabase_connection_pooling_url

# Direct connection to the database. Used for migrations
DIRECT_URL=your_supabase_direct_connection_url

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_ROLE_KEY=
```

>

## ▶️ Jalankan Project

Setelah semua variabel lingkungan diatur, jalankan perintah berikut:

```bash
npm install
npm run dev
```
