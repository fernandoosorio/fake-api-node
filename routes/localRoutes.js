const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;

const setores = [
  { id: 1, nome: 'Divisão de Informática', ativo : true },
  { id: 2, nome: 'Departamento de Gestão de Pessoas', ativo : true },
];

const localidades = [
  { id: 1, nome: 'Recepção da Divisão de Informática', ativo : true, setor_id : 1 },
  { id: 2, nome: 'Sala 01 de Divisão de Informática', ativo : true, setor_id : 1 },
  { id: 3, nome: 'Sala Diretora - Departamento de Gestão de Pessoas', ativo : true, setor_id : 2 },
  { id: 4, nome: 'Recepção - Departamento de Gestão de Pessoas', ativo : true, setor_id : 2 },
];


router.post('/buscar-com-parametros-paginado', (req, res) => {
  //associar localidades com setores por meio do setor_id
  localidades.forEach(localidade => {
    localidade.setor = setores.find(setor => setor.id === localidade.setor_id);
  });
  const { tamanho = 5, pagina = 0 , nome } = req.body;
  const paginatedResponse = generatePaginatedResponse(pagina, tamanho, nome, localidades);
  res.json(paginatedResponse);
});


module.exports = router;
