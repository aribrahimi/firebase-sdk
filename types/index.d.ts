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
}

export type AuthSDKInstance = FirebaseAuthSDK; 