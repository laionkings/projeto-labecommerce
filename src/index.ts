import express, { Request, Response } from 'express';
import cors from 'cors';
import { accounts } from './database';
import { ACCOUNT_TYPE } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => console.log('Servidor rodando na porta 3003'));

app.get('/ping', (_, res: Response) => res.send('Pong!'));

app.get('/accounts', (_, res) => res.send(accounts));

app.get('/accounts/:id', (req, res) => {
  const result = accounts.find((account) => account.id === req.params.id);
  if (!result) return res.status(404).send('Conta não encontrada');
  res.status(200).send(result);
});

app.delete('/accounts/:id', (req, res) => {
  if (req.params.id[0] !== 'a') return res.status(400).send('Id inválido');
  const accountIndex = accounts.findIndex((account) => account.id === req.params.id);
  if (accountIndex === -1) return res.status(404).send('Conta não encontrada');
  accounts.splice(accountIndex, 1);
  res.status(200).send('Item deletado com sucesso');
});

app.put('/accounts/:id', (req, res) => {
  const { id, ownerName, balance, type } = req.body;
  const newId = id as string | undefined;
  const newOwnerName = ownerName as string | undefined;
  const newBalance = balance as number | undefined;
  const newType = type as ACCOUNT_TYPE | undefined;

  if (newBalance !== undefined) {
    if (typeof newBalance !== 'number' || newBalance < 0)
      return res.status(400).send('Balance deve ser um número maior ou igual a zero');
  }

  if (newType !== undefined) {
    if (![ACCOUNT_TYPE.BLACK, ACCOUNT_TYPE.GOLD, ACCOUNT_TYPE.PLATINUM].includes(newType))
      return res.status(400).send('Type deve ser um dos tipos válidos');
  }

  if (newId !== undefined && newId[0] !== 'a')
    return res.status(400).send('Id deve iniciar com a letra "a"');

  if (newOwnerName !== undefined && newOwnerName.length < 2)
    return res.status(400).send('Nome deve possuir pelo menos dois caracteres');

  const accountIndex = accounts.findIndex((account) => account.id === req.params.id);
  if (accountIndex === -1) return res.status(404).send('Conta não encontrada');

  const updatedAccount = {
    id: newId || req.params.id,
    ownerName: newOwnerName || accounts[accountIndex].ownerName,
    balance: newBalance || accounts[accountIndex].balance,
    type: newType || accounts[accountIndex].type,
  };

  accounts.splice(accountIndex, 1, updatedAccount);

  res.status(200).send(updatedAccount);
});

export default app;
