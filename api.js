const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const unidadesMedida = [
  { id: 1, nome: 'Gram', ativo : true },
  { id: 2, nome: 'Liter', ativo : true },
  { id: 3, nome: 'Teste 3', ativo : true },
  { id: 4, nome: 'Teste 4', ativo : true },
  { id: 5, nome: 'Teste 5', ativo : true },
  { id: 6, nome: 'Teste 6', ativo : true },
  { id: 7, nome: 'Teste 7', ativo : true },
  { id: 8, nome: 'Teste 8', ativo : true },
  { id: 9, nome: 'Teste 9', ativo : true },
  { id: 10, nome: 'Teste 10', ativo : true },
  { id: 11, nome: 'Teste 11', ativo : true },
  { id: 12, nome: 'Teste 12', ativo : true },
  { id: 13, nome: 'Teste 13', ativo : true },
  { id: 14, nome: 'Teste 14', ativo : true },
];

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

const generatePaginatedResponse = (pageNumber, pageSize) => {
  const totalElements = unidadesMedida.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalElements);
  const content = unidadesMedida.slice(startIndex, endIndex);

  return {
    content,
    first: pageNumber === 1,
    last: pageNumber === totalPages,
    number: pageNumber,
    size: pageSize,
    pageable: {},
    totalElements,
    totalPages,
  };
};

app.post('/unidade-medida/buscarPaginado', (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const paginatedResponse = generatePaginatedResponse(pageNumber, pageSize);

  res.json(paginatedResponse);
});

app.get('/unidade-medida', (req, res) => {
  res.json(unidadesMedida);
});

app.post('/login', (req, res) => {
  const { id, nome, login, cpf } = req.body;

  const token = generateFakeToken();

  res.json({
    id: 1,
    nome: 'Fernando',
    login: '123456789',
    token,
    cpf: '123456789',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
