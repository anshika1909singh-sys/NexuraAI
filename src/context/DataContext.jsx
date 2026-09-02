import { useAuth } from "./AuthContext";
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import {
  INITIAL_OPPORTUNITIES,
  CAPABILITY_PROJECTS,
  CAMPUS_EVENTS,
  FACULTY_DIRECTORY,
  GUIDANCE_REQUESTS,
  FDP_PROGRAMS,
  CANDIDATE_POOL
} from "../data/mockData";

import { getOpportunities } from "../services/opportunityService";

import {
  applyToOpportunity as createApplication,
  getStudentApplications
} from "../services/applicationService";

import {
  saveAssessmentResultToFirestore
} from "../services/assessmentService";

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

  // =========================================================
  // CAPABILITY PROJECTS
  // =========================================================

  const [capabilityProjects, setCapabilityProjects] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_capability_projects"
      );

      return saved
        ? JSON.parse(saved)
        : CAPABILITY_PROJECTS;
    });

  // =========================================================
  // CAMPUS EVENTS
  // =========================================================

  const [campusEvents, setCampusEvents] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_campus_events"
      );

      return saved
        ? JSON.parse(saved)
        : CAMPUS_EVENTS;
    });

  // =========================================================
  // GUIDANCE REQUESTS
  // =========================================================

  const [guidanceRequests, setGuidanceRequests] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_guidance_requests"
      );

      return saved
        ? JSON.parse(saved)
        : GUIDANCE_REQUESTS;
    });

  // =========================================================
  // FDP PROGRAMS
  // =========================================================

  const [fdpPrograms, setFdpPrograms] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_fdp_programs"
      );

      return saved
        ? JSON.parse(saved)
        : FDP_PROGRAMS;
    });

  // =========================================================
  // CANDIDATE POOL
  // =========================================================

  const [candidatePool, setCandidatePool] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_candidate_pool"
      );

      return saved
        ? JSON.parse(saved)
        : CANDIDATE_POOL;
    });

  // =========================================================
  // ASSESSMENT RESULT
  // =========================================================

  const [assessmentResult, setAssessmentResult] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_assessment_result"
      );

      return saved
        ? JSON.parse(saved)
        : {
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
          };
    });

  // =========================================================
  // PERSONALIZED ROADMAP
  // =========================================================

  const [roadmapSteps, setRoadmapSteps] =
    useState(() => {
      const saved = localStorage.getItem(
        "nexura_roadmap"
      );

      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "step_1",
              title:
                "Phase 1: Vector Databases & High-Dimensional Semantic Search",
              focusArea:
                "Addressing Weakness in Vector Search & RAG",
              completed: true,
              estimatedDays: "3 Days",
              tasks: [
                {
                  text:
                    "Understand HNSW vs IVF indexing algorithms in ChromaDB / Pinecone",
                  done: true
                },
                {
                  text:
                    "Build a Python FastAPI microservice that generates and indexes OpenAI/Gemini embeddings",
                  done: true
                },
                {
                  text:
                    "Implement hybrid keyword + semantic similarity search with reciprocal rank fusion",
                  done: true
                }
              ],
              resourceLink:
                "https://docs.trychroma.com/"
            },

            {
              id: "step_2",
              title:
                "Phase 2: Docker Containers & Kubernetes Pod Networking",
              focusArea:
                "Addressing Weakness in Cloud & Microservices",
              completed: false,
              estimatedDays: "4 Days",
              tasks: [
                {
                  text:
                    "Create multi-stage Dockerfiles for optimized React & FastAPI images",
                  done: true
                },
                {
                  text:
                    "Deploy a local 3-node cluster using Minikube / K3s with Ingress controller",
                  done: false
                },
                {
                  text:
                    "Configure Pod resource limits, readiness/liveness probes, and ConfigMaps",
                  done: false
                }
              ],
              resourceLink:
                "https://kubernetes.io/docs/concepts/workloads/pods/"
            },

            {
              id: "step_3",
              title:
                "Phase 3: Transformer Attention & LoRA Fine-Tuning Foundations",
              focusArea:
                "Leveling Up AI / Machine Learning Capabilities",
              completed: false,
              estimatedDays: "5 Days",
              tasks: [
                {
                  text:
                    "Study Multi-Head Self Attention computation and positional encodings",
                  done: false
                },
                {
                  text:
                    "Fine-tune a small model using HuggingFace PEFT / LoRA",
                  done: false
                },
                {
                  text:
                    "Evaluate BLEU and ROUGE benchmark metrics on a custom QA dataset",
                  done: false
                }
              ],
              resourceLink:
                "https://huggingface.co/docs/peft/"
            },

            {
              id: "step_4",
              title:
                "Phase 4: Capstone Capability Project & Verified Certification",
              focusArea:
                "Proving Industry Readiness to Recruiters",
              completed: false,
              estimatedDays: "3 Days",
              tasks: [
                {
                  text:
                    "Submit capability project: Autonomous AI Code Reviewer or Collaborative Canvas",
                  done: false
                },
                {
                  text:
                    "Pass automated AI capability code evaluation score > 85%",
                  done: false
                },
                {
                  text:
                    "Generate verified QR-coded certificate and link to student profile for recruiters",
                  done: false
                }
              ],
              resourceLink:
                "#capability-projects"
            }
          ];
    });

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

            return {
              ...app,

              title:
                opportunity?.title ||
                "Opportunity",

              company:
                opportunity?.company ||
                "",

              appliedDate,

              step: 1,

              feedback:
                "Application successfully received by the recruitment team.",

              interviewDate: null
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
  // LOCAL STORAGE PERSISTENCE
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      "nexura_capability_projects",
      JSON.stringify(capabilityProjects)
    );
  }, [capabilityProjects]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_campus_events",
      JSON.stringify(campusEvents)
    );
  }, [campusEvents]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_guidance_requests",
      JSON.stringify(guidanceRequests)
    );
  }, [guidanceRequests]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_fdp_programs",
      JSON.stringify(fdpPrograms)
    );
  }, [fdpPrograms]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_candidate_pool",
      JSON.stringify(candidatePool)
    );
  }, [candidatePool]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_assessment_result",
      JSON.stringify(assessmentResult)
    );
  }, [assessmentResult]);

  useEffect(() => {
    localStorage.setItem(
      "nexura_roadmap",
      JSON.stringify(roadmapSteps)
    );
  }, [roadmapSteps]);

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
          studentId: currentUser.uid
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

  const postNewOpportunity = (
    newOpp
  ) => {
    const opp = {
      ...newOpp,

      id:
        "opp_" +
        Date.now(),

      postedDate:
        "Just now",

      status:
        "Open",

      matchScore:
        Math.floor(
          Math.random() * 20
        ) + 75,

      logo:
        newOpp.logo ||
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=100&auto=format&fit=crop&q=80"
    };

    setOpportunities((prev) => [
      opp,
      ...prev
    ]);

    return {
      success: true,
      opportunity: opp
    };
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

  const enrollInFdp = (
    fdpId
  ) => {

    setFdpPrograms(
      (prev) =>
        prev.map((program) =>
          program.id === fdpId
            ? {
                ...program,

                enrolled:
                  program.enrolled +
                  1,

                userEnrolled:
                  true
              }
            : program
        )
    );

    return {
      success: true,

      message:
        "Successfully registered for the Faculty Development Program!"
    };
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

        campusEvents,

        facultyList:
          FACULTY_DIRECTORY,

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

        updateCandidateStatus
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