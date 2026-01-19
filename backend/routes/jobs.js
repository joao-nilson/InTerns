const express = require('express');
const router = express.Router();
const jobs = require('./mock_jobs')

router.get('/', (req, res) => {
  const { search, company } = req.query;
  let filteredJobs = [...jobs];

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