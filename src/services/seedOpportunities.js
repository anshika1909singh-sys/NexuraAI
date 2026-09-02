import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { INITIAL_OPPORTUNITIES } from "../data/mockData";

export const seedOpportunities = async () => {
  const opportunitiesRef = collection(db, "opportunities");

  const existing = await getDocs(opportunitiesRef);

  if (!existing.empty) {
    console.log("Opportunities already seeded.");
    return;
  }

  for (const opportunity of INITIAL_OPPORTUNITIES) {
    const {
      id,
      ...data
    } = opportunity;

    await addDoc(opportunitiesRef, {
      ...data,
      createdAt: new Date(),
    });
  }

  console.log("Opportunities successfully seeded.");
};