const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

// Adicionando o endpoint POST na rota /api/teste
app.post('/api/teste', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);

    // Convertendo os dados recebidos para uma string
    const dataString = JSON.stringify(data, null, 2);

    // Definindo o caminho do arquivo
    const filePath = path.join(__dirname, 'data.txt');

    // Escrevendo os dados no arquivo
    fs.writeFile(filePath, dataString, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados no arquivo:', err);
            return res.status(500).send({ message: 'Erro ao salvar os dados' });
        }

        res.status(200).send({ message: 'Dados recebidos e salvos com sucesso', data });
    });
});

const PORT = process.env.PORT || 4000; // Use a porta definida no arquivo .env ou 4000 por padrão

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port [${PORT}] ...`);
});
