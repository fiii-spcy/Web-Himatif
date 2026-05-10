import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

if (!hasFirebaseConfig) {
  // Keep it non-fatal for local dev; join flow will surface errors on use.
  // eslint-disable-next-line no-console
  console.warn(
    "[firebase] Missing one or more VITE_FIREBASE_* environment variables."
  );
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

