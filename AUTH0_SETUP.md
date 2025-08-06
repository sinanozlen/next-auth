# Auth0 Kurulum Rehberi

## Auth0 Uygulama Ayarları

Auth0 panosunda aşağıdaki ayarları yapmanız gerekiyor:

### 1. Application URIs Bölümü

#### Application Login URI (Uygulama Giriş URI'si)
```
BOŞ BIRAKIN - Bu alanı doldurmayın
```
**Not:** Bu alan sadece production ortamında kullanılır. Development için boş bırakın.

#### Allowed Callback URLs (İzin Verilen Geri Çağırma URL'leri)
```
http://localhost:3002
```

#### Allowed Logout URLs (İzin Verilen Çıkış URL'leri)
```
http://localhost:3002
```

#### Allowed Web Origins (İzin Verilen Web Kökenleri)
```
http://localhost:3002
```

### 2. Environment Variables

`.env.local` dosyanızda aşağıdaki değerleri kullanın:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3002'
AUTH0_ISSUER_BASE_URL='https://dev-s3ql6fuorkk3gc6t.us.auth0.com'
AUTH0_CLIENT_ID='QfTgCHeW0ZA45at9rGO5jmuFbetZNabq'
AUTH0_CLIENT_SECRET='t3rM2KjaULb5FpWq4Sc23FNl6u8dSxcNvEQAqT1e35hyaN5MCSHZF7gCEUJ4Qoxd'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3002'
NEXTAUTH_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'


```

### 3. Projeyi Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp env.example .env.local

# Projeyi port 3002'de başlatın
npm run dev
```

### 4. Test Kullanıcısı

Auth0'da oluşturduğunuz test kullanıcısı:
- **Email**: `codelogiforce`
- **Şifre**: `1253=*3-494%4eDd`

### 5. Önemli Notlar

- Proje artık **port 3002**'de çalışacak
- **Application Login URI alanını BOŞ BIRAKIN** - Bu HTTPS hatası verir
- Auth0 panosundaki diğer URL'ler `http://localhost:3002` ile başlamalı
- Connection type: `Username-Password-DB` olarak ayarlanmalı
- Grant type: `password` kullanılıyor

### 6. Test Etme

1. `http://localhost:3002` adresine gidin
2. Login sayfasına yönlendirileceksiniz
3. Test kullanıcısı bilgileriyle giriş yapın
4. Dashboard'a yönlendirileceksiniz

### 7. Sorun Giderme

Eğer sorun yaşarsanız:
1. **Application Login URI alanının BOŞ olduğundan emin olun**
2. Auth0 panosundaki diğer URL'lerin doğru olduğunu kontrol edin
3. Environment variables'ların doğru ayarlandığını kontrol edin
4. Port 3002'nin boş olduğundan emin olun
5. Browser console'da hata mesajlarını kontrol edin

### 8. HTTPS Hatası Çözümü

Eğer "absolute-https-uri-or-empty" hatası alırsanız:
- **Application Login URI** alanını tamamen boş bırakın
- Bu alan sadece production ortamında HTTPS URL'leri için kullanılır
- Development ortamında bu alan boş olmalıdır 