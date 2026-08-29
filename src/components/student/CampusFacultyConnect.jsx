import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import {
  Users,
  Calendar,
  Star,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  MapPin,
  Landmark,
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';

export const CampusFacultyConnect = () => {
  const { currentUser } = useAuth();
  const { campusEvents, registerCampusEvent, facultyList, guidanceRequests, bookFacultyGuidance } = useData();
  const [activeTab, setActiveTab] = useState('faculty'); // 'faculty' | 'events' | 'requests'
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [guidanceModalOpen, setGuidanceModalOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  const handleOpenBooking = (fac) => {
    setSelectedFaculty(fac);
    setTopic('');
    setMessage('');
    setBookingSuccess('');
    setGuidanceModalOpen(true);
  };

  const handleSendGuidanceRequest = (e) => {
    e.preventDefault();
    if (!selectedFaculty || !topic) return;

    const res = bookFacultyGuidance(
      selectedFaculty.id,
      selectedFaculty.name,
      currentUser?.name || 'Anshika Sharma',
      currentUser?.email || 'anshika.sharma@apex.edu',
      topic,
      message
    );

    if (res.success) {
      setBookingSuccess(res.message);
      setTimeout(() => {
        setGuidanceModalOpen(false);
        setBookingSuccess('');
        setActiveTab('requests');
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            Campus & Faculty Mentorship Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Connect with college placement works, on-campus drives, and schedule 1-on-1 mentorship with professors
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'faculty'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Faculty Mentors ({facultyList.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Campus Drives & Hackathons ({campusEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'requests'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Guidance Queue ({guidanceRequests.length})
          </button>
        </div>
      </div>

      {activeTab === 'faculty' ? (
        /* Faculty Directory */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facultyList.map((fac) => (
            <div
              key={fac.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20 shrink-0"
                  />
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {fac.name}
                    </h4>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                      {fac.department}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{fac.rating}</span>
                      <span className="text-slate-400 font-normal">({fac.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Office Hours: <strong>{fac.availability}</strong></span>
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Mentorship Domains:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {fac.specialties.map((sp, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleOpenBooking(fac)}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request 1-on-1 Guidance</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'events' ? (
        /* Campus Drives & Events */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campusEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    {ev.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{ev.date}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {ev.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ev.description}
                </p>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Venue: <strong>{ev.venue}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Prizes / Outcome: <strong>{ev.prizePool}</strong></span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {ev.tags.map((tg, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {ev.participants} students registered
                </span>
                {ev.registered ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Registered
                  </span>
                ) : (
                  <button
                    onClick={() => registerCampusEvent(ev.id)}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Register Free
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Guidance Requests Queue */
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
            Your Mentorship Guidance History
          </h3>
          <div className="space-y-3">
            {guidanceRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {req.topic}
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'Accepted'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Mentor: <strong>{req.facultyName}</strong> • Submitted: {req.submittedDate}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  "{req.message}"
                </p>
                {req.meetingTime && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    Scheduled Slot: {req.meetingTime}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Guidance Modal */}
      {selectedFaculty && (
        <Modal
          isOpen={guidanceModalOpen}
          onClose={() => setGuidanceModalOpen(false)}
          title={`Request Mentorship: ${selectedFaculty.name}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-6">
            {bookingSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Mentorship Request Sent!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {bookingSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendGuidanceRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Guidance Topic / Objective *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Capability Project Review & Microsoft On-Campus Placement Prep"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Message & Specific Questions
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your progress, attach links to your capability project, and list the guidance you need..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-500/20 text-xs text-slate-600 dark:text-slate-300">
                  ⚡ <strong>Auto-Attached Context:</strong> Your current AI Skill score (84%) and roadmap completion stats will be shared with the professor automatically.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setGuidanceModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-brand-500/20"
                  >
                    <Send className="w-4 h-4" />
                    Submit Guidance Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}

    </div>
  );
};
