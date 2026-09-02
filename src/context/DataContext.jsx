import { useAuth } from "./AuthContext";
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  CAPABILITY_PROJECTS,
  CAMPUS_EVENTS,
  FACULTY_DIRECTORY,
  GUIDANCE_REQUESTS,
  FDP_PROGRAMS,
  CANDIDATE_POOL
} from '../data/mockData';
import { getOpportunities } from "../services/opportunityService";
import {
  applyToOpportunity as createApplication,
  getStudentApplications,
} from "../services/applicationService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  // Opportunities
  const [opportunities, setOpportunities] = useState([]);

  // Applications
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('nexura_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Capability Projects
  const [capabilityProjects, setCapabilityProjects] = useState(() => {
    const saved = localStorage.getItem('nexura_capability_projects');
    return saved ? JSON.parse(saved) : CAPABILITY_PROJECTS;
  });

  // Campus Events & Drives
  const [campusEvents, setCampusEvents] = useState(() => {
    const saved = localStorage.getItem('nexura_campus_events');
    return saved ? JSON.parse(saved) : CAMPUS_EVENTS;
  });

  // Guidance Requests
  const [guidanceRequests, setGuidanceRequests] = useState(() => {
    const saved = localStorage.getItem('nexura_guidance_requests');
    return saved ? JSON.parse(saved) : GUIDANCE_REQUESTS;
  });

  // FDP Programs
  const [fdpPrograms, setFdpPrograms] = useState(() => {
    const saved = localStorage.getItem('nexura_fdp_programs');
    return saved ? JSON.parse(saved) : FDP_PROGRAMS;
  });

  // Candidate Pool for Recruiters
  const [candidatePool, setCandidatePool] = useState(() => {
    const saved = localStorage.getItem('nexura_candidate_pool');
    return saved ? JSON.parse(saved) : CANDIDATE_POOL;
  });

  // Active Assessment State
  const [assessmentResult, setAssessmentResult] = useState(() => {
    const saved = localStorage.getItem('nexura_assessment_result');
    return saved ? JSON.parse(saved) : {
      taken: true,
      score: 84,
      totalQuestions: 6,
      correctCount: 5,
      date: '2026-08-28',
      domainScores: {
        'Frontend & UI Architecture': 95,
        'Backend & APIs': 88,
        'AI & Python Backend': 75,
        'Data Structures & Algorithms': 82,
        'Cloud & DevOps': 65,
        'Transformer Architecture & LLMs': 70
      },
      strengths: [
        'React 18/19 Concurrent Rendering & Custom Hooks',
        'RESTful API Design & HTTP Status Architecture',
        'Data Structures & Algorithmic Complexity'
      ],
      weaknesses: [
        'Container Orchestration (Kubernetes Pod Architecture)',
        'Vector Embeddings & RAG Vector Database Indexing',
        'Distributed Caching & Ingress Configuration'
      ],
      aiFeedback: 'You demonstrate strong fundamentals in client-side React architecture and algorithmic logic. To qualify for top-tier AI Full-Stack and SDE-1 roles, focus on mastering Kubernetes container isolation, Vector DB cosine indexing, and fine-tuning Transformer pipelines.'
    };
  });

  // Dynamic Personalized Roadmap
  const [roadmapSteps, setRoadmapSteps] = useState(() => {
    const saved = localStorage.getItem('nexura_roadmap');
    return saved ? JSON.parse(saved) : [
      {
        id: 'step_1',
        title: 'Phase 1: Vector Databases & High-Dimensional Semantic Search',
        focusArea: 'Addressing Weakness in Vector Search & RAG',
        completed: true,
        estimatedDays: '3 Days',
        tasks: [
          { text: 'Understand HNSW vs IVF indexing algorithms in ChromaDB / Pinecone', done: true },
          { text: 'Build a Python FastAPI microservice that generates and indexes OpenAI/Gemini embeddings', done: true },
          { text: 'Implement hybrid keyword + semantic similarity search with reciprocal rank fusion', done: true }
        ],
        resourceLink: 'https://docs.trychroma.com/'
      },
      {
        id: 'step_2',
        title: 'Phase 2: Docker Containers & Kubernetes Pod Networking',
        focusArea: 'Addressing Weakness in Cloud & Microservices',
        completed: false,
        estimatedDays: '4 Days',
        tasks: [
          { text: 'Create multi-stage Dockerfiles for optimized React & FastAPI images', done: true },
          { text: 'Deploy a local 3-node cluster using Minikube / K3s with Ingress controller', done: false },
          { text: 'Configure Pod resource limits, readiness/liveness probes, and ConfigMaps', done: false }
        ],
        resourceLink: 'https://kubernetes.io/docs/concepts/workloads/pods/'
      },
      {
        id: 'step_3',
        title: 'Phase 3: Transformer Attention & LoRA Fine-Tuning Foundations',
        focusArea: 'Leveling Up AI / Machine Learning Capabilities',
        completed: false,
        estimatedDays: '5 Days',
        tasks: [
          { text: 'Study Multi-Head Self Attention computation and positional encodings', done: false },
          { text: 'Fine-tune a small model (e.g. Gemma-2B / LLaMA-3-1B) using HuggingFace PEFT / LoRA', done: false },
          { text: 'Evaluate BLEU and ROUGE benchmark metrics on a custom QA dataset', done: false }
        ],
        resourceLink: 'https://huggingface.co/docs/peft/'
      },
      {
        id: 'step_4',
        title: 'Phase 4: Capstone Capability Project & Verified Certification',
        focusArea: 'Proving Industry Readiness to Recruiters',
        completed: false,
        estimatedDays: '3 Days',
        tasks: [
          { text: 'Submit capability project: Autonomous AI Code Reviewer or Collaborative Canvas', done: false },
          { text: 'Pass automated AI capability code evaluation score > 85%', done: false },
          { text: 'Generate verified QR-coded certificate and link to student profile for recruiters', done: false }
        ],
        resourceLink: '#capability-projects'
      }
    ];
  });

  // Persist all state
  useEffect(() => {
  const loadOpportunities = async () => {
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (error) {
      console.error("Error loading opportunities:", error);
    }
  };

  loadOpportunities();
}, []);

  useEffect(() => {
    localStorage.setItem('nexura_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('nexura_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexura_capability_projects', JSON.stringify(capabilityProjects));
  }, [capabilityProjects]);

  useEffect(() => {
    localStorage.setItem('nexura_campus_events', JSON.stringify(campusEvents));
  }, [campusEvents]);

  useEffect(() => {
    localStorage.setItem('nexura_guidance_requests', JSON.stringify(guidanceRequests));
  }, [guidanceRequests]);

  useEffect(() => {
    localStorage.setItem('nexura_fdp_programs', JSON.stringify(fdpPrograms));
  }, [fdpPrograms]);

  useEffect(() => {
    localStorage.setItem('nexura_candidate_pool', JSON.stringify(candidatePool));
  }, [candidatePool]);

  useEffect(() => {
    localStorage.setItem('nexura_assessment_result', JSON.stringify(assessmentResult));
  }, [assessmentResult]);

  useEffect(() => {
    localStorage.setItem('nexura_roadmap', JSON.stringify(roadmapSteps));
  }, [roadmapSteps]);

  // Actions
  const applyToOpportunity = async (oppId, user) => {
    if (!user) {
      return {
        success: false,
        message: "Please login to apply.",
      };
    }

    try {
      const result = await createApplication({
        opportunityId: oppId,
        studentId: user.uid,
      });

      if (result.alreadyApplied) {
        return {
          success: false,
          alreadyApplied: true,
          message: "You have already applied to this opportunity.",
        };
      }

      const newApplication = {
        id: result.id,
        opportunityId: oppId,
        studentId: user.uid,
        status: "applied",
        appliedAt: new Date(),
      };

      setApplications((prev) => [
        ...prev,
        newApplication,
      ]);

      return {
        success: true,
        application: newApplication,
      };
    } catch (error) {
      console.error("Application error:", error);

      return {
        success: false,
        message: "Unable to submit application.",
      };
    }
  };

  const postNewOpportunity = (newOpp) => {
    const opp = {
      ...newOpp,
      id: 'opp_' + Date.now(),
      postedDate: 'Just now',
      status: 'Open',
      matchScore: Math.floor(Math.random() * 20) + 75,
      logo: newOpp.logo || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=100&auto=format&fit=crop&q=80',
    };
    setOpportunities((prev) => [opp, ...prev]);
    return { success: true, opportunity: opp };
  };

  const saveAssessmentResult = (score, correctCount, totalQuestions, domainScores, strengths, weaknesses, aiFeedback) => {
    const result = {
      taken: true,
      score,
      correctCount,
      totalQuestions,
      date: new Date().toISOString().split('T')[0],
      domainScores,
      strengths,
      weaknesses,
      aiFeedback
    };
    setAssessmentResult(result);

    // Auto-generate or update personalized roadmap based on identified weaknesses
    const newRoadmap = [
      {
        id: 'step_' + Date.now() + '_1',
        title: `Phase 1: Core Mastery in ${weaknesses[0] || 'Cloud & Container Technologies'}`,
        focusArea: `Targeting assessed weakness: ${weaknesses[0] || 'System Architecture'}`,
        completed: false,
        estimatedDays: '3 Days',
        tasks: [
          { text: `Deep dive into theoretical concepts for ${weaknesses[0] || 'System Architecture'}`, done: false },
          { text: 'Build a mini hands-on sandbox project implementing key design patterns', done: false },
          { text: 'Complete diagnostic practice quiz to verify improvement', done: false }
        ],
        resourceLink: 'https://developer.mozilla.org/'
      },
      {
        id: 'step_' + Date.now() + '_2',
        title: `Phase 2: Advanced Application in ${weaknesses[1] || 'Vector Databases & LLM RAG'}`,
        focusArea: `Targeting assessed weakness: ${weaknesses[1] || 'AI Orchestration'}`,
        completed: false,
        estimatedDays: '4 Days',
        tasks: [
          { text: 'Configure and test embeddings indexing pipeline with custom chunking', done: false },
          { text: 'Integrate prompt engineering heuristics and evaluation metrics', done: false },
          { text: 'Deploy service with containerized endpoints', done: false }
        ],
        resourceLink: 'https://huggingface.co/'
      },
      {
        id: 'step_' + Date.now() + '_3',
        title: 'Phase 3: Industry Capability Project Submission & Certification',
        focusArea: 'Convert newfound skills into certified proof of work',
        completed: false,
        estimatedDays: '3 Days',
        tasks: [
          { text: 'Pick a role-aligned capability project from the Skills & Certifications Hub', done: false },
          { text: 'Submit GitHub repository and live demo URL for automated AI review', done: false },
          { text: 'Earn verified certificate badge to boost your recruiter match % to 95%+', done: false }
        ],
        resourceLink: '#capability-projects'
      }
    ];

    setRoadmapSteps(newRoadmap);
    return result;
  };

  const toggleRoadmapTask = (stepId, taskIndex) => {
    setRoadmapSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          const updatedTasks = step.tasks.map((t, idx) =>
            idx === taskIndex ? { ...t, done: !t.done } : t
          );
          const allDone = updatedTasks.every((t) => t.done);
          return { ...step, tasks: updatedTasks, completed: allDone };
        }
        return step;
      })
    );
  };

  const submitCapabilityProject = (projectId, repoUrl, liveUrl) => {
    const certNumber = 'NX-CERT-2026-' + Math.floor(1000 + Math.random() * 9000);
    const score = Math.floor(Math.random() * 10) + 88; // 88-98 score

    setCapabilityProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'Completed',
            verifiedScore: score,
            certificateId: certNumber,
            submissionDate: new Date().toISOString().split('T')[0],
            repoUrl,
            liveUrl
          };
        }
        return p;
      })
    );

    return {
      success: true,
      score,
      certificateId: certNumber,
      message: `Project verified! AI Evaluation Score: ${score}/100. Verified certificate generated.`
    };
  };

  const bookFacultyGuidance = (facultyId, facultyName, studentName, studentEmail, topic, message) => {
    const newReq = {
      id: 'req_' + Date.now(),
      studentName,
      studentEmail,
      topic,
      facultyName,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      meetingTime: null,
      message
    };
    setGuidanceRequests((prev) => [newReq, ...prev]);
    return { success: true, message: `Guidance request sent to ${facultyName}. You will receive a notification when scheduled.` };
  };

  const updateGuidanceStatus = (reqId, status, meetingTime) => {
    setGuidanceRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status, meetingTime: meetingTime || r.meetingTime } : r))
    );
  };

  const enrollInFdp = (fdpId) => {
    setFdpPrograms((prev) =>
      prev.map((f) => (f.id === fdpId ? { ...f, enrolled: f.enrolled + 1, userEnrolled: true } : f))
    );
    return { success: true, message: 'Successfully registered for the Faculty Development Program!' };
  };

  const registerCampusEvent = (eventId) => {
    setCampusEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registered: true, participants: e.participants + 1 } : e))
    );
    return { success: true, message: 'Registered for campus drive/event!' };
  };

  const postCampusEvent = (newEvent) => {
    const ev = {
      ...newEvent,
      id: 'camp_' + Date.now(),
      participants: 1,
      registered: false
    };
    setCampusEvents((prev) => [ev, ...prev]);
    return { success: true, event: ev };
  };

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidatePool((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <DataContext.Provider
      value={{
        opportunities,
        applications,
        capabilityProjects,
        campusEvents,
        facultyList: FACULTY_DIRECTORY,
        guidanceRequests,
        fdpPrograms,
        candidatePool,
        assessmentResult,
        roadmapSteps,
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

export const useData = () => useContext(DataContext);
