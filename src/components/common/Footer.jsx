import React from 'react';
import { Sparkles, Shield, Heart, Terminal, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                NEXURA AI
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The AI-Powered Unified Talent, Learning, and Campus Synergy Ecosystem bridging Students, Industry Recruiters, Universities, and Faculty into one seamless pipeline.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                All AI Engine Services Operational
              </span>
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Ecosystem Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#student" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Student Talent Suite</a></li>
              <li><a href="#industry" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Industry Sourcing Radar</a></li>
              <li><a href="#university" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">University Placement Hub</a></li>
              <li><a href="#faculty" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Faculty Mentorship & FDPs</a></li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Intelligent Core
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#assessment" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Adaptive Skill Assessment</a></li>
              <li><a href="#roadmap" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Gap-Analysis Roadmaps</a></li>
              <li><a href="#capability" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Automated Code Audit</a></li>
              <li><a href="#matching" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">AI Job Fit Scoring</a></li>
            </ul>
          </div>

          {/* Connect & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Security & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-500" /> ISO-27001 Certified</li>
              <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-brand-500" /> On-Chain QR Verification</li>
              <li><a href="#privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Nexura AI Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with precision & high-performance engineering <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline ml-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
