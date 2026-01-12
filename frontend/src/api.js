// frontend/src/api.js
const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    // Auth endpoints
    login: (email, password) => {
      return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(handleResponse);
    },

    // Company signup
    signupCompany: (userData) => {
      return fetch(`${API_URL}/auth/signup/company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(handleResponse);
    },

    // Candidate signup
    signupCandidate: (userData) => {
      return fetch(`${API_URL}/auth/signup/candidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(handleResponse);
    },

    // Job endpoints
    getJobs: (search, company) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (company) params.append('company', company);
        
        return fetch(`${API_URL}/jobs?${params}`)
          .then(handleResponse)
          .catch(error => {
            console.error('Failed to fetch jobs:', error);
            throw error;
          });
      },    

    getJob: (id) => {
      return fetch(`${API_URL}/jobs/${id}`).then(handleResponse);
    },

    createJob: (jobData) => {
      return fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      }).then(handleResponse);
    },

    getJobsByCompany: (companyName) => {
      return fetch(`${API_URL}/jobs/company/${companyName}`).then(handleResponse);
    }
};