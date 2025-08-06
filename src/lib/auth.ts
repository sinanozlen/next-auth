import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          console.log('Attempting Auth0 login with:', credentials.email);
          
          // Arc'da çalışan JSON'a göre Auth0 token endpoint'e istek at
          const response = await fetch('https://dev-s3ql6fuorkk3gc6t.us.auth0.com/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'password',
              username: 'codelogiforce', // Sabit username kullanıyoruz
              password: '1253=*3-494%4eDd', // Sabit password kullanıyoruz
              scope: 'openid profile email',
              client_id: 'QfTgCHeW0ZA45at9rGO5jmuFbetZNabq',
              client_secret: 't3rM2KjaULb5FpWq4Sc23FNl6u8dSxcNvEQAqT1e35hyaN5MCSHZF7gCEUJ4Qoxd',
              connection: 'Username-Password-DB'
            }),
          });

          console.log('Auth0 response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Auth0 token error:', errorText);
            console.error('Response status:', response.status);
            console.error('Response headers:', Object.fromEntries(response.headers.entries()));
            return null;
          }

          const tokenData = await response.json();
          console.log('Auth0 token received');
          
          // Auth0 userinfo endpoint'ten kullanıcı bilgilerini al
          const userResponse = await fetch('https://dev-s3ql6fuorkk3gc6t.us.auth0.com/userinfo', {
            headers: {
              'Authorization': `Bearer ${tokenData.access_token}`,
            },
          });

          if (!userResponse.ok) {
            console.error('Auth0 userinfo error:', await userResponse.text());
            return null;
          }

          const userData = await userResponse.json();
          console.log('Auth0 user data:', userData);

          return {
            id: userData.sub,
            email: userData.name, // Auth0'da email name alanında geliyor
            name: userData.nickname || userData.name,
            image: userData.picture,
            accessToken: tokenData.access_token,
          };
        } catch (error) {
          console.error('Auth0 authentication error:', error);
          return null;
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: 'user',
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Debug modunu aktif ediyoruz
};

export default NextAuth(authOptions); 