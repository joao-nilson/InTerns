const express = require('express');
const router = express.Router();
const Job = require('../database/models/Job');

router.get('/', async (req, res) => {
  try {
    const { search, company } = req.query;
    let query = {};

    if (company) {
      query.company = company;
    }

    if (search) {
      const term = new RegExp(search, 'i');
      query.$or = [
        { title: term },
        { company: term },
        { "tags.name": term }
      ];
    }

    const filteredJobs = await Job.find(query).sort({ postedAt: -1 });
    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas no banco' });
  }
});

router.get('/:id', async (req, res) => {
  try {
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
    const newJob = new Job({
      _id: req.body._id || Math.floor(Math.random() * 1000000), 
      ...req.body,
      postedBy: req.body.postedBy || 1,
      postedAt: new Date()
    });

    const savedJob = await newJob.save();
    
    res.status(201).json(savedJob); 

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