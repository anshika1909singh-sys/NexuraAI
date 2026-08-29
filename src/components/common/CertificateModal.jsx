import React, { useEffect } from 'react';
import { Modal } from './Modal';
import { Award, CheckCircle2, Download, Printer, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal = ({ isOpen, onClose, certificateData }) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!certificateData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verified Credential & Certificate" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Certificate Card Printable Area */}
        <div
          id="printable-certificate"
          className="relative bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white p-8 sm:p-12 rounded-2xl border-4 border-amber-400/40 shadow-2xl overflow-hidden"
        >
          {/* Subtle background ornamentation */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-400/20 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Award className="w-7 h-7 text-slate-950" />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-wider font-display uppercase text-amber-300">
                  NEXURA AI ECOSYSTEM
                </h4>
                <p className="text-xs text-slate-300 tracking-widest uppercase">
                  Unified Academia-Industry Synergy Credential
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              AI Verified Capability & Code Audit
            </div>
          </div>

          {/* Main Body */}
          <div className="py-10 text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300 font-semibold">
              This is to proudly certify that
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 font-display">
              {certificateData.recipientName || 'Anshika Sharma'}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              has demonstrated rigorous industry readiness and successfully completed the capability project and automated AI assessment for:
            </p>
            <div className="inline-block bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl backdrop-blur-sm">
              <span className="text-lg sm:text-xl font-bold text-brand-300 font-display">
                {certificateData.title || 'Autonomous Multi-Agent AI Code Reviewer'}
              </span>
            </div>

            {/* Score pill */}
            <div className="pt-2 flex justify-center items-center gap-4">
              <div className="px-4 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Score: {certificateData.score || 92}% (Top 5% Candidate Tier)
              </div>
            </div>
          </div>

          {/* Signatures & Verification footer */}
          <div className="pt-6 border-t border-amber-400/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center sm:text-left text-xs text-slate-400">
            <div>
              <div className="font-mono font-medium text-slate-300 mb-1">
                Prof. A. K. Sen
              </div>
              <div className="h-0.5 w-28 bg-amber-400/40 my-1 mx-auto sm:mx-0"></div>
              <p className="text-[11px] text-slate-400">Dean of Corporate Relations, University Board</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-2 bg-white rounded-lg shadow">
                <div className="w-14 h-14 bg-slate-900 flex flex-col items-center justify-center p-1 text-[8px] font-mono text-white text-center rounded">
                  <div className="w-full h-full border border-dashed border-amber-400/50 flex flex-col items-center justify-center">
                    <span className="text-amber-400 font-bold">QR VERIFY</span>
                    <span>{certificateData.certificateId || 'NX-8942'}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Scan for On-Chain Audit</p>
            </div>

            <div className="sm:text-right">
              <div className="font-mono font-medium text-slate-300 mb-1">
                Vikram Malhotra
              </div>
              <div className="h-0.5 w-28 bg-amber-400/40 my-1 mx-auto sm:ml-auto sm:mr-0"></div>
              <p className="text-[11px] text-slate-400">VP of Talent, CloudScale & Industry Consortium</p>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="mt-6 pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400">
            <span>Certificate ID: <strong className="text-slate-200 font-mono">{certificateData.certificateId || 'NX-CERT-2026-8942'}</strong></span>
            <span>Issued: {certificateData.date || new Date().toLocaleDateString()}</span>
            <span>Security Hash: <strong className="text-slate-200 font-mono">0x7f8a...9c2d</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Public credential verification link copied to clipboard!');
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Credential
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
