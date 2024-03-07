const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;

const marcas = [
  { id: 1, nome: 'Dell', ativo : true , descricao: 'Unidade de medida de massa'},
  { id: 2, nome: 'Positivo', ativo : true, descricao: 'Unidade de medida de volume'},
  { id: 3, nome: 'Marca da Mesa', ativo : true, descricao : 'descricao x' },
  { id: 4, nome: 'Marca da Cadeira', ativo : true, descricao : 'descricao x' },
];

const produtos = [
  { id: 1, nome: 'Computador', ativo : true , descricao: null,marca_id : 1, unidadeMedida : {}},
  { id: 2, nome: 'Cadeira de Escritório Secretária', ativo : true , descricao: null, marca_id : 4, unidadeMedida : {}},
  { id: 3, nome: 'Cadeira de Escritório Office', ativo : true, descricao: null, marca_id : 3 , unidadeMedida : {}},
];


router.post('/buscar-com-parametros-paginado', (req, res) => {

  produtos.forEach(produto => {
    produto.marca = marcas.find(marca => marca.id === produto.marca_id);
  });
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, produtos);
  res.json(paginatedResponse);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  produtos.forEach(produto => {
    produto.marca = marcas.find(marca => marca.id === produto.marca_id);
  });

  const resposta = getById(id, produtos);
  res.json(resposta);
});


router.get('/autocomplete/get-all', (req, res) => {
  produtos.forEach(produto => {
    produto.marca = marcas.find(marca => marca.id === produto.marca_id);
  });
  res.json(produtos);
});

module.exports = router;
