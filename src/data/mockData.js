export const INITIAL_USERS = {
  student: {
    id: 'usr_std_101',
    name: 'Anshika Sharma',
    email: 'anshika.sharma@apex.edu',
    role: 'student',
    college: 'Apex Institute of Technology',
    department: 'Computer Science & Artificial Intelligence',
    year: '3rd Year (Batch 2026)',
    cgpa: '8.9 / 10',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Aspiring Full-Stack AI Engineer | Open Source Contributor',
    location: 'New Delhi, India',
    readinessScore: 84,
    skills: [
      { name: 'React.js', level: 90, verified: true },
      { name: 'Python & FastApi', level: 85, verified: true },
      { name: 'Machine Learning / LLMs', level: 78, verified: false },
      { name: 'Docker & Cloud', level: 68, verified: false },
      { name: 'Data Structures & Algorithms', level: 82, verified: true },
      { name: 'Tailwind CSS', level: 92, verified: true },
    ],
    strengths: ['Frontend Architecture', 'RESTful APIs', 'Modern State Management', 'Rapid Prototyping'],
    weaknesses: ['Vector Database Indexing', 'Kubernetes Orchestration', 'Transformer Fine-Tuning'],
    certificationsCount: 3,
    appliedCount: 5,
    bio: 'Passionate computer science student building intelligent web applications, exploring LLM fine-tuning, and preparing for high-impact industry internships.'
  },
  industry: {
    id: 'usr_ind_201',
    name: 'Vikram Malhotra',
    company: 'CloudScale Technologies AI',
    role: 'industry',
    position: 'VP of Engineering & Talent',
    email: 'vikram.m@cloudscale.tech',
    location: 'Bengaluru / San Francisco',
    logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activePostings: 4,
    totalApplicants: 142,
    hiredCount: 18,
    bio: 'Leading high-growth AI infrastructure teams. Seeking passionate student innovators with strong problem-solving and full-stack capabilities.'
  },
  university: {
    id: 'usr_uni_301',
    name: 'Apex Institute of Technology',
    role: 'university',
    deanName: 'Prof. A. K. Sen',
    designation: 'Dean of Corporate Relations & Placements',
    email: 'placements@apex.edu',
    location: 'New Delhi, India',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    placementRate: '91.4%',
    activeDrives: 6,
    registeredStudents: 1450,
    partnerCompanies: 85,
    bio: 'Dedicated to bridging the academia-industry divide through state-of-the-art curriculum, industry co-ops, and AI skill training.'
  },
  faculty: {
    id: 'usr_fac_401',
    name: 'Dr. Sneha Verma',
    role: 'faculty',
    department: 'Department of Computer Science & AI',
    college: 'Apex Institute of Technology',
    email: 'sneha.verma@apex.edu',
    designation: 'Associate Professor & AI Lab Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeMentees: 24,
    guidanceRequests: 7,
    completedFDPs: 5,
    researchAreas: ['Generative AI', 'Distributed Neural Training', 'Computer Vision'],
    bio: 'Academic researcher and student mentor with 12+ years of experience guiding UG/PG projects into published research and top-tier industry placements.'
  },
  admin: {
    id: 'usr_admin_999',
    name: 'Platform Administrator',
    role: 'admin',
    email: 'admin@nexura.ai',
    designation: 'System Administrator',
    college: 'Nexura AI Platform',
    location: 'Global Operations Center',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    bio: 'Full visibility into student, faculty, recruiter, and campus activity across the platform.'
  }
};

