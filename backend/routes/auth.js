// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const users = require('./data/mock_users')

// Login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    res.json({
      message: 'Login successful',
      user: user.toJSON()
    });
  }catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Signup - Candidate
router.post('/signup/candidate', async (req, res) => {
  try{

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

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
  
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      type: 'candidate',
      phone: phone || '',
      location: location || '',
      bio: bio || '',
      profileCompleted: false
    });
  
    await newUser.save();
    
    res.status(201).json({ 
      message: 'Candidato criado com sucesso!',
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error('Signup candidate error:', error);
    res.status(500).json({ error: 'Erro ao criar candidato' });
  }
});

// Signup - Company
router.post('/signup/company', async (req, res) => {
  try{

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

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
  
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      type: 'company',
      phone: phone || '',
      location: location || '',
      bio: bio || '',
      companySize: companySize || '',
      industry: industry || '',
      website: website || '',
      taxId: taxId || '',
      profileCompleted: false,
      verified: false
    });
  
    await newUser.save();
    
    res.status(201).json({ 
      message: 'Empresa criada com sucesso!',
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error('Signup company error:', error);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
});

// Get all users (for testing)
router.get('/users', async (req, res) => {
  // const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  // res.json(usersWithoutPasswords);
  try{
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;