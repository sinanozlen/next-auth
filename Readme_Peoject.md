# Next.js + Auth0 + NextAuth.js Kimlik Doğrulama Sistemi

## Proje Özeti
Auth0 üzerinden kullanıcı girişinin yapıldığı, JWT tabanlı oturum kontrolü ile sayfa erişimi kısıtlanan, SOLID prensiplerine ve 12Factor ilkelerine uygun, Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi.

## Teknolojiler & Araçlar
- **Next.js 14** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Kimlik doğrulama)
- **JWT** (JSON Web Token)
- **TypeScript**
- **TailwindCSS** (Login Sayfası)
- **Git / GitHub** (dev/v1.0.0, prod/v1.0.0)
- **.env** ile yapılandırma (12 Factor Uygulaması)

## Görev Adımları

### 1. GitHub Repository Oluştur
- [x] `next-auth` adında public bir repo oluştur
- [x] Branch oluştur: `dev/v1.0.0`
- [x] Tüm geliştirmeleri bu branch'te saatlik veya günlük olarak yap

### 2. Auth0 Kurulumu
- [x] Auth0 hesabı oluştur
- [x] Yeni uygulama oluştur (Single Page Application)
- [x] Callback URL'leri yapılandır
- [x] Auth0 domain ve client bilgilerini al

### 3. NextAuth Entegrasyonu
- [x] NextAuth.js kurulumu
- [x] Auth0 provider konfigürasyonu
- [x] JWT stratejisi yapılandırması
- [x] Session yönetimi

### 4. Middleware ile Sayfa Koruma
- [x] Next.js middleware oluşturma
- [x] JWT token doğrulama
- [x] Korumalı sayfa yönlendirmeleri
- [x] Public/private route yapılandırması

### 5. Kod Kalitesi & SOLID
- [x] SOLID prensiplerine uygun kod yapısı
- [x] TypeScript tip güvenliği
- [x] Clean code prensipleri
- [x] Error handling

### 6. 12Factor App Uyum Kontrolü
- [x] I. Codebase - Tek kod tabanı
- [x] II. Dependencies - Bağımlılık yönetimi
- [x] III. Config - Ortam değişkenleri
- [x] IV. Backing services - Harici servisler
- [x] V. Build, release, run - Ayrım
- [x] VI. Processes - Stateless işlemler
- [x] VII. Port binding - Port bağlama
- [x] VIII. Concurrency - Eşzamanlılık
- [x] IX. Disposability - Geçicilik
- [x] X. Dev/prod parity - Geliştirme/üretim eşitliği
- [x] XI. Logs - Log yönetimi
- [x] XII. Admin processes - Yönetim işlemleri

### 7. Test & Validasyon
- [x] Unit testler
- [x] Integration testler
- [x] E2E testler
- [x] Güvenlik testleri

## Bonus Özellikler
- [x] Rol bazlı yetkilendirme (admin, user) yapısı
- [x] MongoDB entegrasyonu (hazır)
- [x] Docker konfigürasyonu (opsiyonel)
- [x] CI/CD pipeline (opsiyonel)

## Deployment
- [x] `prod/v1.0.0` branch'ine pull request aç
- [x] Merge işlemi
- [x] Production deployment

## Commit Mesajları
Açık, açıklamalı commit mesajları kullanılacak:
- `feat: Auth0 provider entegrasyonu`
- `feat: JWT middleware implementasyonu`
- `feat: Rol bazlı yetkilendirme sistemi`
- `fix: Session yönetimi düzeltmeleri`
- `docs: README güncellemesi`

## Proje Yapısı
```
next-auth/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   ├── users/
│   │   │   ├── admin/
│   │   │   └── test-db/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── test/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── mongodb.ts
│   │   └── middleware.ts
│   ├── models/
│   │   └── User.ts
│   └── types/
├── public/
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Ortam Değişkenleri (.env)
```env
# Auth0
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3001
AUTH0_ISSUER_BASE_URL=https://dev-abc123.us.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=

# Database (opsiyonel)
MONGODB_URI=mongodb://localhost:27017/next-auth-app
```

## Kurulum Adımları
1. Repository'yi klonla
2. `npm install` ile bağımlılıkları yükle
3. `.env.local` dosyasını oluştur ve gerekli değişkenleri ekle
4. `npm run dev` ile geliştirme sunucusunu başlat

## Geliştirme Kuralları
- Her özellik için ayrı branch oluştur
- Pull request'lerde code review yap
- Test coverage'ı %80'in üzerinde tut
- SOLID prensiplerine uygun kod yaz
- TypeScript strict mode kullan

## ✅ Tamamlanan Özellikler

### 🔐 Kimlik Doğrulama
- ✅ Auth0 OAuth2 entegrasyonu
- ✅ JWT tabanlı oturum yönetimi
- ✅ Güvenli giriş/çıkış işlemleri
- ✅ Session kontrolü

### 🛡️ Güvenlik
- ✅ Middleware ile sayfa koruması
- ✅ API endpoint güvenliği
- ✅ Environment değişkenleri
- ✅ TypeScript tip güvenliği

### 🎨 Kullanıcı Arayüzü
- ✅ Modern ve responsive tasarım
- ✅ TailwindCSS entegrasyonu
- ✅ Loading states
- ✅ Error handling

### 📱 Sayfalar
- ✅ Ana sayfa (giriş butonu)
- ✅ Login sayfası
- ✅ Dashboard (korumalı)
- ✅ Test sayfası

### 🔧 API Endpoints
- ✅ `/api/auth/[...nextauth]` - NextAuth.js
- ✅ `/api/users` - Kullanıcı listesi (Admin)
- ✅ `/api/admin/setup` - Test kullanıcıları
- ✅ `/api/test-db` - MongoDB test

## 🚀 Test Kullanıcısı
- **Email**: `test@gmail.com`
- **Şifre**: `151548pPo0s02=^.94`
- **Rol**: User (varsayılan)

## 📊 Proje Durumu
- **Tamamlanan**: %95
- **Kalan**: MongoDB entegrasyonu (opsiyonel)
- **Test**: ✅ Başarılı
- **Deployment**: Hazır 