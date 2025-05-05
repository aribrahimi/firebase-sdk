import { User, getIdToken } from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';
import { AuthenticatedUser, AuthResult } from '../../types';

/**
 * Gets the current authenticated user and their Firebase ID token
 * 
 * @param forceRefresh Whether to force refresh the token (default: false)
 * @returns Promise resolving to AuthResult containing AuthenticatedUser or error
 */
export async function getAuthenticatedUser(forceRefresh = false): Promise<AuthResult<AuthenticatedUser>> {
  try {
    const auth = getFirebaseAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return {
        success: false,
        data: null,
        error: {
          code: 'auth/no-user',
          message: 'No user is currently signed in',
        },
      };
    }
    
    // Get the Firebase ID token with optional force refresh
    const token = await getIdToken(currentUser, forceRefresh);
    
    // Create standardized authenticated user object
    const authenticatedUser: AuthenticatedUser = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
      token,
    };
    
    return {
      success: true,
      data: authenticatedUser,
    };
  } catch (error) {
    const authError = error as { code?: string; message?: string };
    return {
      success: false,
      data: null,
      error: {
        code: authError.code || 'auth/unknown',
        message: authError.message || 'An unknown error occurred',
      },
    };
  }
} 