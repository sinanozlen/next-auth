# Next.js + Auth0 + NextAuth.js Kimlik Doğrulama Sistemi

## 🎯 Proje Özeti
Auth0 üzerinden kullanıcı girişinin yapıldığı, JWT tabanlı oturum kontrolü ile sayfa erişimi kısıtlanan, rol bazlı yetkilendirme sistemi ile SOLID prensiplerine ve 12Factor ilkelerine uygun, Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi.

## 🛠️ Teknolojiler & Araçlar
- **Next.js 14** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Kimlik doğrulama)
- **JWT** (JSON Web Token)
- **TypeScript**
- **TailwindCSS**
- **Git / GitHub**

## ✨ Özellikler

### 🔐 Kimlik Doğrulama
- ✅ Auth0 ile OAuth2 entegrasyonu
- ✅ JWT tabanlı oturum yönetimi
- ✅ Otomatik kullanıcı kaydı
- ✅ Güvenli çıkış işlemi

### 👥 Rol Bazlı Yetkilendirme
- ✅ **Admin** rolü: Tam yetki, kullanıcı listesi görüntüleme
- ✅ **User** rolü: Sınırlı erişim
- ✅ Dinamik UI kontrolü
- ✅ API seviyesinde yetkilendirme

### 🗄️ Veritabanı
- ✅ JWT tabanlı oturum yönetimi
- ✅ Auth0 kullanıcı bilgileri
- ✅ Otomatik oturum kontrolü

### 🛡️ Güvenlik
- ✅ Middleware ile sayfa koruması
- ✅ API endpoint güvenliği
- ✅ Environment değişkenleri
- ✅ TypeScript tip güvenliği

## 🚀 Hızlı Başlangıç

### 1. Kurulum
```bash
# Repository'yi klonlayın
git clone <repository-url>
cd next-auth

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp env.example .env.local
```

### 2. Auth0 Kurulumu
1. [Auth0 Dashboard](https://manage.auth0.com)'a gidin
2. Yeni uygulama oluşturun (Single Page Application)
3. Callback URL: `http://localhost:3000/api/auth/callback/auth0`
4. Logout URL: `http://localhost:3000`
5. Web Origins: `http://localhost:3000`



### 3. Environment Değişkenleri
```env
# Auth0 Configuration
AUTH0_SECRET='your-32-byte-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-32-byte-secret'
```

### 4. Çalıştırma
```bash
npm run dev
```

## 👥 Test Kullanıcıları

### Admin Kullanıcısı
- **Email**: `admin@test.com`
- **Şifre**: `Admin123!`
- **Rol**: Admin
- **Yetkiler**: Tüm kullanıcıları görüntüleme, tam erişim

### Normal Kullanıcı
- **Email**: `user@test.com`
- **Şifre**: `User123!`
- **Rol**: User
- **Yetkiler**: Sınırlı erişim

## 📁 Proje Yapısı
```
next-auth/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── test/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts
│   │   └── middleware.ts
│   └── types/
├── public/
├── .env.example
├── .env.local
└── package.json
```

## 🔧 API Endpoints

### Kimlik Doğrulama
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

## 🛡️ Güvenlik Özellikleri

### Middleware Koruması
- `/dashboard` - Kimlik doğrulama gerekli
- `/test` - Kimlik doğrulama gerekli

### Rol Bazlı Erişim
- **Admin**: Tüm sayfalara erişim
- **User**: Dashboard ve test sayfalarına erişim

## 📊 Oturum Yönetimi

### JWT Token Yapısı
```javascript
{
  user: {
    id: String,
    email: String,
    name: String,
    image: String,
    role: String
  },
  accessToken: String,
  expires: String
}
```

## 🧪 Test Etme

### 1. Test Sayfası
`http://localhost:3000/test` adresine gidin ve oturum bilgilerini kontrol edin.

### 2. Giriş Testi
1. Ana sayfaya gidin
2. "Auth0 ile Giriş Yap" butonuna tıklayın
3. Test kullanıcı bilgileriyle giriş yapın
4. Dashboard'da rol bazlı içeriği kontrol edin

### 3. Rol Testi
- **Admin**: Tüm sayfalara erişebilir
- **User**: Dashboard ve test sayfalarına erişebilir

## 📚 Dokümantasyon

- [Auth0 Kurulum Rehberi](AUTH0_SETUP.md)
- [Auth0 Alternatif Kurulum](AUTH0_ALTERNATIVE_SETUP.md)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Sorun Giderme

### Yaygın Sorunlar

1. **"Invalid redirect_uri" hatası**
   - Auth0 Settings'de callback URL'yi kontrol edin



3. **"OAuthSignin" hatası**
   - Auth0 yapılandırmasını kontrol edin
   - Client ID ve Secret'ı kontrol edin

### Destek

Sorun yaşıyorsanız:
1. [Issues](https://github.com/your-repo/next-auth/issues) bölümünde arayın
2. Yeni issue oluşturun
3. Detaylı hata mesajı ve adımları paylaşın