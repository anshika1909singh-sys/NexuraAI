import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/landing/AuthModal';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { OpportunitySearch } from './components/student/OpportunitySearch';
import { SkillAssessment } from './components/student/SkillAssessment';
import { PersonalizedRoadmap } from './components/student/PersonalizedRoadmap';
import { SkillsCertifications } from './components/student/SkillsCertifications';
import { CampusFacultyConnect } from './components/student/CampusFacultyConnect';
import { StudentProfile } from './components/student/StudentProfile';

// Industry Views
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { CandidateFinder } from './components/industry/CandidateFinder';
import { IndustryPostings } from './components/industry/IndustryPostings';
import { IndustryFDPCollaboration } from './components/industry/IndustryFDPCollaboration';

// University Views
import { UniversityDashboard } from './components/university/UniversityDashboard';
import { UniversityDrives } from './components/university/UniversityDrives';
import { UniversityAnalytics } from './components/university/UniversityAnalytics';

// Faculty Views
import { FacultyDashboard } from './components/faculty/FacultyDashboard';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';

// Settings
import { SettingsPage } from './components/settings/SettingsPage';

export function App() {
  const { currentUser, currentRole } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderRoleContent = () => {
    // If on settings or profile
    if (activeTab === 'settings') return <SettingsPage />;
    if (activeTab === 'profile') return <StudentProfile />;

    // Student Role Views
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard setActiveTab={setActiveTab} />;
        case 'opportunities':
          return <OpportunitySearch setActiveTab={setActiveTab} />;
        case 'assessment':
          return <SkillAssessment setActiveTab={setActiveTab} />;
        case 'roadmap':
          return <PersonalizedRoadmap setActiveTab={setActiveTab} />;
        case 'skills':
          return <SkillsCertifications />;
        case 'campus':
          return <CampusFacultyConnect />;
        default:
          return <StudentDashboard setActiveTab={setActiveTab} />;
      }
    }

    // Industry Role Views
    if (currentRole === 'industry') {
      switch (activeTab) {
        case 'industry_dashboard':
        case 'dashboard':
          return <IndustryDashboard setActiveTab={setActiveTab} />;
        case 'industry_candidates':
          return <CandidateFinder />;
        case 'industry_post':
          return <IndustryPostings setActiveTab={setActiveTab} />;
        case 'industry_fdp':
          return <IndustryFDPCollaboration setActiveTab={setActiveTab} />;
        default:
          return <IndustryDashboard setActiveTab={setActiveTab} />;
      }
    }

    // University Role Views
    if (currentRole === 'university') {
      switch (activeTab) {
        case 'university_dashboard':
        case 'dashboard':
          return <UniversityDashboard setActiveTab={setActiveTab} />;
        case 'university_drives':
          return <UniversityDrives setActiveTab={setActiveTab} />;
        case 'university_analytics':
          return <UniversityAnalytics setActiveTab={setActiveTab} />;
        default:
          return <UniversityDashboard setActiveTab={setActiveTab} />;
      }
    }

    // Faculty Role Views
    if (currentRole === 'faculty') {
      switch (activeTab) {
        case 'faculty_dashboard':
        case 'dashboard':
        case 'faculty_mentorship':
        case 'faculty_fdp':
          return <FacultyDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
        default:
          return <FacultyDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      }
    }

    // Admin Role Views
    if (currentRole === 'admin') {
      switch (activeTab) {
        case 'admin_dashboard':
        case 'dashboard':
          return <AdminDashboard />;
        default:
          return <AdminDashboard />;
      }
    }

    return <StudentDashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {currentUser ? (
          renderRoleContent()
        ) : (
          <LandingPage onGetStarted={(targetTab) => setActiveTab(targetTab)} />
        )}
      </main>

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
