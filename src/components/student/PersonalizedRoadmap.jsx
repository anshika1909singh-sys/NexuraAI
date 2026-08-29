import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Compass,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
  Award,
  ArrowRight,
  Clock,
  BookOpen
} from 'lucide-react';

export const PersonalizedRoadmap = ({ setActiveTab }) => {
  const { roadmapSteps, toggleRoadmapTask, assessmentResult } = useData();

  const totalTasks = roadmapSteps.reduce((acc, s) => acc + s.tasks.length, 0);
  const doneTasks = roadmapSteps.reduce((acc, s) => acc + s.tasks.filter((t) => t.done).length, 0);
  const overallPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950 via-slate-900 to-brand-950 border border-violet-500/30 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Weakness-to-Roadmap Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Your Dynamic Upskilling Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Tailored specifically around your AI Skill Diagnostic gaps: <strong className="text-violet-300">{assessmentResult?.weaknesses?.slice(0, 2).join(' & ') || 'Cloud & Vectors'}</strong>.
          </p>
        </div>

        {/* Global Progress Radial / Box */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shrink-0 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500 text-white font-black flex items-center justify-center text-xl font-display shadow-lg shadow-violet-500/30">
            {overallPct}%
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Total Completion</p>
            <p className="text-[11px] text-slate-400">{doneTasks} of {totalTasks} milestones done</p>
          </div>
        </div>
      </div>

      {/* Step by Step Milestones Timeline */}
      <div className="space-y-6">
        {roadmapSteps.map((step, stepIdx) => {
          const stepDoneTasks = step.tasks.filter((t) => t.done).length;
          const isStepComplete = step.completed || stepDoneTasks === step.tasks.length;

          return (
            <div
              key={step.id}
              className={`p-6 rounded-3xl border transition-all ${
                isStepComplete
                  ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-500/30'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm font-display ${
                      isStepComplete
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    }`}
                  >
                    {isStepComplete ? <CheckCircle2 className="w-5 h-5" /> : stepIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                      {step.focusArea}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {step.estimatedDays}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isStepComplete
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {stepDoneTasks}/{step.tasks.length} Done
                  </span>
                </div>
              </div>

              {/* Interactive Checklist */}
              <div className="space-y-2.5 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Actionable Milestones Checklist:
                </span>
                <div className="space-y-2">
                  {step.tasks.map((task, taskIdx) => (
                    <div
                      key={taskIdx}
                      onClick={() => toggleRoadmapTask(step.id, taskIdx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        task.done
                          ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-85'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500/40'
                      }`}
                    >
                      {task.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          task.done
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to module or projects */}
              <div className="pt-4 flex items-center justify-between">
                <a
                  href={step.resourceLink}
                  target={step.resourceLink.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Access Recommended Learning Material</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {stepIdx === roadmapSteps.length - 1 && (
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>Capability Projects Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
