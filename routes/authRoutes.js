const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateFakeToken = require('./utils').generateFakeToken;

const usuario_admin = { id: 1, nome: 'Fernando Administrador', login: '1', cpf: '1', matricula:'10233', papeis :[{id: 1, papel: 'Administrador'}] , setorLotacao: 'Divisão de RH'};
const usuario_unidade = { id: 2, nome: 'Fernando Unidade', login: '2', cpf: '2', matricula:'20248', papeis :[{id: 2, papel: 'Unidade'}]};
const usuario_dois_papeis = { id: 13, nome: 'Fernando Dois Papeis', login: '3', cpf: '583', matricula:'3', 
papeis :[ {id: 1, papel: 'Administrador'}, {id: 2, papel: 'Unidade'} ], setorLotacao: 'Divisão de Informática'};

const usuario_sem_papeis = { id: 14, nome: 'Fernando Dois Papeis', login: '4', cpf: '3', matricula:'3', 
papeis :{}};

router.post('/login', (req, res) => {
  const { login } = req.body;
  
  let userSelecionado = {};

  const token = generateFakeToken();

  if (login === '1') {
    userSelecionado = usuario_admin;
  } else if (login === '2') {
    userSelecionado = usuario_unidade;
  }else if (login === '3') {
    userSelecionado = usuario_dois_papeis;
  }else if (login === '4') {
    userSelecionado = usuario_sem_papeis;
  } else {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }
  //adicionar token ao userSelecionado
  userSelecionado.token = token;
  

  res.json( userSelecionado);
});

module.exports = router;
