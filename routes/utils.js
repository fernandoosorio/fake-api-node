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
  
  const generatePaginatedResponse = (pageNumber, pageSize, unidadesMedida) => {
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
      pageable: { pageNumber : pageNumber},
      totalElements,
      totalPages,
    };
  };
  

module.exports = { generateFakeToken, generatePaginatedResponse };