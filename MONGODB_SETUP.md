# MongoDB Kurulum Rehberi

## 1. MongoDB Kurulumu

### Seçenek 1: MongoDB Atlas (Önerilen - Cloud)

1. [MongoDB Atlas](https://www.mongodb.com/atlas)'a gidin
2. Ücretsiz hesap oluşturun
3. Yeni cluster oluşturun (Free tier)
4. Database Access'ten kullanıcı oluşturun
5. Network Access'ten IP adresinizi ekleyin (0.0.0.0/0 tüm IP'lere izin verir)
6. Connect butonuna tıklayın ve connection string'i kopyalayın

### Seçenek 2: MongoDB Local

1. [MongoDB Community Server](https://www.mongodb.com/try/download/community)'ı indirin
2. Kurulumu tamamlayın
3. MongoDB servisini başlatın

## 2. .env.local Dosyasını Güncelleyin

```env
# Auth0 Configuration
AUTH0_SECRET='your-32-byte-secret-here'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-32-byte-secret-here'

# MongoDB Configuration
MONGODB_URI='mongodb://localhost:27017/next-auth-app'
# Veya MongoDB Atlas için:
# MONGODB_URI='mongodb+srv://username:password@cluster.mongodb.net/next-auth-app'
```

## 3. Test Etme

1. Geliştirme sunucusunu yeniden başlatın: `npm run dev`
2. `http://localhost:3001` adresine gidin
3. Auth0 ile giriş yapın
4. Dashboard'da kullanıcı listesini kontrol edin

## 4. Özellikler

✅ **Otomatik Kullanıcı Kaydı**: Auth0 ile giriş yapan kullanıcılar otomatik olarak MongoDB'ye kaydedilir

✅ **Kullanıcı Listesi**: Dashboard'da tüm kayıtlı kullanıcıları görebilirsiniz

✅ **Güvenli API**: Kullanıcı listesi sadece kimlik doğrulaması yapılmış kullanıcılar tarafından görüntülenebilir

✅ **Bağlantı Optimizasyonu**: Hot reload sırasında bağlantı yeniden kullanılır

## 5. Veritabanı Şeması

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  name: String (optional),
  image: String (optional),
  auth0Id: String (required, unique),
  createdAt: Date,
  updatedAt: Date
}
```

## 6. API Endpoints

### GET /api/users
- **Açıklama**: Tüm kullanıcıları listeler
- **Kimlik Doğrulama**: Gerekli
- **Response**: `{ users: User[] }`

## 7. Sorun Giderme

### Bağlantı Hatası
- MongoDB URI'nin doğru olduğunu kontrol edin
- MongoDB servisinin çalıştığını kontrol edin
- Firewall ayarlarını kontrol edin

### Kullanıcı Oluşturma Hatası
- Auth0 yapılandırmasını kontrol edin
- MongoDB bağlantısını kontrol edin
- Console'da hata mesajlarını kontrol edin 