export const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp_1',
    title: 'AI Full-Stack Developer Intern',
    company: 'CloudScale Technologies AI',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    domain: 'AI & Full Stack',
    location: 'Bengaluru (Hybrid)',
    stipend: '₹45,000 / month',
    duration: '6 Months',
    postedBy: 'Industry',
    postedDate: '2 days ago',
    deadline: 'Sept 15, 2026',
    matchScore: 94,
    skills: ['React.js', 'Python', 'FastAPI', 'Vector Databases', 'Tailwind CSS'],
    description: 'Work alongside core AI research engineers to build interactive AI agent dashboards, streaming chat interfaces, and scalable backend pipelines.',
    eligibility: 'B.Tech / M.Tech CS, IT, AI (3rd/4th Year) with min 7.5 CGPA and verified skill score > 80',
    openings: 3,
    status: 'Open'
  },
  {
    id: 'opp_2',
    title: 'Frontend Engineer (React / Next.js)',
    company: 'NexusLabs Global',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80',
    type: 'Full-Time',
    domain: 'Frontend Engineering',
    location: 'Remote',
    stipend: '₹14 - 18 LPA',
    duration: 'Permanent',
    postedBy: 'Industry',
    postedDate: 'Just now',
    deadline: 'Sept 30, 2026',
    matchScore: 88,
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'State Management'],
    description: 'Design and deliver high-performance web applications with seamless UX, micro-frontend architecture, and modern animation systems.',
    eligibility: 'Graduating 2025/2026 or 0-1 yr experience. Proven GitHub capability projects.',
    openings: 5,
    status: 'Open'
  },
  {
    id: 'opp_3',
    title: 'On-Campus Microsoft Placement Drive',
    company: 'Microsoft India',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80',
    type: 'On-Campus Drive',
    domain: 'Software Engineering',
    location: 'Campus Auditorium & Virtual',
    stipend: '₹22 - 32 LPA + Benefits',
    duration: 'Full-Time (2026 Batch)',
    postedBy: 'University',
    postedDate: '1 day ago',
    deadline: 'Sept 10, 2026',
    matchScore: 82,
    skills: ['Data Structures & Algorithms', 'C++ / Java / Python', 'System Design', 'OS & DBMS'],
    description: 'Exclusive on-campus recruitment drive for 2026 graduating batch for Software Development Engineer (SDE-1) positions across Cloud and AI divisions.',
    eligibility: 'Apex Institute B.Tech CS/IT/ECE students with >= 8.0 CGPA and no active backlogs.',
    openings: 12,
    status: 'Open'
  },
  {
    id: 'opp_4',
    title: 'Cloud DevOps & SRE Associate Intern',
    company: 'KubeMatrix Systems',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    domain: 'DevOps & Cloud',
    location: 'Hyderabad / Remote',
    stipend: '₹35,000 / month',
    duration: '4 Months',
    postedBy: 'Industry',
    postedDate: '3 days ago',
    deadline: 'Sept 20, 2026',
    matchScore: 70,
    skills: ['Docker', 'Kubernetes', 'AWS/GCP', 'CI/CD Pipelines', 'Linux'],
    description: 'Automate deployment pipelines, configure container orchestration clusters, and monitor high-availability microservices.',
    eligibility: 'Students with hands-on containerization projects and Linux system fundamentals.',
    openings: 2,
    status: 'Open'
  },
  {
    id: 'opp_5',
    title: 'Machine Learning Research Intern',
    company: 'Synapse Brain Research AI',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    domain: 'AI & Data Science',
    location: 'Bengaluru / Hybrid',
    stipend: '₹50,000 / month',
    duration: '6 Months',
    postedBy: 'Industry',
    postedDate: '4 days ago',
    deadline: 'Sept 25, 2026',
    matchScore: 79,
    skills: ['PyTorch', 'Transformers', 'Python', 'NLP', 'Vector Embeddings'],
    description: 'Work on cutting-edge small language model optimizations, token pruning, and multimodal reasoning datasets.',
    eligibility: 'Knowledge of Deep Learning, PyTorch, and linear algebra fundamentals.',
    openings: 2,
    status: 'Open'
  },
  {
    id: 'opp_6',
    title: 'On-Campus Google Summer Code Sprint & Internship Drive',
    company: 'Google Campus Program',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    type: 'On-Campus Drive',
    domain: 'Software Engineering',
    location: 'Campus Tech Center',
    stipend: '₹1,00,000 / month',
    duration: 'Summer 2027 (Pre-Placement Offer eligible)',
    postedBy: 'University',
    postedDate: '5 days ago',
    deadline: 'Sept 18, 2026',
    matchScore: 86,
    skills: ['Problem Solving', 'Data Structures', 'Python / Java / C++', 'Web Technologies'],
    description: 'University exclusive 2-month summer internship for 3rd year students with direct conversion to full-time roles upon graduation.',
    eligibility: 'Pre-final year undergraduate students with minimum 8.0 CGPA.',
    openings: 8,
    status: 'Open'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app_1',
    opportunityId: 'opp_1',
    title: 'AI Full-Stack Developer Intern',
    company: 'CloudScale Technologies AI',
    appliedDate: '2026-08-27',
    status: 'Shortlisted', // Applied, Assessment Completed, Under Review, Shortlisted, Interview Scheduled, Offered
    step: 4,
    feedback: 'Your AI Skill Assessment score (84%) and React capability project scored top 5% in candidate batch. Technical interview invited.',
    interviewDate: 'Sept 5, 2026 - 3:30 PM'
  },
  {
    id: 'app_2',
    opportunityId: 'opp_3',
    title: 'On-Campus Microsoft Placement Drive',
    company: 'Microsoft India',
    appliedDate: '2026-08-28',
    status: 'Under Review',
    step: 3,
    feedback: 'Application submitted to University Placement Cell. Resume verified by Faculty Mentor.',
    interviewDate: 'Sept 12, 2026'
  },
  {
    id: 'app_3',
    opportunityId: 'opp_2',
    title: 'Frontend Engineer (React / Next.js)',
    company: 'NexusLabs Global',
    appliedDate: '2026-08-25',
    status: 'Assessment Completed',
    step: 2,
    feedback: 'Online assessment completed. Score: 88/100. Recruiter reviewing candidate portfolio.',
    interviewDate: null
  },
  {
    id: 'app_4',
    opportunityId: 'opp_5',
    title: 'Machine Learning Research Intern',
    company: 'Synapse Brain Research AI',
    appliedDate: '2026-08-20',
    status: 'Applied',
    step: 1,
    feedback: 'Resume and GitHub profile transmitted to Hiring Manager.',
    interviewDate: null
  }
];

