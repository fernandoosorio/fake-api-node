const express = require('express');
const router = express.Router();
const generatePaginatedResponse = require('./utils').generatePaginatedResponse;
const getById = require('./utils').getById;

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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resposta = getById(id, localidades);
  res.json(resposta);
});

router.get('/autocomplete/get-all', (req, res) => {
  localidades.forEach(localidade => {
    localidade.setor = setores.find(setor => setor.id === localidade.setor_id);
  });
  res.json(localidades);
});

router.post('/autocomplete/sou-responsavel', (req, res) => {
  const {entidade}  = req.body;
  //pegar id e papel papelSelecionado de usuario
  const { id, papelSelecionado } = entidade;
  
  //se papelSelecionado for Administrador, retornar todas as localidades
  if(papelSelecionado.papel === 'Administrador'){
    localidades.forEach(localidade => {
      localidade.setor = setores.find(setor => setor.id === localidade.setor_id);
    });
   
    res.json(localidades);

  }else{ //se papelSelecionado for Unidade, retornar localidades do setor do usuario
    const localidadesDoSetor = localidades.filter(localidade => localidade.setor_id === id);
    localidadesDoSetor.forEach(localidade => {
      localidade.setor = setores.find(setor => setor.id === localidade.setor_id);
    });
  
    res.json(localidadesDoSetor);
  }


});


module.exports = router;
