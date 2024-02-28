const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;

const unidadesMedida = [
  { id: 1, nome: 'Gram', ativo : true },
  { id: 2, nome: 'Liter', ativo : true },
  { id: 3, nome: 'Teste 3', ativo : true },
  { id: 4, nome: 'Teste 4', ativo : true },
  { id: 5, nome: 'Teste 5', ativo : true },
  { id: 6, nome: 'Teste 6', ativo : true },
  { id: 7, nome: 'Teste 7', ativo : true },
  { id: 8, nome: 'Teste 8', ativo : true },
  { id: 9, nome: 'Teste 9', ativo : true },
  { id: 10, nome: 'Teste 10', ativo : true },
  { id: 11, nome: 'Teste 11', ativo : true },
  { id: 12, nome: 'Teste 12', ativo : true },
  { id: 13, nome: 'Teste 13', ativo : true },
  { id: 14, nome: 'Teste 14', ativo : true },
];

router.post('/buscar-com-parametros-paginado', (req, res) => {
  const { tamanho, pagina } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, unidadesMedida);
  res.json(paginatedResponse);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resposta = getById(id, unidadesMedida);
  res.json(resposta);
});

router.get('/', (req, res) => {
  res.json({"mensagem": "Rota de unidade de medida"});
});

module.exports = router;
