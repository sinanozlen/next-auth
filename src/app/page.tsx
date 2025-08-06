'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('auth0', {
        callbackUrl: 'http://localhost:3000/dashboard',
        redirect: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  // Loading durumu
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Eğer kullanıcı giriş yapmışsa loading göster
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Dashboard'a yönlendiriliyor...</p>
        </div>
      </div>
    );
  }

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
          
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            ✅ Auth0 konfigürasyonu tamamlandı
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş yapılıyor...
              </div>
            ) : (
              'Auth0 ile Giriş Yap'
            )}
          </button>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Test Kullanıcısı:
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Email:</strong> test@gmail.com</div>
            <div><strong>Şifre:</strong> 151548pPo0s02=^.94</div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/test"
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            Auth0 Yapılandırmasını Test Et →
          </a>
        </div>
      </div>
    </div>
  );
}
