import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { Plus, Briefcase, DollarSign, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const PostOpportunityModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { postNewOpportunity } = useData();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    domain: 'AI & Full Stack',
    location: 'Bengaluru (Hybrid)',
    stipend: '₹40,000 / month',
    duration: '6 Months',
    deadline: 'Sept 30, 2026',
    description: '',
    eligibility: 'B.Tech / M.Tech CS/IT with min 7.5 CGPA and verified AI assessment score > 75%',
    skillsStr: 'React.js, Python, FastAPI, Docker',
    openings: 3
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skills = formData.skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const newOpp = {
      ...formData,
      company: currentUser?.company || 'CloudScale Technologies AI',
      postedBy: 'Industry',
      skills,
      openings: Number(formData.openings)
    };

    postNewOpportunity(newOpp);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post New Job or Internship Opportunity" maxWidth="max-w-2xl">
      <div className="space-y-6">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Opportunity Published Live!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your opening is now instantly searchable by students with automated AI match scoring.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Opportunity Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Full-Stack Developer Intern"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Opportunity Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-Time">Full-Time Opening</option>
                  <option value="On-Campus Drive">On-Campus Placement Drive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Technical Domain
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="AI & Full Stack">AI & Full Stack</option>
                  <option value="Frontend Engineering">Frontend Engineering</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Stipend / CTC *
                </label>
                <input
                  type="text"
                  required
                  value={formData.stipend}
                  onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                  placeholder="e.g. ₹45,000 / month or ₹16 - 22 LPA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location / Mode
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru (Hybrid) or Remote"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application Deadline
                </label>
                <input
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder="e.g. Sept 30, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Required Skills (Comma separated) *
              </label>
              <input
                type="text"
                required
                value={formData.skillsStr}
                onChange={(e) => setFormData({ ...formData, skillsStr: e.target.value })}
                placeholder="React.js, Python, FastAPI, Docker, Vector Databases"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role Description & Expectations
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe project responsibilities, team culture, and growth opportunities..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-brand-500/20"
              >
                <Send className="w-4 h-4" />
                Publish Opportunity
              </button>
            </div>

          </form>
        )}
      </div>
    </Modal>
  );
};
