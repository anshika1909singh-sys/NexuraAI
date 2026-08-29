import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../common/Modal';
import {
  Landmark,
  Calendar,
  Plus,
  Search,
  Filter,
  Users,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  MapPin,
  ExternalLink,
  ChevronRight,
  Download
} from 'lucide-react';

export const UniversityDrives = () => {
  const { currentUser } = useAuth();
  const { campusEvents, postCampusEvent, candidatePool } = useData();
  const [createDriveModalOpen, setCreateDriveModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedEventForRoster, setSelectedEventForRoster] = useState(null);

  const [driveForm, setDriveForm] = useState({
    title: '',
    category: 'On-Campus Drive',
    organizer: 'Apex Placement Cell & Corporate Partner',
    date: 'Sept 22, 2026',
    venue: 'Campus Tech Auditorium & Virtual',
    prizePool: '₹20 - 28 LPA SDE-1 Offers',
    tagsStr: 'SDE, Cloud, Final Year, AI Proficient',
    description: 'Exclusive on-campus recruitment drive for 2026 graduating batch students.'
  });

  const handleCreateDrive = (e) => {
    e.preventDefault();
    postCampusEvent({
      ...driveForm,
      tags: driveForm.tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
    });
    setCreateDriveModalOpen(false);
    alert('On-Campus Drive / Event successfully published to student cohort!');
  };

  const filteredEvents = campusEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(search.toLowerCase()) ||
      (ev.tags && ev.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCat = categoryFilter === 'All' || ev.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Landmark className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            Campus Placement Drives & Event Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentUser?.name || 'Apex Institute of Technology'} • Publish campus hiring visits, hackathons, and monitor student registrations
          </p>
        </div>

        <button
          onClick={() => setCreateDriveModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-lg shadow-violet-500/25 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Drive / Hackathon</span>
        </button>
      </div>

      {/* Sourcing / Filter Bar */}
      <div className="p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drives by company name, hackathon title, or domain tag..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-xs dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Categories ({campusEvents.length})</option>
            <option value="On-Campus Drive">On-Campus Drives</option>
            <option value="Hackathon">Hackathons</option>
            <option value="Workshop">Workshops & Bootcamps</option>
            <option value="Placement Drive Prep">Placement Prep</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="space-y-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    {ev.category}
                  </span>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {ev.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
                  <span>Organizer: <strong>{ev.organizer}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {ev.date}</span>
                  <span>•</span>
                  <span>{ev.venue}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ev.prizePool}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSelectedEventForRoster(selectedEventForRoster === ev.id ? null : ev.id)}
                  className="px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50 border border-violet-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{selectedEventForRoster === ev.id ? 'Hide Roster' : `Registered (${ev.participants || 48})`}</span>
                </button>
                <button
                  onClick={() => alert(`Downloading student registration master sheet for "${ev.title}" (CSV format).`)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  title="Export Registration Sheet"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {ev.description}
            </p>

            {/* Tags */}
            {ev.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ev.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Collapsible Registered Student Roster */}
            {selectedEventForRoster === ev.id && (
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3 mt-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    📋 Verified Student Candidates Registered for this Drive
                  </h4>
                  <span className="text-[11px] text-violet-600 dark:text-violet-400 font-bold">
                    Eligibility Verified (CGPA &gt; 8.0)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {candidatePool.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-9 h-9 rounded-xl object-cover ring-2 ring-violet-500/20"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {st.name}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {st.department} • CGPA: {st.cgpa}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {st.aiScore}% AI Score
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post Drive Modal */}
      <Modal
        isOpen={createDriveModalOpen}
        onClose={() => setCreateDriveModalOpen(false)}
        title="Publish On-Campus Placement Drive or Event"
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
                <option value="Placement Drive Prep">Placement Drive Prep</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="text"
                value={driveForm.date}
                onChange={(e) => setDriveForm({ ...driveForm, date: e.target.value })}
                placeholder="e.g. Sept 24 - 26, 2026"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Organizer / Sponsor</label>
              <input
                type="text"
                value={driveForm.organizer}
                onChange={(e) => setDriveForm({ ...driveForm, organizer: e.target.value })}
                placeholder="Placement Cell & Partner"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Venue / Mode</label>
              <input
                type="text"
                value={driveForm.venue}
                onChange={(e) => setDriveForm({ ...driveForm, venue: e.target.value })}
                placeholder="Auditorium / Lab 4 / Virtual"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Package / Outcomes</label>
            <input
              type="text"
              value={driveForm.prizePool}
              onChange={(e) => setDriveForm({ ...driveForm, prizePool: e.target.value })}
              placeholder="e.g. ₹22 - 32 LPA + Full-Time SDE Offers"
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={driveForm.description}
              onChange={(e) => setDriveForm({ ...driveForm, description: e.target.value })}
              placeholder="Describe eligibility criteria, rounds, and instructions for students..."
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
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
