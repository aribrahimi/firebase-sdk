# Firebase Auth SDK

[![npm version](https://img.shields.io/npm/v/@kaayan/firebase-auth-sdk.svg)](https://www.npmjs.com/package/@kaayan/firebase-auth-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0%2B-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0%2B-orange)](https://firebase.google.com/)

A lightweight, UI-free TypeScript Firebase Authentication SDK that provides a clean, reusable interface for Firebase Auth services.

## Features

- 🔐 Complete authentication solution for Firebase projects
- 📱 Multiple auth providers: Google, Facebook, Apple, GitHub, Email/Password
- 🛠️ Password management: reset, email verification
- 👤 User session management
- 📦 TypeScript support with full type definitions
- 🔄 Auth state change subscription
- 🔧 Zero UI dependencies - integrate with any frontend

## Installation

```bash
npm install @kaayan/firebase-auth-sdk
```

Or with yarn:

```bash
yarn add @kaayan/firebase-auth-sdk
```

## Quick Start

```typescript
import { createAuthSDK } from '@kaayan/firebase-auth-sdk';

// Initialize the SDK with your Firebase project config
const auth = createAuthSDK({
  apiKey: 'your-api-key',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  appId: 'your-app-id',
  enabledProviders: {
    google: true,
    facebook: true,
    apple: false,
    github: true
  }
});

// Use any auth method
const user = auth.getCurrentUser();
```

## Documentation

### Authentication Methods

#### Social Authentication

```typescript
// Google Sign-In
const googleUser = await auth.signInWithGoogle();

// Facebook Sign-In
const facebookUser = await auth.signInWithFacebook();

// Apple Sign-In
const appleUser = await auth.signInWithApple();

// GitHub Sign-In
const githubUser = await auth.signInWithGithub();
```

#### Email Authentication

```typescript
// Sign in with email/password
const user = await auth.signInWithEmail(email, password);

// Create a new account
const newUser = await auth.signUpWithEmail(email, password);

// Send password reset email
await auth.sendPasswordReset(email);

// Send email verification (for current user)
await auth.sendEmailVerificationToUser();
```

#### Session Management

```typescript
// Get current user
const user = auth.getCurrentUser();

// Sign out
await auth.signOut();

// Subscribe to auth state changes
const unsubscribe = auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User signed in:', user.uid);
  } else {
    console.log('User signed out');
  }
});

// Unsubscribe when no longer needed
unsubscribe();
```

## Usage Examples

### Sign in with Google

```typescript
async function handleGoogleSignIn() {
  try {
    const result = await auth.signInWithGoogle();
    console.log('Google sign-in successful:', result);
  } catch (error) {
    console.error('Google sign-in failed:', error);
  }
}
```

### Sign in with GitHub

```typescript
async function handleGithubSignIn() {
  try {
    const result = await auth.signInWithGithub();
    console.log('GitHub sign-in successful:', result);
  } catch (error) {
    console.error('GitHub sign-in failed:', error);
  }
}
```

### Email/Password Authentication

```typescript
// Sign in
async function handleEmailSignIn(email: string, password: string) {
  try {
    const result = await auth.signInWithEmail(email, password);
    console.log('Email sign-in successful:', result);
  } catch (error) {
    console.error('Email sign-in failed:', error);
  }
}

// Sign up
async function handleEmailSignUp(email: string, password: string) {
  try {
    const result = await auth.signUpWithEmail(email, password);
    console.log('Email sign-up successful:', result);
    
    // Send email verification after sign-up
    await auth.sendEmailVerificationToUser();
    console.log('Verification email sent');
  } catch (error) {
    console.error('Email sign-up failed:', error);
  }
}
```

### Password Management

```typescript
// Reset password
async function handlePasswordReset(email: string) {
  try {
    await auth.sendPasswordReset(email);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Password reset failed:', error);
  }
}
```

## Project Structure

```
firebase-auth-sdk/
├── src/
│   ├── index.ts               # Entry point for SDK
│   ├── config.ts              # SDK config schema + default config
│   ├── firebaseClient.ts      # Initializes Firebase app
│   ├── auth/
│   │   ├── signIn.ts          # Handles sign-in with provider
│   │   ├── emailAuth.ts       # Email/password authentication
│   │   ├── signOut.ts         # Sign out logic
│   │   ├── getCurrentUser.ts  # Return current user
│   │   └── onAuthStateChanged.ts # Subscribe to auth changes
├── types/
│   └── index.d.ts             # Types for config and auth
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
