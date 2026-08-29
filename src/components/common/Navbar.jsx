import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Settings,
  GraduationCap,
  Building2,
  Landmark,
  BookOpenCheck,
  Menu,
  X,
  Briefcase,
  Compass,
  Award,
  Layers,
  Users,
  Check,
  Calendar,
  BarChart3
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, currentRole, switchRole, logout, openAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const roleMeta = {
    student: { label: 'Student', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', icon: GraduationCap },
    industry: { label: 'Industry Recruiter', color: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30', icon: Building2 },
    university: { label: 'University Admin', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30', icon: Landmark },
    faculty: { label: 'Faculty Mentor', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30', icon: BookOpenCheck },
  };

  const navLinksByRole = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: Layers },
      { id: 'opportunities', label: 'Opportunities & Jobs', icon: Briefcase },
      { id: 'assessment', label: 'AI Skill Assessment', icon: Sparkles, badge: 'AI' },
      { id: 'roadmap', label: 'Personalized Roadmap', icon: Compass },
      { id: 'skills', label: 'Skills & Projects', icon: Award },
      { id: 'campus', label: 'Campus & Faculty', icon: Users },
    ],
    industry: [
      { id: 'industry_dashboard', label: 'Recruiter Dashboard', icon: Layers },
      { id: 'industry_candidates', label: 'AI Talent Radar', icon: Sparkles, badge: 'AI Match' },
      { id: 'industry_post', label: 'Manage Postings', icon: Briefcase },
      { id: 'industry_fdp', label: 'FDPs & Workshops', icon: BookOpenCheck },
    ],
    university: [
      { id: 'university_dashboard', label: 'Campus Dashboard', icon: Layers },
      { id: 'university_drives', label: 'Post Drives & Events', icon: Landmark },
      { id: 'university_analytics', label: 'Batch Analytics', icon: BarChart3 },
    ],
    faculty: [
      { id: 'faculty_dashboard', label: 'Faculty Hub', icon: Layers },
      { id: 'faculty_mentorship', label: 'Student Guidance Desk', icon: Users, badge: '3' },
      { id: 'faculty_fdp', label: 'Industry FDP Programs', icon: BookOpenCheck },
    ],
  };

  const roleNotifications = {
    student: [
      { id: 1, title: '🎉 CloudScale Technologies Shortlist', desc: 'Your AI Full-Stack application is shortlisted for technical round.', time: '10m ago', tab: 'opportunities' },
      { id: 2, title: '🏛️ Microsoft On-Campus Drive Published', desc: 'Registration is open for 2026 CS/IT batch.', time: '2h ago', tab: 'campus' },
      { id: 3, title: '✨ Dynamic Roadmap Milestone Ready', desc: 'New micro-milestone generated for Vector DB embeddings.', time: '1d ago', tab: 'roadmap' }
    ],
    industry: [
      { id: 1, title: '⚡ 4 New AI-Matched Applicants', desc: 'Anshika Sharma (94% Fit) applied for AI Full-Stack Intern.', time: '15m ago', tab: 'industry_candidates' },
      { id: 2, title: '🏛️ Apex Institute Approved FDP', desc: 'Joint Generative AI faculty program registered 28 professors.', time: '3h ago', tab: 'industry_fdp' },
      { id: 3, title: '📊 Weekly Talent Pipeline Report', desc: 'Candidate quality score up 14% across engineering colleges.', time: '1d ago', tab: 'industry_dashboard' }
    ],
    university: [
      { id: 1, title: '🏢 Google Campus Program Scheduled', desc: 'Summer Code Sprint & Internship drive approved for Sept 18.', time: '30m ago', tab: 'university_drives' },
      { id: 2, title: '📈 Department Readiness Up 4.2%', desc: 'AI skill verification completed by 340 IT students.', time: '4h ago', tab: 'university_analytics' },
      { id: 3, title: '🤝 New Corporate MoU Request', desc: 'KubeMatrix Systems requested campus recruitment slot.', time: '1d ago', tab: 'university_dashboard' }
    ],
    faculty: [
      { id: 1, title: '👨‍🎓 New Guidance Request from Anshika', desc: 'Requested prep review for Microsoft Placement Drive.', time: '20m ago', tab: 'faculty_mentorship' },
      { id: 2, title: '🏆 FDP Registration Confirmed', desc: 'Enrolled in Google Cloud & NVIDIA LLM Systems FDP with ₹25k Grant.', time: '5h ago', tab: 'faculty_fdp' },
      { id: 3, title: '✨ Student Capability Project Audited', desc: 'Autonomous Code Reviewer submitted with score 92/100.', time: '1d ago', tab: 'faculty_dashboard' }
    ]
  };

  const currentNavLinks = currentRole ? navLinksByRole[currentRole] || [] : [];
  const currentNotifications = currentRole ? roleNotifications[currentRole] || [] : [];
  const ActiveRoleIcon = currentRole && roleMeta[currentRole] ? roleMeta[currentRole].icon : GraduationCap;

  const handleLogoClick = () => {
    if (!currentUser) return;
    if (currentRole === 'student') setActiveTab('dashboard');
    else if (currentRole === 'industry') setActiveTab('industry_dashboard');
    else if (currentRole === 'university') setActiveTab('university_dashboard');
    else if (currentRole === 'faculty') setActiveTab('faculty_dashboard');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white animate-pulse-slow" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-slate-900 dark:text-white flex items-center gap-1.5">
                  NEXURA
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 font-bold">
                    AI
                  </span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Academia-Industry Synergy
                </span>
              </div>
            </button>

            {/* Quick 1-Click Role Switcher */}
            {currentUser && (
              <div className="relative ml-2 sm:ml-4">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all hover:scale-105 ${
                    roleMeta[currentRole]?.color || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                  title="Switch Demo Persona"
                >
                  <ActiveRoleIcon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{roleMeta[currentRole]?.label || 'Role'}</span>
                  <span className="md:hidden capitalize">{currentRole}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Role Switcher Menu */}
                {roleDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setRoleDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-20 p-2 animate-scaleUp">
                      <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                        ⚡ Quick Switch Persona
                      </div>
                      <div className="space-y-1 mt-1">
                        {Object.entries(roleMeta).map(([roleKey, meta]) => {
                          const IconComponent = meta.icon;
                          const isSelected = currentRole === roleKey;
                          return (
                            <button
                              key={roleKey}
                              onClick={() => {
                                switchRole(roleKey);
                                setRoleDropdownOpen(false);
                                setActiveTab(
                                  roleKey === 'student'
                                    ? 'dashboard'
                                    : roleKey === 'industry'
                                    ? 'industry_dashboard'
                                    : roleKey === 'university'
                                    ? 'university_dashboard'
                                    : 'faculty_dashboard'
                                );
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <IconComponent className="w-4 h-4" />
                                <span>{meta.label}</span>
                              </div>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Center: Desktop Navigation Links */}
          {currentUser && (
            <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/60 dark:bg-slate-800/40 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
              {currentNavLinks.map((link) => {
                const isActive = activeTab === link.id;
                const LinkIcon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-brand-500 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right: Theme Toggle, Notifications & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-brand-600" />
              )}
            </button>

            {/* Notifications */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifications && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  )}
                </button>

                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setNotificationsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-20 p-4 animate-scaleUp">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                          <Bell className="w-3.5 h-3.5 text-brand-500" />
                          Notifications ({currentNotifications.length})
                        </span>
                        <button
                          onClick={() => setUnreadNotifications(false)}
                          className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="mt-3 space-y-2 text-xs max-h-80 overflow-y-auto">
                        {currentNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              if (notif.tab) setActiveTab(notif.tab);
                              setNotificationsOpen(false);
                            }}
                            className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-brand-50/40 dark:hover:bg-brand-950/30 border border-slate-200/50 dark:border-slate-700/50 transition-colors cursor-pointer space-y-0.5"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-slate-900 dark:text-white text-xs">
                                {notif.title}
                              </p>
                              <span className="text-[9px] text-slate-400">{notif.time}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">
                              {notif.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Profile Avatar / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <img
                    src={currentUser.avatar || currentUser.logo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-20 p-2 animate-scaleUp">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          View Profile & Badges
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('settings');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          Settings & Preferences
                        </button>
                      </div>
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Burger Menu Button */}
            {currentUser && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && currentUser && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-2">
            {currentNavLinks.map((link) => {
              const isActive = activeTab === link.id;
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
