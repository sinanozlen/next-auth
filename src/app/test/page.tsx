'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function TestPage() {
  const { data: session, status } = useSession();
  const [configStatus, setConfigStatus] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [tokenTestStatus, setTokenTestStatus] = useState<any>(null);
  const [loadingTokenTest, setLoadingTokenTest] = useState(false);

  const checkAuth0Config = async () => {
    setLoadingConfig(true);
    try {
      const response = await fetch('/api/test-auth0');
      const data = await response.json();
      setConfigStatus(data);
    } catch (error) {
      setConfigStatus({
        success: false,
        message: 'Yapılandırma kontrol edilemedi',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      });
    } finally {
      setLoadingConfig(false);
    }
  };

  const testAuth0Token = async () => {
    setLoadingTokenTest(true);
    try {
      const response = await fetch('/api/auth/signin/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'codelogiforce@gmail.com',
          password: '1253=*3-494%4eDd',
          redirect: false
        }),
      });
      const data = await response.json();
      setTokenTestStatus(data);
    } catch (error) {
      setTokenTestStatus({
        success: false,
        message: 'Token test edilemedi',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      });
    } finally {
      setLoadingTokenTest(false);
    }
  };

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

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Giriş yapılmamış</h1>
          <p className="text-gray-600 mb-4">Bu sayfayı görüntülemek için giriş yapmanız gerekiyor.</p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Giriş Yap
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Auth0 Test Sayfası</h1>
          
          <div className="space-y-6">
            {/* Auth0 Config Check */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Auth0 Yapılandırması</h2>
              <button
                onClick={checkAuth0Config}
                disabled={loadingConfig}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingConfig ? 'Kontrol ediliyor...' : 'Yapılandırmayı Kontrol Et'}
              </button>
              
              {configStatus && (
                <div className="mt-4 p-4 rounded-md border">
                  <div className={`text-sm font-medium ${configStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                    {configStatus.message}
                  </div>
                  {configStatus.recommendations && configStatus.recommendations.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Öneriler:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {configStatus.recommendations.map((rec: string, index: number) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <details className="mt-4">
                    <summary className="text-sm font-medium text-gray-700 cursor-pointer">Detaylı Yapılandırma</summary>
                    <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-auto">
                      {JSON.stringify(configStatus.config, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>

            {/* Auth0 Token Test */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Auth0 Token Testi</h2>
              <button
                onClick={testAuth0Token}
                disabled={loadingTokenTest}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {loadingTokenTest ? 'Test ediliyor...' : 'Token Test Et'}
              </button>
              
              {tokenTestStatus && (
                <div className="mt-4 p-4 rounded-md border">
                  <div className={`text-sm font-medium ${tokenTestStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                    {tokenTestStatus.success ? 'Token başarıyla alındı!' : 'Token alınamadı'}
                  </div>
                  {tokenTestStatus.error && (
                    <div className="mt-2 text-sm text-red-600">
                      Hata: {tokenTestStatus.error}
                    </div>
                  )}
                  <details className="mt-4">
                    <summary className="text-sm font-medium text-gray-700 cursor-pointer">Detaylı Sonuç</summary>
                    <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-auto">
                      {JSON.stringify(tokenTestStatus, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>

            {/* Session Info */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Oturum Bilgileri</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-700 overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Kullanıcı Bilgileri</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad</label>
                    <p className="mt-1 text-sm text-gray-900">{session?.user?.name || 'Belirtilmemiş'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-posta</label>
                    <p className="mt-1 text-sm text-gray-900">{session?.user?.email || 'Belirtilmemiş'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <p className="mt-1 text-sm text-gray-900">{session?.user?.id || 'Belirtilmemiş'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                    <p className="mt-1 text-sm text-gray-900">{(session?.user as any)?.role || 'user'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Çıkış Yap
              </button>
              <a
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Dashboard'a Git
              </a>
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Login Sayfası
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 