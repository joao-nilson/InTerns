import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Building2, Briefcase, Filter, UserCircle, 
  Lock, Mail, User, ArrowRight, CheckCircle, ArrowLeft, 
  Clock, DollarSign, Plus, X, Save 
} from 'lucide-react';
import { api } from './api'; 

// --- MOCK DATA ---
const VAGAS_DATA = [
  {
    id: 1,
    title: "Estágio em Desenvolvimento Front-end",
    company: "Empresa MuitoFoda Solutions",
    location: "São Paulo, SP",
    regime: "Híbrido",
    description: "Buscamos estagiários apaixonados por interfaces modernas e UX para compor nosso time de produtos digitais. Você atuará diretamente na construção de novas features utilizando React e Tailwind.",
    requirements: "Estar cursando Ciência da Computação ou afins; Conhecimento básico em Git.",
    postedAt: "Há 2 dias",
    tags: [
      { id: 1, name: "React", type: "mandatory" },
      { id: 2, name: "JavaScript", type: "mandatory" },
      { id: 3, name: "Tailwind CSS", type: "desirable" },
      { id: 4, name: "Figma", type: "desirable" },
    ]
  },
  {
    id: 2,
    title: "Estágio em Backend Java",
    company: "Fintech AI ChatGPT Labubu S.A",
    location: "Juiz de Fora, MG",
    regime: "Remoto",
    description: "Oportunidade para atuar em sistemas de alta performance no setor bancário. Você aprenderá sobre microsserviços, segurança bancária e escalabilidade.",
    requirements: "Conhecimento em Orientação a Objetos; Vontade de aprender Spring Boot.",
    postedAt: "Há 4 horas",
    tags: [
      { id: 5, name: "Java", type: "mandatory" },
      { id: 6, name: "Spring Boot", type: "mandatory" },
      { id: 7, name: "SQL", type: "mandatory" },
      { id: 8, name: "Docker", type: "desirable" },
    ]
  },
  {
    id: 3,
    title: "Estágio em QA / Testes",
    company: "MegaHard",
    location: "Belo Horizonte, MG",
    regime: "Presencial",
    description: "Aprenda a garantir a qualidade de software através de testes automatizados e manuais. Auxiliará na criação de planos de testes e execução de scripts.",
    requirements: "Atenção aos detalhes; Lógica de programação.",
    postedAt: "Há 1 semana",
    tags: [
      { id: 9, name: "Lógica de Prog.", type: "mandatory" },
      { id: 10, name: "Selenium", type: "desirable" },
      { id: 11, name: "Cypress", type: "desirable" },
    ]
  },
  {
    id: 4,
    title: "Estágio Full Stack",
    company: "Startup Uncórnio que NÂO vai falir",
    location: "Rio de Janeiro, RJ",
    regime: "Híbrido",
    description: "Atuação generalista em produto em fase de crescimento acelerado. Você terá contato com todo o ciclo de desenvolvimento, do banco de dados ao frontend.",
    requirements: "Proatividade; Conhecimento em JavaScript.",
    postedAt: "Há 1 dia",
    tags: [
      { id: 12, name: "Node.js", type: "mandatory" },
      { id: 13, name: "React", type: "mandatory" },
      { id: 14, name: "TypeScript", type: "desirable" },
      { id: 15, name: "AWS", type: "desirable" },
    ]
  }
];

// --- COMPONENTES REUTILIZAVEIS ---

const Tag = ({ name, type, size = 'small', onRemove }) => {
  const bgClass = type === 'mandatory' 
    ? 'bg-[#223e8c] text-white' 
    : 'bg-[#3a8acf] text-white';

  const title = type === 'mandatory' ? 'Requisito Obrigatório' : 'Diferencial / Desejável';
  const sizeClass = size === 'large' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs';

  return (
    <span 
      title={title}
      className={`${bgClass} ${sizeClass} rounded-md font-semibold cursor-default inline-flex items-center gap-2`}
    >
      {name}
      {onRemove && (
        <button onClick={onRemove} className="hover:text-red-200 transition-colors">
          <X size={14} />
        </button>
      )}
    </span>
  );
};

