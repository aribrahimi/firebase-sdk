import { User, onAuthStateChanged as firebaseAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';

export function onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
  const auth = getFirebaseAuth();
  return firebaseAuthStateChanged(auth, callback);
} 