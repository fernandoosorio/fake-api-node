const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;

const marcas = [
  { id: 1, nome: 'Dell', ativo : true , descricao: 'Unidade de medida de massa'},
  { id: 2, nome: 'Positivo', ativo : true, descricao: 'Unidade de medida de volume'},
  { id: 3, nome: 'mesa 3', ativo : true, descricao : 'descricao x' },
  { id: 4, nome: 'mesa 4', ativo : true, descricao : 'descricao x' },
  { id: 5, nome: 'mesa 5', ativo : true, descricao : 'descricao x' },
  { id: 6, nome: 'mesa 6', ativo : true, descricao : 'descricao x' },
  { id: 7, nome: 'mesa 7', ativo : true, descricao : 'descricao x' },
  { id: 8, nome: 'mesa 8', ativo : true, descricao : 'descricao x' },
  { id: 9, nome: 'mesa 9', ativo : true, descricao : 'descricao x' },
  { id: 10, nome: 'mesa 10', ativo : true, descricao : 'descricao x' },
  { id: 11, nome: 'mesa 11', ativo : true, descricao : 'descricao x' },
  { id: 12, nome: 'mesa 12', ativo : true, descricao : 'descricao x' },
  { id: 13, nome: 'mesa 13', ativo : true, descricao : 'descricao x' },
  { id: 14, nome: 'mesa 14', ativo : true, descricao : 'descricao x' },
];

router.post('/buscar-com-parametros-paginado', (req, res) => {
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, marcas);
  res.json(paginatedResponse);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resposta = getById(id, marcas);
  res.json(resposta);
});

router.post('/', (req, res) => {
  const { nome, ativo, descricao } = req.body;

  // Simular a geração de um novo ID (para um ambiente real, use um mecanismo adequado, como um banco de dados)
  const novoId = marcas.length + 1;

  const novaUnidadeMedida = {
    id: novoId,
    nome,
    ativo,
    descricao
  };

  marcas.push(novaUnidadeMedida);
  //enviar para API apenas os valores, sem novaUnidadeMedida

  res.status(201).json({  id: novoId, nome, ativo, descricao });
});


router.put('/', (req, res) => {
  const { id, nome, ativo, descricao } = req.body;

  // Lógica para encontrar e atualizar a unidade de medida com o ID fornecido
  const index = marcas.findIndex((unidade) => unidade.id === parseInt(id));

  if (index !== -1) {
    marcas[index] = { id: parseInt(id), nome, ativo, descricao };
    const retorno = marcas[index];
    console.log(retorno);
    res.json(retorno);
  } else {
    res.status(404).json({ success: false, message: 'Unidade de medida não encontrada' });
  }
});


module.exports = router;
