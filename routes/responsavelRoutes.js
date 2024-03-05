const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;

const setores = [
  { id: 1, nome: 'Divisão de Informática', ativo : true },
  { id: 2, nome: 'Departamento de Gestão de Pessoas', ativo : true },
  { id: 3, nome: 'Departamento de Financeiro', ativo : true },
];

const responsaveis = [
  {id: 1,  ativo: true, servidor : {id : 500,  nome: 'Fernando' }, setor_id : 1 },
  {id: 2, ativo: true,  servidor : {id : 600,  nome: 'Rodrigo' }, setor_id : 2  },
  {id: 3, ativo: true,  servidor : {id : 700,  nome: 'Ana' }, setor_id : 3  },
]



router.post('/buscar-com-parametros-paginado', (req, res) => {
  //associar localidades com setores por meio do setor_id
  responsaveis.forEach(responsavel => {
    responsavel.setor = setores.find(setor => setor.id === responsavel.setor_id);
  });
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, responsaveis);
  res.json(paginatedResponse);
});


module.exports = router;
