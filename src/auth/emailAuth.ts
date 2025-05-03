import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification,
  UserCredential
} from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Email sign-in error:', error);
    return null;
  }
}

/**
 * Create a new user with email and password
 */
export async function signUpWithEmail(email: string, password: string): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Email sign-up error:', error);
    return null;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Send password reset error:', error);
    throw error;
  }
}

/**
 * Send email verification to currently signed-in user
 */
export async function sendEmailVerificationToUser(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    await sendEmailVerification(currentUser);
  } catch (error) {
    console.error('Send email verification error:', error);
    throw error;
  }
} 