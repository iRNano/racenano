# Authentication Setup Guide

This guide will help you set up OAuth authentication with Google and Facebook for your application.

## Prerequisites

1. Node.js and npm installed
2. NextAuth.js installed (already included)
3. OAuth credentials from Google and Facebook

## Environment Variables

Create a `.env.local` file in the `apps/hub` directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local` file

## Setting up Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add "Facebook Login" product
4. Go to Settings → Basic
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (for development)
   - `https://yourdomain.com/api/auth/callback/facebook` (for production)
6. Copy the App ID and App Secret to your `.env.local` file

## Database Setup (Optional)

Currently, the authentication uses mock data. To use a real database:

1. Set up your database (PostgreSQL, MySQL, MongoDB, etc.)
2. Update the `authorize` function in `app/api/auth/[...nextauth]/route.ts`
3. Update the signup route in `app/api/auth/signup/route.ts`
4. Update the verify route in `app/api/auth/verify/route.ts`

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   - Login: http://localhost:3000/auth/login
   - Signup: http://localhost:3000/auth/signup

3. Test OAuth:
   - Click "Continue with Google" or "Continue with Facebook"
   - You should be redirected to the OAuth provider
   - After authorization, you'll be redirected back to your app

## Features

- ✅ Email/Password authentication
- ✅ Google OAuth integration
- ✅ Facebook OAuth integration
- ✅ Session management with NextAuth
- ✅ Protected routes (ready for implementation)
- ✅ Form validation
- ✅ Error handling

## Next Steps

1. Set up your database
2. Implement user registration and login with database
3. Add protected route middleware
4. Add user profile management
5. Add password reset functionality

