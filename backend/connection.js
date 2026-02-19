import admin from "firebase-admin";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

// Initialize Firebase Admin SDK
export const initializeFirebase = () => {
  try {
    // Check if Firebase app is already initialized
    if (admin.apps.length > 0) {
      console.log("✅ Firebase already initialized");
      return admin.firestore();
    }

    // Parse the Firebase service account JSON from environment variable
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT || "{}"
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    console.log("✅ Connected to Firebase");
    return admin.firestore();
  } catch (error) {
    console.error("❌ Error initializing Firebase: ", error);
    process.exit(1);
  }
};

// Export Firestore instance
export let db;

export const getFirestore = () => {
  if (!db) {
    db = initializeFirebase();
  }
  return db;
};
