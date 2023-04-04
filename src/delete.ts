import express, { Request, Response } from 'express';

const app = express();

// Exclusão de Usuário
app.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  // Implemente o código para excluir o usuário com o ID fornecido
  res.status(200).send('User apagado com sucesso');
});

// Exclusão de Produto
app.delete('/products/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  // Implemente o código para excluir o produto com o ID fornecido
  res.status(200).send('Produto apagado com sucesso');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
