'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3001' });
  };

  const isAdmin = session?.user?.role === 'admin';

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🎉 Hoş Geldiniz!
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                {session.user?.name || session.user?.email}
                {isAdmin && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Başarıyla Giriş Yaptınız!
              </h2>
              <p className="text-lg text-gray-600">
                Bu sayfa sadece kimlik doğrulaması yapılmış kullanıcılar tarafından görüntülenebilir.
              </p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                👤 Kullanıcı Bilgileri
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Ad:</span>
                  <span>{session.user?.name || 'Belirtilmemiş'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">E-posta:</span>
                  <span>{session.user?.email || 'Belirtilmemiş'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Rol:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    session.user?.role === 'admin' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.user?.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Durum:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-medium text-blue-900 mb-3">
                🚀 Proje Başarıyla Çalışıyor!
              </h3>
              <p className="text-blue-700 mb-4">
                Next.js + Auth0 + NextAuth.js entegrasyonu tamamlandı. 
                MongoDB bağlantısı daha sonra eklenecek.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Ana Sayfa
                </a>
                <a
                  href="/test"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Test Sayfası
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 