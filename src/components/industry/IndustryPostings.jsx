import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PostOpportunityModal } from './PostOpportunityModal';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const IndustryPostings = ({ setActiveTab }) => {
  const { currentUser } = useAuth();
  const { opportunities, candidatePool } = useData();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewingApplicantsOpp, setViewingApplicantsOpp] = useState(null);

  // Industry postings
  const companyJobs = opportunities.filter((o) => o.postedBy === 'Industry');

  const filteredJobs = companyJobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.domain.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || j.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            Manage Job & Internship Postings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentUser?.company || 'CloudScale Technologies AI'} • Post new openings, monitor applicant queues, and inspect candidate fit
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your postings by title, domain, or required skill..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-xs dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Postings ({companyJobs.length})</option>
            <option value="Open">Active / Open</option>
            <option value="Closed">Closed / Filled</option>
          </select>
        </div>
      </div>

      {/* Postings List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No postings matching your criteria</p>
            <button
              onClick={() => setPostModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm"
            >
              Post an Opportunity Now
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                      {job.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      ● {job.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
                    <span>{job.domain}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{job.stipend}</span>
                    <span>•</span>
                    <span>Deadline: {job.deadline}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('industry_candidates')}
                    className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View AI Matched Candidates</span>
                  </button>
                  <button
                    onClick={() => setViewingApplicantsOpp(viewingApplicantsOpp === job.id ? null : job.id)}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{viewingApplicantsOpp === job.id ? 'Hide Applicants' : 'View Applicants (4)'}</span>
                  </button>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skills?.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Collapsible Applicants Preview */}
              {viewingApplicantsOpp === job.id && (
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3 mt-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      ⚡ Pre-Assessed Applicants Queue for this Posting
                    </h4>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Average AI Score: 89.2%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {candidatePool.slice(0, 4).map((cand) => (
                      <div
                        key={cand.id}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cand.avatar}
                            alt={cand.name}
                            className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/20"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {cand.name}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                              {cand.college} • {cand.matchPercentage}% Fit
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 block">
                            {cand.aiScore}% AI
                          </span>
                          <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold cursor-pointer hover:underline" onClick={() => setActiveTab('industry_candidates')}>
                            Review →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <PostOpportunityModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />

    </div>
  );
};
