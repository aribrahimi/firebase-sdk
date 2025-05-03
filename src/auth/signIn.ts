import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  OAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  UserCredential 
} from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Google sign-in error:', error);
    return null;
  }
}

export async function signInWithFacebook(): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Facebook sign-in error:', error);
    return null;
  }
}

export async function signInWithApple(): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    const provider = new OAuthProvider('apple.com');
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Apple sign-in error:', error);
    return null;
  }
}

export async function signInWithGithub(): Promise<UserCredential | null> {
  try {
    const auth = getFirebaseAuth();
    const provider = new GithubAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    return null;
  }
} 