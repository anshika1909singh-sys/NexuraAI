import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { GraduationCap, Building2, Landmark, BookOpenCheck, ArrowRight, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export const AuthModal = () => {
  const { authModalOpen, closeAuth, authModalMode, authModalRole, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(authModalMode === 'login');
  const [selectedRole, setSelectedRole] = useState(authModalRole || 'student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    company: '',
    department: '',
  });
  const [error, setError] = useState('');

  React.useEffect(() => {
    setIsLogin(authModalMode === 'login');
    setSelectedRole(authModalRole || 'student');
  }, [authModalMode, authModalRole]);

  const demoRoles = [
    {
      id: 'student',
      label: 'Student',
      desc: 'AI Assessment, Roadmaps & Jobs',
      icon: GraduationCap,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'industry',
      label: 'Industry / Recruiter',
      desc: 'Post Jobs & AI Talent Radar',
      icon: Building2,
      color: 'border-brand-500/40 bg-brand-500/10 text-brand-600 dark:text-brand-400'
    },
    {
      id: 'university',
      label: 'University / Campus',
      desc: 'On-Campus Drives & Analytics',
      icon: Landmark,
      color: 'border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400'
    },
    {
      id: 'faculty',
      label: 'Faculty / Academician',
      desc: 'Guidance Desk & Industry FDPs',
      icon: BookOpenCheck,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
    }
  ];

  const loginRoles = [
    ...demoRoles,
    {
      id: 'admin',
      label: 'Admin',
      desc: 'Platform Oversight & Monitoring',
      icon: ShieldCheck,
      color: 'border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400'
    }
  ];

  const roles = demoRoles;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const rawEmail = (formData.email || '').trim().toLowerCase();
      const adminEmail = 'admin@nexura.ai';
      const email = rawEmail || INITIAL_USERS[selectedRole]?.email || 'demo@nexura.ai';
      const roleToLogin = rawEmail === adminEmail ? 'admin' : selectedRole;
      login(email, formData.password, roleToLogin);
    } else {
      if (!formData.name || !formData.email) {
        setError('Please provide your name and email');
        return;
      }
      signup({ ...formData, role: selectedRole });
    }
  };

  const handleQuickDemo = (roleKey) => {
    const demoUser = INITIAL_USERS[roleKey];
    if (demoUser) {
      login(demoUser.email, 'password123', roleKey);
    }
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={closeAuth}
      title={isLogin ? 'Welcome Back to Nexura AI' : 'Join the Unified Ecosystem'}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        
        {/* Toggle Mode */}
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isLogin
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isLogin
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* 1-Click Instant Demo Access Box */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-500/10 via-violet-500/10 to-indigo-500/10 border border-brand-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              1-Click Demo Personas (Instant Exploration)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {demoRoles.map((r) => {
              const IconComp = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleQuickDemo(r.id)}
                  className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-sm text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-all hover:scale-105"
                >
                  <IconComp className="w-4 h-4 mb-1 text-brand-500" />
                  <span className="truncate w-full text-center">{r.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Select Role Header */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Select Your Ecosystem Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(isLogin ? loginRoles : roles).map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg border shrink-0 ${role.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {role.label}
                      </p>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {role.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anshika Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={
                selectedRole === 'student'
                  ? 'anshika.sharma@apex.edu'
                  : selectedRole === 'industry'
                  ? 'recruiter@cloudscale.tech'
                  : selectedRole === 'university'
                  ? 'placements@apex.edu'
                  : 'faculty@apex.edu'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'industry' ? 'Company / Organization Name' : 'University / College Name'}
              </label>
              <input
                type="text"
                value={selectedRole === 'industry' ? formData.company : formData.college}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [selectedRole === 'industry' ? 'company' : 'college']: e.target.value
                  })
                }
                placeholder={selectedRole === 'industry' ? 'e.g. CloudScale Technologies' : 'e.g. Apex Institute of Technology'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.01]"
          >
            <span>{isLogin ? `Continue as ${selectedRole}` : `Create ${selectedRole} Account`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </Modal>
  );
};
