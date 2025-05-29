# 🚀 Setup Project

Sebelum menjalankan proyek ini, Anda perlu **mendaftar akun di Clerk dan Supabase** untuk mendapatkan kredensial yang dibutuhkan.

## 🔐 Clerk Setup

1. Daftar akun di [https://clerk.com](https://clerk.com)
2. Buat aplikasi baru
3. Setelah aplikasi dibuat, dapatkan nilai berikut dari dashboard Clerk:

   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

Tambahkan ke dalam file `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 📂 Supabase Setup

1. Daftar akun di [https://supabase.com](https://supabase.com)
2. Buat project baru
3. Masuk ke halaman **Project Settings > Database**
4. Salin URL connection pooling untuk `DATABASE_URL`
5. Salin direct database URL untuk `DIRECT_URL`

Tambahkan ke dalam file `.env.local`:

```env
# Connect to Supabase via connection pooling
DATABASE_URL=your_supabase_connection_pooling_url

# Direct connection to the database. Used for migrations
DIRECT_URL=your_supabase_direct_connection_url
```

## ▶️ Jalankan Project

Setelah semua variabel lingkungan diatur, jalankan perintah berikut:

```bash
npm install
npm run dev
```
