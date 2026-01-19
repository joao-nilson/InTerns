// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const users = require('./data/mock_users')

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  // Return user data (without password)
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful',
    user: userWithoutPassword
  });
});

// Signup - Candidate
router.post('/signup/candidate', (req, res) => {
  const { name, email, password, phone, location, bio } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In production, hash this password!
    type: 'candidate',
    phone: phone || '',
    location: location || '',
    bio: bio || '',
    createdAt: new Date().toISOString(),
    profileCompleted: false
  };

  users.push(newUser);
  
  // Return without password
  const { password: _, ...userResponse } = newUser;
  res.status(201).json({ 
    message: 'Candidato criado com sucesso!',
    user: userResponse
  });
});

// Signup - Company
router.post('/signup/company', (req, res) => {
  const { 
    name, 
    email, 
    password, 
    phone, 
    location, 
    bio, 
    companySize, 
    industry,
    website,
    taxId
  } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome da empresa, email e senha são obrigatórios' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In production, hash this password!
    type: 'company',
    phone: phone || '',
    location: location || '',
    bio: bio || '',
    companySize: companySize || '',
    industry: industry || '',
    website: website || '',
    taxId: taxId || '',
    createdAt: new Date().toISOString(),
    profileCompleted: false,
    verified: false
  };

  users.push(newUser);
  
  // Return without password
  const { password: _, ...userResponse } = newUser;
  res.status(201).json({ 
    message: 'Empresa criada com sucesso!',
    user: userResponse
  });
});

// Get all users (for testing)
router.get('/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

module.exports = router;