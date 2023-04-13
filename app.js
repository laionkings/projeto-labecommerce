const express = require('express');
const app = express();

// Definindo um array de produtos para simular um banco de dados
const products = [
  { id: 1, name: 'Produto 1', price: 10.99 },
  { id: 2, name: 'Produto 2', price: 20.99 },
  { id: 3, name: 'Produto 3', price: 30.99 },
];

// Endpoint para recuperar um produto específico com base no ID fornecido
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
