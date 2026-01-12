// frontend/src/api.js
const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()),

  signup: (userData) =>
    fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),

  // Jobs
  getJobs: (search, company) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (company) params.append('company', company);
    return fetch(`${API_URL}/jobs?${params}`).then(res => res.json());
  },

  getJob: (id) =>
    fetch(`${API_URL}/jobs/${id}`).then(res => res.json()),

  createJob: (jobData) =>
    fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    }).then(res => res.json())
};