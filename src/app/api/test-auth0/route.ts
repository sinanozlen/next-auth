import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Auth0 environment variables kontrolü
    const auth0Config = {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET ? '***SET***' : '***NOT SET***',
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      baseUrl: process.env.AUTH0_BASE_URL,
      secret: process.env.AUTH0_SECRET ? '***SET***' : '***NOT SET***',
    };

    // NextAuth environment variables kontrolü
    const nextAuthConfig = {
      url: process.env.NEXTAUTH_URL,
      secret: process.env.NEXTAUTH_SECRET ? '***SET***' : '***NOT SET***',
    };

    // URL validation
    const isValidIssuer = auth0Config.issuer && 
      (auth0Config.issuer.startsWith('https://') || auth0Config.issuer.startsWith('http://'));
    
    const isValidBaseUrl = auth0Config.baseUrl && 
      (auth0Config.baseUrl.startsWith('https://') || auth0Config.baseUrl.startsWith('http://'));

    const configStatus = {
      auth0: {
        ...auth0Config,
        isValidIssuer,
        isValidBaseUrl,
        isComplete: !!(auth0Config.clientId && auth0Config.clientSecret && auth0Config.issuer && auth0Config.baseUrl),
      },
      nextAuth: {
        ...nextAuthConfig,
        isComplete: !!(nextAuthConfig.url && nextAuthConfig.secret),
      },
    };

    return NextResponse.json({
      success: true,
      message: 'Auth0 yapılandırması kontrol edildi',
      config: configStatus,
      recommendations: [
        ...(!configStatus.auth0.isComplete ? ['Auth0 environment variables eksik'] : []),
        ...(!configStatus.nextAuth.isComplete ? ['NextAuth environment variables eksik'] : []),
        ...(!configStatus.auth0.isValidIssuer ? ['AUTH0_ISSUER_BASE_URL geçerli bir URL olmalı'] : []),
        ...(!configStatus.auth0.isValidBaseUrl ? ['AUTH0_BASE_URL geçerli bir URL olmalı'] : []),
      ],
    });
  } catch (error) {
    console.error('Auth0 config test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Auth0 yapılandırması kontrol edilirken hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      },
      { status: 500 }
    );
  }
} 