const JobCard = ({ vaga, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-5 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#223e8c] transition-colors">
            {vaga.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <Building2 size={14} />
            <span>{vaga.company}</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{vaga.postedAt}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <MapPin size={14} />
        <span>{vaga.location} • {vaga.regime}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
        {vaga.description}
      </p>
      <div className="space-y-2 mt-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Tech Stack</span>
          <div className="h-[1px] flex-grow bg-gray-100"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {vaga.tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} type={tag.type} />
          ))}
        </div>
      </div>
      <button 
        onClick={() => onClick(vaga)}
        className="w-full mt-5 bg-transparent border border-[#223e8c] text-[#223e8c] py-2 rounded-lg text-sm font-bold hover:bg-[#223e8c] hover:text-white transition-colors"
      >
        Ver Detalhes
      </button>
    </div>
  );
};

const InputField = ({ icon: Icon, type, placeholder, label, value, onChange, textarea = false, rows = 3 }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {Icon && (
        <div className={`absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400 ${textarea ? 'top-3' : 'inset-y-0'}`}>
          <Icon size={18} />
        </div>
      )}
      {textarea ? (
        <textarea
          rows={rows}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  </div>
);

// --- COMPONENTES DE PAGINAS ---

const CreateJobPage = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    regime: 'Híbrido',
    description: '',
    requirements: '',
    benefits: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [tagType, setTagType] = useState('mandatory');
  const [tags, setTags] = useState([]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;

    const newTag = {
      id: Date.now(),
      name: tagInput,
      type: tagType
    };

    setTags([...tags, newTag]);
    setTagInput('');
  };

  const handleRemoveTag = (idToRemove) => {
    setTags(tags.filter(tag => tag.id !== idToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, tags });
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#223e8c] font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Cancelar e Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h1 className="text-2xl font-extrabold text-[#223e8c]">Publicar Nova Vaga</h1>
          <p className="text-sm text-gray-600 mt-1">Preencha os detalhes para encontrar o estagiário ideal.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              icon={Briefcase} 
              type="text" 
              label="Título da Vaga" 
              placeholder="Ex: Estágio em React Native" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Regime de Trabalho</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Building2 size={18} />
                </div>
                <select 
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white"
                  value={formData.regime}
                  onChange={e => setFormData({...formData, regime: e.target.value})}
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          <InputField 
            icon={MapPin} 
            type="text" 
            label="Localização (Cidade/Estado)" 
            placeholder="Ex: Juiz de Fora, MG" 
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />

          <InputField 
            textarea
            rows={4}
            icon={null} 
            type="text" 
            label="Descrição da Vaga" 
            placeholder="Descreva as responsabilidades e o dia a dia da função..." 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <InputField 
              textarea
              rows={3}
              icon={CheckCircle} 
              type="text" 
              label="Requisitos Básicos" 
              placeholder="Ex: Estar cursando a partir do 3º período..." 
              value={formData.requirements}
              onChange={e => setFormData({...formData, requirements: e.target.value})}
            />
             <InputField 
              textarea
              rows={3}
              icon={DollarSign} 
              type="text" 
              label="Benefícios" 
              placeholder="Ex: Vale transporte, Gympass..." 
              value={formData.benefits}
              onChange={e => setFormData({...formData, benefits: e.target.value})}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-sm font-bold text-gray-800 mb-2">Tecnologias e Skills (Tags)</label>
            <p className="text-xs text-gray-500 mb-4">Adicione as tags que aparecerão no card da vaga. Diferencie obrigatórias de desejáveis.</p>
            
            <div className="flex gap-2 mb-4 items-end">
              <div className="flex-grow">
                <input 
                  type="text" 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#223e8c] focus:border-[#223e8c]"
                  placeholder="Ex: Java, SQL, Inglês..."
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#223e8c] focus:border-[#223e8c]"
                  value={tagType}
                  onChange={e => setTagType(e.target.value)}
                >
                  <option value="mandatory">Obrigatório</option>
                  <option value="desirable">Desejável</option>
                </select>
              </div>
              <button 
                onClick={handleAddTag}
                type="button"
                className="bg-[#223e8c] text-white p-2 rounded-lg hover:bg-[#1a2f6b] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white rounded-lg border border-gray-200 border-dashed">
              {tags.length === 0 && <span className="text-xs text-gray-400 italic p-1">Nenhuma tag adicionada</span>}
              {tags.map(tag => (
                <Tag key={tag.id} name={tag.name} type={tag.type} onRemove={() => handleRemoveTag(tag.id)} />
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
             <button 
               type="button"
               onClick={onBack}
               className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors"
             >
               Cancelar
             </button>
             <button 
               type="submit"
               className="flex items-center gap-2 px-6 py-3 bg-[#223e8c] text-white rounded-lg text-sm font-bold hover:bg-[#1a2f6b] transition-all shadow-md hover:shadow-lg"
             >
               <Save size={18} />
               Publicar Vaga
             </button>
          </div>

        </form>
      </div>
    </main>
  );
};

const JobDetailsPage = ({ vaga, onBack }) => {
  if (!vaga) return null;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#223e8c] font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar para vagas
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#223e8c] mb-2">
                {vaga.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <Building2 size={18} className="text-[#3a8acf]" />
                  <span className="font-semibold">{vaga.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={18} className="text-[#3a8acf]" />
                  <span>{vaga.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={18} className="text-[#3a8acf]" />
                  <span>{vaga.regime}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                 Vaga Aberta
               </span>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Briefcase size={20} className="text-[#223e8c]" />
                Descrição da Vaga
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {vaga.description}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle size={20} className="text-[#223e8c]" />
                Requisitos Básicos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {vaga.requirements || "Disponibilidade para estagiar 30 horas semanais."}
              </p>
            </section>

             <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <DollarSign size={20} className="text-[#223e8c]" />
                Benefícios
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-1">
                {vaga.benefits ? (
                   <li>{vaga.benefits}</li>
                ) : (
                  <>
                    <li>Bolsa Auxílio compatível com o mercado</li>
                    <li>Vale Refeição / Alimentação</li>
                  </>
                )}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                Tecnologias & Skills
              </h4>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Obrigatórios</p>
                <div className="flex flex-wrap gap-2">
                  {vaga.tags.filter(t => t.type === 'mandatory').map(tag => (
                    <Tag key={tag.id} name={tag.name} type={tag.type} size="large" />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Diferenciais</p>
                <div className="flex flex-wrap gap-2">
                   {vaga.tags.filter(t => t.type === 'desirable').map(tag => (
                    <Tag key={tag.id} name={tag.name} type={tag.type} size="large" />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#f0f4ff] rounded-xl border border-blue-100 text-center">
              <p className="text-sm text-[#223e8c] mb-4 font-medium">
                Interessado nesta oportunidade?
              </p>
              <button className="w-full bg-[#223e8c] text-white py-3 rounded-lg text-base font-bold hover:bg-[#1a2f6b] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Inscrever-se Agora
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Ao clicar, você enviará seu perfil atual para a empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const UserTypeToggle = ({ userType, setUserType }) => (
  <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
    <button
      type="button"
      onClick={() => setUserType('candidate')}
      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
        userType === 'candidate'
          ? 'bg-white text-[#223e8c] shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <User size={16} />
      Sou Candidato
    </button>
    <button
      type="button"
      onClick={() => setUserType('company')}
      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
        userType === 'company'
          ? 'bg-white text-[#223e8c] shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <Building2 size={16} />
      Sou Empresa
    </button>
  </div>
);

const LoginPage = ({ onNavigate, onLogin }) => {
  const [userType, setUserType] = useState('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use provided credentials or defaults
    const loginEmail = email || (userType === 'candidate' ? 'aluno@teste.com' : 'rh@empresa.com');
    const loginPassword = password || '123';
    
    const result = await api.login(loginEmail, loginPassword);
    
    if (result.user) {
      onLogin(result.user);
    } else {
      // Fallback to original logic
      onLogin({ 
        type: userType, 
        name: userType === 'candidate' ? 'Aluno Teste' : 'Empresa MuitoFoda Solutions' 
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-[#223e8c]">
            Bem-vindo de volta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse sua conta para gerenciar suas {userType === 'candidate' ? 'candidaturas' : 'vagas'}.
          </p>
        </div>

        <UserTypeToggle userType={userType} setUserType={setUserType} />

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                  placeholder={userType === 'candidate' ? "seu.email@aluno.com" : "rh@empresa.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#223e8c] focus:ring-[#223e8c] border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">Lembrar-me</label>
            </div>
            <button type="button" className="font-medium text-[#223e8c] hover:text-[#1a2f6b]">
              Esqueceu a senha?
            </button>
          </div>

          <button 
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#223e8c] transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock size={18} className="text-blue-300 group-hover:text-white transition-colors" />
            </span>
            Entrar
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Ainda não tem conta?{' '}
              <button 
                onClick={() => onNavigate('signup')}
                className="font-bold text-[#223e8c] hover:text-[#1a2f6b] transition-colors"
              >
                Cadastre-se gratuitamente
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignUpPage = ({ onNavigate, onSignupSuccess }) => {
  const [userType, setUserType] = useState('candidate');
  const [step, setStep] = useState(1); // 1 = basic info, 2 = additional info
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form state for all fields
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    bio: '',
    
    // Company specific
    companySize: '',
    industry: '',
    website: '',
    taxId: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on typing
  };

  // Validate basic info (step 1)
  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    
    if (!formData.password) {
      setError('Senha é obrigatória');
      return false;
    }
    
    if (userType === 'candidate' && formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (userType === 'company' && formData.password.length < 8) {
      setError('Senha deve ter pelo menos 8 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    return true;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (userType === 'candidate') {
        // Prepare candidate data
        const candidateData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio
        };
        
        result = await api.signupCandidate(candidateData);
      } else {
        // Prepare company data
        const companyData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          companySize: formData.companySize,
          industry: formData.industry,
          website: formData.website,
          taxId: formData.taxId
        };
        
        result = await api.signupCompany(companyData);
      }

      setSuccess(true);
      
      // Auto-login after successful signup
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess(result.user);
        }
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // If signup successful
  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            Conta criada com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            {userType === 'candidate' 
              ? 'Bem-vindo ao InTerns! Seu perfil de candidato foi criado.'
              : 'Bem-vindo ao InTerns! Sua conta de empresa foi criada.'
            }
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecionando para a página inicial...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-[#223e8c]">
            Criar Conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Junte-se ao InTerns e {userType === 'candidate' ? 'encontre seu estágio ideal' : 'contrate os melhores talentos'}.
          </p>
        </div>

        <UserTypeToggle userType={userType} setUserType={setUserType} />

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-[#223e8c] text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className="ml-2 text-sm font-medium">Informações básicas</div>
          </div>
          <div className="h-px w-8 bg-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-[#223e8c] text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className="ml-2 text-sm font-medium">Informações adicionais</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {userType === 'candidate' ? "Nome Completo *" : "Nome da Empresa *"}
                </label>
                <input
                  type="text"
                  name="name"
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                  placeholder={userType === 'candidate' ? "Ex: João Silva" : "Ex: Tech Solutions Ltda"}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                  <input
                    type="password"
                    name="password"
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {userType === 'candidate' ? 'Mínimo 6 caracteres' : 'Mínimo 8 caracteres'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] transition-colors shadow-md hover:shadow-lg"
              >
                Próximo
              </button>
            </>
          ) : (
            <>
              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                  <input
                    type="text"
                    name="location"
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                    placeholder="São Paulo, SP"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {userType === 'candidate' ? "Sobre você (bio)" : "Sobre a empresa"}
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                  placeholder={userType === 'candidate' ? "Conte um pouco sobre sua experiência e objetivos..." : "Descreva a empresa, missão e valores..."}
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              {/* Company-specific fields */}
              {userType === 'company' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho da Empresa</label>
                      <select
                        name="companySize"
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white"
                        value={formData.companySize}
                        onChange={handleChange}
                      >
                        <option value="">Selecione</option>
                        <option value="1-10">1-10 funcionários</option>
                        <option value="11-50">11-50 funcionários</option>
                        <option value="51-200">51-200 funcionários</option>
                        <option value="201-500">201-500 funcionários</option>
                        <option value="501+">501+ funcionários</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                      <input
                        type="text"
                        name="industry"
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                        placeholder="Tecnologia, Saúde, Educação..."
                        value={formData.industry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        name="website"
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                        placeholder="https://empresa.com"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                      <input
                        type="text"
                        name="taxId"
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-[#223e8c] focus:border-[#223e8c] text-sm bg-white transition-colors"
                        placeholder="00.000.000/0001-00"
                        value={formData.taxId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-sm font-bold rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#223e8c] hover:bg-[#1a2f6b] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Já possui conta?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="font-bold text-[#223e8c] hover:text-[#1a2f6b] transition-colors"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- PAGINA INICIAL (SIMPLIFIED) ---
const HomePage = ({ onNavigate, onJobClick, vacancies, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simple filter logic (your original working version)
  const filteredVagas = vacancies.filter(vaga => {
    // If company user, filter by company
    if (currentUser?.type === 'company' && vaga.company !== currentUser.name) {
      return false;
    }
    
    // If search term, filter by search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      return (
        vaga.title.toLowerCase().includes(lowerTerm) ||
        vaga.company.toLowerCase().includes(lowerTerm) ||
        vaga.tags.some(tag => tag.name.toLowerCase().includes(lowerTerm))
      );
    }
    
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#223e8c] mb-3">
          Encontre seu estágio ideal em TI
        </h1>
        <p className="text-gray-500 mb-8">
          Conectamos estudantes a empresas de tecnologia de forma simples e transparente.
        </p>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-[#223e8c]" size={20} />
          </div>
          <input
            type="text"
            placeholder="Busque por cargo, empresa ou tecnologia (ex: Java, React)..."
            className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#223e8c] focus:border-transparent bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#223e8c]"></div>
            <span>Requisito Obrigatório</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#3a8acf]"></div>
            <span>Diferencial</span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-xl font-bold text-gray-800">
          {currentUser?.type === 'company' ? 'Minhas Vagas Ativas' : 'Vagas Recentes'}
        </h2>
        <span className="text-sm text-gray-500">
          {filteredVagas.length} vaga{filteredVagas.length !== 1 ? 's' : ''} encontrada{filteredVagas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filteredVagas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVagas.map((vaga) => (
            <JobCard key={vaga.id} vaga={vaga} onClick={onJobClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {currentUser?.type === 'company' 
              ? "Você ainda não publicou nenhuma vaga." 
              : `Nenhuma vaga encontrada para "${searchTerm}".`
            }
          </p>
          
          {currentUser?.type === 'company' ? (
             <p className="text-sm text-gray-400 mt-2">Clique em "Criar Vaga" no topo para começar.</p>
          ) : (
             <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-[#223e8c] font-bold hover:underline"
            >
              Limpar busca
            </button>
          )}
        </div>
      )}
    </main>
  );
};

// --- APP ORCHESTRATOR (SIMPLIFIED) ---

export default function InTernsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  
  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.getJobs();
        setVacancies(data);
      } catch (error) {
        console.log('Using mock data for now');
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
      const newJob = await api.createJob({
        ...jobData,
        company: currentUser?.name || "Minha Empresa"
      });
      setVacancies(prev => [newJob, ...prev]);
      setCurrentPage('home');
      alert("Vaga publicada com sucesso!");
    } catch (error) {
      console.error('Error creating job:', error);
      alert("Erro ao publicar vaga. Tente novamente.");
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
        return <HomePage 
          onNavigate={setCurrentPage} 
          onJobClick={handleJobClick} 
          vacancies={vacancies} 
          currentUser={currentUser} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] font-sans text-gray-800 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
          >
            <div className="bg-[#223e8c] p-1.5 rounded-lg">
              <Briefcase className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#223e8c]">
              InTerns
            </span>
          </button>

          <div className="flex items-center gap-4">
             {currentUser ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 hidden md:inline">
                    Olá, <strong>{currentUser.name}</strong>
                  </span>
                  
                  {currentUser.type === 'company' && (
                    <button 
                      onClick={() => setCurrentPage('create-job')}
                      className="flex items-center gap-2 bg-[#223e8c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors"
                    >
                      <Plus size={18} />
                      <span className="hidden md:inline">Criar Vaga</span>
                    </button>
                  )}

                  <button 
                    onClick={handleLogout}
                    className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Sair
                  </button>
                </div>
             ) : (
                currentPage === 'home' ? (
                  <button 
                    onClick={() => setCurrentPage('login')}
                    className="flex items-center gap-2 bg-[#223e8c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors"
                  >
                    <UserCircle size={18} />
                    <span>Entrar</span>
                  </button>
                ) : (
                  <button 
                      onClick={() => setCurrentPage('home')}
                      className="text-sm font-bold text-gray-500 hover:text-[#223e8c] flex items-center gap-1"
                    >
                      Voltar para Vagas
                    </button>
                )
             )}
          </div>
        </div>
      </header>

      {renderContent()}
    </div>
  );
}