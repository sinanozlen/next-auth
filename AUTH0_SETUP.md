# Auth0 Kurulum Rehberi

## 1. Auth0 Hesabı Oluşturma

1. [Auth0.com](https://auth0.com)'a gidin
2. "Sign Up" butonuna tıklayın
3. E-posta adresinizi ve şifrenizi girin
4. Hesabınızı doğrulayın

## 2. Yeni Uygulama Oluşturma

1. Auth0 Dashboard'a giriş yapın
2. Sol menüden "Applications" seçin
3. "Create Application" butonuna tıklayın
4. Uygulama adını girin: `next-auth-app`
5. Application Type olarak "Single Page Application" seçin
6. "Create" butonuna tıklayın

## 3. Uygulama Ayarları

### Settings Sekmesinde:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback/auth0
```

**Allowed Logout URLs:**
```
http://localhost:3000
```

**Allowed Web Origins:**
```
http://localhost:3000
```

**Allowed Origins (CORS):**
```
http://localhost:3000
```

## 4. Gerekli Bilgileri Alma

Settings sekmesinden şu bilgileri kopyalayın:

- **Domain**: `your-tenant.auth0.com`
- **Client ID**: `your-client-id`
- **Client Secret**: `your-client-secret`

## 5. .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
```

## 6. Secret Değerleri Oluşturma

Terminal'de şu komutları çalıştırın:

```bash
# Windows PowerShell için:
openssl rand -hex 32

# Veya online generator kullanın:
# https://generate-secret.vercel.app/32
```

## 7. Test Etme

1. `.env.local` dosyasını oluşturduktan sonra
2. Geliştirme sunucusunu yeniden başlatın: `npm run dev`
3. `http://localhost:3000` adresine gidin
4. Login sayfasını test edin

## 8. Sorun Giderme

### Yaygın Hatalar:

1. **"Invalid redirect_uri" hatası**
   - Auth0 Settings'de callback URL'yi kontrol edin

2. **"Invalid client" hatası**
   - Client ID ve Client Secret'ı kontrol edin

3. **"Invalid issuer" hatası**
   - AUTH0_ISSUER_BASE_URL'yi kontrol edin

## 9. Production Ayarları

Production için şu URL'leri ekleyin:

**Allowed Callback URLs:**
```
https://your-domain.com/api/auth/callback/auth0
```

**Allowed Logout URLs:**
```
https://your-domain.com
```

**Allowed Web Origins:**
```
https://your-domain.com
```

## 10. Güvenlik Notları

- `.env.local` dosyasını asla Git'e commit etmeyin
- Production'da güçlü secret değerleri kullanın
- HTTPS kullanın
- Auth0 Rules ve Hooks ile ek güvenlik katmanları ekleyin 