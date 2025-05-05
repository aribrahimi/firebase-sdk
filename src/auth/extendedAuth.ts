import { 
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  applyActionCode,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from 'firebase/auth';
import { getFirebaseAuth } from '../firebaseClient';
import { sendEmailVerificationToUser } from './emailAuth';

/**
 * Verify password reset code
 */
export async function verifyResetCode(code: string): Promise<string> {
  try {
    const auth = getFirebaseAuth();
    return await verifyPasswordResetCode(auth, code);
  } catch (error) {
    console.error('Verify reset code error:', error);
    throw error;
  }
}

/**
 * Complete password reset with code and new password
 */
export async function completePasswordReset(code: string, newPassword: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await confirmPasswordReset(auth, code, newPassword);
  } catch (error) {
    console.error('Complete password reset error:', error);
    throw error;
  }
}

/**
 * Change user password (requires reauthentication)
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user || !user.email) {
      throw new Error('No user is currently signed in or user has no email');
    }
    
    // Reauthenticate the user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
}

/**
 * Alias for sendEmailVerificationToUser to match the application
 */
export async function sendVerificationEmail(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    await sendEmailVerificationToUser();
  } catch (error) {
    console.error('Send verification email error:', error);
    throw error;
  }
}

/**
 * Verify email with code
 */
export async function verifyEmail(code: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await applyActionCode(auth, code);
  } catch (error) {
    console.error('Verify email error:', error);
    throw error;
  }
}

/**
 * Get user role (placeholder - actual implementation would depend on your database structure)
 */
export async function getUserRole(userId: string): Promise<string> {
  // This is a placeholder. In a real implementation, you would query your database
  // to get the user's role based on the userId
  console.log(`Getting role for user ID: ${userId}`);
  return 'free'; // Default role
}

/**
 * Ensure user exists in the database (placeholder)
 */
export async function ensureUserExists(user: User, defaultRole: string): Promise<void> {
  // This is a placeholder. In a real implementation, you would check if the user
  // exists in your database and create them if not
  console.log(`Ensuring user exists: ${user.uid}, default role: ${defaultRole}`);
} 