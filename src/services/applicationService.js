import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const applicationsRef = collection(db, "applications");

export const applyToOpportunity = async ({
  opportunityId,
  studentId,
}) => {
  // Check for an existing application
  const existingQuery = query(
    applicationsRef,
    where("opportunityId", "==", opportunityId),
    where("studentId", "==", studentId)
  );

  const existingSnapshot = await getDocs(existingQuery);

  if (!existingSnapshot.empty) {
    return {
      success: false,
      alreadyApplied: true,
      id: existingSnapshot.docs[0].id,
    };
  }

  const application = {
    opportunityId,
    studentId,
    status: "applied",
    appliedAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    applicationsRef,
    application
  );

  return {
    success: true,
    id: docRef.id,
    ...application,
  };
};

export const getStudentApplications = async (studentId) => {
  const q = query(
    applicationsRef,
    where("studentId", "==", studentId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};