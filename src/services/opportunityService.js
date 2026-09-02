import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const opportunitiesRef = collection(db, "opportunities");

// Get all opportunities
export const getOpportunities = async () => {
  const snapshot = await getDocs(opportunitiesRef);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Create a new opportunity
export const createOpportunity = async (opportunity) => {
  const docRef = await addDoc(opportunitiesRef, {
    ...opportunity,
    createdAt: new Date(),
  });

  return {
    id: docRef.id,
    ...opportunity,
  };
};

// Update an opportunity
export const updateOpportunity = async (opportunityId, updates) => {
  const opportunityRef = doc(
    db,
    "opportunities",
    opportunityId
  );

  await updateDoc(opportunityRef, updates);
};