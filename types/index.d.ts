import { User, Auth, UserCredential, Unsubscribe } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  enabledProviders?: EnabledProviders;
}

export interface EnabledProviders {
  google?: boolean;
  facebook?: boolean;
  apple?: boolean;
  github?: boolean;
}

/**
 * Standardized user object with authentication token
 */
export interface AuthenticatedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  token: string;
}

/**
 * Result wrapper for authentication operations
 */
export interface AuthResult<T = AuthenticatedUser | null> {
  success: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
}

export interface FirebaseAuthSDK {
  signInWithGoogle(): Promise<UserCredential | null>;
  signInWithFacebook(): Promise<UserCredential | null>;
  signInWithApple(): Promise<UserCredential | null>;
  signInWithGithub(): Promise<UserCredential | null>;
  signInWithEmail(email: string, password: string): Promise<UserCredential | null>;
  signUpWithEmail(email: string, password: string): Promise<UserCredential | null>;
  sendPasswordReset(email: string): Promise<void>;
  sendEmailVerificationToUser(): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): User | null;
  onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe;
  
  // Additional methods used in the application
  verifyResetCode?(code: string): Promise<string>;
  completePasswordReset?(code: string, newPassword: string): Promise<void>;
  changePassword?(currentPassword: string, newPassword: string): Promise<void>;
  sendVerificationEmail?(): Promise<void>;
  verifyEmail?(code: string): Promise<void>;
  getUserRole?(userId: string): Promise<string>;
  ensureUserExists?(user: User, defaultRole: string): Promise<void>;
  
  // New token management methods
  getAuthenticatedUser(forceRefresh?: boolean): Promise<AuthResult<AuthenticatedUser>>;
}

export type AuthSDKInstance = FirebaseAuthSDK; 