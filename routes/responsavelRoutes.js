const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;


const localidades = [
  { id: 1, nome: 'Recepção da Divisão de Informática', ativo : true, setor_id : 1, responsavel_id : 1},
  { id: 2, nome: 'Sala 01 de Divisão de Informática', ativo : true, setor_id : 1, responsavel_id : 1 },
  { id: 3, nome: 'Sala Diretora - Departamento de Gestão de Pessoas', ativo : true, setor_id : 2 , responsavel_id : 2},
  { id: 4, nome: 'Recepção - Departamento de Gestão de Pessoas', ativo : true, setor_id : 2, responsavel_id : 3 },
];


const responsaveis = [
  {id: 1,  ativo: true, servidor : {id : 500,  nome: 'Fernando', matricula: '1001' }, },
  {id: 2, ativo: true,  servidor : {id : 600,  nome: 'Rodrigo', matricula: '1201' },   },
  {id: 3, ativo: true,  servidor : {id : 700,  nome: 'Ana', matricula: '1051' },   },
]



router.post('/buscar-com-parametros-paginado', (req, res) => {
  //associar responsavel com suas localidades  por meio do responsavel_id em localidades
  responsaveis.forEach(responsavel => {
    responsavel.localidades = localidades.filter(localidade => localidade.responsavel_id === responsavel.id);
  });
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, responsaveis);
  console.log(paginatedResponse);
  res.json(paginatedResponse);
});

router.get('/autocomplete/get-all', (req, res) => {
  res.json(responsaveis);
});


module.exports = router;
