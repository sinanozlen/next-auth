# Auth0 Alternatif Kurulum (HTTPS Hatası İçin)

Eğer hala HTTPS hatası alıyorsanız, bu alternatif yöntemi kullanın:

## 1. Yeni Auth0 Application Oluşturma

### Machine to Machine Application
1. Auth0 Dashboard'da **Applications** > **Applications**
2. **+ Create Application** butonuna tıklayın
3. **Machine to Machine Applications** seçin
4. Application adını girin (örn: "Next.js M2M")
5. **Create** butonuna tıklayın

### API Seçimi
1. Oluşturduğunuz M2M uygulamasında **APIs** sekmesine gidin
2. **Auth0 Management API** seçin
3. Gerekli izinleri verin:
   - `read:users`
   - `read:user_idp_tokens`

## 2. Auth0 Ayarları

### Settings Sekmesi:
- **Application Login URI**: BOŞ BIRAKIN
- **Allowed Callback URLs**: BOŞ BIRAKIN
- **Allowed Logout URLs**: BOŞ BIRAKIN
- **Allowed Web Origins**: BOŞ BIRAKIN

### Advanced Settings > OAuth:
- **JsonWebToken Signature Algorithm**: `RS256`
- **OIDC Conformant**: `Enabled`
- **Token Endpoint Authentication Method**: `Post`

## 3. Environment Variables

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3002'
AUTH0_ISSUER_BASE_URL='https://dev-s3ql6fuorkk3gc6t.us.auth0.com'
AUTH0_CLIENT_ID='YENİ_M2M_CLIENT_ID'
AUTH0_CLIENT_SECRET='YENİ_M2M_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3002'
NEXTAUTH_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'


```

## 4. Test Kullanıcısı

Auth0'da test kullanıcısı oluşturun:
1. **User Management** > **Users**
2. **+ Create User** butonuna tıklayın
3. Kullanıcı bilgilerini girin:
   - **Email**: `codelogiforce`
   - **Password**: `1253=*3-494%4eDd`
   - **Connection**: `Username-Password-Authentication`

## 5. Projeyi Çalıştırma

```bash
npm run dev
```

## 6. Test Etme

1. `http://localhost:3002` adresine gidin
2. Login sayfasında test kullanıcısı bilgileriyle giriş yapın
3. Dashboard'a yönlendirileceksiniz

## 7. Sorun Giderme

### Yaygın Hatalar:

1. **"invalid_grant" Hatası**:
   - Kullanıcı adı/şifre yanlış olabilir
   - Connection type'ı kontrol edin

2. **"unauthorized" Hatası**:
   - Client ID/Secret yanlış olabilir
   - API izinlerini kontrol edin

3. **"invalid_client" Hatası**:
   - Client ID'yi kontrol edin
   - Application type'ını kontrol edin

### Debug Modu:
```env
NODE_ENV=development
```

Bu ayar NextAuth debug modunu aktif eder ve daha detaylı hata mesajları verir.

## 8. Production Deployment

Production'a geçerken:
1. HTTPS URL'leri kullanın
2. Güçlü secret değerleri oluşturun
3. Auth0 Application ayarlarını güncelleyin
4. Environment variables'ları production değerleriyle değiştirin 