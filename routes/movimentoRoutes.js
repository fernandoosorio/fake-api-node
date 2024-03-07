const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;
const  produtos = require('./utils').produtos;
const marcas = require('./utils').marcas;
const responsaveis = require('./utils').responsaveis;
const localidades = require('./utils').localidades;
const bens = require('./utils').bens;
const movimentos = require('./utils').movimentos;

router.post('/buscar-com-parametros-paginado', (req, res) => {
  //associar movimentos com bens, localidades e responsaveis
  movimentos.forEach(movimento => {
    // associar bem ao produto
    movimento.bem = bens.find(bem => bem.id === movimento.bem_id);
    if (movimento.bem) {
      movimento.bem.produto = produtos.find(produto => produto.id === movimento.bem.produto_id);
    }
    movimento.localorigem = localidades.find(localidade => localidade.id === movimento.localidade_origem_id);
    movimento.localdestino = localidades.find(localidade => localidade.id === movimento.localidade_destino_id);
    movimento.responsavelenvio = responsaveis.find(responsavel => responsavel.id === movimento.responsavel_origem_id);
    movimento.responsavelrecebimento = responsaveis.find(responsavel => responsavel.id === movimento.responsavel_destino_id);
  });
  
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, movimentos);
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