export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    domain: 'Frontend & UI Architecture',
    question: 'In modern React 18/19, which hook is specifically designed to defer updating a non-urgent part of the UI to keep input responsive?',
    options: [
      'useTransition() & useDeferredValue()',
      'useImperativeHandle()',
      'useLayoutEffect()',
      'useCallback()'
    ],
    correct: 0,
    skill: 'React.js State & Concurrency',
    explanation: 'useTransition and useDeferredValue enable concurrent rendering by letting you mark state updates as non-blocking transitions.'
  },
  {
    id: 2,
    domain: 'AI & Python Backend',
    question: 'When implementing a Retrieval-Augmented Generation (RAG) system, what is the primary purpose of a Vector Database like ChromaDB or Pinecone?',
    options: [
      'To execute GPU matrix multiplications for model training',
      'To store and perform cosine/L2 nearest-neighbor similarity searches on high-dimensional text embeddings',
      'To serialize Python classes into JSON schema automatically',
      'To act as a load balancer for RESTful microservices'
    ],
    correct: 1,
    skill: 'Vector Database & RAG',
    explanation: 'Vector databases index high-dimensional embeddings to rapidly retrieve relevant semantic context for LLM prompts.'
  },
  {
    id: 3,
    domain: 'Data Structures & Algorithms',
    question: 'What is the average time complexity of searching an element in a balanced Hash Map vs a Self-Balancing Binary Search Tree (AVL / Red-Black)?',
    options: [
      'Hash Map: O(N), BST: O(1)',
      'Hash Map: O(1), BST: O(log N)',
      'Hash Map: O(log N), BST: O(1)',
      'Hash Map: O(N log N), BST: O(N)'
    ],
    correct: 1,
    skill: 'Data Structures & Complexity',
    explanation: 'A Hash Map averages O(1) constant time lookup, while a balanced BST performs search in O(log N) time.'
  },
  {
    id: 4,
    domain: 'Cloud, DevOps & Containers',
    question: 'In Docker and Kubernetes, what is the primary difference between a Container and a Pod?',
    options: [
      'A container is a physical virtual machine, while a Pod is a hypervisor.',
      'A container is an isolated execution environment for a single process/app, while a Pod in K8s is the smallest deployable unit that can group one or more tightly coupled containers.',
      'Pods only run on Linux, while containers only run on Windows.',
      'A Pod cannot have its own IP address or storage volume.'
    ],
    correct: 1,
    skill: 'Docker & Kubernetes',
    explanation: 'In Kubernetes, a Pod is the atomic unit that wraps one or more shared-context containers sharing the same network namespace.'
  },
  {
    id: 5,
    domain: 'AI & Machine Learning Foundations',
    question: 'Why is the Self-Attention mechanism in Transformer models considered superior to recurrent networks (RNNs / LSTMs) for sequence modeling?',
    options: [
      'Attention requires zero parameters to compute.',
      'It processes the entire sequence in parallel without vanishing gradient bottlenecks across long distances.',
      'It converts text directly into audio waves.',
      'It eliminates the need for activation functions.'
    ],
    correct: 1,
    skill: 'Transformer Architecture & LLMs',
    explanation: 'Transformers compute relationships between all tokens simultaneously via parallel dot-product attention, resolving the sequential bottleneck of RNNs.'
  },
  {
    id: 6,
    domain: 'Backend & API Engineering',
    question: 'Which HTTP status code should a REST API return when a client request is well-formed, but the server refuses action due to insufficient permission rights?',
    options: [
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found',
      '422 Unprocessable Entity'
    ],
    correct: 1,
    skill: 'RESTful API Standards',
    explanation: '403 Forbidden indicates the server understands who the caller is, but the caller lacks permission for the resource (401 is for unauthenticated callers).'
  }
];

