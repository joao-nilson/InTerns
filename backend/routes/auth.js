// routes/auth.js
const express = require('express');
const router = express.Router();

// Temporary in-memory user store
let users = [
  { id: 1, email: 'aluno@teste.com', password: '123', name: 'Aluno Teste', type: 'candidate' },
  { id: 2, email: 'rh@empresa.com', password: '123', name: 'Empresa MuitoFoda Solutions', type: 'company' }
];

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  // In a real app, generate a JWT token here
  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    }
  });
});

// Signup
router.post('/signup', (req, res) => {
  const { name, email, password, userType } = req.body;

  // Simple validation
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In a real app, hash this password!
    type: userType || 'candidate'
  };

  users.push(newUser);
  res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser.id });
});

module.exports = router;