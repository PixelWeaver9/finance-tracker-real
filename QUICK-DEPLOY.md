# 🚀 Quick Deploy ke Vercel

## Step 1: Setup Database (5 menit)

### Pilih Supabase (Paling Gampang)

1. Buka https://supabase.com
2. Sign up (gratis)
3. Click "New Project"
4. Isi:
   - Name: `finance-tracker`
   - Database Password: (bikin password kuat)
   - Region: Singapore (paling deket)
5. Tunggu ~2 menit
6. Buka Settings > Database > Connection String > URI
7. Copy connection string (format: `postgresql://postgres.xxx:password@xxx.supabase.co:5432/postgres`)

## Step 2: Push ke GitHub (3 menit)

```bash
cd finance-tracker-next

# Init git (kalau belum)
git init
git add .
git commit -m "Ready for deployment"

# Create repo di GitHub, terus:
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy ke Vercel (5 menit)

1. Buka https://vercel.com
2. Sign up dengan GitHub
3. Click "Add New..." > "Project"
4. Import repository yang tadi dibuat
5. Configure Project:
   - Framework Preset: **Next.js** (auto-detect)
   - Root Directory: `./` (default)
   - Build Command: (biarkan default, udah di-set di package.json)

6. **Environment Variables** - Click "Add" untuk setiap variable:

   ```
   DATABASE_URL
   postgresql://postgres.xxx:password@xxx.supabase.co:5432/postgres
   ```

   ```
   AUTH_SECRET
   (generate random string - lihat cara di bawah)
   ```

   ```
   NEXTAUTH_URL
   https://your-project-name.vercel.app
   ```

7. Click **Deploy**
8. Tunggu ~2-3 menit

### Generate AUTH_SECRET

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Atau pakai online generator:**
https://generate-secret.vercel.app/32

## Step 4: Run Database Migration

Setelah deploy berhasil:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link ke project
cd finance-tracker-next
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migration
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

## Step 5: Setup Custom Domain (Optional)

1. Di Vercel Dashboard > Settings > Domains
2. Add domain: `finance.yourdomain.com`
3. Vercel kasih DNS record:
   ```
   Type: CNAME
   Name: finance
   Value: cname.vercel-dns.com
   ```
4. Tambahkan di DNS provider kamu (Cloudflare/Namecheap/dll)
5. Tunggu ~10-30 menit
6. Update `NEXTAUTH_URL` di Vercel environment variables ke domain baru
7. Redeploy (Vercel Dashboard > Deployments > ... > Redeploy)

## ✅ Done!

Aplikasi kamu sekarang live di:
- Vercel URL: `https://your-project-name.vercel.app`
- Custom domain: `https://finance.yourdomain.com` (kalau udah setup)

## 🔄 Auto Deploy

Setiap kali push ke GitHub, Vercel otomatis deploy:

```bash
git add .
git commit -m "Update feature"
git push
```

## 🐛 Troubleshooting

### Build Failed
- Check Vercel logs: Dashboard > Deployments > [latest] > Building
- Pastikan `DATABASE_URL` format benar

### Can't Login
- Pastikan `NEXTAUTH_URL` sesuai dengan domain production
- Clear browser cookies
- Check Vercel logs: Dashboard > Deployments > [latest] > Functions

### Database Connection Error
- Supabase: Settings > Database > Connection Pooling > Enable
- Gunakan connection string dengan port 6543 (pooling)
- Whitelist IP: 0.0.0.0/0 di Supabase

## 📊 Monitoring

- **Analytics**: Vercel Dashboard > Analytics
- **Logs**: Vercel Dashboard > Logs
- **Performance**: Vercel Dashboard > Speed Insights

## 🚀 Deploy ML Service (Optional)

Kalau mau deploy ML service juga, baca `DEPLOYMENT.md` untuk detail lengkap.

Quick option: Deploy ke Railway
1. https://railway.app
2. New Project > Deploy from GitHub
3. Select `finance-tracker-ml` folder
4. Add environment variable `PORT=3001`
5. Deploy
6. Copy URL, update `ML_SERVICE_URL` di Vercel
