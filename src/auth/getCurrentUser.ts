import { User } from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';

export function getCurrentUser(): User | null {
  const auth = getFirebaseAuth();
  return auth.currentUser;
} 