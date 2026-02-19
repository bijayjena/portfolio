import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, signInAnonymously, Auth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator, Functions } from "firebase/functions";

// Your web app's Firebase configuration
// Get these values from Firebase Console > Project Settings > General
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

// Initialize Firebase (only once and only if configured)
let app: FirebaseApp | null = null;
if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
}

// Initialize Firebase services (only if configured)
export const auth: Auth | null = app ? getAuth(app) : null;
export const functions: Functions | null = app ? getFunctions(app) : null;

// Connect to emulator in development
if (app && functions && import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// Sign in anonymously for chatbot access
export const ensureAuthenticated = async () => {
  if (!auth) {
    console.warn("Firebase not configured. Skipping authentication.");
    return null;
  }
  
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously for chatbot access");
    } catch (error) {
      console.error("Failed to sign in anonymously:", error);
      throw error;
    }
  }
  return auth.currentUser;
};

export default app;
