const express = require('express');
const app = express();

// Definindo um array de usuários com suas respectivas compras para simular um banco de dados
const users = [
  {
    id: 1,
    name: 'Usuário 1',
    purchases: [
      { id: 1, product: 'Produto 1', price: 10.99 },
      { id: 2, product: 'Produto 2', price: 20.99 },
    ],
  },
  {
    id: 2,
    name: 'Usuário 2',
    purchases: [
      { id: 3, product: 'Produto 3', price: 30.99 },
      { id: 4, product: 'Produto 4', price: 40.99 },
    ],
  },
  {
    id: 3,
    name: 'Usuário 3',
    purchases: [
      { id: 5, product: 'Produto 5', price: 50.99 },
    ],
  },
];

// Endpoint para recuperar as compras de um usuário específico com base no ID fornecido
app.get('/users/:id/purchases', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.status(200).json(user.purchases);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