export const SKILL_MODULES = [
  {
    id: 'mod_1',
    title: 'Next.js 14 & Full-Stack AI Integration',
    category: 'Full-Stack & AI',
    level: 'Advanced',
    duration: '18 Hours',
    rating: 4.9,
    enrolled: 1840,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    description: 'Master Server Actions, streaming LLM outputs, Tailwind CSS UI components, and Vector DB retrieval pipelines.',
    skillsGained: ['Next.js 14', 'React Server Components', 'OpenAI / Gemini SDK', 'Pinecone Vector DB'],
    projectIncluded: 'AI-Powered Code Review Platform'
  },
  {
    id: 'mod_2',
    title: 'Modern Generative AI & LangChain RAG Mastery',
    category: 'AI / Machine Learning',
    level: 'Intermediate to Advanced',
    duration: '24 Hours',
    rating: 4.8,
    enrolled: 2950,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop&q=80',
    description: 'Learn embedding generation, document chunking algorithms, hybrid search, and autonomous multi-agent tool execution.',
    skillsGained: ['LangChain', 'FastAPI', 'ChromaDB', 'Prompt Engineering', 'HuggingFace'],
    projectIncluded: 'Enterprise Document Intelligence Copilot'
  },
  {
    id: 'mod_3',
    title: 'Cloud Native & Kubernetes Microservices',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    duration: '16 Hours',
    rating: 4.7,
    enrolled: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&auto=format&fit=crop&q=80',
    description: 'Deploy resilient containerized services, configure Ingress controllers, Helm charts, and automated GitHub Actions CI/CD.',
    skillsGained: ['Docker', 'Kubernetes', 'Helm', 'CI/CD Pipelines', 'Prometheus'],
    projectIncluded: 'High-Availability Microservices Cluster'
  },
  {
    id: 'mod_4',
    title: 'Data Structures & Algorithmic Problem Solving',
    category: 'Core Computer Science',
    level: 'Comprehensive',
    duration: '35 Hours',
    rating: 4.95,
    enrolled: 4320,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop&q=80',
    description: 'Master Graphs, Dynamic Programming, Segment Trees, Trie structures, and high-frequency interview patterns.',
    skillsGained: ['Graph Algorithms', 'Dynamic Programming', 'Complexity Optimization', 'System Design'],
    projectIncluded: 'Optimal Route Pathfinder & Visualizer'
  }
];

