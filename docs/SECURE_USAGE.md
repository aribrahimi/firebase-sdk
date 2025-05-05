# Secure Usage Guide

This guide explains best practices for securely using the Firebase Auth SDK in production applications.

## Firebase Authentication Security Model

Firebase Authentication uses JWT tokens for identity verification. Understanding these concepts is critical:

1. **ID Tokens**: JWTs issued after successful authentication
2. **1-hour expiry**: Firebase ID tokens expire after 1 hour
3. **Client-side vs Server-side validation**: Different approaches for web clients vs. servers

## Token Handling Best Practices

### ✅ DO:

- Use HttpOnly cookies for storing authentication tokens
- Implement token refresh logic for long sessions
- Validate tokens on the server for protected operations
- Keep Firebase Admin SDK credentials secure

### ❌ DON'T:

- Store tokens in localStorage or sessionStorage (XSS vulnerable)
- Send tokens to untrusted third parties
- Expose Firebase Admin SDK credentials in client-side code
- Assume tokens will remain valid indefinitely

## Implementation Examples

### 1. Authentication Flow

```typescript
// 1. User authenticates
const userCredential = await auth.signInWithGoogle();

// 2. Get authenticated user with token
const result = await auth.getAuthenticatedUser();

// 3. If successful, send token to your backend
if (result.success && result.data) {
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: result.data.token }),
    credentials: 'include' // Important for cookie handling
  });
}
```

### 2. Token Refreshing

```typescript
async function refreshAuthToken() {
  try {
    // Force refresh the token
    const result = await auth.getAuthenticatedUser(true);
    
    if (result.success && result.data) {
      // Send refreshed token to your backend
      await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: result.data.token }),
        credentials: 'include'
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
}

// Call this function periodically (e.g., every 50 minutes)
// or when making important API calls
```

### 3. Server-Side Token Validation (Express.js)

```typescript
// server.js
const express = require('express');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || '';
    
    if (!sessionCookie) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Verify the session cookie
    const decodedToken = await admin.auth().verifyIdToken(sessionCookie);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Set auth cookie endpoint
app.post('/api/auth/session', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Set session cookie
    res.cookie('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Protected API route example
app.get('/api/profile', authenticate, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    name: req.user.name || 'User',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 4. Next.js API Route Authentication

```typescript
// pages/api/auth/session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }
    
    // Verify ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Set HttpOnly cookie with session info
    res.setHeader('Set-Cookie', [
      `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60}`
    ]);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error setting session:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
```

## Common Security Issues and Solutions

### Problem: Tokens stored in localStorage
**Solution**: Send tokens to backend to set HttpOnly cookies instead

### Problem: CSRF vulnerability in cookie-based authentication
**Solution**: Use SameSite=Strict and implement CSRF tokens for sensitive operations

### Problem: Expired tokens causing errors
**Solution**: Implement automatic token refresh logic, and handle 401 errors appropriately

### Problem: Insecure token validation
**Solution**: Always verify tokens server-side using Firebase Admin SDK, never trust client-side validation

## Advanced Security Topics

### Multi-Factor Authentication (MFA)

While the SDK doesn't directly implement MFA, Firebase supports it. Follow Firebase documentation for implementing MFA.

### Custom Claims for Role-Based Access Control

Use Firebase Admin SDK to set custom claims for role-based access:

```typescript
// On your server
import { getAuth } from 'firebase-admin/auth';

async function setUserRole(uid, role) {
  await getAuth().setCustomUserClaims(uid, { role });
  return { success: true };
}
```

Then verify roles after token validation:

```typescript
// Protected API route
app.get('/api/admin/users', authenticate, (req, res) => {
  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Continue with admin operation
  // ...
});
```

## Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/) 