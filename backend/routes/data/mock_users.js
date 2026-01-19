const USERS_MOCK = [
  { 
    id: 1, 
    email: 'aluno@teste.com', 
    password: '123', 
    name: 'Aluno Teste', 
    type: 'candidate',
    createdAt: new Date().toISOString(),
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
    bio: 'Estudante de Ciência da Computação'
  },
  { 
    id: 2, 
    email: 'rh@empresa.com', 
    password: '123', 
    name: 'Empresa MuitoFoda Solutions', 
    type: 'company',
    contactEmail: 'rh@empresa.com',
    createdAt: new Date().toISOString(),
    phone: '(11) 3333-3333',
    location: 'São Paulo, SP',
    bio: 'Solução inovadora em tecnologia',
    companySize: '50-100 funcionários',
    industry: 'Tecnologia'
  }
];

module.exports = {USERS_MOCK};