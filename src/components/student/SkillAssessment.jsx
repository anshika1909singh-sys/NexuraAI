import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ASSESSMENT_QUESTIONS } from '../../data/mockData';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Compass,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SkillAssessment = ({ setActiveTab }) => {
  const { assessmentResult, saveAssessmentResult } = useData();
  const [inQuiz, setInQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIdx];

  const handleStartTest = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setQuizFinished(false);
    setInQuiz(true);
  };

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIdx]: optIdx
    });
  };

  const handleNext = () => {
    if (currentQuestionIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    let correctCount = 0;
    const domainScores = {};

    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correct;
      if (isCorrect) correctCount++;
      domainScores[q.domain] = isCorrect ? 95 : 60;
    });

    const score = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);

    const strengths = [];
    const weaknesses = [];

    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        strengths.push(q.skill);
      } else {
        weaknesses.push(q.skill);
      }
    });

    if (strengths.length === 0) strengths.push('Core Frontend Foundations', 'HTTP Protocol');
    if (weaknesses.length === 0) weaknesses.push('Advanced Distributed Caching', 'Vector DB HNSW Indexing');

    const feedback = `You scored ${score}% (${correctCount}/${ASSESSMENT_QUESTIONS.length} correct). You excel in ${strengths.slice(0, 2).join(' & ')}. To reach senior candidate tier (>90%), strengthen your understanding of ${weaknesses.slice(0, 2).join(' and ')}.`;

    saveAssessmentResult(score, correctCount, ASSESSMENT_QUESTIONS.length, domainScores, strengths, weaknesses, feedback);
    setInQuiz(false);
    setQuizFinished(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-brand-500" />
            AI Adaptive Skill Assessment Engine
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate your conceptual depth, identify strong & weak points, and auto-generate personalized roadmaps
          </p>
        </div>

        {!inQuiz && (
          <button
            onClick={handleStartTest}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{assessmentResult?.taken ? 'Retake Assessment' : 'Start Assessment'}</span>
          </button>
        )}
      </div>

      {inQuiz ? (
        /* Quiz Question Card */
        <div className="p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-md space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                {currentQ.domain}
              </span>
              <span className="text-xs text-slate-400">
                Question {currentQuestionIdx + 1} of {ASSESSMENT_QUESTIONS.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Clock className="w-4 h-4 text-brand-500" />
              <span>Adaptive AI Timer</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/50 ring-2 ring-brand-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={selectedAnswers[currentQuestionIdx] === undefined}
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center gap-2"
            >
              <span>{currentQuestionIdx === ASSESSMENT_QUESTIONS.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Diagnostic Results Card */
        <div className="space-y-8">
          
          {/* Main Scorecard Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 border border-brand-500/30 text-white shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  AI Verified Scorecard
                </span>
                <h3 className="text-3xl font-extrabold font-display">
                  Overall Readiness: {assessmentResult?.score || 84}%
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  {assessmentResult?.aiFeedback}
                </p>
              </div>

              <div className="shrink-0 text-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-xl shadow-emerald-500/30">
                  <span className="text-3xl font-display leading-none">
                    {assessmentResult?.score || 84}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1">
                    / 100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths Card */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Identified Strengths
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Topics where you demonstrated high conceptual accuracy:
              </p>
              <div className="space-y-2">
                {assessmentResult?.strengths?.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses Card */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Critical Gaps & Weak Points
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key skill areas requiring level-up before senior interviews:
              </p>
              <div className="space-y-2">
                {assessmentResult?.weaknesses?.map((wk, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{wk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Domain Breakdown Progress */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Domain Competency Radar Breakdown
            </h4>
            <div className="space-y-3">
              {Object.entries(assessmentResult?.domainScores || {}).map(([domain, score], i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{domain}</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">{score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        score >= 80 ? 'bg-emerald-500' : score >= 65 ? 'bg-brand-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action: Jump to Roadmap */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold font-display flex items-center gap-2 justify-center sm:justify-start">
                <Compass className="w-5 h-5" />
                Personalized Learning Roadmap Ready!
              </h4>
              <p className="text-xs text-violet-100">
                We have prepared a step-by-step roadmap specifically targeting your identified weak points.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-xs shadow-lg hover:bg-slate-50 transition-all shrink-0 hover:scale-105 flex items-center gap-2"
            >
              <span>Explore My Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
