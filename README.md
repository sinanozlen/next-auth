# Next.js + Auth0 + NextAuth.js Kimlik Doğrulama Sistemi

## Proje Özeti
Auth0 üzerinden kullanıcı girişinin yapıldığı, JWT tabanlı oturum kontrolü ile sayfa erişimi kısıtlanan, SOLID prensiplerine ve 12Factor ilkelerine uygun, Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi.

## 🚀 Özellikler

- ✅ **Auth0 OAuth Entegrasyonu** - Güvenli kimlik doğrulama
- ✅ **JWT Token Yönetimi** - Oturum kontrolü
- ✅ **Middleware Koruması** - Sayfa erişim kontrolü
- ✅ **TypeScript Desteği** - Tip güvenliği
- ✅ **TailwindCSS** - Modern UI tasarımı
- ✅ **Responsive Tasarım** - Mobil uyumlu
- ✅ **Session Yönetimi** - Oturum durumu kontrolü

## 🛠️ Teknolojiler

- **Next.js 14** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Kimlik doğrulama)
- **JWT** (JSON Web Token)
- **TypeScript**
- **TailwindCSS**

## 📋 Kurulum

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/sinanozlen/next-auth.git
cd next-auth
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Auth0 Konfigürasyonu

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir uygulama oluşturun (Single Page Application)
3. Settings'de şu URL'leri ekleyin:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback/auth0`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

### 4. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── auth.ts
├── types/
│   └── next-auth.d.ts
└── middleware.ts
```

## 🔐 Kullanım

1. **Giriş Yapma**: `/login` sayfasından Auth0 ile giriş yapın
2. **Dashboard**: Başarılı girişten sonra `/dashboard` sayfasına yönlendirilirsiniz
3. **Çıkış Yapma**: Dashboard'daki "Çıkış Yap" butonunu kullanın

## 🛡️ Güvenlik

- JWT token tabanlı kimlik doğrulama
- Middleware ile sayfa koruması
- Auth0 güvenlik standartları
- HTTPS zorunluluğu (production)

## 🧪 Test

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Build test
npm run build

# Lint kontrolü
npm run lint
```

## 📝 Commit Mesajları

- `feat: Auth0 provider entegrasyonu`
- `feat: JWT middleware implementasyonu`
- `feat: Dashboard sayfası eklendi`
- `fix: Session yönetimi düzeltmeleri`
- `docs: README güncellemesi`

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🔗 Bağlantılar

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth0 Documentation](https://auth0.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)