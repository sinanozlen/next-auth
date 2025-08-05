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
- [ ] Branch oluştur: `dev/v1.0.0`
- [ ] Tüm geliştirmeleri bu branch'te saatlik veya günlük olarak yap

### 2. Auth0 Kurulumu
- [ ] Auth0 hesabı oluştur
- [ ] Yeni uygulama oluştur (Single Page Application)
- [ ] Callback URL'leri yapılandır
- [ ] Auth0 domain ve client bilgilerini al

### 3. NextAuth Entegrasyonu
- [ ] NextAuth.js kurulumu
- [ ] Auth0 provider konfigürasyonu
- [ ] JWT stratejisi yapılandırması
- [ ] Session yönetimi

### 4. Middleware ile Sayfa Koruma
- [ ] Next.js middleware oluşturma
- [ ] JWT token doğrulama
- [ ] Korumalı sayfa yönlendirmeleri
- [ ] Public/private route yapılandırması

### 5. Kod Kalitesi & SOLID
- [ ] SOLID prensiplerine uygun kod yapısı
- [ ] TypeScript tip güvenliği
- [ ] Clean code prensipleri
- [ ] Error handling

### 6. 12Factor App Uyum Kontrolü
- [ ] I. Codebase - Tek kod tabanı
- [ ] II. Dependencies - Bağımlılık yönetimi
- [ ] III. Config - Ortam değişkenleri
- [ ] IV. Backing services - Harici servisler
- [ ] V. Build, release, run - Ayrım
- [ ] VI. Processes - Stateless işlemler
- [ ] VII. Port binding - Port bağlama
- [ ] VIII. Concurrency - Eşzamanlılık
- [ ] IX. Disposability - Geçicilik
- [ ] X. Dev/prod parity - Geliştirme/üretim eşitliği
- [ ] XI. Logs - Log yönetimi
- [ ] XII. Admin processes - Yönetim işlemleri

### 7. Test & Validasyon
- [ ] Unit testler
- [ ] Integration testler
- [ ] E2E testler
- [ ] Güvenlik testleri

## Bonus Özellikler
- [ ] Rol bazlı yetkilendirme (admin, user) yapısı
- [ ] Docker konfigürasyonu
- [ ] CI/CD pipeline

## Deployment
- [ ] `prod/v1.0.0` branch'ine pull request aç
- [ ] Merge işlemi
- [ ] Production deployment

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
│   │   │   └── auth/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts
│   │   └── middleware.ts
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
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Database (opsiyonel)
DATABASE_URL=
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