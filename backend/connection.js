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

    // Parse the Firebase service account JSON from environment variable.
    // Trim surrounding single/double quotes that can appear when the env var
    // is set via a .env file using  KEY='{ ... }' syntax.
    let serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT || "{}";
    serviceAccountRaw = serviceAccountRaw.trim().replace(/^['"]|['"]$/g, "");

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountRaw);
    } catch (parseErr) {
      throw new Error(
        `Failed to parse FIREBASE_SERVICE_ACCOUNT JSON: ${parseErr.message}. ` +
          "Make sure the value in Render's environment variables is raw JSON without surrounding quotes.",
      );
    }

    if (!serviceAccount.project_id) {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT env var is missing or malformed — project_id not found.",
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Connected to Firebase");
    return admin.firestore();
  } catch (error) {
    // Don't exit — log the error so Render doesn't restart loop
    console.error("❌ Error initializing Firebase:", error.message);
    console.error(
      "⚠️  Server will continue running but DB operations will fail until env vars are fixed.",
    );
    return null;
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
