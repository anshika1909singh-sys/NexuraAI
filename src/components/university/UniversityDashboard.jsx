import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../common/StatCard';
import { Modal } from '../common/Modal';
import {
  Landmark,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Send,
  BarChart3
} from 'lucide-react';

export const UniversityDashboard = ({ setActiveTab }) => {
  const { currentUser } = useAuth();
  const { campusEvents, postCampusEvent, opportunities } = useData();
  const [createDriveModalOpen, setCreateDriveModalOpen] = useState(false);
  const [driveForm, setDriveForm] = useState({
    title: '',
    category: 'On-Campus Drive',
    organizer: 'Placement Cell & Partner Company',
    date: 'Sept 22, 2026',
    venue: 'Campus Tech Auditorium & Virtual',
    prizePool: '₹18 - 26 LPA Full-Time Offers',
    tagsStr: 'SDE-1, Cloud, Placement Drive',
    description: 'Exclusive on-campus recruitment drive for final & pre-final year engineering students.'
  });

  const handleCreateDrive = (e) => {
    e.preventDefault();
    postCampusEvent({
      ...driveForm,
      tags: driveForm.tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
    });
    setCreateDriveModalOpen(false);
    alert('On-Campus Drive / Event published to students!');
  };

  const onCampusOpenings = opportunities.filter((o) => o.type === 'On-Campus Drive' || o.postedBy === 'University');

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/20 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs font-semibold">
            <Landmark className="w-3.5 h-3.5" />
            University Placement & Campus Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            {currentUser?.name || 'Apex Institute of Technology'} 🏛️
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser?.deanName || 'Prof. A. K. Sen'} • {currentUser?.designation || 'Dean of Corporate Relations & Placements'}
          </p>
        </div>

        <button
          onClick={() => setCreateDriveModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-lg shadow-violet-500/25 transition-all hover:scale-105 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post On-Campus Drive / Event</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Placement Conversion"
          value="91.4%"
          subtitle="2026 Batch progress"
          icon={TrendingUp}
          color="emerald"
          change="+4.2% YoY"
          trend="up"
        />
        <StatCard
          title="Active Campus Drives"
          value={campusEvents.length.toString()}
          subtitle="Drives & hackathons live"
          icon={Calendar}
          color="violet"
        />
        <StatCard
          title="Registered Students"
          value="1,450"
          subtitle="AI-assessed candidates"
          icon={GraduationCap}
          color="brand"
        />
        <StatCard
          title="Partner Companies"
          value="85"
          subtitle="Active corporate MoUs"
          icon={Building2}
          color="amber"
        />
      </div>

      {/* Campus Drives & Department Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Campus Drives */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-500" />
                Active On-Campus Drives & Workshops
              </h3>
              <button
                onClick={() => setCreateDriveModalOpen(true)}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Post New
              </button>
            </div>

            <div className="space-y-3">
              {campusEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      {ev.category}
                    </span>
                    <span className="text-xs text-slate-400">{ev.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {ev.venue} • {ev.participants} students registered
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Departmental Readiness Index */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              Department Placement Readiness Index
            </h3>
            
            <div className="space-y-3 pt-2">
              {[
                { dept: 'Computer Science & AI', score: 88, placed: '94%' },
                { dept: 'Information Technology', score: 84, placed: '91%' },
                { dept: 'Electronics & Computing', score: 79, placed: '86%' },
                { dept: 'Data Science & Analytics', score: 85, placed: '92%' },
              ].map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{d.dept}</span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">
                      {d.score}% Avg Readiness ({d.placed} Placed)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-500/20 text-xs text-slate-600 dark:text-slate-300">
              💡 <strong>AI Placement Recommendation:</strong> 12% of ECE students need containerization upskilling. Recommend scheduling AWS Microservices workshop.
            </div>
          </div>
        </div>

      </div>

      {/* Post Drive Modal */}
      <Modal
        isOpen={createDriveModalOpen}
        onClose={() => setCreateDriveModalOpen(false)}
        title="Publish On-Campus Drive / Event"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreateDrive} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Drive / Event Title *
            </label>
            <input
              type="text"
              required
              value={driveForm.title}
              onChange={(e) => setDriveForm({ ...driveForm, title: e.target.value })}
              placeholder="e.g. On-Campus Microsoft Placement Drive 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={driveForm.category}
                onChange={(e) => setDriveForm({ ...driveForm, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="On-Campus Drive">On-Campus Drive</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Industry Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="text"
                value={driveForm.date}
                onChange={(e) => setDriveForm({ ...driveForm, date: e.target.value })}
                placeholder="e.g. Sept 18 - 20, 2026"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Venue / Mode</label>
            <input
              type="text"
              value={driveForm.venue}
              onChange={(e) => setDriveForm({ ...driveForm, venue: e.target.value })}
              placeholder="Campus Auditorium & Lab 4"
              className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Package / Outcomes</label>
            <input
              type="text"
              value={driveForm.prizePool}
              onChange={(e) => setDriveForm({ ...driveForm, prizePool: e.target.value })}
              placeholder="e.g. ₹22 - 32 LPA + Full-Time SDE Offers"
              className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateDriveModalOpen(false)}
              className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-violet-500/20"
            >
              <Send className="w-4 h-4" />
              Publish Drive
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
