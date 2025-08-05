export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🎉 Proje Başarıyla Çalışıyor!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Next.js + Auth0 + NextAuth.js entegrasyonu hazır
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            ✅ Next.js 14 App Router kuruldu
          </div>
          
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            ✅ TypeScript konfigürasyonu tamamlandı
          </div>
          
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            ✅ TailwindCSS entegrasyonu yapıldı
          </div>
          
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            ✅ NextAuth.js kurulumu tamamlandı
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
            ⚠️ Auth0 konfigürasyonu gerekli
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sonraki Adımlar:
          </h3>
          <ol className="text-sm text-gray-600 space-y-2 text-left">
            <li>1. Auth0 hesabı oluşturun</li>
            <li>2. Yeni uygulama ekleyin (SPA)</li>
            <li>3. .env.local dosyası oluşturun</li>
            <li>4. Auth0 bilgilerini ekleyin</li>
            <li>5. Login sayfasını test edin</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 