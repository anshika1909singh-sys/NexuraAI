import { useAuth } from "./AuthContext";
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import {
  CAMPUS_EVENTS,
  FACULTY_DIRECTORY,
  GUIDANCE_REQUESTS,
  CANDIDATE_POOL
} from "../data/mockData";

import {
  getOpportunities,
  createOpportunity
} from "../services/opportunityService";

import {
  applyToOpportunity as createApplication,
  getStudentApplications,
  getApplicationsForOpportunities,
  updateApplicationStatus
} from "../services/applicationService";

import {
  saveAssessmentResultToFirestore
} from "../services/assessmentService";

import {
  getFdpPrograms,
  createFdpProgram,
  applyToFdp
} from "../services/fdpService";


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // =========================================================
  // OPPORTUNITIES
  // =========================================================

  const [opportunities, setOpportunities] = useState([]);

  // =========================================================
  // APPLICATIONS
  // =========================================================

  const [applications, setApplications] = useState([]);
  
const updateIndustryApplicationStatus = async (
  applicationId,
  status,
  interviewAt
) => {
  try {
    const result =
      await updateApplicationStatus(
        applicationId,
        status,
        interviewAt
      );

    setIndustryApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status,
              ...(interviewAt !== undefined
                ? { interviewAt }
                : {})
            }
          : application
      )
    );

    return result;

  } catch (error) {
    console.error(
      "Error updating application status:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Unable to update application status."
    };
  }
};

  const [industryApplications, setIndustryApplications] = useState([]);
  // =========================================================
  // CAPABILITY PROJECTS
  // =========================================================

  const [capabilityProjects, setCapabilityProjects] = useState([]);


// =========================================================
// CAMPUS EVENTS
// =========================================================

const [campusEvents, setCampusEvents] = useState(
  CAMPUS_EVENTS
);
// =========================================================
// GUIDANCE REQUESTS
// =========================================================

const [guidanceRequests, setGuidanceRequests] = useState(
  GUIDANCE_REQUESTS
);
  // =========================================================
  // FDP PROGRAMS
  // =========================================================

  const [fdpPrograms, setFdpPrograms] = useState([]);

// =========================================================
// CANDIDATE POOL
// =========================================================

const [candidatePool, setCandidatePool] = useState(
  CANDIDATE_POOL
);

const [facultyList] = useState(
  FACULTY_DIRECTORY
);
  // =========================================================
  // ASSESSMENT RESULT
  // =========================================================

  const [assessmentResult, setAssessmentResult] = useState({
            taken: false,
            score: 0,
            totalQuestions: 0,
            correctCount: 0,
            date: null,
            domain: null,
            level: null,
            experienceYears: 0,
            experienceMonths: 0,
            domainScores: {},
            strengths: [],
            weaknesses: [],
            aiFeedback:
              "Complete the assessment to receive your personalized AI analysis."
          });

  // =========================================================
  // PERSONALIZED ROADMAP
  // =========================================================

  const [roadmapSteps, setRoadmapSteps] = useState([]);

  useEffect(() => {
    setApplications([]);
    setIndustryApplications([]);
    setCapabilityProjects([]);
    setCampusEvents(CAMPUS_EVENTS);
    setGuidanceRequests(GUIDANCE_REQUESTS);
    setFdpPrograms([]);
    setCandidatePool(CANDIDATE_POOL);
    setAssessmentResult({
      taken: false,
      score: 0,
      totalQuestions: 0,
      correctCount: 0,
      date: null,
      domain: null,
      level: null,
      experienceYears: 0,
      experienceMonths: 0,
      domainScores: {},
      strengths: [],
      weaknesses: [],
      aiFeedback: "Complete the assessment to receive your personalized AI analysis."
    });
    setRoadmapSteps([]);
  }, [currentUser?.uid]);

  // =========================================================
  // LOAD OPPORTUNITIES FROM FIRESTORE
  // =========================================================

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await getOpportunities();

        setOpportunities(data);
      } catch (error) {
        console.error(
          "Error loading opportunities:",
          error
        );
      }
    };

    loadOpportunities();
  }, []);
  // =========================================================
// LOAD INDUSTRY APPLICATIONS
// =========================================================

