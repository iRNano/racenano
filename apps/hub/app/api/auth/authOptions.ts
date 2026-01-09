import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
  
          // TODO: Replace with actual database query
          // This is a mock implementation
          try {
            const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
  
            if (response.ok) {
              const user = await response.json();
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              };
            }
          } catch (error) {
            console.error('Auth error:', error);
          }
  
          return null;
        },
      }),
    ],
    pages: {
      signIn: '/auth/login',
    //   signUp: '/auth/signup',
      error: '/auth/error',
    },
    callbacks: {
      async signIn({ user, account, profile }) {
        // Handle OAuth sign-in
        if (account?.provider === 'google' || account?.provider === 'facebook') {
          // TODO: Save or update user in database
          // Check if user exists, if not create new user
          return true;
        }
        return true;
      },
      async jwt({ token, user, account }) {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
  }