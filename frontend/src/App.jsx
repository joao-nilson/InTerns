import React, { useState } from 'react';

// Dados mock
import { VAGAS_DATA } from './data/Mock';

// Componentes de Layout
import { Header } from './components/layout/Header';

// Páginas
import { HomePage } from './pages/Homepage';
import { JobDetailsPage } from './pages/JobDetails';
import { LoginPage } from './pages/LoginPage'; // TODO
// import { CreateJobPage } from './pages/CreateJobPage'; // TODO
// import { SignUpPage } from './pages/SignUpPage'; // TODO

// Componentes Placeholder enquanto nao criamos as outras paginas
//const LoginPage = ({ onLogin, onNavigate }) => <div className="p-10 text-center"><h1 className="text-xl font-bold">Página de Login WIP (TODO: mover o código antigo para src/pages/Login.jsx)</h1><button onClick={() => onLogin({type:'candidate', name:'Dev'})} className="mt-4 bg-blue-600 text-white p-2 rounded">Simular Login</button></div>;
const CreateJobPage = ({ onBack }) => <div className="p-10 text-center"><h1 className="text-xl font-bold">Página Criar Vaga WIP (TODO: mover o código antigo para src/pages/CreateJob.jsx)</h1><button onClick={onBack} className="mt-4 text-blue-600 underline">Voltar</button></div>;
const SignUpPage = ({ onNavigate }) => <div className="p-10 text-center"><h1 className="text-xl font-bold">Página Cadastro WIP (TODO: mover o código antigo para src/pages/SignUp.jsx)</h1><button onClick={() => onNavigate('login')} className="mt-4 text-blue-600 underline">Ir para Login</button></div>;


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