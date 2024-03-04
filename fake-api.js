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


app.use('', authRoutes);
app.use('/unidade-medida', unidadeMedidaRoutes);
app.use('/marca', marcaRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
