import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    accessToken: string;
    error?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    error?: string;
  }
} 