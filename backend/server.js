const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const precos = {
    bicicleta: 0.75,
    carro: 0.25,
    drone: 1.00
}

app.post('/CalcularFrete', (req, res) => {
    const { distancia, tipoTransporte } = req.body;

    if (distancia === undefined || tipoTransporte === undefined) {
        return res.status(400).json({ error: 'Distância e tipo de transporte são obrigatórios.' });
    }

    const precoPorKm = precos[tipoTransporte];
    if (precoPorKm === undefined) {
        return res.status(400).json({ error: 'Tipo de transporte inválido.' });
    }

    const valorTotal = distancia * precoPorKm;
    return res.json({ valorTotal: valorTotal.toFixed(2) });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});