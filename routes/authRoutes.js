const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateFakeToken = require('./utils').generateFakeToken;


router.post('/login', (req, res) => {
  const { id, nome, login, cpf } = req.body;

  const token = generateFakeToken();

  res.json({
    id: 1,
    nome: 'Fernando',
    login: '123456789',
    token,
    cpf: '123456789',
  });
});

module.exports = router;
