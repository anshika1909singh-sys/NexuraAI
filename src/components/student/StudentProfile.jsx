import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  MapPin,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Save,
  Code2,
  Globe,
  Star,
  Landmark,
  BookOpenCheck,
  Briefcase
} from 'lucide-react';

const getInitials = (name = 'User') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'U';

const getFallbackAvatar = (name = 'User') => {
  const initials = getInitials(name);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
      <rect width='200' height='200' rx='32' fill='#4f46e5'/>
      <text x='50%' y='55%' text-anchor='middle' dominant-baseline='middle' fill='white' font-size='72' font-family='Arial, sans-serif' font-weight='700'>${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const StudentProfile = () => {
  const { currentUser, currentRole, updateProfile } = useAuth();
  const { capabilityProjects, assessmentResult, opportunities, fdpPrograms } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Anshika Sharma',
    headline: currentUser?.headline || currentUser?.position || currentUser?.designation || 'Academic & Tech Professional',
    college: currentUser?.college || currentUser?.company || 'Apex Institute of Technology',
    department: currentUser?.department || 'Computer Science & AI',
    location: currentUser?.location || 'New Delhi, India',
    bio: currentUser?.bio || 'Building next-generation intelligent applications and fostering academia-industry synergy.',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const getRoleBadge = () => {
    switch (currentRole) {
      case 'industry':
        return { label: 'Verified Corporate Recruiter', icon: Building2, color: 'text-brand-600 dark:text-brand-400 bg-brand-500/10 border-brand-500/20' };
      case 'university':
        return { label: 'Accredited University Placement Hub', icon: Landmark, color: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20' };
      case 'faculty':
        return { label: 'Certified Academic Research Mentor', icon: BookOpenCheck, color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' };
      default:
        return { label: 'Verified AI Talent Candidate', icon: GraduationCap, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    }
  };

  const roleBadge = getRoleBadge();
  const RoleIcon = roleBadge.icon;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Profile Banner */}
      <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">
        
        {/* Cover gradient */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-xs font-bold shadow-md hover:bg-white flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col items-start gap-4">
            <img
                src={currentUser?.avatar || currentUser?.logo || getFallbackAvatar(currentUser?.name || 'Anshika Sharma')}
                alt={currentUser?.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getFallbackAvatar(currentUser?.name || 'Anshika Sharma');
                }}
            />

            <div className="w-full space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                      {currentUser?.name}
                    </h2>
                    <span className="p-1 rounded-full bg-brand-500/10 text-brand-500" title="Verified Badge">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-600 dark:text-brand-400 font-semibold">
                    {currentUser?.headline || currentUser?.position || currentUser?.designation || (currentUser?.company ? `Recruiter at ${currentUser.company}` : 'Nexora Member')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                    <span>{currentUser?.college || currentUser?.company || 'Apex Institute'}</span>
                    <span>•</span>
                    <span>{currentUser?.department || currentUser?.location || 'New Delhi, India'}</span>
                    <span>•</span>
                    <span>{currentUser?.email}</span>
                  </p>
                </div>

                {/* Persona Badge */}
                <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 w-fit ${roleBadge.color}`}>
                  <RoleIcon className="w-4 h-4" />
                  <span>{roleBadge.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSave} className="mt-8 space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Professional Title / Headline</label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Organization / College</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">About / Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {/* Bio Section */}
          {!isEditing && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentUser?.bio || formData.bio}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Role Tailored Details Grid */}
      {currentRole === 'student' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills & Badges */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              Verified Skills & Proficiencies
            </h3>
            <div className="space-y-3">
              {(currentUser?.skills || [
                { name: 'React.js', level: 90, verified: true },
                { name: 'Python & FastAPI', level: 85, verified: true },
                { name: 'Data Structures & Algorithms', level: 82, verified: true },
                { name: 'Tailwind CSS', level: 92, verified: true },
                { name: 'Machine Learning / LLMs', level: 78, verified: false },
              ]).map((sk, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      {sk.name}
                      {sk.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" title="Verified by AI Assessment" />
                      )}
                    </span>
                    <span className="text-brand-600 dark:text-brand-400 font-bold">{sk.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full"
                      style={{ width: `${sk.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capability Certificates & Badges */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Credentials & Project Verifications
            </h3>
            <div className="space-y-3">
              {capabilityProjects.filter((p) => p.status === 'Completed').map((cp) => (
                <div
                  key={cp.id}
                  className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                      {cp.certificateId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Score: {cp.verifiedScore}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {cp.certificateTitle || cp.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Verified Date: {cp.submissionDate || 'Aug 26, 2026'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : currentRole === 'industry' ? (
        /* Recruiter Profile Stats */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Briefcase className="w-6 h-6 text-brand-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">4 Active</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Published Job Openings</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Award className="w-6 h-6 text-amber-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">2 FDPs</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sponsored Faculty Programs</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">18 Hired</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Campus Candidates Onboarded</p>
          </div>
        </div>
      ) : currentRole === 'university' ? (
        /* University Profile Stats */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Landmark className="w-6 h-6 text-violet-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">91.4%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">2026 Batch Placement Rate</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Building2 className="w-6 h-6 text-brand-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">85 MoUs</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Industry Corporate Partners</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <GraduationCap className="w-6 h-6 text-emerald-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">1,450</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Assessed Student Talent</p>
          </div>
        </div>
      ) : (
        /* Faculty Profile Stats */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <BookOpenCheck className="w-6 h-6 text-amber-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">24 Mentees</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active UG/PG Guidance</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Award className="w-6 h-6 text-violet-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">5 FDPs</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Industry Certifications Completed</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center space-y-1">
            <Sparkles className="w-6 h-6 text-emerald-500 mx-auto" />
            <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">88 Reviews</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">4.95 / 5.0 Faculty Rating</p>
          </div>
        </div>
      )}

    </div>
  );
};
