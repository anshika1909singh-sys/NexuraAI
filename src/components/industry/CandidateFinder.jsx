import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  Send,
  Calendar,
  Code2,
  Mail,
  UserCheck
} from 'lucide-react';

export const CandidateFinder = () => {
  const {
  industryApplications,
  updateIndustryApplicationStatus
} = useData();

  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateToSchedule, setCandidateToSchedule] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const scheduledDateTime =
    interviewDate && interviewTime
      ? new Date(`${interviewDate}T${interviewTime}`)
      : null;
  const formattedScheduledDate = scheduledDateTime && !Number.isNaN(scheduledDateTime.getTime())
    ? new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(scheduledDateTime)
    : 'Choose a date';
  const formattedScheduledTime = scheduledDateTime && !Number.isNaN(scheduledDateTime.getTime())
    ? new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit'
      }).format(scheduledDateTime)
    : 'Choose a time';
  const applicantCandidates = useMemo(() => {
  return (industryApplications || []).map((application) => ({
    id: application.id,

    name:
      application.studentName ||
      "Nexura Student",

    email:
      application.studentEmail ||
      "",

    college:
      application.studentCollege ||
      "College not provided",

    department:
      application.studentDepartment ||
      "Department not provided",

    // These are placeholders until we connect
    // the student's actual assessment score.
    aiScore:
      application.assessmentScore ||
      0,

    matchPercentage:
      application.matchPercentage ||
      0,

    topStrength:
      application.topStrength ||
      "Applicant",

    verifiedProjects:
      application.verifiedProjects ||
      0,

    skills:
      application.skills ||
      [],

    status:
      application.status ||
      "Applied",

    opportunityId:
      application.opportunityId,

    opportunityTitle:
      application.opportunityTitle ||
      "Opportunity",

    company:
      application.company ||
      currentUser?.company ||
      "",

    interviewAt:
      application.interviewAt ||
      ""
  }));
}, [industryApplications, currentUser]);
  const filteredCandidates = applicantCandidates.filter((c) => {
  const searchTerm = search.toLowerCase();

  const matchesSearch =
    c.name.toLowerCase().includes(searchTerm) ||
    c.college.toLowerCase().includes(searchTerm) ||
    c.skills.some((skill) =>
      skill.toLowerCase().includes(searchTerm)
    );

  const matchesScore =
    c.aiScore >= minScore;

  return matchesSearch && matchesScore;
});
  
const handleAction = async (
  applicationId,
  status,
  scheduledInterviewAt
) => {
  const result =
    await updateIndustryApplicationStatus(
      applicationId,
      status,
      scheduledInterviewAt
    );

  if (!result?.success) {
    alert(
      result?.message ||
      "Unable to update application."
    );
    return false;
  }

  if (
    selectedCandidate &&
    selectedCandidate.id === applicationId
  ) {
    setSelectedCandidate({
      ...selectedCandidate,
      status,
      ...(scheduledInterviewAt !== undefined
        ? { interviewAt: scheduledInterviewAt }
        : {})
    });
  }

  return true;
};

const openScheduleInterview = (candidate) => {
  setCandidateToSchedule(candidate);
  setInterviewDate(candidate.interviewAt?.slice(0, 10) || '');
  setInterviewTime(candidate.interviewAt?.slice(11, 16) || '');
};

const handleScheduleInterview = async () => {
  if (!candidateToSchedule || !interviewDate || !interviewTime) {
    return;
  }

  const interviewAt = `${interviewDate}T${interviewTime}`;

  const scheduled = await handleAction(
    candidateToSchedule.id,
    'Interview Scheduled',
    interviewAt
  );

  if (!scheduled) {
    return;
  }

  setCandidateToSchedule(null);
  setInterviewDate('');
  setInterviewTime('');
};
  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            AI Talent Radar & Candidate Pipeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Precision sourcing: candidates pre-ranked by AI Skill Score, project code audits, and match %
          </p>
        </div>
      </div>

      {/* Sourcing Filters Bar */}
      <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter candidates by skill (e.g. React, Python, CUDA), college, or name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-xs dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
            Min AI Skill Score:
          </span>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value={0}>All Candidates</option>
            <option value={80}>⚡ 80%+ Proficient</option>
            <option value={90}>🔥 90%+ Top Tier</option>
          </select>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {filteredCandidates.length === 0 && (
    <div className="md:col-span-2 p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-dashed border-slate-300 dark:border-slate-700 text-center">
      <UserCheck className="w-10 h-10 mx-auto text-slate-400 mb-3" />

      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        No applicants yet
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Students who apply to your opportunities will appear here.
      </p>
    </div>
  )}

  {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                        {cand.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                        {cand.matchPercentage}% Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold mt-1">
                       Applied for: {cand.opportunityTitle}
                    </p>
                  </div>
                </div>

                {/* Score badge */}
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-sm flex flex-col items-center shrink-0">
                  <span>{cand.aiScore}%</span>
                  <span className="text-[8px] uppercase font-bold tracking-tight">AI Rating</span>
                </div>
              </div>

              {/* Strengths & Verified Projects */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  Core Domain: <strong className="text-slate-900 dark:text-white">{cand.topStrength}</strong>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{cand.verifiedProjects} AI Code-Audited Capability Projects Attached</span>
                </p>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-1 pt-1">
                {cand.skills.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-500/15"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Hiring Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Pipeline: <strong className="text-brand-600 dark:text-brand-400">{cand.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction(cand.id, 'Shortlisted')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => openScheduleInterview(cand)}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => handleAction(cand.id, 'Hired')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  Mark Hired
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(candidateToSchedule)}
        onClose={() => setCandidateToSchedule(null)}
        title="Schedule Interview"
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-500/15 bg-gradient-to-br from-brand-50 to-violet-50 p-4 dark:from-brand-950/40 dark:to-violet-950/30">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
              Candidate
            </p>
            <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              {candidateToSchedule?.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {candidateToSchedule?.opportunityTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">
              <input
                type="date"
                value={interviewDate}
                onChange={(event) => setInterviewDate(event.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-label="Interview date"
                required
              />
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950/70 dark:text-brand-300">
                  <Calendar className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                  <span className="mt-1 block truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                    {interviewDate
                      ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${interviewDate}T00:00`))
                      : 'Select date'}
                  </span>
                </span>
              </span>
            </label>

            <label className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">
              <input
                type="time"
                value={interviewTime}
                onChange={(event) => setInterviewTime(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-label="Interview time"
                required
              />
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/70 dark:text-violet-300">
                  <Calendar className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Time</span>
                  <span className="mt-1 block text-xs font-bold text-slate-800 dark:text-slate-100">
                    {interviewTime
                      ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(`2000-01-01T${interviewTime}`))
                      : 'Select time'}
                  </span>
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-2xl border border-dashed border-brand-500/30 bg-brand-50/50 p-4 dark:bg-brand-950/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
              Interview slot preview
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {formattedScheduledDate}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
              {formattedScheduledTime}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setCandidateToSchedule(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleInterview}
              disabled={!interviewDate || !interviewTime}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm Schedule
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
