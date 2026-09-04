import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Shield,
  Code2,
  Globe,
  CheckCircle2,
  Save
} from 'lucide-react';

export const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [driveAlerts, setDriveAlerts] = useState(true);
  const [aiTips, setAiTips] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          Settings & Preferences
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your account appearance, notification channels, and integration preferences
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance Settings */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
            Interface Theme & Appearance
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Active Theme: <span className="capitalize text-brand-600 dark:text-brand-400">{theme} Mode</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Switch between high-contrast dark cybersecurity mode and crisp light mode
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-500" />
            AI & Recruitment Notifications
          </h3>
          
          <div className="space-y-3">
            {[
              {
                title: 'Application Shortlist & Interview Alerts',
                desc: 'Receive immediate notifications when recruiters update your candidate status.',
                state: emailAlerts,
                setter: setEmailAlerts
              },
              {
                title: 'Campus Placement Drives & Hackathons',
                desc: 'Alerts when your university placement cell publishes new company visits.',
                state: driveAlerts,
                setter: setDriveAlerts
              },
              {
                title: 'AI Roadmap & Milestone Reminders',
                desc: 'Smart notifications to keep your weekly learning progress on track.',
                state: aiTips,
                setter: setAiTips
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => item.setter(!item.state)}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`w-11 h-6 rounded-full transition-colors flex items-center p-1 ${
                    item.state ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      item.state ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Save */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-brand-500" />
            All preferences synced securely to your CampusLink session.
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Preferences Saved!' : 'Save Changes'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
