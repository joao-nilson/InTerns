const express = require('express');
const router = express.Router();
const jobs = require('./mock_jobs')

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

router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Vaga não encontrada' });
  }
  res.json(job);
});

router.post('/', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body,
    postedAt: "Agora mesmo"
  };

  jobs.unshift(newJob);
  res.status(201).json(newJob);
});

router.get('/company/:companyName', (req, res) => {
  const companyJobs = jobs.filter(job => job.company === req.params.companyName);
  res.json(companyJobs);
});

module.exports = router;