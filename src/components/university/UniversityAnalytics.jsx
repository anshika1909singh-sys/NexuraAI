import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../common/StatCard';
import {
  Sparkles,
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Building2,
  Download,
  CheckCircle2,
  AlertTriangle,
  Layers,
  GraduationCap
} from 'lucide-react';

export const UniversityAnalytics = () => {
  const { currentUser } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState('2026');
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Official Placement & Batch Intelligence Report (PDF/Excel) downloaded!');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            Batch Placement Intelligence & Skill Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentUser?.name || 'Apex Institute of Technology'} • Real-time departmental readiness index, recruiter conversion, and skill gap metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="2026">🎓 Graduating Batch 2026 (Current)</option>
            <option value="2025">🎓 Batch 2025 (Historical)</option>
            <option value="2027">🎓 Pre-Final Batch 2027 (Internships)</option>
          </select>

          <button
            onClick={handleExport}
            disabled={downloading}
            className="px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Exporting...' : 'Export Intelligence Report'}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Placement Rate"
          value="91.4%"
          subtitle="Batch 2026 to date"
          icon={TrendingUp}
          color="emerald"
          change="+4.2% vs 2025"
          trend="up"
        />
        <StatCard
          title="Average CTC Package"
          value="₹14.8 LPA"
          subtitle="Top Tier: ₹38 LPA"
          icon={Award}
          color="violet"
          change="+18.5% YoY"
          trend="up"
        />
        <StatCard
          title="Verified AI Score Avg"
          value="86.8%"
          subtitle="Cohort capability test"
          icon={Sparkles}
          color="brand"
        />
        <StatCard
          title="Recruiting Partners"
          value="85"
          subtitle="Corporate hiring drives"
          icon={Building2}
          color="amber"
        />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Departmental Readiness & Placement Rate (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-500" />
                Departmental AI Skill Index & Placement Conversion
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { dept: 'Computer Science & AI', students: 480, score: 91, placed: '96.2%', color: 'from-violet-500 to-indigo-600' },
                { dept: 'Information Technology', students: 340, score: 87, placed: '92.4%', color: 'from-brand-500 to-cyan-500' },
                { dept: 'Data Science & Analytics', students: 260, score: 89, placed: '94.0%', color: 'from-emerald-500 to-teal-500' },
                { dept: 'Electronics & Computing', students: 220, score: 79, placed: '86.5%', color: 'from-amber-500 to-orange-500' },
                { dept: 'Robotics & Automation', students: 150, score: 82, placed: '88.1%', color: 'from-pink-500 to-rose-500' }
              ].map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {row.dept}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {row.students} registered candidates
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                        {row.placed} Placed
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Avg AI Score: {row.score}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                      style={{ width: `${row.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Salary CTC Distribution Tier */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              Salary CTC Distribution Tiers (Batch 2026)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Dream Tier (&gt; ₹20 LPA)</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">24%</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">348 Students Offered</p>
              </div>

              <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-500/20 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400">Super Tier (₹12 - 20 LPA)</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">52%</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">754 Students Offered</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">Standard Tier (₹6 - 12 LPA)</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">24%</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">348 Students Offered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Top Recruiter Partners & AI Skill Gap Heatmap (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Top Corporate Recruiters */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-500" />
              Top Corporate Hiring Partners
            </h3>

            <div className="space-y-3">
              {[
                { name: 'Microsoft India', hires: 34, avgCtc: '₹28.5 LPA', logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80' },
                { name: 'CloudScale Technologies AI', hires: 28, avgCtc: '₹22.0 LPA', logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=100&auto=format&fit=crop&q=80' },
                { name: 'Google Cloud Program', hires: 18, avgCtc: '₹34.0 LPA', logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80' },
                { name: 'NexusLabs Global', hires: 22, avgCtc: '₹16.5 LPA', logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80' }
              ].map((co, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={co.logo}
                      alt={co.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {co.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {co.hires} students hired
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {co.avgCtc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Skill Deficit Recommendations */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              AI Curriculum & Skill Deficit Radar
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-500/20 text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Cloud & Kubernetes Deficit
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  18% deficit in Electronics and IT branches. Recommended: Red Hat sponsored FDP workshop.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Frontend & React Excellence
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Top 5% in nationwide algorithmic & modern frontend architecture capability benchmarks.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
