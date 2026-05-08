# 🗄️ Setup Database - Manual Steps

## Masalah:
Connection ke Supabase dari local machine gagal. Ini normal karena:
1. Supabase mungkin perlu whitelist IP
2. Special character di password perlu di-encode
3. Atau perlu pakai connection pooling

## ✅ Solusi: Setup Database via Vercel

### Option 1: Via Vercel CLI (Recommended)

**Buka PowerShell/Terminal sebagai Administrator:**

```powershell
# Install Vercel CLI (run as Administrator)
npm install -g vercel

# Login ke Vercel
vercel login

# Masuk ke folder project
cd C:\laragon\www\finance-tracker-next

# Link ke project
vercel link

# Pull environment variables dari Vercel
vercel env pull .env.local

# Run migration
npx prisma migrate deploy

# Seed database (optional - isi data awal)
npx prisma db seed
```

---

### Option 2: Via Supabase SQL Editor (Paling Gampang!)

1. **Buka Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih project**: `finance-tracker`
3. **Sidebar kiri** → Click **"SQL Editor"**
4. **Click "New query"**
5. **Copy paste SQL di bawah ini:**

```sql
-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP(3),
    image TEXT,
    password TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Account table
CREATE TABLE IF NOT EXISTS "Account" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Session table
CREATE TABLE IF NOT EXISTS "Session" (
    id TEXT PRIMARY KEY,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP(3) NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Create Transaction table
CREATE TABLE IF NOT EXISTS "Transaction" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP(3) NOT NULL,
    confidence DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"(email);
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"(provider, "providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE INDEX IF NOT EXISTS "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_date_idx" ON "Transaction"(date);
CREATE INDEX IF NOT EXISTS "Transaction_type_idx" ON "Transaction"(type);

-- Success message
SELECT 'Database schema created successfully!' as message;
```

6. **Click "Run"** (atau tekan F5)
7. **Tunggu sampai selesai** (ada notifikasi "Success")

---

### Option 3: Fix Connection String

Kalau mau coba dari local lagi, coba pakai **Connection Pooling**:

1. **Buka Supabase Dashboard**
2. **Settings** → **Database**
3. **Connection Pooling** → **Enable**
4. **Copy connection string** dengan port **6543** (bukan 5432)
5. Update di Vercel environment variables

Format baru:
```
postgresql://postgres:_B.wj7MxBeQ%25d%2CM@db.xodypyymccvsebruzkeu.supabase.co:6543/postgres?pgbouncer=true
```

---

## ✅ Setelah Database Setup

### Test Aplikasi:

1. **Buka URL Vercel**: https://finance-tracker-real-n4pvu71ff-xiongdiii13-4169s-projects.vercel.app
2. **Click "Register"**
3. **Bikin akun baru**:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. **Login**
5. **Coba tambah transaksi**

### Kalau Ada Error:

**Error: "Can't reach database"**
- Cek connection string di Vercel environment variables
- Pastikan tidak ada typo
- Coba pakai connection pooling (port 6543)

**Error: "Table doesn't exist"**
- Database schema belum dibuat
- Jalankan SQL di Supabase SQL Editor (Option 2)

**Error: "Invalid credentials"**
- NEXTAUTH_URL belum di-update
- Update di Vercel Settings → Environment Variables
- Redeploy

---

## 🎯 Recommended: Option 2 (SQL Editor)

Paling gampang dan pasti work:
1. Buka Supabase SQL Editor
2. Copy paste SQL di atas
3. Run
4. Done!

Setelah itu langsung test aplikasi di URL Vercel.

---

## 📞 Butuh Bantuan?

Kasih tau gua:
- Screenshot error (kalau ada)
- Step mana yang stuck
- Hasil dari SQL query (kalau pakai Option 2)
