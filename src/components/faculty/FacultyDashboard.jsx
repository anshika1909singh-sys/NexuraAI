import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../common/StatCard';
import { Modal } from '../common/Modal';
import {
  BookOpenCheck,
  Users,
  Award,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Layers,
  Search,
  MessageSquare
} from 'lucide-react';

export const FacultyDashboard = ({ activeTab: navActiveTab, setActiveTab: setNavActiveTab }) => {
  const { currentUser } = useAuth();
  const { guidanceRequests, updateGuidanceStatus, fdpPrograms, enrollInFdp, candidatePool } = useData();
  
  // Internal tab state mapping to navActiveTab if provided
  const [currentTab, setCurrentTab] = useState(() => {
    if (navActiveTab === 'faculty_mentorship') return 'mentorship';
    if (navActiveTab === 'faculty_fdp') return 'fdp';
    return 'hub';
  });

  useEffect(() => {
    if (navActiveTab === 'faculty_mentorship') setCurrentTab('mentorship');
    else if (navActiveTab === 'faculty_fdp') setCurrentTab('fdp');
    else if (navActiveTab === 'faculty_dashboard') setCurrentTab('hub');
  }, [navActiveTab]);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [slotTime, setSlotTime] = useState('Sept 5, 2026 • 3:30 PM (Room AI-204 / Google Meet)');

  const handleTabChange = (tabKey) => {
    setCurrentTab(tabKey);
    if (setNavActiveTab) {
      if (tabKey === 'hub') setNavActiveTab('faculty_dashboard');
      if (tabKey === 'mentorship') setNavActiveTab('faculty_mentorship');
      if (tabKey === 'fdp') setNavActiveTab('faculty_fdp');
    }
  };

  const handleOpenSchedule = (req) => {
    setSelectedRequest(req);
    setScheduleModalOpen(true);
  };

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;
    updateGuidanceStatus(selectedRequest.id, 'Accepted', slotTime);
    setScheduleModalOpen(false);
    alert(`Mentorship slot confirmed with ${selectedRequest.studentName}!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/20 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
            <BookOpenCheck className="w-3.5 h-3.5" />
            Faculty Academic & Mentorship Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, {currentUser?.name || 'Dr. Sneha Verma'}! 👨‍🏫
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser?.department || 'Department of Computer Science & AI'} • {currentUser?.designation || 'Associate Professor & AI Lab Director'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-left">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Pending Guidance Queries</span>
            <span className="text-xl font-bold font-display">{guidanceRequests.filter(r => r.status === 'Pending').length} Pending Slots</span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Mentees"
          value="24"
          subtitle="UG/PG project candidates"
          icon={Users}
          color="amber"
        />
        <StatCard
          title="Guidance Requests"
          value={guidanceRequests.length.toString()}
          subtitle="Pre-placement 1-on-1 reviews"
          icon={BookOpenCheck}
          color="brand"
          change="+2 new"
          trend="up"
        />
        <StatCard
          title="Industry FDPs"
          value={fdpPrograms.length.toString()}
          subtitle="Sponsored upskilling programs"
          icon={Award}
          color="violet"
        />
        <StatCard
          title="Batch Avg AI Score"
          value="86.4%"
          subtitle="Skill Diagnostic Rating"
          icon={Sparkles}
          color="emerald"
        />
      </div>

      {/* Subtab Switcher */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 max-w-xl">
        <button
          onClick={() => handleTabChange('hub')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'hub'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Faculty Hub
        </button>
        <button
          onClick={() => handleTabChange('mentorship')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'mentorship'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Student Guidance Desk ({guidanceRequests.length})
        </button>
        <button
          onClick={() => handleTabChange('fdp')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'fdp'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Industry FDPs ({fdpPrograms.length})
        </button>
      </div>

      {/* Tab 1: Faculty Hub Overview */}
      {currentTab === 'hub' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Guidance Queue Priority */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-500" />
                    Priority Guidance & Mentorship Requests
                  </h3>
                  <button
                    onClick={() => handleTabChange('mentorship')}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {guidanceRequests.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {req.studentName}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              req.status === 'Accepted'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold truncate">
                          {req.topic}
                        </p>
                      </div>

                      <button
                        onClick={() => handleTabChange('mentorship')}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shrink-0 shadow-xs"
                      >
                        Manage Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research & Lab Capabilities */}
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-violet-500" />
                  Active Research Labs & Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Applied GenAI & SLMs Lab</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">8 UG researchers • Funded by Google Cloud Grant</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Distributed Consensus Benchmark</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">4 PG researchers • Preparing IEEE Submission</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Department Top Students Radar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    Top Department Performers
                  </h3>
                </div>

                <div className="space-y-3">
                  {candidatePool.slice(0, 4).map((st) => (
                    <div
                      key={st.id}
                      className="p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-700/60 flex flex-col gap-2.5"
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500/20"
                      />

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {st.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {st.department} • CGPA {st.cgpa}
                        </p>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {st.aiScore}% AI
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Student Guidance Desk */}
      {currentTab === 'mentorship' && (
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Student Guidance & Mentorship Queue
            </h3>
            <span className="text-xs text-slate-400">{guidanceRequests.length} Total Requests</span>
          </div>

          <div className="space-y-3">
            {guidanceRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {req.studentName}
                    </h4>
                    <span className="text-[11px] text-slate-400">({req.studentEmail})</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        req.status === 'Accepted'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    Topic: {req.topic}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "{req.message}"
                  </p>
                  {req.meetingTime && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Confirmed Slot: {req.meetingTime}
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {req.status === 'Pending' ? (
                    <button
                      onClick={() => handleOpenSchedule(req)}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
                    >
                      Accept & Set Slot
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Scheduled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Industry FDP Programs */}
      {currentTab === 'fdp' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Sponsored Industry Faculty Development Programs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enroll in hands-on industry upskilling modules and receive funded lab research grants
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fdpPrograms.map((fdp) => (
              <div
                key={fdp.id}
                className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                      {fdp.sponsor}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{fdp.duration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    {fdp.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {fdp.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 font-medium space-y-1">
                    <p>🎁 Grant / Benefits: <strong>{fdp.stipendGrant}</strong></p>
                    <p>📅 Dates: {fdp.dates} • Mode: {fdp.mode}</p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Curriculum Outline:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                      {fdp.curriculum?.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{fdp.enrolled} / {fdp.seats} Seats Filled</span>
                  {fdp.userEnrolled ? (
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        enrollInFdp(fdp.id);
                        alert(`Successfully registered for ${fdp.title}!`);
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Enroll in FDP
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Set Slot Modal */}
      {selectedRequest && (
        <Modal
          isOpen={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          title={`Confirm Mentorship Slot: ${selectedRequest.studentName}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleConfirmSchedule} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Scheduled Slot / Venue *
              </label>
              <input
                type="text"
                required
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                placeholder="e.g. Sept 5, 2026 • 3:30 PM (Room AI-204 / Google Meet)"
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-brand-500/20"
              >
                <Send className="w-4 h-4" />
                Confirm & Notify Student
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
