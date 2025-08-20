# 🚀 İMEKOLAY Otomatik Deployment Kurulumu

## 1. İlk Kurulum (Sadece Bir Kez)

### Vercel CLI Kurulumu
```bash
npm install -g vercel
```

### Vercel'e Login
```bash
vercel login
```

### İlk Deployment
```bash
vercel --prod
```

## 2. Otomatik Deployment Kullanımı

Artık her değişiklikten sonra sadece şu komutu çalıştırın:

```bash
npm run deploy
```

Bu komut otomatik olarak:
- ✅ Değişiklikleri Git'e commit eder
- ✅ GitHub'a push eder
- ✅ Vercel'e deploy eder

## 3. GitHub Actions (Opsiyonel)

Tamamen otomatik deployment için GitHub Actions kullanabilirsiniz:

1. GitHub repository'nizde **Settings > Secrets and variables > Actions**'a gidin

2. Şu secret'ları ekleyin:
   - `VERCEL_TOKEN`: Vercel hesabınızdan alın (https://vercel.com/account/tokens)
   - `ORG_ID`: Vercel dashboard'dan alın
   - `PROJECT_ID`: Vercel dashboard'dan alın

3. Artık `main` branch'e her push yaptığınızda otomatik deploy olacak!

## 4. Environment Variables

Vercel dashboard'da şu environment variables'ları ayarlayın:

```
DATABASE_URL=your-production-database-url
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 5. Hızlı Komutlar

```bash
# Sadece build test et
npm run build

# Local server başlat
npm run dev

# Veritabanı migration
npm run db:push

# Otomatik deployment
npm run deploy
```

---

**🎉 Artık her değişiklikten sonra sadece `npm run deploy` komutuyla projenizi canlıya alabilirsiniz!**