useEffect(() => {
  const loadIndustryApplications = async () => {

    // Only Industry users need this data
    if (
      !currentUser?.uid ||
      currentUser?.role !== "industry"
    ) {
      setIndustryApplications([]);
      return;
    }

    try {

      // Find opportunities owned by this Industry account
      const industryOpportunities =
        opportunities.filter(
          (opp) =>
            opp.industryId === currentUser.uid
        );

      const opportunityIds =
        industryOpportunities.map(
          (opp) => opp.id
        );

      // No opportunities = no applications
      if (!opportunityIds.length) {
        setIndustryApplications([]);
        return;
      }

      // Get applications for those opportunities
      const data =
        await getApplicationsForOpportunities(
          opportunityIds
        );

      // Add opportunity information to each application
      const formattedApplications =
        data.map((application) => {

          const opportunity =
            industryOpportunities.find(
              (opp) =>
                opp.id ===
                application.opportunityId
            );

          return {
            ...application,

            opportunityTitle:
              opportunity?.title ||
              "Opportunity",

            company:
              opportunity?.company ||
              currentUser.company ||
              ""
          };
        });

      setIndustryApplications(
        formattedApplications
      );

    } catch (error) {

      console.error(
        "Error loading industry applications:",
        error
      );

      setIndustryApplications([]);
    }
  };

  loadIndustryApplications();

}, [currentUser, opportunities]);


  // =========================================================
  // LOAD STUDENT APPLICATIONS
  // =========================================================

  useEffect(() => {
    const loadApplications = async () => {
      if (!currentUser?.uid) {
        setApplications([]);
        return;
      }

      try {
        const data =
          await getStudentApplications(
            currentUser.uid
          );

        const formattedApplications =
          data.map((app) => {
            const opportunity =
              opportunities.find(
                (opp) =>
                  opp.id === app.opportunityId
              );

            let appliedDate = "";

            if (app.appliedAt) {
              try {
                appliedDate =
                  app.appliedAt
                    .toDate()
                    .toISOString()
                    .split("T")[0];
              } catch (error) {
                appliedDate = "";
              }
            }

            const statusSteps = {
              applied: { status: "Applied", step: 1 },
              shortlisted: { status: "Shortlisted", step: 2 },
              "interview scheduled": {
                status: "Interview Scheduled",
                step: 3
              },
              hired: { status: "Hired", step: 4 }
            };
            const normalizedStatus = String(app.status || "Applied")
              .trim()
              .toLowerCase();
            const applicationStatus =
              statusSteps[normalizedStatus] || statusSteps.applied;

            return {
              ...app,
              ...applicationStatus,

              title:
                opportunity?.title ||
                "Opportunity",

              company:
                opportunity?.company ||
                "",

              appliedDate,

              feedback:
                "Application successfully received by the recruitment team.",

              interviewDate: app.interviewAt || null
            };
          });

        setApplications(
          formattedApplications
        );
      } catch (error) {
        console.error(
          "Error loading applications:",
          error
        );
      }
    };

    loadApplications();
  }, [currentUser, opportunities]);

  // =========================================================
  // APPLY TO OPPORTUNITY
  // =========================================================

  const applyToOpportunity = async (
    oppId
  ) => {
    if (!currentUser) {
      return {
        success: false,
        message: "Please login to apply."
      };
    }

    try {
      const result =
  await createApplication({
    opportunityId: oppId,
    studentId: currentUser.uid,

    studentName:
      currentUser.name,

    studentEmail:
      currentUser.email,

    studentCollege:
      currentUser.college,

    studentDepartment:
      currentUser.department
  });

      if (result.alreadyApplied) {
        return {
          success: false,
          alreadyApplied: true,
          message:
            "You have already applied to this opportunity."
        };
      }

      const opportunity =
        opportunities.find(
          (opp) => opp.id === oppId
        );

      const newApplication = {
        id: result.id,
        opportunityId: oppId,
        studentId: currentUser.uid,

        title:
          opportunity?.title ||
          "Opportunity",

        company:
          opportunity?.company ||
          "",

        status: "Applied",

        step: 1,

        feedback:
          "Application successfully received by the recruitment team.",

        interviewDate: null,

        appliedDate:
          new Date()
            .toISOString()
            .split("T")[0]
      };

      setApplications((prev) => [
        newApplication,
        ...prev
      ]);

      return {
        success: true,

        message:
          `Successfully applied to ${
            opportunity?.title ||
            "this opportunity"
          }!`,

        application:
          newApplication
      };
    } catch (error) {
      console.error(
        "Application error:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Unable to submit application."
      };
    }
  };

  // =========================================================
  // POST NEW OPPORTUNITY
  // =========================================================

  const postNewOpportunity = async (newOpp) => {
  if (!currentUser?.uid) {
    return {
      success: false,
      message: "Please login as an industry user."
    };
  }

  try {
    const opportunity = {
      ...newOpp,

      industryId: currentUser.uid,

      postedBy: "Industry",

      postedDate: "Just now",

      status: "Open",

      matchScore:
        Math.floor(Math.random() * 20) + 75,

      logo:
        newOpp.logo ||
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=100&auto=format&fit=crop&q=80",

      createdAt: new Date()
    };

    const createdOpportunity =
      await createOpportunity(opportunity);

    setOpportunities((prev) => [
      createdOpportunity,
      ...prev
    ]);

    return {
      success: true,
      opportunity: createdOpportunity
    };

  } catch (error) {
    console.error(
      "Error posting opportunity:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Unable to publish opportunity."
    };
  }
};

  // =========================================================
  // SAVE ASSESSMENT RESULT
  // =========================================================

  const saveAssessmentResult = async (
    score,
    correctCount,
    totalQuestions,
    domainScores,
    strengths,
    weaknesses,
    aiFeedback,
    assessmentProfile
  ) => {

    // -------------------------------------------------------
    // CHECK LOGIN
    // -------------------------------------------------------

    if (!currentUser?.uid) {
      console.error(
        "Cannot save assessment: user is not logged in."
      );

      return {
        success: false,
        message:
          "Please login before completing the assessment."
      };
    }

    // -------------------------------------------------------
    // GET ACTUAL ASSESSMENT PROFILE
    // -------------------------------------------------------

    const domain =
      assessmentProfile?.domain ||
      "General";

    const level =
      assessmentProfile?.level ||
      "Intermediate";

    const experienceYears =
      Number(
        assessmentProfile?.experienceYears ||
          0
      );

    const experienceMonths =
      Number(
        assessmentProfile?.experienceMonths ||
          0
      );

    // -------------------------------------------------------
    // CREATE THE NEW RESULT
    // -------------------------------------------------------

    const result = {
      taken: true,

      score,

      correctCount,

      totalQuestions,

      date:
        new Date()
          .toISOString()
          .split("T")[0],

      domain,

      level,

      experienceYears,

      experienceMonths,

      domainScores,

      strengths,

      weaknesses,

      aiFeedback
    };

    // -------------------------------------------------------
    // UPDATE UI IMMEDIATELY
    //
    // This is the important fix.
    // The result displayed on screen comes from the
    // assessment that was JUST completed.
    // -------------------------------------------------------

    setAssessmentResult(result);

    // -------------------------------------------------------
    // GENERATE PERSONALIZED ROADMAP
    // -------------------------------------------------------

    const primaryWeakness =
      weaknesses?.[0] ||
      "Core Technical Foundations";

    const secondaryWeakness =
      weaknesses?.[1] ||
      "Advanced Technical Concepts";

    const tertiaryWeakness =
      weaknesses?.[2] ||
      "Industry Readiness";

    const timestamp =
      Date.now();

    const newRoadmap = [
      {
        id:
          "step_" +
          timestamp +
          "_1",

        title:
          `Phase 1: Core Mastery in ${primaryWeakness}`,

        focusArea:
          `Targeting assessed weakness: ${primaryWeakness}`,

        completed: false,

        estimatedDays:
          "3 Days",

        tasks: [
          {
            text:
              `Deep dive into theoretical concepts for ${primaryWeakness}`,

            done: false
          },

          {
            text:
              "Build a mini hands-on sandbox project implementing key concepts",

            done: false
          },

          {
            text:
              "Complete diagnostic practice quiz to verify improvement",

            done: false
          }
        ],

        resourceLink:
          "https://developer.mozilla.org/"
      },

      {
        id:
          "step_" +
          timestamp +
          "_2",

        title:
          `Phase 2: Advanced Application in ${secondaryWeakness}`,

        focusArea:
          `Targeting assessed weakness: ${secondaryWeakness}`,

        completed: false,

        estimatedDays:
          "4 Days",

        tasks: [
          {
            text:
              `Configure and practice advanced concepts related to ${secondaryWeakness}`,

            done: false
          },

          {
            text:
              "Integrate the concept into a practical project",

            done: false
          },

          {
            text:
              "Deploy and test the resulting implementation",

            done: false
          }
        ],

        resourceLink:
          "https://huggingface.co/"
      },

      {
        id:
          "step_" +
          timestamp +
          "_3",

        title:
          "Phase 3: Industry Capability Project Submission & Certification",

        focusArea:
          `Convert improvement in ${tertiaryWeakness} into verified proof of work`,

        completed: false,

        estimatedDays:
          "3 Days",

        tasks: [
          {
            text:
              "Pick a role-aligned capability project from the Skills & Certifications Hub",

            done: false
          },

          {
            text:
              "Submit GitHub repository and live demo URL for automated AI review",

            done: false
          },

          {
            text:
              "Earn a verified certificate badge to strengthen your recruiter profile",

            done: false
          }
        ],

        resourceLink:
          "#capability-projects"
      }
    ];

    setRoadmapSteps(
      newRoadmap
    );

    // -------------------------------------------------------
    // SAVE TO FIRESTORE
    //
    // This happens AFTER the UI has already been updated.
    // -------------------------------------------------------

    try {
      const firestoreResult =
        await saveAssessmentResultToFirestore({
          studentId:
            currentUser.uid,

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

          aiFeedback
        });

      // Add Firestore document ID without
      // replacing the calculated result.

      setAssessmentResult(
        (previous) => ({
          ...previous,

          firestoreId:
            firestoreResult.id
        })
      );

      console.log(
        "Assessment result successfully saved to Firestore:",
        firestoreResult
      );

      return {
        success: true,

        result:
          firestoreResult
      };

    } catch (error) {

      console.error(
        "Firestore assessment save failed:",
        error
      );

      // The local result is already saved in state,
      // so Firestore failure does NOT bring back the
      // previous assessment result.

      return {
        success: false,

        message:
          error.message ||
          "Assessment calculated, but Firestore save failed.",

        localResult:
          result
      };
    }
  };

  // =========================================================
  // TOGGLE ROADMAP TASK
  // =========================================================

  const toggleRoadmapTask = (
    stepId,
    taskIndex
  ) => {

    setRoadmapSteps((prev) =>
      prev.map((step) => {

        if (step.id === stepId) {

          const updatedTasks =
            step.tasks.map(
              (task, idx) =>
                idx === taskIndex
                  ? {
                      ...task,
                      done:
                        !task.done
                    }
                  : task
            );

          const allDone =
            updatedTasks.every(
              (task) =>
                task.done
            );

          return {
            ...step,

            tasks:
              updatedTasks,

            completed:
              allDone
          };
        }

        return step;
      })
    );
  };

  // =========================================================
  // SUBMIT CAPABILITY PROJECT
  // =========================================================

  const submitCapabilityProject = (
    projectId,
    repoUrl,
    liveUrl
  ) => {

    const certNumber =
      "NX-CERT-2026-" +
      Math.floor(
        1000 +
        Math.random() *
          9000
      );

    const score =
      Math.floor(
        Math.random() * 10
      ) + 88;

    setCapabilityProjects(
      (prev) =>
        prev.map((project) => {

          if (
            project.id ===
            projectId
          ) {

            return {
              ...project,

              status:
                "Completed",

              verifiedScore:
                score,

              certificateId:
                certNumber,

              submissionDate:
                new Date()
                  .toISOString()
                  .split("T")[0],

              repoUrl,

              liveUrl
            };
          }

          return project;
        })
    );

    return {
      success: true,

      score,

      certificateId:
        certNumber,

      message:
        `Project verified! AI Evaluation Score: ${score}/100. Verified certificate generated.`
    };
  };

  // =========================================================
  // FACULTY GUIDANCE
  // =========================================================

  const bookFacultyGuidance = (
    facultyId,
    facultyName,
    studentName,
    studentEmail,
    topic,
    message
  ) => {

    const newReq = {

      id:
        "req_" +
        Date.now(),

      facultyId,

      studentName,

      studentEmail,

      topic,

      facultyName,

      submittedDate:
        new Date()
          .toISOString()
          .split("T")[0],

      status:
        "Pending",

      meetingTime:
        null,

      message
    };

    setGuidanceRequests(
      (prev) => [
        newReq,
        ...prev
      ]
    );

    return {
      success: true,

      message:
        `Guidance request sent to ${facultyName}. You will receive a notification when scheduled.`
    };
  };

  // =========================================================
  // UPDATE GUIDANCE STATUS
  // =========================================================

  const updateGuidanceStatus = (
    reqId,
    status,
    meetingTime
  ) => {

    setGuidanceRequests(
      (prev) =>
        prev.map((request) =>
          request.id === reqId
            ? {
                ...request,

                status,

                meetingTime:
                  meetingTime ||
                  request.meetingTime
              }
            : request
        )
    );
  };

  // =========================================================
  // ENROLL IN FDP
  // =========================================================

 const enrollInFdp = async (
  fdpId
) => {

  if (
    !currentUser?.uid ||
    currentUser?.role !== "faculty"
  ) {
    return {
      success: false,
      message:
        "Please login as a faculty member."
    };
  }

  try {

    const result =
      await applyToFdp({
        fdpId,

        facultyId:
          currentUser.uid,

        facultyName:
          currentUser.name,

        facultyEmail:
          currentUser.email,

        department:
          currentUser.department
      });

    if (result.alreadyApplied) {
      return {
        success: false,
        alreadyApplied: true,
        message:
          "You are already registered for this FDP."
      };
    }

    setFdpPrograms((prev) =>
      prev.map((program) =>
        program.id === fdpId
          ? {
              ...program,
              enrolled:
                Number(program.enrolled || 0) + 1,
              userEnrolled: true
            }
          : program
      )
    );

    return {
      success: true,
      message:
        "Successfully registered for the FDP."
    };

  } catch (error) {

    console.error(
      "FDP registration error:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Unable to register for FDP."
    };
  }
};
  // =========================================================
  // REGISTER CAMPUS EVENT
  // =========================================================

  const registerCampusEvent = (
    eventId
  ) => {

    setCampusEvents(
      (prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,

                registered:
                  true,

                participants:
                  event.participants +
                  1
              }
            : event
        )
    );

    return {
      success: true,

      message:
        "Registered for campus drive/event!"
    };
  };

  // =========================================================
  // POST CAMPUS EVENT
  // =========================================================

  const postCampusEvent = (
    newEvent
  ) => {

    const event = {

      ...newEvent,

      id:
        "camp_" +
        Date.now(),

      participants:
        1,

      registered:
        false
    };

    setCampusEvents(
      (prev) => [
        event,
        ...prev
      ]
    );

    return {
      success: true,
      event
    };
  };

  // =========================================================
  // UPDATE CANDIDATE STATUS
  // =========================================================

  const updateCandidateStatus = (
    candidateId,
    newStatus
  ) => {

    setCandidatePool(
      (prev) =>
        prev.map((candidate) =>
          candidate.id ===
          candidateId
            ? {
                ...candidate,

                status:
                  newStatus
              }
            : candidate
        )
    );
  };
  // POST FDP PROGRAM 

  const postFdpProgram = async (
  newProgram
) => {

  if (
    !currentUser?.uid ||
    currentUser?.role !== "industry"
  ) {
    return {
      success: false,
      message:
        "Please login as an industry user."
    };
  }

  try {

    const program = {
      ...newProgram,

      industryId:
        currentUser.uid,

      sponsor:
        currentUser.company ||
        "Industry Partner",

      enrolled: 0,

      status:
        "Open for Registration"
    };

    const createdProgram =
      await createFdpProgram(program);

    setFdpPrograms((prev) => [
      createdProgram,
      ...prev
    ]);

    return {
      success: true,
      program: createdProgram
    };

  } catch (error) {

    console.error(
      "Error publishing FDP:",
      error
    );

    return {
      success: false,
      message:
        error.message ||
        "Unable to publish FDP."
    };
  }
};

