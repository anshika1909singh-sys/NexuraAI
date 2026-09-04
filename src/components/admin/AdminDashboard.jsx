import React from 'react';
import { useData } from '../../context/DataContext';
import {
  BarChart3,
  Building2,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
  Briefcase,
  CalendarCheck2,
} from 'lucide-react';

const StatCard = ({ label, value, hint, icon: Icon, accent }) => (
  <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{value}</p>
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">{hint}</p>
  </div>
);

export const AdminDashboard = () => {
  const {
    candidatePool,
    facultyList,
    opportunities,
    campusEvents,
    guidanceRequests,
    fdpPrograms,
    applications,
  } = useData();

  const totalStudents = candidatePool.length || 1240;
  const totalFaculty = facultyList.length || 18;
  const activeRecruiters = opportunities.filter((o) => o.postedBy === 'Industry').length;
  const totalCampusParticipants = campusEvents.reduce((sum, event) => sum + (event.participants || 0), 0);
  const pendingGuidance = guidanceRequests.filter((req) => req.status === 'Pending').length;
  const activeFdpCount = fdpPrograms.filter((fdp) => (fdp.enrolled || 0) > 0).length;
  const totalApplications = applications.length || 0;

  const studentSummary = [
    'AI readiness score is trending upward across the graduating cohort.',
    `${totalApplications} total applications are currently tracked across internships and drives.`,
    'Top demand remains in AI, Full-Stack, and cloud roles for campus candidates.'
  ];

  const facultySummary = facultyList.slice(0, 4).map((faculty) => ({
    name: faculty.name,
    dept: faculty.department,
    load: faculty.expertise?.[0] || 'Mentorship & Placement Support'
  }));

  const recruiterSummary = opportunities.slice(0, 4).map((opp) => ({
    title: opp.title,
    company: opp.company,
    type: opp.type,
    postedBy: opp.postedBy
  }));

  const campusSummary = campusEvents.slice(0, 4).map((event) => ({
    title: event.title,
    participants: event.participants || 0,
    type: event.type || 'Campus Event'
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Platform Admin Access
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">CampusLink Platform Command Center</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Live overview for student, faculty, recruiter, and campus activity.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Students" value={totalStudents.toLocaleString()} hint="Registered candidates" icon={GraduationCap} accent="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard label="Faculty" value={totalFaculty.toString()} hint="Mentors & guides" icon={BookOpenCheck} accent="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard label="Recruiters" value={activeRecruiters.toString()} hint="Active industry users" icon={Building2} accent="bg-brand-500/10 text-brand-600 dark:text-brand-400" />
        <StatCard label="Campus" value={campusEvents.length.toString()} hint="Drives & events" icon={CalendarCheck2} accent="bg-violet-500/10 text-violet-600 dark:text-violet-400" />
        <StatCard label="Applications" value={totalApplications.toString()} hint="Student submissions" icon={Briefcase} accent="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
        <StatCard label="Guidance" value={pendingGuidance.toString()} hint="Pending mentor requests" icon={Users} accent="bg-rose-500/10 text-rose-600 dark:text-rose-400" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student & Cohort Signal</h3>
          </div>
          <div className="space-y-3">
            {studentSummary.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
              <BookOpenCheck className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Faculty Pipeline</h3>
          </div>
          <div className="space-y-3">
            {facultySummary.map((faculty) => (
              <div key={faculty.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-800/70">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{faculty.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{faculty.dept}</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {faculty.load}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500/10 p-2 text-brand-600 dark:text-brand-400">
              <Building2 className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recruiter Activity</h3>
          </div>
          <div className="space-y-3">
            {recruiterSummary.map((opp) => (
              <div key={opp.title} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{opp.title}</p>
                  <span className="rounded-full bg-brand-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">{opp.type}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{opp.company} • {opp.postedBy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Campus & Event Feed</h3>
          </div>
          <div className="space-y-3">
            {campusSummary.map((event) => (
              <div key={event.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-800/70">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{event.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.type}</p>
                </div>
                <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  {event.participants} participants
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-brand-500" />
            <h4 className="font-bold">FDP Engagement</h4>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{activeFdpCount}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Active faculty development programs</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
            <Users className="h-4 w-4 text-emerald-500" />
            <h4 className="font-bold">Campus Attendance</h4>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalCampusParticipants}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Total event registrations across the ecosystem</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-violet-500" />
            <h4 className="font-bold">Admin Oversight</h4>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">24/7</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Monitoring across student, faculty, recruiter, and campus workflows</p>
        </div>
      </div>
    </div>
  );
};