export const CAPABILITY_PROJECTS = [
  {
    id: 'proj_1',
    title: 'Autonomous Multi-Agent AI Code Reviewer',
    targetRole: 'Full-Stack AI Engineer',
    difficulty: 'Advanced',
    estTime: '3 - 4 Days',
    status: 'Completed', // 'Completed' | 'In Progress' | 'Not Started'
    verifiedScore: 92,
    certificateId: 'NX-CERT-2026-8942',
    certificateTitle: 'Certified AI Full-Stack Developer - Level 3',
    skillsTested: ['React.js', 'FastAPI', 'LLM Function Calling', 'GitHub Webhooks'],
    brief: 'Build a full-stack platform that hooks into GitHub PRs, generates AST semantic analysis, and highlights potential security leaks or logic bugs using Gemini / OpenAI APIs.',
    deliverables: [
      'Interactive Frontend Dashboard with PR Diff Viewer',
      'FastAPI webhook listener with token auth',
      'AI Analysis Engine with structured JSON schema outputs',
      'Automated Test Suite with >= 80% coverage'
    ],
    submissionDate: '2026-08-26',
    repoUrl: 'https://github.com/anshika-sharma/ai-code-reviewer',
    liveUrl: 'https://ai-code-reviewer-demo.app'
  },
  {
    id: 'proj_2',
    title: 'Distributed Real-Time Collaborative Canvas',
    targetRole: 'Senior Frontend / Systems Engineer',
    difficulty: 'Intermediate',
    estTime: '2 - 3 Days',
    status: 'In Progress',
    verifiedScore: null,
    certificateId: null,
    certificateTitle: 'Certified Real-Time Web Systems Specialist',
    skillsTested: ['HTML5 Canvas / SVG', 'WebSockets / WebRTC', 'CRDT / Conflict Resolution', 'State Sync'],
    brief: 'Create a multi-user digital whiteboard with infinite canvas, drawing tools, cursor presence broadcasting, and undo/redo state synchronization without race conditions.',
    deliverables: [
      '60fps Canvas render pipeline with smooth bezier curves',
      'WebSocket state engine handling multi-cursor presence',
      'Conflict-free Replicated Data Type (CRDT) stroke synchronization',
      'Export to high-res PNG / SVG'
    ],
    submissionDate: null,
    repoUrl: null,
    liveUrl: null
  },
  {
    id: 'proj_3',
    title: 'Vector-Indexed Enterprise Search Engine',
    targetRole: 'Machine Learning & Search Engineer',
    difficulty: 'Advanced',
    estTime: '3 Days',
    status: 'Not Started',
    verifiedScore: null,
    certificateId: null,
    certificateTitle: 'Certified Enterprise Vector Search Architect',
    skillsTested: ['Python', 'ChromaDB', 'Sentence Transformers', 'FastAPI', 'Docker'],
    brief: 'Develop an intelligent document query engine capable of chunking PDF/Markdown files, indexing embeddings, and providing hybrid keyword + vector semantic search with citation highlighting.',
    deliverables: [
      'Document ingestion pipeline with OCR and token chunking',
      'ChromaDB collection manager with HNSW indexing',
      'FastAPI search endpoints with reranking',
      'Interactive React query UI with source highlights'
    ],
    submissionDate: null,
    repoUrl: null,
    liveUrl: null
  }
];

