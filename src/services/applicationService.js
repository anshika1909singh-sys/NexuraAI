import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const applicationsRef = collection(db, "applications");

// Student applies to an opportunity
export const applyToOpportunity = async ({
  opportunityId,
  studentId,
  studentName,
  studentEmail,
  studentCollege,
  studentDepartment,
}) => {
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

    // Snapshot of student profile
    studentName: studentName || "Nexura Student",
    studentEmail: studentEmail || "",
    studentCollege: studentCollege || "",
    studentDepartment: studentDepartment || "",

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

// Get applications belonging to the logged-in student
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

// Update application status
export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const applicationRef = doc(
    db,
    "applications",
    applicationId
  );

  await updateDoc(applicationRef, {
    status,
    updatedAt: serverTimestamp()
  });

  return {
    success: true,
    applicationId,
    status
  };
};

// Get applications for an industry's opportunities
export const getApplicationsForOpportunities = async (
  opportunityIds
) => {
  if (!opportunityIds?.length) {
    return [];
  }

  // Firestore "in" queries support a maximum of 30 values.
  const ids = opportunityIds.slice(0, 30);

  const q = query(
    applicationsRef,
    where("opportunityId", "in", ids)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));

};