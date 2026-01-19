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
  const [jobToEdit, setJobToEdit] = useState(null);
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

  const handleEditClick = (vaga) => {
      setJobToEdit(vaga);
      setCurrentPage('create-job');
  };

  const handleDeleteClick = async (idToDelete) => {
      if (window.confirm("Tem certeza que deseja excluir esta vaga?")) {
          try {
              await api.deleteJob(idToDelete); 
          } catch (error) {
              console.log("Modo offline ou erro na API. Deletando localmente.");
          }

          if (idToDelete) {
              setVacancies(prev => prev.filter(v => String(v.id) !== String(idToDelete)));
          }
      }
  };

  const handleSaveOrUpdateJob = async (jobData) => {
    try {
      const companyName = currentUser?.name || "Minha Empresa";
      const isEditing = jobData.id !== null && jobData.id !== undefined;

      if (isEditing) {
        console.log("Atualizando vaga:", jobData.id);
        
        try {
            await api.updateJob(jobData.id, { ...jobData, company: companyName });
        } catch (e) { 
            console.warn("Backend offline/erro update"); 
        }
        
        setVacancies(prev => prev.map(v => 
            String(v.id) === String(jobData.id) 
            ? { ...v, ...jobData, company: companyName } 
            : v
        ));

      } else {
        console.log("Criando nova vaga");
        const newJobPayload = { ...jobData, company: companyName };
        
        let finalJob;
        
        try {
            const apiResponse = await api.createJob(newJobPayload);
            if (apiResponse && apiResponse.id) {
                finalJob = apiResponse;
            } else {
                console.warn("API não retornou ID. Gerando ID local.");
                finalJob = { ...newJobPayload, id: Date.now(), postedAt: "Agora mesmo" };
            }
        } catch (e) {
            finalJob = { ...newJobPayload, id: Date.now(), postedAt: "Agora mesmo" };
        }
        setVacancies(prev => [finalJob, ...prev]);
      }
      
      setCurrentPage('home');
      setJobToEdit(null);
    } catch (error) {
      console.error('Erro crítico no salvamento:', error);
      alert("Erro ao processar a vaga. Verifique o console.");
    }
  };

  const handleGoToCreate = () => {
      setJobToEdit(null);
      setCurrentPage('create-job');
  }

  const renderContent = () => {
    switch(currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleUserLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} onSignupSuccess={handleSignupSuccess} />;
      case 'job-details':
        return <JobDetailsPage vaga={selectedJob} currentUser={currentUser} onBack={() => setCurrentPage('home')} />;
      case 'create-job':
        return <CreateJobPage onBack={() => { setCurrentPage('home'); setJobToEdit(null); }} onSave={handleSaveOrUpdateJob} jobToEdit={jobToEdit} />;
      case 'home':
      default:
        const safeVacancies = vacancies.filter(v => v && (v.id !== null && v.id !== undefined));
        return (
          <HomePage 
            onNavigate={setCurrentPage} 
            onJobClick={handleJobClick} 
            vacancies={safeVacancies} 
            currentUser={currentUser} 
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] font-sans text-gray-800 flex flex-col">
      <Header 
        currentUser={currentUser} 
        onNavigate={(page) => {
            if(page === 'create-job') handleGoToCreate();
            else setCurrentPage(page);
          }
        } 
        onLogout={handleLogout} 
        isHome={currentPage === 'home'} 
      />
      {renderContent()}
    </div>
  );
}