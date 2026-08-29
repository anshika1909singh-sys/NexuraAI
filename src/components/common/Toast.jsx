import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200',
    error: 'border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-200',
    info: 'border-brand-500/30 bg-brand-500/10 text-brand-950 dark:text-brand-200',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md bg-white/95 dark:bg-slate-900/95 ${
          borders[toast.type || 'info']
        }`}
      >
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm font-medium pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
