'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

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
            ✅ Auth0 Credentials Provider kuruldu
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => router.push('/login')}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Giriş Yap
          </button>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Test Kullanıcısı:
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Username:</strong> codelogiforce</div>
            <div><strong>Şifre:</strong> 1253=*3-494%4eDd</div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <a
            href="/test"
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium block"
          >
            Auth0 Yapılandırmasını Test Et →
          </a>
          <a
            href="/setup"
            className="text-blue-600 hover:text-blue-500 text-sm font-medium block"
          >
            Kurulum Rehberi →
          </a>
          <a
            href="/AUTH0_SETUP.md"
            className="text-gray-500 hover:text-gray-700 text-xs block"
          >
            Detaylı Dokümantasyon
          </a>
        </div>
      </div>
    </div>
  );
}
