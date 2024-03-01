const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;

const unidadesMedida = [
  { id: 1, nome: 'Gram', ativo : true , descricao: 'Unidade de medida de massa'},
  { id: 2, nome: 'Liter', ativo : true, descricao: 'Unidade de medida de volume'},
  { id: 3, nome: 'Teste 3', ativo : true, descricao : 'descricao x' },
  { id: 4, nome: 'Teste 4', ativo : true, descricao : 'descricao x' },
  { id: 5, nome: 'Teste 5', ativo : true, descricao : 'descricao x' },
  { id: 6, nome: 'Teste 6', ativo : true, descricao : 'descricao x' },
  { id: 7, nome: 'Teste 7', ativo : true, descricao : 'descricao x' },
  { id: 8, nome: 'Teste 8', ativo : true, descricao : 'descricao x' },
  { id: 9, nome: 'Teste 9', ativo : true, descricao : 'descricao x' },
  { id: 10, nome: 'Teste 10', ativo : true, descricao : 'descricao x' },
  { id: 11, nome: 'Teste 11', ativo : true, descricao : 'descricao x' },
  { id: 12, nome: 'Teste 12', ativo : true, descricao : 'descricao x' },
  { id: 13, nome: 'Teste 13', ativo : true, descricao : 'descricao x' },
  { id: 14, nome: 'Teste 14', ativo : true, descricao : 'descricao x' },
];

router.post('/buscar-com-parametros-paginado', (req, res) => {
  const { tamanho, pagina } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina |0, tamanho |10, unidadesMedida);
  res.json(paginatedResponse);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resposta = getById(id, unidadesMedida);
  res.json(resposta);
});

router.post('/', (req, res) => {
  const { nome, ativo } = req.body;

  // Simular a geração de um novo ID (para um ambiente real, use um mecanismo adequado, como um banco de dados)
  const novoId = unidadesMedida.length + 1;

  const novaUnidadeMedida = {
    id: novoId,
    nome,
    ativo,
  };

  unidadesMedida.push(novaUnidadeMedida);

  res.status(201).json({ novaUnidadeMedida });
});


router.put('/', (req, res) => {
  const { id, nome, ativo, descricao } = req.body;

  // Lógica para encontrar e atualizar a unidade de medida com o ID fornecido
  const index = unidadesMedida.findIndex((unidade) => unidade.id === parseInt(id));

  if (index !== -1) {
    unidadesMedida[index] = { id: parseInt(id), nome, ativo, descricao };
    const retorno = unidadesMedida[index];
    console.log(retorno);
    res.json(retorno);
  } else {
    res.status(404).json({ success: false, message: 'Unidade de medida não encontrada' });
  }
});


module.exports = router;
