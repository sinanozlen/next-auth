'use client';

import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    // Check for error from URL params
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'OAuthSignin':
          setError('Giriş işlemi başlatılamadı. Lütfen tekrar deneyin.');
          break;
        case 'OAuthCallback':
          setError('Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.');
          break;
        case 'OAuthCreateAccount':
          setError('Hesap oluşturulamadı. Lütfen tekrar deneyin.');
          break;
        case 'EmailCreateAccount':
          setError('E-posta hesabı oluşturulamadı.');
          break;
        case 'Callback':
          setError('Geri dönüş işlemi başarısız.');
          break;
        case 'OAuthAccountNotLinked':
          setError('Bu e-posta adresi başka bir hesap ile ilişkili.');
          break;
        case 'EmailSignin':
          setError('E-posta gönderilemedi.');
          break;
        case 'CredentialsSignin':
          setError('Giriş bilgileri hatalı.');
          break;
        case 'SessionRequired':
          setError('Bu sayfaya erişmek için giriş yapmanız gerekiyor.');
          break;
        default:
          setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  }, [router, searchParams]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('auth0', {
        callbackUrl: 'http://localhost:3000/dashboard',
        redirect: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Auth0 ile güvenli giriş
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
            <p className="text-xs text-gray-500">
              Güvenli kimlik doğrulama için Auth0 kullanıyoruz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 