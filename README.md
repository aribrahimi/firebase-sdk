[![npm version](https://badge.fury.io/js/@kaayan/firebase-auth-sdk.svg)](https://www.npmjs.com/package/@kaayan/firebase-auth-sdk)

# Firebase Authentication SDK

A type-safe, UI-free Firebase Authentication SDK that provides a clean and easy-to-use API for authenticating users in web applications.

## Features

- 🔐 Complete Firebase Authentication flow
- 🛠️ No UI components - bring your own UI
- 📦 Multiple auth providers (Google, Facebook, Apple, GitHub, Email/Password)
- 🔒 Secure token management for server-side validation
- 📱 Framework agnostic - works with any frontend library/framework

## Installation

```bash
npm install @kaayan/firebase-auth-sdk
# or
yarn add @kaayan/firebase-auth-sdk
```

## Basic Usage

```typescript
import { createAuthSDK } from '@kaayan/firebase-auth-sdk';

// Initialize the SDK
const auth = createAuthSDK({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,  //  your-api-key
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,  // your-app.firebaseapp.com
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,   // your-project-id
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,   // your-storage-bucket
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,  // your-app-id
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID   // your-appId
  enabledProviders: {
    google: true,
    facebook: true,
    apple: true,
    github: true
  }
});

// Use authentication methods
auth.signInWithGoogle()
  .then(userCredential => console.log('Signed in!', userCredential))
  .catch(error => console.error('Error signing in', error));
```

## Secure Authentication in Production

This SDK provides tools for implementing secure authentication in production environments.

### Getting Authentication Tokens

```typescript
// Get the authenticated user with ID token
const result = await auth.getAuthenticatedUser();

if (result.success && result.data) {
  const { token, uid, email } = result.data;
  
  // Use token for authenticated API requests
  // DO NOT store this token in localStorage or sessionStorage
} else {
  // Handle authentication error
  console.error(result.error?.message);
}
```

### Force Refreshing Tokens

Tokens expire after 1 hour. You can force refresh:

```typescript
// Force refresh token
const result = await auth.getAuthenticatedUser(true);
```

### Setting Up HttpOnly Cookies (Client-Side)

After authenticating, send the token to your backend to set secure HttpOnly cookies:

```typescript
async function handleLogin() {
  const result = await auth.signInWithGoogle();
  
  if (result) {
    // Get fresh token
    const authResult = await auth.getAuthenticatedUser();
    
    if (authResult.success && authResult.data) {
      // Send token to your server to create HttpOnly cookie
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: authResult.data.token }),
        credentials: 'include' // Important for cookies
      });
      
      // Redirect or update UI
    }
  }
}
```

### Server-Side Token Validation (Next.js Example)

In your Next.js API route or middleware:

```typescript
// pages/api/auth/session.js
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!global.firebaseAdmin) {
  global.firebaseAdmin = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  try {
    // Get token from request body
    const { token } = req.body;
    
    // Verify ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Set HttpOnly cookie with session info
    res.setHeader('Set-Cookie', [
      `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60}`
    ]);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error setting session', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
```

### SSR Authentication with Middleware (Next.js Example)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value || '';
  
  // Validate session
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  try {
    // Verify session token with Firebase Admin
    const decodedToken = await getAuth().verifyIdToken(session);
    
    // Token is valid, proceed with request
    return NextResponse.next();
  } catch (error) {
    // Invalid session, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Add protected routes
export const config = {
  matcher: ['/protected/:path*', '/dashboard/:path*'],
};
```

## Security Best Practices

1. **Never store tokens in localStorage or sessionStorage**
   - These can be accessed by any JavaScript running on your domain, including XSS attacks

2. **Always use HttpOnly cookies for storing authentication tokens**
   - Set `Secure` flag in production
   - Set `SameSite=Strict` to prevent CSRF attacks

3. **Implement proper CSRF protection**
   - For mutations/sensitive actions, use CSRF tokens

4. **Regularly refresh tokens**
   - Firebase ID tokens expire after 1 hour
   - Implement refresh logic for long-lasting sessions



🛡 Licensed under MIT • Maintained by  alireza ibrahimi
📫 Questions? Email ar.ibrahimy@gmail.com or open an issue on [GitHub](https://github.com/aribrahimi/firebase-sdk)
