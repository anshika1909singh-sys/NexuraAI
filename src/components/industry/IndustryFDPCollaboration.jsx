import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../common/Modal';
import {
  BookOpenCheck,
  Award,
  Users,
  Building2,
  Plus,
  Send,
  Calendar,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export const IndustryFDPCollaboration = () => {
  const { currentUser } = useAuth();
  const { fdpPrograms, facultyList } = useData();
  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [fdpList, setFdpList] = useState(fdpPrograms);
  const [proposeForm, setProposeForm] = useState({
    title: '',
    duration: '2 Weeks (40 Hours)',
    dates: 'Oct 15 - Oct 29, 2026',
    stipendGrant: '₹30,000 Research Grant + Cloud Credits',
    mode: 'Hybrid (Online + Labs)',
    seats: 50,
    targetAudience: 'CS, AI & Data Science Faculty',
    description: '',
    curriculumStr: 'Modern AI Orchestration, RAG Benchmarks, Containerized Labs, Industry Capstone'
  });

  const handleProposeFdp = (e) => {
    e.preventDefault();
    const newFdp = {
      id: 'fdp_' + Date.now(),
      title: proposeForm.title,
      sponsor: currentUser?.company || 'CloudScale Technologies AI',
      mode: proposeForm.mode,
      duration: proposeForm.duration,
      dates: proposeForm.dates,
      stipendGrant: proposeForm.stipendGrant,
      targetAudience: proposeForm.targetAudience,
      seats: Number(proposeForm.seats),
      enrolled: 12,
      description: proposeForm.description || 'Industry-backed curriculum enhancement and advanced technical training for university professors.',
      curriculum: proposeForm.curriculumStr.split(',').map((c) => c.trim()).filter(Boolean),
      status: 'Open for Registration'
    };

    setFdpList([newFdp, ...fdpList]);
    setProposeModalOpen(false);
    alert('FDP Sponsorship & Collaboration Proposal Published to University Faculty!');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpenCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            Industry FDP & Academia Co-Op Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sponsor Faculty Development Programs (FDPs), co-design industry curriculums, and fund academic research
          </p>
        </div>

        <button
          onClick={() => setProposeModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Sponsor New Faculty Program</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold font-display text-slate-900 dark:text-white">{fdpList.length}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sponsored Programs Live</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-500">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold font-display text-slate-900 dark:text-white">70+</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Faculty Enrolled Across Colleges</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold font-display text-slate-900 dark:text-white">₹1.5 Lakhs</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Research Grants Disbursed</p>
          </div>
        </div>
      </div>

      {/* Active FDP Programs */}
      <div className="space-y-6">
        <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Active Sponsored Faculty Development Programs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fdpList.map((fdp) => (
            <div
              key={fdp.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                    Sponsor: {fdp.sponsor}
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
                  <span className="text-[10px] uppercase font-bold text-slate-400">Curriculum Highlights:</span>
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
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {fdp.enrolled} / {fdp.seats} Faculty Enrolled
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Sponsorship
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* University Faculty Research Collaborators */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-500" />
          University Faculty Mentors & Research Leads
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {facultyList.map((fac) => (
            <div
              key={fac.id}
              className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-700/60 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={fac.avatar}
                  alt={fac.name}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {fac.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {fac.department}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {fac.specialties?.slice(0, 2).map((sp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[9px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                    {sp}
                  </span>
                ))}
              </div>

              <button
                onClick={() => alert(`Connecting with ${fac.name} for joint research / co-op project proposal.`)}
                className="w-full py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 text-xs font-bold transition-colors"
              >
                Initiate Research Co-Op
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Propose FDP Modal */}
      <Modal
        isOpen={proposeModalOpen}
        onClose={() => setProposeModalOpen(false)}
        title="Sponsor Industry Faculty Development Program"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleProposeFdp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Program Title *
            </label>
            <input
              type="text"
              required
              value={proposeForm.title}
              onChange={(e) => setProposeForm({ ...proposeForm, title: e.target.value })}
              placeholder="e.g. Industry Immersion in Generative AI & Autonomous Agent Architectures"
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                value={proposeForm.duration}
                onChange={(e) => setProposeForm({ ...proposeForm, duration: e.target.value })}
                placeholder="2 Weeks (40 Hours)"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dates</label>
              <input
                type="text"
                value={proposeForm.dates}
                onChange={(e) => setProposeForm({ ...proposeForm, dates: e.target.value })}
                placeholder="Oct 15 - Oct 29, 2026"
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mode</label>
              <select
                value={proposeForm.mode}
                onChange={(e) => setProposeForm({ ...proposeForm, mode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="Hybrid (Online + Labs)">Hybrid (Online + Labs)</option>
                <option value="100% Online Hands-on">100% Online Hands-on</option>
                <option value="Campus On-Site Workshop">Campus On-Site Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Seats</label>
              <input
                type="number"
                value={proposeForm.seats}
                onChange={(e) => setProposeForm({ ...proposeForm, seats: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Grant & Benefits Offered
            </label>
            <input
              type="text"
              value={proposeForm.stipendGrant}
              onChange={(e) => setProposeForm({ ...proposeForm, stipendGrant: e.target.value })}
              placeholder="e.g. ₹30,000 Research Grant per participant + Cloud GPU Credits"
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Curriculum Topics (Comma separated)
            </label>
            <input
              type="text"
              value={proposeForm.curriculumStr}
              onChange={(e) => setProposeForm({ ...proposeForm, curriculumStr: e.target.value })}
              placeholder="Foundation Models, LoRA Fine-Tuning, Multi-Agent Protocols, Student Capstones"
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setProposeModalOpen(false)}
              className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-brand-500/20"
            >
              <Send className="w-4 h-4" />
              Publish Sponsorship
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
