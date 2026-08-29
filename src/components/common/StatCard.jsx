import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({ title, value, subtitle, icon: Icon, change, trend = 'up', color = 'brand' }) => {
  const colorMap = {
    brand: {
      bg: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
      badge: 'text-brand-600 bg-brand-50 dark:bg-brand-950/50 dark:text-brand-300'
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      badge: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300'
    },
    violet: {
      bg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
      badge: 'text-violet-600 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-300'
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      badge: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300'
    },
    cyan: {
      bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      badge: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-300'
    },
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${scheme.bg} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
          {value}
        </h4>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend === 'up'
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400'
            }`}
          >
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};
