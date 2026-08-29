import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  GraduationCap,
  Building2,
  Landmark,
  BookOpenCheck,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Compass,
  Award,
  CheckCircle2,
  Users,
  TrendingUp,
  Cpu,
  Star,
  Layers
} from 'lucide-react';

export const LandingPage = ({ onGetStarted }) => {
  const { openAuth, switchRole } = useAuth();
  const [activePersonaTab, setActivePersonaTab] = useState('student');

  const handleRoleQuickStart = (roleKey) => {
    openAuth('login', roleKey);
  };

  const personaContent = {
    student: {
      title: 'Accelerate Your Dream Tech Career with AI Precision',
      badge: 'For Future Tech Innovators',
      description: 'Take adaptive AI assessments, discover precise strengths and weakness gaps, generate dynamic milestone roadmaps, build verified capability projects, and connect directly with campus faculty and top-tier recruiters.',
      features: [
        'AI-driven adaptive skill assessment with real-time radar scoring',
        'Dynamic weakness-to-roadmap personalized learning plan',
        'Industry internship & job matching with 1-click apply & stage tracker',
        'Hands-on capability projects with automated code audit & verified certificates',
        '1-on-1 campus faculty guidance scheduling & mentorship desk'
      ],
      cta: 'Launch Student Dashboard',
      roleKey: 'student',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    },
    industry: {
      title: 'Precision AI Talent Sourcing & Campus Hiring',
      badge: 'For Tech Recruiters & Enterprise Leaders',
      description: 'Zero guesswork hiring. Access pre-assessed candidates with verified AI skill ratings, examine live GitHub capability code audits, post internships or full-time roles, and sponsor Faculty Development Programs (FDPs).',
      features: [
        'AI Talent Radar ranking candidates by verified skill score and match %',
        'Post targeted internships, full-time openings, and hackathons',
        'Inspect candidate code quality & capability project submissions',
        'Sponsor industry-grade FDPs and collaborate with top academic departments'
      ],
      cta: 'Enter Industry Recruiter Hub',
      roleKey: 'industry',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
    },
    university: {
      title: 'Transform Placements & Campus-Industry Synergy',
      badge: 'For Deans, TPOs & Placement Directors',
      description: 'Streamline on-campus recruitment drives, host internal hackathons and industry workshops, monitor departmental skill readiness indexes, and foster deep industry partnerships.',
      features: [
        'Host and manage exclusive on-campus placement drives & hackathons',
        'Comprehensive analytics dashboard tracking student readiness & skill gaps',
        'Manage partner company MoUs and recruiter invitations seamlessly',
        'Direct alignment of academic syllabus with industry demand trends'
      ],
      cta: 'Access University Portal',
      roleKey: 'university',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80'
    },
    faculty: {
      title: 'Empower Student Mentorship & Academic Growth',
      badge: 'For Professors & Department Mentors',
      description: 'Guide aspiring students with 1-on-1 scheduled sessions, evaluate student capability projects, upskill with cutting-edge industry FDPs and research grants, and elevate department placement outcomes.',
      features: [
        'Dedicated mentorship desk to review and schedule student guidance requests',
        'Evaluate student capability submissions and provide targeted feedback',
        'Explore industry-sponsored Faculty Development Programs & research grants',
        'Monitor cohort placement readiness and identify students needing support'
      ],
      cta: 'Open Faculty Guidance Hub',
      roleKey: 'faculty',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80'
    }
  };

  const currentPersona = personaContent[activePersonaTab];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Glowing Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/20 via-violet-600/20 to-cyan-500/20 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Next-Generation AI Unified Ecosystem</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Students • Industry • Universities • Faculty</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1]">
            Where <span className="text-gradient">Academic Excellence</span> Meets <span className="text-gradient-cyan">Industry Innovation</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Nexura is the unified intelligence platform empowering students with AI skill diagnostics & dynamic roadmaps, recruiters with verified talent radars, universities with placement synergy, and faculty with seamless mentorship.
          </p>

          {/* Interactive Persona Quick Starters */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => handleRoleQuickStart('student')}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 shadow-md hover:shadow-emerald-500/20 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  I am a Student
                </div>
                <div className="text-[10px] text-slate-400">
                  Assess Skills & Find Jobs
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleRoleQuickStart('industry')}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-brand-500/30 hover:border-brand-500 shadow-md hover:shadow-brand-500/20 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  I am a Recruiter / Industry
                </div>
                <div className="text-[10px] text-slate-400">
                  Post Jobs & AI Talent Radar
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleRoleQuickStart('university')}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-violet-500/30 hover:border-violet-500 shadow-md hover:shadow-violet-500/20 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                  University / College
                </div>
                <div className="text-[10px] text-slate-400">
                  Campus Drives & Stats
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-violet-500 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleRoleQuickStart('faculty')}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 hover:border-amber-500 shadow-md hover:shadow-amber-500/20 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  Faculty / Academician
                </div>
                <div className="text-[10px] text-slate-400">
                  Mentorship Desk & FDPs
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                45,000+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verified Tech Students
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-brand-600 dark:text-brand-400">
                850+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Active Hiring Companies
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                91.4%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Average Placement Rate
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-violet-600 dark:text-violet-400">
                98.2%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                AI Skill Match Accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Persona Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Tailored Experiences
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Built for Every Pillar of the Tech Ecosystem
          </h3>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto mb-10">
          {[
            { id: 'student', label: 'Students', icon: GraduationCap },
            { id: 'industry', label: 'Industry Recruiters', icon: Building2 },
            { id: 'university', label: 'University Placement', icon: Landmark },
            { id: 'faculty', label: 'Faculty & Mentors', icon: BookOpenCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePersonaTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePersonaTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105 cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Persona Spotlight Card */}
        <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 lg:p-12">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                {currentPersona.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white leading-tight">
                {currentPersona.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentPersona.description}
              </p>

              {/* Feature List */}
              <div className="space-y-3 pt-2">
                {currentPersona.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => handleRoleQuickStart(currentPersona.roleKey)}
                  className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2.5 shadow-lg shadow-brand-500/25 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{currentPersona.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Col: Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <img
                  src={currentPersona.image}
                  alt={currentPersona.title}
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-300 font-bold">
                      Interactive Live Module
                    </span>
                    <h4 className="text-base font-bold font-display">
                      Ready for Deployment
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Powered by NextGen AI
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Architecture Designed for Real Impact
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all hover:scale-102">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
              Adaptive AI Assessment
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Multi-domain intelligent testing that evaluates conceptual depth, algorithm design, and code reasoning to pinpoint exact strengths and weakness gaps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all hover:scale-102">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
              Weakness-to-Roadmap Generator
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automatically turns diagnostic test gaps into actionable, milestone-based step sequences with curated tutorials and project deliverables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all hover:scale-102">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
              Capability Code Audits & Badges
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Students build real-world microservices & AI agents; our automated engine audits repository code quality and issues verifiable digital certificates.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
              Ready to Bridge the Gap Between Learning and Hiring?
            </h3>
            <p className="text-sm text-brand-100 leading-relaxed">
              Join thousands of students, professors, placement directors, and global engineering recruiters on Nexura today.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <button
                onClick={() => openAuth('signup')}
                className="px-7 py-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-white/30 text-white font-black text-xs shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Create Free Account</span>
              </button>
              <button
                onClick={() => handleRoleQuickStart('student')}
                className="px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Live Demo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
