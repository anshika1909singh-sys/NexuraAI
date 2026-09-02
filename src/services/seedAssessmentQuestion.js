import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { ASSESSMENT_QUESTIONS } from "../data/mockData";

const assessmentQuestionsRef = collection(
    db,
    "assessmentQuestions"
);

const domainMapping = {
    "Frontend & UI Architecture": "Frontend Engineering",
    "AI & Python Backend": "AI & Full Stack",
    "Data Structures & Algorithms": "Software Engineering",
    "Cloud, DevOps & Containers": "DevOps & Cloud",
    "AI & Machine Learning Foundations":
        "Machine Learning & Deep Learning",
    "Backend & API Engineering": "Backend Engineering",
};

export const seedAssessmentQuestions = async () => {
    try {
        const existing = await getDocs(
            assessmentQuestionsRef
        );

        if (!existing.empty) {
            console.log(
                "Assessment questions already seeded."
            );
            return;
        }

        for (const question of ASSESSMENT_QUESTIONS) {
            await addDoc(assessmentQuestionsRef, {
                domain:
                    domainMapping[question.domain] ||
                    question.domain,

                level: "Intermediate",

                question: question.question,

                options: question.options,

                correct: question.correct,

                skill: question.skill,

                explanation: question.explanation,

                createdAt: new Date(),
            });
        }

        console.log(
            "Assessment questions successfully seeded."
        );
    } catch (error) {
        console.error(
            "Error seeding assessment questions:",
            error
        );
    }
};