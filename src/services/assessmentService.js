import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const assessmentQuestionsRef = collection(
    db,
    "assessmentQuestions"
);

/**
 * Get assessment questions based on
 * selected domain and experience level.
 */
export const getAssessmentQuestions = async (
    domain,
    level,
    numQuestions
) => {
    const q = query(
        assessmentQuestionsRef,
        where("domain", "==", domain),
        where("level", "==", level)
    );

    const snapshot = await getDocs(q);

    const questions = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    }));

    // Randomize question order
    const shuffledQuestions = [...questions].sort(
        () => Math.random() - 0.5
    );

    // Return only the requested number
    return shuffledQuestions.slice(0, numQuestions);
};


/**
 * Save a completed assessment result.
 */
export const saveAssessmentResultToFirestore = async ({
    studentId,
    domain,
    level,
    experienceYears,
    experienceMonths,
    totalQuestions,
    correctCount,
    score,
    domainScores,
    strengths,
    weaknesses,
    aiFeedback,
}) => {
    const result = {
        studentId,
        domain,
        level,
        experienceYears: Number(experienceYears || 0),
        experienceMonths: Number(experienceMonths || 0),
        totalQuestions,
        correctCount,
        score,
        domainScores,
        strengths,
        weaknesses,
        aiFeedback,
        completedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, "assessmentResults"),
        result
    );

    return {
        id: docRef.id,
        ...result,
    };
};