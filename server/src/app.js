const express = require('express');
const cors = require('cors');

const app = express();

// Configurações
app.use(express.json());
app.use(cors());

// Rotas
app.get('/', (req, res) => {
    res.send('API do Conecte Voluntários rodando! 🚀');
});

//Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
