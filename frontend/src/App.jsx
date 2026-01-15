import React, { useState } from 'react';

// Dados mock
import { VAGAS_DATA } from './data/Mock';

// Componentes de Layout
import { Header } from './components/layout/Header';

// Páginas
import { HomePage } from './pages/HomePage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { CreateJobPage } from './pages/CreateJobPage';
import { SignUpPage } from './pages/SignUpPage';

export default function InTernsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [vacancies, setVacancies] = useState(VAGAS_DATA);

  const handleUserLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleSaveJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      company: currentUser?.name || "Minha Empresa",
      postedAt: "Agora mesmo"
    };
    setVacancies([newJob, ...vacancies]);
    setCurrentPage('home');
  };

  const handleJobClick = (vaga) => {
    setSelectedJob(vaga);
    setCurrentPage('job-details');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleUserLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} />;
      case 'job-details':
        return <JobDetailsPage vaga={selectedJob} onBack={() => setCurrentPage('home')} />;
      case 'create-job':
        return <CreateJobPage onBack={() => setCurrentPage('home')} onSave={handleSaveJob} />;
      case 'home':
      default:
        return (
          <HomePage 
            onNavigate={setCurrentPage} 
            onJobClick={handleJobClick} 
            vacancies={vacancies} 
            currentUser={currentUser} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] font-sans text-gray-800 flex flex-col">
      <Header 
        currentUser={currentUser} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout} 
        isHome={currentPage === 'home'} 
      />
      {renderContent()}
    </div>
  );
}