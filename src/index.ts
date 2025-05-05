import { FirebaseConfig, FirebaseAuthSDK, AuthSDKInstance } from '../types';
import { initializeFirebase } from './firebaseClient';
import { signInWithGoogle, signInWithFacebook, signInWithApple, signInWithGithub } from './auth/signIn';
import { signInWithEmail, signUpWithEmail, sendPasswordReset, sendEmailVerificationToUser } from './auth/emailAuth';
import { signOut } from './auth/signOut';
import { getCurrentUser } from './auth/getCurrentUser';
import { onAuthStateChanged } from './auth/onAuthStateChanged';
import { getAuthenticatedUser } from './auth/getAuthenticatedUser';
import { 
  verifyResetCode, 
  completePasswordReset, 
  changePassword, 
  sendVerificationEmail, 
  verifyEmail, 
  getUserRole, 
  ensureUserExists 
} from './auth/extendedAuth';

/**
 * Create an instance of the Firebase Auth SDK
 * 
 * @param config Firebase configuration including API keys and enabled providers
 * @returns An instance of the Firebase Auth SDK with methods for authentication
 */
export function createAuthSDK(config: FirebaseConfig): FirebaseAuthSDK {
  // Initialize Firebase with the provided config
  initializeFirebase(config);
  
  // Create and return the auth SDK interface
  const authSDK: AuthSDKInstance = {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    sendEmailVerificationToUser,
    signOut,
    getCurrentUser,
    onAuthStateChanged,
    getAuthenticatedUser,
    
    // Extended methods
    verifyResetCode,
    completePasswordReset,
    changePassword,
    sendVerificationEmail,
    verifyEmail,
    getUserRole,
    ensureUserExists
  };
  
  return authSDK;
}

// Export types
export { FirebaseConfig, EnabledProviders, AuthenticatedUser, AuthResult } from '../types';
export type { User, UserCredential, Unsubscribe } from 'firebase/auth'; 