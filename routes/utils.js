const jwt = require('jsonwebtoken');


const generateFakeToken = () => {
    const secretKey = 'sua_chave_secreta';
    const payload = {
      id: 1,
      nome: 'Fernando',
      login: '123456789',
      cpf: '123456789',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 100, // 100 dias no futuro
    };
    return jwt.sign(payload, secretKey);
  };
  
  const generatePaginatedResponse = (pageNumber, pageSize , nome, unidadesMedida) => {
  
    if(nome){
      unidadesMedida = unidadesMedida.filter((unidadeMedida) => unidadeMedida.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    const totalElements = unidadesMedida.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const startIndex = (pageNumber) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalElements);
    const content = unidadesMedida.slice(startIndex, endIndex);
   
    return {
      content,
      first: pageNumber === 0,
      last: pageNumber === totalPages-1,
      number: pageNumber,
      size: pageSize,
      pageable: { pageNumber : pageNumber, pageSize : pageSize},
      totalElements,
      totalPages,
    };
  };

  const getById = (id, unidadesMedida) => {
    //encontrar no array unidadesMedida pelo id
    return unidadesMedida.find((unidadeMedida) => unidadeMedida.id == id);
  };


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
    {id: 4, ativo: true,  servidor : {id : 700,  nome: '4 responsavel', matricula: '10511' },   },
  ]
  
  const bens = [
    { id: 1, produto_id : 1 , localidade_id : 1, responsavel_id : 1,  ativo : true, tombamento : '123', tombamentoAntigo : 'Antigo1', status: 'EM_USO' },
    { id: 2, produto_id: 2 , localidade_id : 2, responsavel_id : 2,  ativo : true, tombamento : '124', tombamentoAntigo : 'Antigo2', status: 'EM_USO' },
    { id: 3, produto_id :3 , localidade_id : 3, responsavel_id : 3,  ativo : true, tombamento : '125', tombamentoAntigo : 'Antigo3', status: 'EM_USO' },
    { id: 4, produto_id :1 , localidade_id : 4, responsavel_id : 4,  ativo : true, tombamento : '277', status: 'EM_USO' },

  ];

  const movimentos = [
    { id: 1, bem_id : 1, localidade_origem_id : 1, localidade_destino_id : 2, responsavel_origem_id : 1, responsavel_destino_id : 2, dataEnvio : '2021-01-01 13:00', dataRecimento: '2021-01-01 13:20', justificativa : 'Mudança de sala', statusmovimento: 'RECEBIDO'},
    { id: 2, bem_id : 2, localidade_origem_id : 2, localidade_destino_id : 3, responsavel_origem_id : 2, responsavel_destino_id : 3, dataEnvio : '2021-01-02 07:30', justificativa : 'Mudança de sala' , statusmovimento: 'ENVIADO'},
    { id: 3, bem_id : 3, localidade_origem_id : 3, localidade_destino_id : 4, responsavel_origem_id : 3, responsavel_destino_id : 1, dataEnvio : '2021-01-03 11:45', justificativa : 'Mudança de sala', statusmovimento: 'ENVIADO' },

  ];

module.exports = { generateFakeToken, generatePaginatedResponse , getById,
   marcas, responsaveis, localidades, produtos, bens, movimentos};