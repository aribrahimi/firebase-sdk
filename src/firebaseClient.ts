import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseConfig } from '../types';
import { validateConfig } from './config';

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;

export function initializeFirebase(config: FirebaseConfig): { app: FirebaseApp, auth: Auth } {
  // Validate config
  validateConfig(config);
  
  // Initialize Firebase if not already initialized
  if (!firebaseApp) {
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      appId: config.appId
    };
    
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  }
  
  if (!auth) {
    throw new Error('Failed to initialize Firebase Auth');
  }
  
  return { app: firebaseApp, auth };
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    throw new Error('Firebase Auth not initialized. Call initializeFirebase first.');
  }
  
  return auth;
} 