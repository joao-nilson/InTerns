const express = require('express');
const router = express.Router();
const Job = require('../database/models/Job'); // Importa o Model em vez do mock

router.get('/', async (req, res) => {
  try {
    const { search, company } = req.query;
    let query = {};

    if (company) {
      query.company = company;
    }

    if (search) {
      const term = new RegExp(search, 'i'); // 'i' para ignorar maiúsculas/minúsculas
      query.$or = [
        { title: term },
        { company: term },
        { "tags.name": term }
      ];
    }

    // Busca no banco de dados (Atende RF03 e RNF01)
    const filteredJobs = await Job.find(query).sort({ postedAt: -1 });
    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas no banco' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Busca por _id (Atende RF04)
    const job = await Job.findOne({ _id: parseInt(req.params.id) });
    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar detalhes da vaga' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);

    const newJob = new Job({
      // 1. Tratando o id: null que vem do frontend
      _id: req.body.id || Math.floor(Math.random() * 1000000), 
      
      // 2. Espalhando os campos (title, company, location, etc)
      ...req.body,

      // 3. RESOLUÇÃO DO ERRO: 
      // Como o frontend não enviou 'postedBy', definimos um ID de usuário padrão
      // para passar na validação do seu Schema.
      postedBy: req.body.postedBy || 1, 

      // 4. Garantindo que a data seja gravada corretamente
      postedAt: new Date()
    });

    const savedJob = await newJob.save();
    console.log("✅ Vaga salva no MongoDB com sucesso!");
    res.json(savedJob);

  } catch (error) {
    console.error("❌ Erro detalhado ao salvar:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/company/:companyName', async (req, res) => {
  try {
    const companyJobs = await Job.find({ company: req.params.companyName });
    res.json(companyJobs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas da empresa' });
  }
});

module.exports = router;