export const CAMPUS_EVENTS = [
  {
    id: 'camp_1',
    title: 'Apex Annual AI & Robotics Hackathon 2026',
    category: 'Hackathon',
    organizer: 'Apex Institute & Google Cloud',
    date: 'Sept 14 - 15, 2026',
    venue: 'Campus Innovation Center & Virtual',
    participants: 480,
    prizePool: '₹2,50,000 + Direct Industry Interviews',
    tags: ['AI/ML', 'Cloud', 'Autonomous Agents', 'Open Innovation'],
    description: '36-hour non-stop hackathon building real-world solutions for healthcare, education, and sustainable smart cities.',
    deadline: 'Sept 10, 2026',
    registered: true
  },
  {
    id: 'camp_2',
    title: 'Workshop: Scalable System Design & Cloud Microservices',
    category: 'Workshop',
    organizer: 'University Placement Cell & AWS Mentors',
    date: 'Sept 8, 2026 • 2:00 PM',
    venue: 'Seminar Hall B & Live Stream',
    participants: 230,
    prizePool: 'Verified Participation Certificate',
    tags: ['System Design', 'Microservices', 'AWS', 'Placement Prep'],
    description: 'Learn high-level architecture patterns, caching strategies, rate limiting, and CAP theorem trade-offs from Principal Architects.',
    deadline: 'Sept 7, 2026',
    registered: false
  },
  {
    id: 'camp_3',
    title: 'On-Campus Placement Prep Mock Interview Bootcamp',
    category: 'Placement Drive Prep',
    organizer: 'Faculty Mentorship Board',
    date: 'Sept 6 - 8, 2026',
    venue: 'Department Placement Labs',
    participants: 190,
    prizePool: 'Detailed Evaluation & Resume Critique',
    tags: ['Mock Interviews', 'DSA', 'HR Rounds', 'Faculty Guidance'],
    description: 'Simulated technical and leadership rounds conducted by senior faculty and visiting corporate HR panelists.',
    deadline: 'Sept 4, 2026',
    registered: true
  }
];

export const FACULTY_DIRECTORY = [
  {
    id: 'fac_1',
    name: 'Dr. Sneha Verma',
    title: 'Associate Professor & AI Lab Director',
    department: 'Computer Science & AI',
    specialties: ['Generative AI', 'Deep Learning', 'Placement Research Projects', 'Resume Reviews'],
    rating: 4.95,
    reviewsCount: 88,
    availability: 'Mon, Wed, Fri (3:00 PM - 5:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'sneha.verma@apex.edu'
  },
  {
    id: 'fac_2',
    name: 'Prof. Rajeshwar Kulkarni',
    title: 'Head of Department (Computer Engineering)',
    department: 'Computer Engineering',
    specialties: ['Distributed Systems', 'Cloud Architecture', 'Industry MoUs', 'Higher Studies Guidance'],
    rating: 4.88,
    reviewsCount: 112,
    availability: 'Tue, Thu (2:00 PM - 4:30 PM)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'r.kulkarni@apex.edu'
  },
  {
    id: 'fac_3',
    name: 'Dr. Meera Nambiar',
    title: 'Assistant Professor & Competitive Programming Coach',
    department: 'Information Technology',
    specialties: ['Data Structures & Algorithms', 'FAANG Interview Prep', 'Dynamic Programming', 'Graph Theory'],
    rating: 4.98,
    reviewsCount: 140,
    availability: 'Daily (4:30 PM - 6:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'm.nambiar@apex.edu'
  }
];

export const GUIDANCE_REQUESTS = [
  {
    id: 'req_1',
    studentName: 'Anshika Sharma',
    studentEmail: 'anshika.sharma@apex.edu',
    topic: 'Reviewing AI Capability Project & Microsoft On-Campus Drive Prep',
    facultyName: 'Dr. Sneha Verma',
    submittedDate: '2026-08-28',
    status: 'Accepted', // Pending, Accepted, Completed
    meetingTime: 'Sept 4, 2026 • 3:30 PM (Room AI-204 / Meet)',
    message: 'Hello Ma’am, I have completed the Autonomous Code Reviewer project and scored 84% on the AI skill diagnostic. Would appreciate your feedback before the Microsoft drive.'
  },
  {
    id: 'req_2',
    studentName: 'Rohan Mehta',
    studentEmail: 'rohan.m@apex.edu',
    topic: 'Guidance on Distributed Systems Research Paper for IEEE',
    facultyName: 'Dr. Sneha Verma',
    submittedDate: '2026-08-29',
    status: 'Pending',
    meetingTime: null,
    message: 'Respected Ma’am, looking for direction on consensus protocols benchmarking on K8s cluster.'
  }
];

