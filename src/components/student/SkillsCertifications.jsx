import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { CertificateModal } from '../common/CertificateModal';
import {
  Award,
  BookOpen,
  Code,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Code2,
  Play,
  ShieldCheck,
  Send,
  Loader2,
  Star,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SkillsCertifications = () => {
  const { currentUser } = useAuth();
  const { capabilityProjects, submitCapabilityProject } = useData();
  const [activeSubTab, setActiveSubTab] = useState('projects'); // 'projects' | 'skills'
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const skillModules = [];

  const handleOpenSubmit = (proj) => {
    setSelectedProject(proj);
    setRepoUrl('');
    setLiveUrl('');
    setAuditResult(null);
    setSubmitModalOpen(true);
  };

  const handleRunAuditAndSubmit = () => {
    if (!repoUrl) {
      alert('Please enter a GitHub repository URL');
      return;
    }

    setIsAuditing(true);
    setTimeout(() => {
      const res = submitCapabilityProject(selectedProject.id, repoUrl, liveUrl);
      setIsAuditing(false);
      setAuditResult({
        score: res.score,
        certificateId: res.certificateId,
        message: res.message
      });
    }, 2000);
  };

  const handleViewCertificate = (project) => {
    setActiveCertificate({
      recipientName: currentUser?.name || 'Anshika Sharma',
      title: project.certificateTitle || project.title,
      score: project.verifiedScore || 92,
      certificateId: project.certificateId || 'NX-CERT-2026-8942',
      date: project.submissionDate || new Date().toLocaleDateString(),
    });
    setCertModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-500" />
            Skills & Capability Certification Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Complete industry capability projects to prove your engineering readiness and earn AI-verified credentials
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'projects'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Role Capability Projects ({capabilityProjects.length})
          </button>
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'skills'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curated Skill Courses ({skillModules.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'projects' ? (
        /* Capability Projects Section */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-transparent border border-amber-500/20 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Why Capability Projects?</strong> Recruiters prioritize verified code artifacts over resumes. Submitting these projects executes an automated AI code audit and unlocks verified credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilityProjects.length === 0 && (
              <div className="md:col-span-3 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
                <Award className="mx-auto h-10 w-10 text-amber-500" />
                <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">No capability projects yet</h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Your verified projects and certificates will appear here once they are assigned or submitted.
                </p>
              </div>
            )}
            {capabilityProjects.map((proj) => {
              const isCompleted = proj.status === 'Completed';
              return (
                <div
                  key={proj.id}
                  className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                        {proj.targetRole}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : proj.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {proj.brief}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Evaluated Deliverables:
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                        {proj.deliverables.slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                            <span className="truncate">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    {isCompleted ? (
                      <>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Score: {proj.verifiedScore}%</span>
                        </div>
                        <button
                          onClick={() => handleViewCertificate(proj)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleOpenSubmit(proj)}
                        className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Code className="w-4 h-4" />
                        <span>Submit Project for AI Audit</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Skill Courses Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillModules.length === 0 && (
            <div className="md:col-span-2 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
              <BookOpen className="mx-auto h-10 w-10 text-brand-500" />
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">No courses available yet</h3>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
                Courses and learning recommendations will appear here when they are available from your backend.
              </p>
            </div>
          )}
          {skillModules.map((mod) => (
            <div
              key={mod.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start"
            >
              <img
                src={mod.thumbnail}
                alt={mod.title}
                className="w-full sm:w-36 h-32 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400">
                    {mod.category}
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    {mod.rating}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {mod.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {mod.skillsGained.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mod.duration}
                  </span>
                  <button
                    onClick={() => alert(`Enrolled in ${mod.title}! Access instructions sent.`)}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Start Module →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Submission & AI Code Audit Modal */}
      {selectedProject && (
        <Modal
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          title={`Submit: ${selectedProject.title}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-6">
            {auditResult ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  AI Code Audit Passed! (Score: {auditResult.score}%)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  AST Complexity check, unit tests, and API contract verified. Your verified credential is now minted.
                </p>
                <button
                  onClick={() => {
                    setSubmitModalOpen(false);
                    handleViewCertificate({
                      ...selectedProject,
                      verifiedScore: auditResult.score,
                      certificateId: auditResult.certificateId
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  View & Download Verified Certificate
                </button>
              </div>
            ) : isAuditing ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-brand-600 animate-spin mx-auto" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Executing AI Capability Audit...
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Cloning repository AST, evaluating modularity, checking test coverage, and generating on-chain verification hash.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunAuditAndSubmit();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub Repository URL *
                  </label>
                  <div className="relative">
                    <Code2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      required
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/project-repo"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo / Deployment URL (Optional)
                  </label>
                  <div className="relative">
                    <Play className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://my-project-live.app"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-500/20 text-xs text-slate-600 dark:text-slate-300">
                  ⚡ <strong>AI Audit Benchmark:</strong> Requires clean architecture, no hardcoded secrets, and clear README with setup instructions.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Run AI Audit & Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}

      {/* Verified Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        certificateData={activeCertificate}
      />

    </div>
  );
};
