import { getFirestore } from "../connection.js";

// Collection name
const URLS_COLLECTION = "urls";

// Get reference to URLs collection
export const getUrlsCollection = () => {
  const db = getFirestore();
  if (!db) {
    throw new Error(
      "Firebase is not initialized. Check your FIREBASE_SERVICE_ACCOUNT env var.",
    );
  }
  return db.collection(URLS_COLLECTION);
};

// Find URL by shortId
export const findByShortId = async (shortId) => {
  const snapshot = await getUrlsCollection()
    .where("shortId", "==", shortId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// Find URL by redirectUrl
export const findByRedirectUrl = async (redirectUrl) => {
  const snapshot = await getUrlsCollection()
    .where("redirectUrl", "==", redirectUrl)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// Create a new URL document
export const createUrl = async (data) => {
  const docRef = await getUrlsCollection().add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id: docRef.id, ...data };
};

// Update URL document (for visit history)
export const updateUrl = async (shortId, updateData) => {
  const snapshot = await getUrlsCollection()
    .where("shortId", "==", shortId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const docRef = snapshot.docs[0].ref;
  await docRef.update({
    ...updateData,
    updatedAt: new Date(),
  });

  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};
