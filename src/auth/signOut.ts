import { signOut as firebaseSignOut } from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';

export async function signOut(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
} 