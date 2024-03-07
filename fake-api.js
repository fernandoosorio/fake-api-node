const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const unidadeMedidaRoutes = require('./routes/unidadeMedidaRoutes');
const authRoutes = require('./routes/authRoutes');
const marcaRoutes = require('./routes/marcaRoutes');
const localRoutes = require('./routes/localRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const infraRoutes = require('./routes/infraRoutes');
const bemRoutes = require('./routes/bemRoutes');
const movimentoRoutes = require('./routes/movimentoRoutes');

app.use('', authRoutes);
app.use('/unidade-medida', unidadeMedidaRoutes);
app.use('/marca', marcaRoutes);
app.use('/local', localRoutes);
app.use('/responsavel', responsavelRoutes);
app.use('/produto', produtoRoutes);
app.use('/infra', infraRoutes);
app.use('/bem', bemRoutes);
app.use('/movimento', movimentoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
