// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../../database/models/Job');

// Start with your existing job data
// let jobs = [
//     {
//       id: 1,
//       title: "Estágio em Desenvolvimento Front-end",
//       company: "Empresa MuitoFoda Solutions",
//       location: "São Paulo, SP",
//       regime: "Híbrido",
//       description: "Buscamos estagiários apaixonados por interfaces modernas e UX para compor nosso time de produtos digitais. Você atuará diretamente na construção de novas features utilizando React e Tailwind.",
//       requirements: "Estar cursando Ciência da Computação ou afins; Conhecimento básico em Git.",
//       postedAt: "Há 2 dias",
//       tags: [
//         { id: 1, name: "React", type: "mandatory" },
//         { id: 2, name: "JavaScript", type: "mandatory" },
//         { id: 3, name: "Tailwind CSS", type: "desirable" },
//         { id: 4, name: "Figma", type: "desirable" },
//       ]
//     },
//     {
//       id: 2,
//       title: "Estágio em Backend Java",
//       company: "Fintech AI ChatGPT Labubu S.A",
//       location: "Juiz de Fora, MG",
//       regime: "Remoto",
//       description: "Oportunidade para atuar em sistemas de alta performance no setor bancário. Você aprenderá sobre microsserviços, segurança bancária e escalabilidade.",
//       requirements: "Conhecimento em Orientação a Objetos; Vontade de aprender Spring Boot.",
//       postedAt: "Há 4 horas",
//       tags: [
//         { id: 5, name: "Java", type: "mandatory" },
//         { id: 6, name: "Spring Boot", type: "mandatory" },
//         { id: 7, name: "SQL", type: "mandatory" },
//         { id: 8, name: "Docker", type: "desirable" },
//       ]
//     },
//     {
//       id: 3,
//       title: "Estágio em QA / Testes",
//       company: "MegaHard",
//       location: "Belo Horizonte, MG",
//       regime: "Presencial",
//       description: "Aprenda a garantir a qualidade de software através de testes automatizados e manuais. Auxiliará na criação de planos de testes e execução de scripts.",
//       requirements: "Atenção aos detalhes; Lógica de programação.",
//       postedAt: "Há 1 semana",
//       tags: [
//         { id: 9, name: "Lógica de Prog.", type: "mandatory" },
//         { id: 10, name: "Selenium", type: "desirable" },
//         { id: 11, name: "Cypress", type: "desirable" },
//       ]
//     },
//     {
//       id: 4,
//       title: "Estágio Full Stack",
//       company: "Startup Uncórnio que NÂO vai falir",
//       location: "Rio de Janeiro, RJ",
//       regime: "Híbrido",
//       description: "Atuação generalista em produto em fase de crescimento acelerado. Você terá contato com todo o ciclo de desenvolvimento, do banco de dados ao frontend.",
//       requirements: "Proatividade; Conhecimento em JavaScript.",
//       postedAt: "Há 1 dia",
//       tags: [
//         { id: 12, name: "Node.js", type: "mandatory" },
//         { id: 13, name: "React", type: "mandatory" },
//         { id: 14, name: "TypeScript", type: "desirable" },
//         { id: 15, name: "AWS", type: "desirable" },
//       ]
//     }
//   ];

// GET all jobs (with optional search query)
router.get('/', async (req, res) => {
  try {
    const { search, company, regime, location } = req.query;
    let query = { active: true };

    if (company) {
      query.company = company;
    }

    if (regime) {
      query.regime = regime;
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (search) {
      const term = new RegExp(search, 'i');
      query.$or = [
        { title: term },
        { company: term },
        { description: term },
        { 'tags.name': term }
      ];
    }

    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .populate('postedBy', 'name email type');

    // Add virtual field
    const jobsWithRelativeTime = jobs.map(job => ({
      ...job.toObject(),
      postedAt: job.postedAtRelative
    }));

    res.json(jobsWithRelativeTime);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

// GET a specific job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email type location phone');
    
    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    
    res.json({
      ...job.toObject(),
      postedAt: job.postedAtRelative
    });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  try {
    // In production, add authentication middleware
    const { title, company, location, regime, description, requirements, tags } = req.body;
    
    const newJob = new Job({
      title,
      company,
      location,
      regime,
      description,
      requirements,
      tags,
      postedBy: req.body.userId || null // Replace with actual user ID from auth
    });

    await newJob.save();
    
    res.status(201).json({
      ...newJob.toObject(),
      postedAt: newJob.postedAtRelative
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

// GET jobs by company name
router.get('/company/:companyName', async (req, res) => {
  try {
    const jobs = await Job.find({ 
      company: req.params.companyName,
      active: true 
    })
    .sort({ postedAt: -1 })
    .populate('postedBy', 'name email type');

    const jobsWithRelativeTime = jobs.map(job => ({
      ...job.toObject(),
      postedAt: job.postedAtRelative
    }));

    res.json(jobsWithRelativeTime);
  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas da empresa' });
  }
});

// DELETE a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    
    res.json({ message: 'Vaga removida com sucesso' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Erro ao remover vaga' });
  }
});

module.exports = router;