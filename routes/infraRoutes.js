const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateFakeToken = require('./utils').generateFakeToken;


router.get('/setores-auto-complete', (req, res) => {
  const setores = [
    { id: 1, nome: 'Divisão de Informática', ativo : true },
    { id: 2, nome: 'Departamento de Gestão de Pessoas', ativo : true },
    { id: 3, nome: 'Departamento de Financeiro', ativo : true },
  ];

  res.json(setores);
});


router.get('/servidores-auto-complete', (req, res) => {
  const servidores = [
    {id : 500,  nome: 'Fernando', matricula: '1001' },
    {id : 600,  nome: 'Rodrigo', matricula: '1201' }, 
   {id : 700,  nome: 'Ana', matricula: '1051' },
  ];

  res.json(servidores);
});

module.exports = router;
