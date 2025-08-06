# Docker Kurulum ve Kullanım Kılavuzu

Bu proje için Docker konfigürasyonu hazırlanmıştır. Aşağıdaki adımları takip ederek projeyi Docker ile çalıştırabilirsiniz.

## 📋 Gereksinimler

- Docker Desktop (Windows/Mac) veya Docker Engine (Linux)
- Docker Compose
- Git

## 🚀 Hızlı Başlangıç

### 1. Development Ortamı

```bash
# Development ortamını başlat
docker-compose -f docker-compose.dev.yml up --build

# Arka planda çalıştır
docker-compose -f docker-compose.dev.yml up -d --build
```

### 2. Production Ortamı

```bash
# Production ortamını başlat
docker-compose up --build

# Arka planda çalıştır
docker-compose up -d --build
```

## 📁 Dosya Yapısı

```
next-auth/
├── Dockerfile                 # Multi-stage Docker build
├── .dockerignore             # Docker build için ignore dosyaları
├── docker-compose.yml        # Ana compose dosyası
├── docker-compose.dev.yml    # Development compose dosyası
├── nginx.conf               # Nginx reverse proxy konfigürasyonu
├── next.config.ts           # Next.js Docker optimizasyonları
└── DOCKER_SETUP.md          # Bu dosya
```

## 🔧 Docker Komutları

### Image Build

```bash
# Development image build
docker build --target builder -t next-auth:dev .

# Production image build
docker build -t next-auth:prod .

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -t next-auth:prod .
```

### Container Yönetimi

```bash
# Container'ları listele
docker ps

# Container loglarını görüntüle
docker logs next-auth-dev

# Container'a bağlan
docker exec -it next-auth-dev sh

# Container'ı durdur
docker stop next-auth-dev

# Container'ı sil
docker rm next-auth-dev
```

### Volume Yönetimi

```bash
# Volume'ları listele
docker volume ls

# Volume'u sil
docker volume rm next-auth_node_modules
```

## 🌍 Environment Variables

`.env.local` dosyasını Docker container'ında kullanmak için:

```bash
# Environment dosyasını kopyala
cp .env.example .env.local

# Gerekli değişkenleri düzenle
nano .env.local
```

### Örnek .env.local

```env
# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3002
AUTH0_ISSUER_BASE_URL=https://dev-s3ql6fuorkk3gc6t.us.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-nextauth-secret

# Docker Configuration
NODE_ENV=development
PORT=3002
HOSTNAME=0.0.0.0
```

## 🔒 Güvenlik

### Nginx Reverse Proxy

Production ortamında Nginx reverse proxy kullanarak:

- Rate limiting
- SSL/TLS termination
- Security headers
- Load balancing

```bash
# Nginx ile production başlat
docker-compose --profile production up -d
```

### SSL Sertifikaları

SSL sertifikalarını etkinleştirmek için:

1. `ssl/` klasörü oluştur
2. Sertifikaları yerleştir:
   - `ssl/cert.pem`
   - `ssl/key.pem`
3. `nginx.conf` dosyasında HTTPS server'ı aktif et

## 📊 Monitoring

### Health Check

```bash
# Health check endpoint
curl http://localhost/health
```

### Log Monitoring

```bash
# Container loglarını takip et
docker logs -f next-auth-prod

# Tüm servislerin loglarını görüntüle
docker-compose logs -f
```

## 🛠️ Troubleshooting

### Port Çakışması

```bash
# Port 3002 kullanımda mı kontrol et
netstat -tulpn | grep :3002

# Farklı port kullan
docker-compose up -p 3003:3002
```

### Permission Issues

```bash
# Container içinde dosya izinlerini düzelt
docker exec -it next-auth-dev chown -R nextjs:nodejs /app
```

### Build Hataları

```bash
# Cache'i temizle
docker system prune -a

# Yeniden build et
docker-compose build --no-cache
```

### Memory Issues

```bash
# Container memory limitini artır
docker-compose up -d --memory=2g
```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Docker Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t next-auth:latest .
      - name: Push to registry
        run: |
          docker tag next-auth:latest your-registry/next-auth:latest
          docker push your-registry/next-auth:latest
```

## 📈 Performance Optimization

### Multi-stage Build

Dockerfile'da 3 aşamalı build:
1. **deps**: Dependencies kurulumu
2. **builder**: Application build
3. **runner**: Production runtime

### Image Size Optimization

```bash
# Image boyutunu kontrol et
docker images next-auth

# Multi-platform build ile optimize et
docker buildx build --platform linux/amd64 -t next-auth:optimized .
```

## 🚀 Deployment

### Local Development

```bash
# Development ortamını başlat
docker-compose -f docker-compose.dev.yml up --build

# Uygulamaya eriş
open http://localhost:3002
```

### Production Deployment

```bash
# Production build
docker-compose up --build -d

# Nginx ile production
docker-compose --profile production up --build -d

# Uygulamaya eriş
open http://localhost
```

## 📝 Notlar

- Development ortamında hot reload aktif
- Production ortamında standalone output kullanılıyor
- Nginx reverse proxy ile güvenlik artırılmış
- Environment variables `.env.local` dosyasından okunuyor
- Health check endpoint `/health` mevcut

## 🔗 Faydalı Linkler

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Documentation](https://nginx.org/en/docs/) 