export const FDP_PROGRAMS = [
  {
    id: 'fdp_1',
    title: 'Industry Immersion: Advanced Generative AI & LLM Systems for Educators',
    sponsor: 'Google Cloud & NVIDIA Academic Alliance',
    mode: 'Hybrid (Online + 2-Day Labs)',
    duration: '2 Weeks (40 Hours)',
    dates: 'Sept 20 - Oct 04, 2026',
    stipendGrant: '₹25,000 Research Grant per participant',
    targetAudience: 'Computer Science, AI & IT Faculty Members',
    seats: 40,
    enrolled: 28,
    description: 'Hands-on faculty development program covering fine-tuning open models, PyTorch distributed computing, evaluating RAG benchmarks, and integrating industrial AI toolchains into university curriculum.',
    curriculum: [
      'Day 1-3: Modern Foundation Models & Vector DBs',
      'Day 4-7: LoRA/QLoRA Parameter Efficient Fine-Tuning',
      'Day 8-11: Multi-Agent Systems & Tool Calling',
      'Day 12-14: Curriculum Design & Industry Capstones'
    ],
    status: 'Open for Registration'
  },
  {
    id: 'fdp_2',
    title: 'Cloud Native Microservices & Kubernetes in Production',
    sponsor: 'Red Hat & Cloud Native Computing Foundation (CNCF)',
    mode: '100% Online with Cloud Lab Sandbox',
    duration: '1 Week (25 Hours)',
    dates: 'Oct 12 - Oct 19, 2026',
    stipendGrant: 'Cloud Credits ($500) + Certified Instructor Badge',
    targetAudience: 'Academicians teaching Cloud, OS, and Software Architecture',
    seats: 60,
    enrolled: 42,
    description: 'Empower faculty with live production cluster setups, service meshes (Istio), automated canary rollouts, and enterprise observability.',
    curriculum: [
      'Container internals and cgroups',
      'Kubeadm cluster architecture and networking',
      'CI/CD with GitOps and ArgoCD',
      'Hands-on Student Lab Framework'
    ],
    status: 'Open for Registration'
  }
];

export const CANDIDATE_POOL = [
  {
    id: 'cand_1',
    name: 'Anshika Sharma',
    college: 'Apex Institute of Technology',
    department: 'Computer Science & AI',
    year: '3rd Year (Batch 2026)',
    cgpa: '8.9',
    aiScore: 92,
    matchPercentage: 94,
    skills: ['React.js', 'Python', 'FastAPI', 'Vector Databases', 'Tailwind CSS'],
    verifiedProjects: 2,
    status: 'Shortlisted',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    topStrength: 'Frontend & AI Integrations',
    github: 'https://github.com/anshika-sharma'
  },
  {
    id: 'cand_2',
    name: 'Arjun Singhania',
    college: 'IIT Delhi',
    department: 'Computer Science & Engineering',
    year: 'Final Year (Batch 2025)',
    cgpa: '9.3',
    aiScore: 95,
    matchPercentage: 91,
    skills: ['C++', 'Python', 'Distributed Systems', 'CUDA', 'PyTorch'],
    verifiedProjects: 3,
    status: 'Interview Scheduled',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    topStrength: 'Low-level Systems & ML Optimization',
    github: 'https://github.com/arjun-singh'
  },
  {
    id: 'cand_3',
    name: 'Pooja Venkatesh',
    college: 'Apex Institute of Technology',
    department: 'Information Technology',
    year: '3rd Year (Batch 2026)',
    cgpa: '8.7',
    aiScore: 88,
    matchPercentage: 86,
    skills: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    verifiedProjects: 1,
    status: 'Under Review',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    topStrength: 'Full Stack Web Architecture',
    github: 'https://github.com/pooja-v'
  },
  {
    id: 'cand_4',
    name: 'Devansh Kothari',
    college: 'NIT Trichy',
    department: 'ECE & Computing',
    year: '3rd Year (Batch 2026)',
    cgpa: '8.5',
    aiScore: 84,
    matchPercentage: 79,
    skills: ['Python', 'Docker', 'AWS', 'Linux', 'FastAPI'],
    verifiedProjects: 1,
    status: 'Applied',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    topStrength: 'Cloud Infrastructure & Automation',
    github: 'https://github.com/devansh-k'
  }
];
