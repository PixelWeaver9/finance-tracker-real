# Deployment Guide - Finance Tracker

## Deploy ke Vercel

### 1. Persiapan Database (Pilih salah satu)

#### Option A: Supabase (Recommended - Free tier bagus)
1. Buat akun di [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string dari Settings > Database
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option B: Neon (Serverless PostgreSQL)
1. Buat akun di [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

#### Option C: Railway
1. Buat akun di [railway.app](https://railway.app)
2. New Project > Add PostgreSQL
3. Copy connection string

### 2. Setup Vercel

#### A. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

#### B. Deploy via Vercel Dashboard (Lebih Mudah)

1. **Push ke GitHub**
   ```bash
   cd finance-tracker-next
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/finance-tracker.git
   git push -u origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Sign up dengan GitHub
   - Click "Add New Project"
   - Import repository kamu
   - Framework Preset: Next.js (auto-detect)

3. **Environment Variables**
   
   Tambahkan di Vercel Dashboard > Settings > Environment Variables:
   
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   AUTH_SECRET=generate-random-string-32-chars
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```
   
   Generate AUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Tunggu build selesai (~2-3 menit)
   - Vercel akan kasih URL: `https://your-app.vercel.app`

### 3. Setup Custom Domain

1. Di Vercel Dashboard > Settings > Domains
2. Add domain kamu (contoh: `finance.yourdomain.com`)
3. Vercel akan kasih DNS records yang perlu ditambahkan:
   ```
   Type: CNAME
   Name: finance (atau @)
   Value: cname.vercel-dns.com
   ```
4. Tambahkan DNS record di domain provider kamu (Cloudflare, Namecheap, dll)
5. Tunggu propagasi DNS (~5-30 menit)
6. SSL otomatis aktif dari Vercel

### 4. Run Database Migration

Setelah deploy, jalankan migration:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration via Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

Atau via Vercel Dashboard:
- Settings > Functions > Add Command
- Command: `npx prisma migrate deploy`

### 5. Deploy ML Service (Optional)

#### Option A: Railway
1. Buka [railway.app](https://railway.app)
2. New Project > Deploy from GitHub
3. Pilih folder `finance-tracker-ml`
4. Add environment variables jika perlu
5. Railway akan kasih URL: `https://your-ml-service.railway.app`
6. Update `ML_SERVICE_URL` di Vercel environment variables

#### Option B: Render
1. Buka [render.com](https://render.com)
2. New Web Service
3. Connect repository
4. Root Directory: `finance-tracker-ml`
5. Build Command: `npm install`
6. Start Command: `npm start`

### 6. Update Environment Variables

Setelah ML service deploy, update di Vercel:
```
ML_SERVICE_URL=https://your-ml-service.railway.app
```

### 7. Testing

1. Buka domain kamu
2. Test register/login
3. Test create transaction
4. Test ML prediction (jika sudah deploy ML service)

## Troubleshooting

### Build Error: Prisma
```bash
# Pastikan prisma generate di build command
vercel.json sudah include: "prisma generate && next build"
```

### Database Connection Error
- Pastikan DATABASE_URL format benar
- Cek IP whitelist di database provider (set ke 0.0.0.0/0 untuk Vercel)

### Auth Error
- Pastikan NEXTAUTH_URL sesuai dengan domain production
- AUTH_SECRET harus random dan aman

## Auto Deploy

Setiap push ke branch `main` akan otomatis trigger deploy di Vercel.

```bash
git add .
git commit -m "Update feature"
git push origin main
```

## Monitoring

- Vercel Dashboard > Analytics
- Vercel Dashboard > Logs (untuk debug)
- Vercel Dashboard > Speed Insights

## Rollback

Jika ada masalah:
1. Vercel Dashboard > Deployments
2. Pilih deployment sebelumnya
3. Click "Promote to Production"
