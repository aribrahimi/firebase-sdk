# Firebase Auth SDK - Setup Guide

This guide provides detailed instructions on how to integrate and use the Firebase Auth SDK in your application.

## Installation

```bash
npm install firebase-auth-sdk
```

## Setup

### 1. Initialize the SDK

First, import the SDK and initialize it with your Firebase project configuration:

```typescript
import { createAuthSDK } from 'firebase-auth-sdk';

// Create an instance of the auth SDK with your Firebase configuration
const auth = createAuthSDK({
  apiKey: 'your-firebase-api-key',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  appId: 'your-firebase-app-id',
  enabledProviders: {
    google: true,
    facebook: true,
    apple: false,
    github: true
  }
});
```

## Authentication Methods

### Social Authentication

#### Google Sign-In

```typescript
async function signInWithGoogle() {
  try {
    const userCredential = await auth.signInWithGoogle();
    if (userCredential) {
      // User signed in successfully
      const user = userCredential.user;
      console.log('Google sign-in successful:', user);
      return user;
    } else {
      // Sign-in failed
      console.error('Google sign-in failed');
      return null;
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    return null;
  }
}
```

#### Facebook Sign-In

```typescript
async function signInWithFacebook() {
  try {
    const userCredential = await auth.signInWithFacebook();
    if (userCredential) {
      const user = userCredential.user;
      console.log('Facebook sign-in successful:', user);
      return user;
    } else {
      console.error('Facebook sign-in failed');
      return null;
    }
  } catch (error) {
    console.error('Error during Facebook sign-in:', error);
    return null;
  }
}
```

#### Apple Sign-In

```typescript
async function signInWithApple() {
  try {
    const userCredential = await auth.signInWithApple();
    if (userCredential) {
      const user = userCredential.user;
      console.log('Apple sign-in successful:', user);
      return user;
    } else {
      console.error('Apple sign-in failed');
      return null;
    }
  } catch (error) {
    console.error('Error during Apple sign-in:', error);
    return null;
  }
}
```

#### GitHub Sign-In

```typescript
async function signInWithGithub() {
  try {
    const userCredential = await auth.signInWithGithub();
    if (userCredential) {
      const user = userCredential.user;
      console.log('GitHub sign-in successful:', user);
      return user;
    } else {
      console.error('GitHub sign-in failed');
      return null;
    }
  } catch (error) {
    console.error('Error during GitHub sign-in:', error);
    return null;
  }
}
```

### Email/Password Authentication

#### Sign In with Email and Password

```typescript
async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await auth.signInWithEmail(email, password);
    if (userCredential) {
      const user = userCredential.user;
      console.log('Email sign-in successful:', user);
      return user;
    } else {
      console.error('Email sign-in failed');
      return null;
    }
  } catch (error) {
    console.error('Error during email sign-in:', error);
    return null;
  }
}
```

#### Sign Up with Email and Password

```typescript
async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await auth.signUpWithEmail(email, password);
    if (userCredential) {
      const user = userCredential.user;
      console.log('Email sign-up successful:', user);
      
      // You may want to send a verification email after sign-up
      try {
        await auth.sendEmailVerificationToUser();
        console.log('Verification email sent');
      } catch (verificationError) {
        console.error('Error sending verification email:', verificationError);
      }
      
      return user;
    } else {
      console.error('Email sign-up failed');
      return null;
    }
  } catch (error) {
    console.error('Error during email sign-up:', error);
    return null;
  }
}
```

### Password Management

#### Send Password Reset Email

```typescript
async function sendPasswordReset(email: string) {
  try {
    await auth.sendPasswordReset(email);
    console.log('Password reset email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}
```

#### Send Email Verification

```typescript
async function sendEmailVerification() {
  try {
    await auth.sendEmailVerificationToUser();
    console.log('Verification email sent');
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}
```

### Session Management

#### Sign Out

```typescript
async function signOut() {
  try {
    await auth.signOut();
    console.log('User signed out successfully');
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}
```

#### Get Current User

```typescript
function getCurrentUser() {
  const user = auth.getCurrentUser();
  if (user) {
    console.log('Current user:', user);
    // Access user properties
    const { uid, email, displayName, emailVerified, photoURL } = user;
    return user;
  } else {
    console.log('No user is currently signed in');
    return null;
  }
}
```

#### Listen for Auth State Changes

```typescript
function setupAuthStateListener() {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      console.log('User signed in:', user);
      // Update UI or state to reflect signed-in status
    } else {
      // User is signed out
      console.log('User signed out');
      // Update UI or state to reflect signed-out status
    }
  });
  
  // Call unsubscribe() when you no longer want to listen for changes
  // For example, in a React component's useEffect cleanup:
  // return unsubscribe;
}
```

## Integration Examples

### React Integration

```tsx
import React, { useState, useEffect } from 'react';
import { createAuthSDK } from 'firebase-auth-sdk';
import { User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Initialize Firebase Auth SDK
  const auth = createAuthSDK({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
    appId: process.env.REACT_APP_FIREBASE_APP_ID!,
    enabledProviders: {
      google: true,
      facebook: true,
      github: true
    }
  });
  
  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    // Clean up subscription
    return unsubscribe;
  }, []);
  
  const handleSignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmail(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName || user.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>Please Sign In</h1>
          <form onSubmit={handleSignInWithEmail}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
            <button type="submit">Sign In</button>
          </form>
          <button onClick={() => auth.signInWithGoogle()}>Sign In with Google</button>
          <button onClick={() => auth.signInWithGithub()}>Sign In with GitHub</button>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Check that you've correctly provided all required Firebase configuration values.

2. **Provider not enabled**: Make sure to enable the auth providers in:
   - The Firebase console (Authentication → Sign-in method)
   - Your SDK initialization (enabledProviders setting)

3. **Invalid Credentials**: For email/password sign-in, ensure the user exists and credentials are correct.

4. **Unauthorized Domain**: Verify that your app's domain is authorized in Firebase console under Authentication → Settings → Authorized domains.

### Error Handling

All SDK methods handle basic errors internally and log them to console, but you should implement your own error handling for production apps:

```typescript
try {
  const result = await auth.signInWithGoogle();
  if (!result) {
    // Handle sign-in failure
    throw new Error('Sign-in failed');
  }
  // Handle successful sign-in
} catch (error) {
  // Handle specific error types
  if (error.code === 'auth/account-exists-with-different-credential') {
    // Handle account linking
  } else if (error.code === 'auth/popup-blocked') {
    // Handle popup blocked
  } else {
    // Handle other errors
  }
}
```

## Advanced Usage

### Custom Claims and User Properties

To get custom claims or additional user properties after authentication:

```typescript
async function getUserClaims() {
  const user = auth.getCurrentUser();
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    console.log('User custom claims:', idTokenResult.claims);
    return idTokenResult.claims;
  }
  return null;
}
```

### Getting the ID Token

To get the user's ID token for use with authenticated backend services:

```typescript
async function getUserToken() {
  const user = auth.getCurrentUser();
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  return null;
}
```

## Security Best Practices

1. **Never store API keys in client-side code** for production apps. Use environment variables or a secure backend approach.

2. **Implement proper validation** on both client and server side.

3. **Set up Firebase Security Rules** to control access to your Firebase resources.

4. **Enable Multi-Factor Authentication** for sensitive applications.

5. **Regularly audit user accounts** and review authentication logs in the Firebase console. 