// =========================================================
// LOAD FDP PROGRAMS FROM FIRESTORE
// =========================================================

useEffect(() => {
  const loadFdpPrograms = async () => {

    // Wait until Firebase authentication is ready
    if (!currentUser?.uid) {
      setFdpPrograms([]);
      return;
    }

    try {
      const data = await getFdpPrograms();

      console.log("FDP programs loaded from Firestore:", data);

      setFdpPrograms(data);

    } catch (error) {
      console.error(
        "Error loading FDP programs:",
        error
      );

      setFdpPrograms([]);
    }
  };

  loadFdpPrograms();

}, [currentUser?.uid]);

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <DataContext.Provider
      value={{
        // Data
        opportunities,

        applications,

        capabilityProjects,

        industryApplications,
        updateIndustryApplicationStatus,

        campusEvents,

        facultyList,

        guidanceRequests,

        fdpPrograms,

        candidatePool,

        assessmentResult,

        roadmapSteps,

        // Actions
        applyToOpportunity,

        postNewOpportunity,

        saveAssessmentResult,

        toggleRoadmapTask,

        submitCapabilityProject,

        bookFacultyGuidance,

        updateGuidanceStatus,

        enrollInFdp,

        registerCampusEvent,

        postCampusEvent,

        updateCandidateStatus,

        postFdpProgram, 

      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ===========================================================
// CUSTOM HOOK
// ===========================================================

export const useData = () =>
  useContext(DataContext);
