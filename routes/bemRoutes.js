const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;
const  produtos = require('./utils').produtos;
const marcas = require('./utils').marcas;
const responsaveis = require('./utils').responsaveis;
const localidades = require('./utils').localidades;
const bens = require('./utils').bens;

router.post('/buscar-com-parametros-paginado', (req, res) => {
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  //ASSOCIar produto, localidade e responsavel ao bem
  bens.forEach(bem => {
    bem.produto = produtos.find(produto => produto.id === bem.produto_id);
    bem.localidade = localidades.find(localidade => localidade.id === bem.localidade_id);
    bem.responsavel = responsaveis.find(responsavel => responsavel.id === bem.responsavel_id);
  });
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, bens);
  res.json(paginatedResponse);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  bens.forEach(bem => {
    bem.produto = produtos.find(produto => produto.id === bem.produto_id);
    bem.localidade = localidades.find(localidade => localidade.id === bem.localidade_id);
    bem.responsavel = responsaveis.find(responsavel => responsavel.id === bem.responsavel_id);
  });
  const resposta = getById(id, bens);
  res.json(resposta);
});

router.post('/', (req, res) => {
  const { nome, ativo, descricao } = req.body;

  // Simular a geração de um novo ID (para um ambiente real, use um mecanismo adequado, como um banco de dados)
  const novoId = unidadesMedida.length + 1;

  const novaUnidadeMedida = {
    id: novoId,
    nome,
    ativo,
    descricao
  };

  unidadesMedida.push(novaUnidadeMedida);
  //enviar para API apenas os valores, sem novaUnidadeMedida

  res.status(201).json({  id: novoId, nome, ativo, descricao });
});


router.put('/', (req, res) => {
  const { id, nome, ativo, descricao } = req.body;

  // Lógica para encontrar e atualizar a unidade de medida com o ID fornecido
  const index = unidadesMedida.findIndex((unidade) => unidade.id === parseInt(id));

  if (index !== -1) {
    unidadesMedida[index] = { id: parseInt(id), nome, ativo, descricao };
    const retorno = unidadesMedida[index];
    res.json(retorno);
  } else {
    res.status(404).json({ success: false, message: 'Unidade de medida não encontrada' });
  }
});

router.get('/autocomplete/get-all', (req, res) => {
  res.json(unidadesMedida);
});

router.post('/autocomplete/sou-responsavel', (req, res) => {
  const {entidade}  = req.body;
  const { id } = entidade;
  
  const bensDoLocalidade = bens.filter(bem => bem.localidade_id === id);
  //acrescentar a associação de produto aos bensDoLocalidade
  bensDoLocalidade.forEach(bem => {
    bem.produto = produtos.find(produto => produto.id === bem.produto_id);
  });
  res.json(bensDoLocalidade);
  
});


module.exports = router;
