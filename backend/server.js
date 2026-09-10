// Importa o módulo 'express', que é o framework de aplicação web para Node.js.
const express = require('express');
// Importa o módulo 'cors', que permite que o servidor aceite requisições de diferentes origens (domínios).
const cors = require('cors');

// Cria uma instância do aplicativo Express.
const app = express();
// Define a porta em que o servidor irá escutar.
const PORT = 3001;

// Configura o Express para analisar requisições com corpo no formato JSON.
// Isso é necessário para ler os dados enviados no corpo da requisição POST.
app.use(express.json());
// Habilita o CORS para todas as rotas da aplicação, permitindo acesso de outros domínios.
app.use(cors());

// Objeto que funciona como uma tabela de preços, mapeando tipos de transporte a seus custos por quilômetro.
const precos = {
    bicicleta: 0.75, // Preço por km para bicicleta.
    carro: 0.25,     // Preço por km para carro.
    drone: 1.00      // Preço por km para drone.
};

// Define uma rota de API do tipo POST no caminho '/calcularfrete'.
// A função de callback lida com a requisição (req) e a resposta (res).
app.post('/calcularfrete', (req, res) => {
    // Desestrutura o corpo da requisição para extrair 'distancia' e 'tipoTransporte'.
    const { distancia, tipoTransporte } = req.body;

    // Verifica se 'distancia' ou 'tipoTransporte' não foram fornecidos na requisição.
    if (distancia === undefined || tipoTransporte === undefined) {
        // Se faltar algum dado, retorna um erro 400 (Bad Request) com uma mensagem descritiva.
        return res.status(400).json({ error: 'Distância e tipo de transporte são obrigatórios.' });
    }

    // Busca o preço por km no objeto 'precos', convertendo o tipo de transporte para minúsculas.
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    // Verifica se o 'tipoTransporte' fornecido não existe na tabela de preços.
    if (precoPorKm === undefined) {
        // Se for inválido, retorna um erro 400 (Bad Request).
        return res.status(400).json({ error: 'Tipo de transporte inválido.' });
    }

    // Calcula o valor total do frete multiplicando a distância pelo preço por km.
    const valorTotal = distancia * precoPorKm;

    // Envia a resposta como um objeto JSON.
    // 'toFixed(2)' formata o valor total para ter exatamente duas casas decimais, ideal para valores monetários.
    res.json({ valorTotal: valorTotal.toFixed(2) });
});

// Inicia o servidor para que ele comece a escutar as requisições na porta especificada.
app.listen(PORT, () => {
    // Exibe uma mensagem no console quando o servidor está pronto para uso.
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});