const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;

const marcas = [
  { id: 1, nome: 'Dell', ativo : true , descricao: 'Unidade de medida de massa'},
  { id: 2, nome: 'Positivo', ativo : true, descricao: 'Unidade de medida de volume'},
  { id: 3, nome: 'Marca da Mesa', ativo : true, descricao : 'descricao x' },
  { id: 4, nome: 'Marca da Cadeira', ativo : true, descricao : 'descricao x' },
];

const produtos = [
  { id: 1, nome: 'Computador', ativo : true , marca_id : 1},
  { id: 2, nome: 'Cadeira de Escritório Secretária', ativo : true , marca_id : 4},
  { id: 3, nome: 'Cadeira de Escritório Office', ativo : true, marca_id : 3 },
];


router.post('/buscar-com-parametros-paginado', (req, res) => {

  produtos.forEach(produto => {
    produto.marca = marcas.find(marca => marca.id === produto.marca_id);
  });
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, produtos);
  res.json(paginatedResponse);
});

module.exports = router;
