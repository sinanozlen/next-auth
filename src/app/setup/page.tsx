'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [showEnvContent, setShowEnvContent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Auth0 Kurulum Rehberi</h1>
          
          <div className="space-y-6">
            {/* Adım 1 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Auth0 Hesabı Oluşturma</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><a href="https://auth0.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">Auth0.com</a> adresine gidin</li>
                <li>Ücretsiz hesap oluşturun</li>
                <li>E-posta adresinizi doğrulayın</li>
              </ol>
            </div>

            {/* Adım 2 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Auth0 Application Oluşturma</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Auth0 Dashboard'da <strong>Applications</strong> &gt; <strong>Applications</strong> bölümüne gidin</li>
                <li><strong>+ Create Application</strong> butonuna tıklayın</li>
                <li>Application adını girin (örn: "Next.js App")</li>
                <li><strong>Single Page Application</strong> seçin</li>
                <li><strong>Create</strong> butonuna tıklayın</li>
              </ol>
            </div>

            {/* Adım 3 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Auth0 Application Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Settings Sekmesi:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li><strong>Allowed Callback URLs:</strong> <code className="bg-gray-100 px-1 rounded">http://localhost:3000/api/auth/callback/auth0</code></li>
                    <li><strong>Allowed Logout URLs:</strong> <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code></li>
                    <li><strong>Allowed Web Origins:</strong> <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code></li>
                    <li><strong>Allowed Origins (CORS):</strong> <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Advanced Settings &gt; OAuth:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li><strong>JsonWebToken Signature Algorithm:</strong> <code className="bg-gray-100 px-1 rounded">RS256</code></li>
                    <li><strong>OIDC Conformant:</strong> <code className="bg-gray-100 px-1 rounded">Enabled</code></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Adım 4 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Environment Variables</h2>
              <p className="text-gray-700 mb-4">Proje kök dizininde <code className="bg-gray-100 px-1 rounded">.env.local</code> dosyası oluşturun:</p>
              
              <button
                onClick={() => setShowEnvContent(!showEnvContent)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium mb-4"
              >
                {showEnvContent ? 'Gizle' : 'Göster'} .env.local İçeriği
              </button>

              {showEnvContent && (
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'

# MongoDB Configuration (opsiyonel)
MONGODB_URI='mongodb://localhost:27017/next-auth-app'`}</pre>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-gray-900">Değerleri Nereden Alacağınız:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li><strong>AUTH0_ISSUER_BASE_URL:</strong> Auth0 Dashboard &gt; Applications &gt; Your App &gt; Settings &gt; Domain</li>
                  <li><strong>AUTH0_CLIENT_ID:</strong> Auth0 Dashboard &gt; Applications &gt; Your App &gt; Settings &gt; Client ID</li>
                  <li><strong>AUTH0_CLIENT_SECRET:</strong> Auth0 Dashboard &gt; Applications &gt; Your App &gt; Settings &gt; Client Secret</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Secret Değerleri Oluşturma:</h3>
                <p className="text-gray-700 text-sm mb-2">Terminal'de şu komutu çalıştırın:</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">openssl rand -hex 32</code>
                <p className="text-gray-600 text-xs mt-1">Bu komutun çıktısını hem AUTH0_SECRET hem de NEXTAUTH_SECRET için kullanın.</p>
              </div>
            </div>

            {/* Adım 5 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Test Kullanıcısı Oluşturma</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Auth0 Dashboard &gt; <strong>User Management</strong> &gt; <strong>Users</strong></li>
                <li><strong>+ Create User</strong> butonuna tıklayın</li>
                <li>Kullanıcı bilgilerini girin:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                    <li><strong>Email:</strong> test@gmail.com</li>
                    <li><strong>Password:</strong> 151548pPo0s02=^.94</li>
                    <li><strong>Connection:</strong> Username-Password-Authentication</li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* Adım 6 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Test Etme</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Sunucuyu yeniden başlatın: <code className="bg-gray-100 px-1 rounded">npm run dev</code></li>
                <li><a href="http://localhost:3000" className="text-indigo-600 hover:text-indigo-500">http://localhost:3000</a> adresine gidin</li>
                <li>"Auth0 ile Giriş Yap" butonuna tıklayın</li>
                <li>Test kullanıcısı bilgileriyle giriş yapın</li>
                <li>Başarılı girişten sonra dashboard'a yönlendirileceksiniz</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <a
              href="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Ana Sayfa
            </a>
            <a
              href="/test"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Yapılandırmayı Test Et
            </a>
            <a
              href="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Giriş Yap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 