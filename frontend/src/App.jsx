import React, { useState, useEffect } from 'react';
import { api } from './api';
import { VAGAS_DATA } from './data/Mock';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { CreateJobPage } from './pages/CreateJobPage';
import { SignUpPage } from './pages/SignUpPage';

export default function InTernsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.getJobs();
        setVacancies(data);
      } catch (error) {
        console.log('Backend offline ou erro na API. Usando dados Mock.');
        setVacancies(VAGAS_DATA);
      }
    };
    fetchJobs();
  }, []);

  const handleUserLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleSaveJob = async (jobData) => {
    try {
      const newJobPayload = {
        ...jobData,
        company: currentUser?.name || "Minha Empresa"
      };

      // Tenta salvar no backend
      try {
        const savedJob = await api.createJob(newJobPayload);
        setVacancies(prev => [savedJob, ...prev]);
      } catch (apiError) {
        // Fallback se backend falhar
        const mockJob = { ...newJobPayload, id: Date.now(), postedAt: "Agora mesmo" };
        setVacancies(prev => [mockJob, ...prev]);
      }
      
      setCurrentPage('home');
    } catch (error) {
      console.error('Erro crítico ao salvar vaga', error);
    }
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
        return <SignUpPage onNavigate={setCurrentPage} onSignupSuccess={handleSignupSuccess} />;
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