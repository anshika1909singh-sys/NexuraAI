import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../common/StatCard';
import { PostOpportunityModal } from './PostOpportunityModal';
import {
  Building2,
  Briefcase,
  Users,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const IndustryDashboard = ({ setActiveTab }) => {
  const { currentUser } = useAuth();
  const { opportunities, candidatePool, fdpPrograms } = useData();
  const [postModalOpen, setPostModalOpen] = useState(false);

  const industryJobs = opportunities.filter((o) => o.postedBy === 'Industry');

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border border-brand-500/20 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            Enterprise Recruitment Console Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, {currentUser?.name || 'Vikram Malhotra'}! 🚀
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser?.company || 'CloudScale Technologies AI'} • {currentUser?.position || 'VP of Engineering & Talent'}
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Openings"
          value={industryJobs.length.toString()}
          subtitle="Currently accepting applications"
          icon={Briefcase}
          color="brand"
        />
        <StatCard
          title="Candidate Pipeline"
          value="142"
          subtitle="Pre-assessed applicants"
          icon={Users}
          color="violet"
          change="+18 this week"
          trend="up"
        />
        <StatCard
          title="Top AI Matches"
          value={candidatePool.filter(c => c.aiScore >= 90).length.toString()}
          subtitle="Candidates > 90% score"
          icon={Sparkles}
          color="emerald"
        />
        <StatCard
          title="Sponsored FDPs"
          value={fdpPrograms.length.toString()}
          subtitle="Academic collaborations"
          icon={Award}
          color="amber"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 cols): Active Postings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-500" />
                Your Active Job & Internship Postings
              </h3>
              <button
                onClick={() => setPostModalOpen(true)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Post Another
              </button>
            </div>

            <div className="space-y-3">
              {industryJobs.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {opp.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-semibold">
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {opp.location} • {opp.stipend} • {opp.openings} Openings
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('industry_candidates')}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0"
                  >
                    <span>View Candidates</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (5 cols): AI Talent Radar Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Top AI Talent Radar
              </h3>
              <button
                onClick={() => setActiveTab('industry_candidates')}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Full Radar →
              </button>
            </div>

            <div className="space-y-3">
              {candidatePool.slice(0, 3).map((cand) => (
                <div
                  key={cand.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500/20 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {cand.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cand.college}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {cand.aiScore}% AI Rating
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <PostOpportunityModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />

    </div>
  );
};
