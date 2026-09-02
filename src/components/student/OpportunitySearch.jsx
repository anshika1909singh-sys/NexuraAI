import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from "../../context/AuthContext";
import { Modal } from '../common/Modal';
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  Check,
  Send,
  AlertCircle
} from 'lucide-react';

export const OpportunitySearch = ({ setActiveTab }) => {
  const { currentUser } = useAuth();
  const { opportunities, applications, applyToOpportunity } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [activeTabSub, setActiveTabSub] = useState('explore'); // 'explore' | 'applied'
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applySuccessMsg, setApplySuccessMsg] = useState('');

  const types = ['All', 'Internship', 'Full-Time', 'On-Campus Drive'];
  const domains = ['All', 'AI & Full Stack', 'Frontend Engineering', 'DevOps & Cloud', 'AI & Data Science', 'Software Engineering'];

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesQuery =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesDomain = selectedDomain === 'All' || opp.domain === selectedDomain;
    const matchesScore = opp.matchScore >= minMatchScore;

    return matchesQuery && matchesType && matchesDomain && matchesScore;
  });

  const handleOpenApply = (opp) => {
    if (!currentUser) {
      alert('Please log in to apply for opportunities');
      return;
    }
    setSelectedOpportunity(opp);
    setApplyModalOpen(true);
    setApplySuccessMsg('');
  };

  const handleConfirmApply = async () => {
  if (!selectedOpportunity) return;

  console.log("1. Confirm Apply clicked");
  console.log("2. Selected opportunity:", selectedOpportunity);

  try {
    const res = await applyToOpportunity(selectedOpportunity.id);

    console.log("3. APPLY RESULT:", res);

    if (res.success) {
      setApplySuccessMsg("Application submitted successfully!");

      setTimeout(() => {
        setApplyModalOpen(false);
        setApplySuccessMsg('');
      }, 1800);
    } else {
      alert(res.message || "Unable to apply to this opportunity.");
    }
  } catch (error) {
    console.error("4. APPLY ERROR:", error);
    alert(error.message || "Something went wrong while applying.");
  }
};

  const isApplied = (oppId) => applications.some((a) => a.opportunityId === oppId);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            Opportunities & Jobs Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explore verified internships, full-time roles, and exclusive on-campus placement drives
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTabSub('explore')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'explore'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Explore Openings ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTabSub('applied')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTabSub === 'applied'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Applications ({applications.length})
            {applications.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] bg-brand-500 text-white font-bold">
                {applications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTabSub === 'explore' ? (
        <div className="space-y-6">
          {/* Search & Filters Bar */}
          <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, company (e.g. Google, Microsoft), or skill (e.g. React, Python, Docker)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              
              {/* Type Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Type:
                </span>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedType === t
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Match Score Slider / Filter */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  Min AI Match:
                </span>
                <select
                  value={minMatchScore}
                  onChange={(e) => setMinMatchScore(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value={0}>All Matches</option>
                  <option value={80}>⚡ 80%+ Match</option>
                  <option value={90}>🔥 90%+ Top Fit</option>
                </select>
              </div>

            </div>
          </div>

          {/* Opportunity Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((opp) => {
              const applied = isApplied(opp.id);
              return (
                <div
                  key={opp.id}
                  className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Top: Logo & Title */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={opp.logo}
                          alt={opp.company}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {opp.company}
                          </p>
                        </div>
                      </div>

                      {/* AI Match Badge */}
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {opp.matchScore}% Match
                      </span>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        {opp.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {opp.location}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                        💰 {opp.stipend}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Required Skills */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Key Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.skills.map((sk, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-500/15"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Deadline & Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Apply by: <strong className="text-slate-600 dark:text-slate-300">{opp.deadline}</strong>
                    </span>

                    {applied ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenApply(opp)}
                        className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all hover:scale-105 flex items-center gap-1.5"
                      >
                        <span>Quick Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Applications Tracker Tab */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Active Application Pipeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your recruitment progress, AI score reviews, and interview invites
              </p>
            </div>

            <div className="space-y-4">
              {applications.map((app) => {
                const stages = [
                  { label: 'Applied', step: 1 },
                  { label: 'Assessment Verified', step: 2 },
                  { label: 'Under Review', step: 3 },
                  { label: 'Shortlisted', step: 4 },
                  { label: 'Offer', step: 5 }
                ];

                return (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {app.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {app.company} • Applied on {app.appliedDate}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                        Status: {app.status}
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-5 gap-1 text-center">
                        {stages.map((st) => (
                          <div key={st.step} className="space-y-1">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                app.step >= st.step
                                  ? 'bg-brand-600 dark:bg-brand-500'
                                  : 'bg-slate-200 dark:bg-slate-700'
                              }`}
                            />
                            <span
                              className={`text-[9px] font-bold block truncate ${
                                app.step >= st.step
                                  ? 'text-brand-600 dark:text-brand-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feedback box */}
                    {app.feedback && (
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                        <strong className="text-brand-600 dark:text-brand-400 font-semibold block mb-0.5">
                          Recruiter & AI Feedback:
                        </strong>
                        {app.feedback}
                        {app.interviewDate && (
                          <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            Interview Scheduled: {app.interviewDate}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Apply Confirmation Modal */}
      {selectedOpportunity && (
        <Modal
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          title={`Apply to ${selectedOpportunity.title}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-6">
            
            {applySuccessMsg ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Application Submitted!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {applySuccessMsg}
                </p>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedOpportunity.company}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {selectedOpportunity.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {selectedOpportunity.description}
                  </p>
                </div>

                {/* Eligibility Verification Check */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verified Profile Checklist:
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>AI Skill Diagnostic Score: <strong>84/100 (Passes &gt;= 75% bar)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Verified Capability Project attached to profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>College Placement Cell Verification: Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmApply}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-500/20"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Application
                  </button>
                </div>
              </>
            )}

          </div>
        </Modal>
      )}

    </div>
  );
};
