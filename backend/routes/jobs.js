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
    // Criação via Model (Atende RF07)
    const newJob = new Job({
      _id: Math.floor(Math.random() * 100000), // Gerando ID numérico conforme seu Schema
      ...req.body,
      postedAt: new Date()
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao publicar vaga' });
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