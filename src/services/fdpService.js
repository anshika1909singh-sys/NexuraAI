import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const fdpProgramsRef = collection(db, "fdpPrograms");

const fdpApplicationsRef = collection(
  db,
  "fdpApplications"
);

export const getFdpPrograms = async () => {
  const snapshot = await getDocs(fdpProgramsRef);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
};

export const createFdpProgram = async (program) => {
  const docRef = await addDoc(fdpProgramsRef, {
    ...program,
    createdAt: serverTimestamp()
  });

  return {
    id: docRef.id,
    ...program
  };
};

export const applyToFdp = async ({
  fdpId,
  facultyId,
  facultyName,
  facultyEmail,
  department
}) => {

  const existingQuery = query(
    fdpApplicationsRef,
    where("fdpId", "==", fdpId),
    where("facultyId", "==", facultyId)
  );

  const existingSnapshot =
    await getDocs(existingQuery);

  if (!existingSnapshot.empty) {
    return {
      success: false,
      alreadyApplied: true
    };
  }

  const application = {
    fdpId,
    facultyId,
    facultyName: facultyName || "Faculty Member",
    facultyEmail: facultyEmail || "",
    department: department || "",
    status: "Registered",
    appliedAt: serverTimestamp()
  };

  const docRef =
    await addDoc(
      fdpApplicationsRef,
      application
    );

  const programRef =
    doc(db, "fdpPrograms", fdpId);

  await updateDoc(programRef, {
    enrolled: increment(1)
  });

  return {
    success: true,
    id: docRef.id,
    ...application
  };
};