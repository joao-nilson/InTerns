const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    login: (email, password) => {
      return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(handleResponse);
    },

    signupCompany: (userData) => {
      return fetch(`${API_URL}/auth/signup/company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(handleResponse);
    },

    signupCandidate: (userData) => {
      return fetch(`${API_URL}/auth/signup/candidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(handleResponse);
    },

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

    updateJob: (id, jobData) => {
      return fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      }).then(handleResponse);
    },

    deleteJob: (id) => {
      return fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
      }).then(handleResponse);
    },

    getJobsByCompany: (companyName) => {
      return fetch(`${API_URL}/jobs/company/${companyName}`).then(handleResponse);
    }
};