# Auth0 Kurulum Rehberi

Bu rehber, Next.js projenizde Auth0 entegrasyonunu tamamlamak için gerekli adımları içerir.

## 1. Auth0 Hesabı Oluşturma

1. [Auth0 Dashboard](https://auth0.com/) adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni bir tenant (kiracı) oluşturun

## 2. Auth0 Application Oluşturma

1. Auth0 Dashboard'da **Applications** > **Applications** bölümüne gidin
2. **+ Create Application** butonuna tıklayın
3. Application adını girin (örn: "Next.js App")
4. **Single Page Application** seçin
5. **Create** butonuna tıklayın

## 3. Auth0 Application Ayarları

### Settings Sekmesi:
- **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback/auth0`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`
- **Allowed Origins (CORS)**: `http://localhost:3000`

### Advanced Settings > OAuth:
- **JsonWebToken Signature Algorithm**: `RS256`
- **OIDC Conformant**: `Enabled`

## 4. Environment Variables

Proje kök dizininde `.env.local` dosyası oluşturun:

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

# MongoDB Configuration (opsiyonel)
MONGODB_URI='mongodb://localhost:27017/next-auth-app'
```

### Değerleri Nereden Alacağınız:

1. **AUTH0_ISSUER_BASE_URL**: Auth0 Dashboard > Applications > Your App > Settings > Domain
2. **AUTH0_CLIENT_ID**: Auth0 Dashboard > Applications > Your App > Settings > Client ID
3. **AUTH0_CLIENT_SECRET**: Auth0 Dashboard > Applications > Your App > Settings > Client Secret

### Secret Değerleri Oluşturma:

Terminal'de şu komutu çalıştırın:
```bash
openssl rand -hex 32
```

Bu komutun çıktısını hem `AUTH0_SECRET` hem de `NEXTAUTH_SECRET` için kullanın.

## 5. Test Kullanıcısı Oluşturma

1. Auth0 Dashboard > **User Management** > **Users**
2. **+ Create User** butonuna tıklayın
3. Kullanıcı bilgilerini girin:
   - **Email**: test@gmail.com
   - **Password**: 151548pPo0s02=^.94
   - **Connection**: Username-Password-Authentication

## 6. Projeyi Çalıştırma

```bash
npm run dev
```

## 7. Test Etme

1. `http://localhost:3000` adresine gidin
2. "Auth0 ile Giriş Yap" butonuna tıklayın
3. Auth0 login sayfasına yönlendirileceksiniz
4. Test kullanıcısı bilgileriyle giriş yapın
5. Başarılı girişten sonra dashboard'a yönlendirileceksiniz

## 8. Sorun Giderme

### "only valid absolute URLs can be requested" Hatası

Bu hata genellikle şu sebeplerden kaynaklanır:

1. **AUTH0_ISSUER_BASE_URL yanlış format**: `https://` ile başlamalı
2. **Environment variables eksik**: Tüm gerekli değişkenlerin tanımlı olduğundan emin olun
3. **Auth0 Application ayarları**: Callback URL'lerin doğru olduğundan emin olun

### Test Sayfası

`http://localhost:3000/test` adresine giderek Auth0 yapılandırmasını test edebilirsiniz.

## 9. Production Deployment

Production'a deploy ederken:

1. **AUTH0_BASE_URL** ve **NEXTAUTH_URL** değerlerini production URL'inizle değiştirin
2. Auth0 Dashboard'da **Allowed Callback URLs** ve **Allowed Logout URLs**'i güncelleyin
3. **AUTH0_SECRET** ve **NEXTAUTH_SECRET** değerlerini yeniden oluşturun

## 10. Güvenlik Notları

- `.env.local` dosyasını asla git'e commit etmeyin
- Production'da güçlü secret değerleri kullanın
- Auth0 Application ayarlarını düzenli olarak kontrol edin
- HTTPS kullanın (production'da)

## Yardım

Sorun yaşarsanız:
1. `/test` sayfasındaki yapılandırma kontrolünü kullanın
2. Browser console'da hata mesajlarını kontrol edin
3. Auth0 Dashboard'da Application logs'ları kontrol edin 