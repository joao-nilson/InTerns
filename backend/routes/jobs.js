// routes/jobs.js
const express = require('express');
const router = express.Router();

// Start with your existing job data
let jobs = [
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
  // ... Add the other 3 job objects from your VAGAS_DATA here
];

// GET all jobs (with optional search query)
router.get('/', (req, res) => {
  const { search, company } = req.query;
  let filteredJobs = [...jobs];

  if (company) {
    filteredJobs = filteredJobs.filter(job => job.company === company);
  }

  if (search) {
    const term = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.tags.some(tag => tag.name.toLowerCase().includes(term))
    );
  }

  res.json(filteredJobs);
});

// GET a specific job by ID
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Vaga não encontrada' });
  }
  res.json(job);
});

// POST a new job
router.post('/', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body,
    postedAt: "Agora mesmo"
  };

  jobs.unshift(newJob); // Add to beginning
  res.status(201).json(newJob);
});

// GET jobs by company name
router.get('/company/:companyName', (req, res) => {
  const companyJobs = jobs.filter(job => job.company === req.params.companyName);
  res.json(companyJobs);
});

module.exports = router;