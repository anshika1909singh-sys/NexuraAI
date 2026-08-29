import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../common/StatCard';
import {
  Sparkles,
  Briefcase,
  Award,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Building2,
  Calendar,
  ChevronRight,
  Layers,
  Target,
  ExternalLink
} from 'lucide-react';

export const StudentDashboard = ({ setActiveTab }) => {
  const { currentUser } = useAuth();
  const {
    opportunities,
    applications,
    assessmentResult,
    roadmapSteps,
    capabilityProjects,
    campusEvents
  } = useData();

  // Calculate top matched opportunities (matchScore >= 80)
  const topMatches = opportunities
    .filter((opp) => opp.matchScore >= 80)
    .slice(0, 3);

  // Completed roadmap tasks count
  const totalRoadmapTasks = roadmapSteps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedRoadmapTasks = roadmapSteps.reduce(
    (acc, step) => acc + step.tasks.filter((t) => t.done).length,
    0
  );
  const roadmapProgressPct = totalRoadmapTasks > 0 ? Math.round((completedRoadmapTasks / totalRoadmapTasks) * 100) : 0;

  const verifiedCertificatesCount = capabilityProjects.filter((p) => p.status === 'Completed').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome Banner with AI Readiness Hero */}
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 border border-brand-500/20 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-violet-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              AI Talent Intelligence Profile Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Welcome back, {currentUser?.name || 'Anshika'}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Target Role: <strong className="text-brand-300">Full-Stack AI Engineer</strong>. You have <strong className="text-emerald-300">{topMatches.length} high-match opportunities</strong> waiting for your application.
            </p>
          </div>

          {/* AI Readiness Score Box */}
          <div className="flex items-center gap-4 bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-md shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex flex-col items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <span className="text-xl leading-none font-display">
                {assessmentResult?.score || 84}%
              </span>
              <span className="text-[9px] uppercase font-bold tracking-tight mt-0.5">
                Readiness
              </span>
            </div>
            <div className="text-left space-y-1">
              <span className="text-xs font-bold text-slate-200">
                AI Industry Fit Score
              </span>
              <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                Top 8% Candidate Tier
              </p>
              <button
                onClick={() => setActiveTab('assessment')}
                className="text-[11px] text-brand-300 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                Retake Assessment <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Industry Readiness"
          value={`${assessmentResult?.score || 84}%`}
          subtitle="Based on AI diagnostic tests"
          icon={Sparkles}
          color="emerald"
          change="+6% vs last week"
          trend="up"
        />
        <StatCard
          title="Active Applications"
          value={applications.length.toString()}
          subtitle={`${applications.filter(a => a.status === 'Shortlisted').length} shortlisted`}
          icon={Briefcase}
          color="brand"
          change="2 updates"
          trend="up"
        />
        <StatCard
          title="Roadmap Progress"
          value={`${roadmapProgressPct}%`}
          subtitle={`${completedRoadmapTasks}/${totalRoadmapTasks} milestones done`}
          icon={Compass}
          color="violet"
          change="3 days left"
          trend="up"
        />
        <StatCard
          title="Verified Badges"
          value={verifiedCertificatesCount.toString()}
          subtitle="Capability projects audited"
          icon={Award}
          color="amber"
          change="1 verified"
          trend="up"
        />
      </div>

      {/* Main Grid: Recommended Jobs & Weakness Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Top Matched Opportunities & Roadmap */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Matched Opportunities */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-500" />
                  AI Recommended Opportunities
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ranked by your verified skills and test diagnostic score
                </p>
              </div>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                View All ({opportunities.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topMatches.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-brand-500/40 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={opp.logo}
                      alt={opp.company}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {opp.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {opp.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <strong className="text-slate-700 dark:text-slate-200">{opp.stipend}</strong>
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {opp.skills.slice(0, 3).map((sk, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setActiveTab('opportunities')}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      View & Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Dynamic Roadmap Snapshot */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-violet-500" />
                  Your Personalized Gap-Analysis Roadmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Customized steps targeting identified weak points to boost your hiring readiness
                </p>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>Phase Progress ({completedRoadmapTasks} of {totalRoadmapTasks} tasks completed)</span>
                <span className="text-violet-600 dark:text-violet-400 font-bold">{roadmapProgressPct}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${roadmapProgressPct}%` }}
                />
              </div>
            </div>

            {/* Active Milestone Step Preview */}
            <div className="space-y-2.5 pt-2">
              {roadmapSteps.slice(0, 2).map((step, idx) => (
                <div
                  key={step.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">{step.estimatedDays}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {step.focusArea}
                    </p>
                    <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-300">
                      {step.tasks.filter((t) => t.done).length}/{step.tasks.length} tasks completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): AI Diagnosis & Campus Bulletin */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Diagnostic Summary Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-brand-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 border border-brand-500/20 shadow-sm backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-600 dark:text-brand-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                  AI Skill Diagnostic
                </h4>
                <p className="text-[10px] text-slate-400">
                  Last evaluated on {assessmentResult?.date || 'Aug 28'}
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Strengths
              </span>
              <div className="space-y-1">
                {assessmentResult?.strengths?.map((st, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-medium"
                  >
                    ✓ {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Improvement Areas
              </span>
              <div className="space-y-1">
                {assessmentResult?.weaknesses?.map((wk, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-medium"
                  >
                    ! {wk}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('assessment')}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all"
              >
                <span>Take In-Depth Skill Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Campus Bulletin Card */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-500" />
                Campus Drives & Events
              </h4>
              <button
                onClick={() => setActiveTab('campus')}
                className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                View Hub
              </button>
            </div>

            <div className="space-y-2.5">
              {campusEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      {ev.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{ev.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {ev.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {ev.venue}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
