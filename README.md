# İMEKOLAY - Okul Yönetim Sistemi

Modern okul yönetim sistemi - öğretmenler, okul yöneticileri ve satıcılar için kapsamlı platform.

## 🚀 Özellikler

### Öğretmen Paneli
- Öğrenci listesi yönetimi
- Devam durumu takibi
- Mesajlaşma sistemi
- Ziyaret planlama
- Koordinasyon formları

### Okul Yöneticisi Paneli
- Okul genel yönetimi
- Öğretmen koordinasyonu
- Raporlama sistemi

### Satıcı Paneli
- Okul tanımlama ve yönetimi
- Kurum kodu ve geçici şifre oluşturma
- Okul listesi görüntüleme

## 🛠️ Teknolojiler

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Veritabanı**: PostgreSQL, Prisma ORM
- **Kimlik Doğrulama**: JWT
- **UI Bileşenleri**: Lucide React Icons

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL
- npm veya yarn

### Yerel Geliştirme

1. Repository'yi klonlayın:
```bash
git clone https://github.com/mkazan46/imekolayv2.git
cd imekolayv2
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ları ayarlayın:
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

4. Veritabanını hazırlayın:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Geliştirme sunucularını başlatın:
```bash
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

## 🚀 Deployment

### Vercel Deployment

1. [Vercel](https://vercel.com)'da hesap oluşturun
2. GitHub repository'sini bağlayın
3. Environment variables'ları ekleyin:
   - `DATABASE_URL`: Production veritabanı URL'i
   - `JWT_SECRET`: Güvenli JWT secret
   - `NODE_ENV`: `production`

4. Build ayarları:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`

### Production Veritabanı

Önerilen servisler:
- [PlanetScale](https://planetscale.com)
- [Railway](https://railway.app)
- [Supabase](https://supabase.com)

## 👥 Kullanıcı Rolleri

### Test Kullanıcıları

**Öğretmen:**
- Email: `teacher@test.com`
- Şifre: `123456`

**Okul Yöneticisi:**
- Email: `admin@test.com`
- Şifre: `123456`

**Satıcı:**
- Email: `vendor@test.com`
- Şifre: `123456`

## 📱 Kullanım

### Satıcı İşlemleri
1. `/satici` sayfasından giriş yapın
2. "Okul Tanımlama" sekmesine gidin
3. "Yeni Okul Ekle" ile okul ekleyin
4. Oluşturulan kurum kodu ve geçici şifreyi okul yöneticisine iletin

### Okul Yöneticisi Girişi
1. `/okul-giris` sayfasına gidin
2. Kurum kodu, email ve geçici şifre ile giriş yapın

## 🔧 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/login` - Öğretmen/Yönetici girişi
- `POST /api/auth/vendor-login` - Satıcı girişi
- `POST /api/auth/school-login` - Okul yöneticisi girişi

### Okul Yönetimi
- `GET /api/schools` - Okul listesi
- `POST /api/schools` - Yeni okul ekleme
- `GET /api/schools/:id` - Okul detayları

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje sahibi: [mkazan46](https://github.com/mkazan46)

---

**İMEKOLAY** - Modern eğitim yönetimi için tasarlandı 🎓