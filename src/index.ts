import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (_: Request, res: Response) => {
  res.send('Pong!')
})

app.get('/accounts', (_: Request, res: Response) => {
  res.send(accounts)
})

app.get('/accounts/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = accounts.find((account) => account.id === id)

    if (!result) {
      res.status(404)
      throw new Error('Conta não encontrada')
    }

    res.status(200).send(result)
  } catch (err) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (err instanceof Error) {
      return res.send(err.message)
    }
    res.send('Erro inesperado')
  }
})

app.delete('/accounts/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (id[0] !== 'a') {
      res.status(400)
      throw new Error('Id inválido')
    }

    const accountIndex = accounts.findIndex((account) => account.id === id)

    if (accountIndex >= 0) {
      accounts.splice(accountIndex, 1)
    }

    res.status(200).send('Item deletado com sucesso')
  } catch (err) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (err instanceof Error) {
      return res.send(err.message)
    }
    res.send('Erro inesperado')
  }
})

app.put('/accounts/:id', (req: Request, res: Response) => {
  try {
    const idParams = req.params.id
    const { id, ownerName, balance, type } = req.body

    const newId = id as string | undefined
    const newOwnerName = ownerName as string | undefined
    const newBalance = balance as number | undefined
    const newType = type as ACCOUNT_TYPE | undefined
    

    if (newBalance !== undefined) {
      if (typeof newBalance !== 'number') {
        res.status(400)
        throw new Error('Balance deve ser do tipo number')
      }
      if (newBalance < 0) {
        res.status(400)
        throw new Error('Balance deve ser maior ou igual a zero')
      }
    }

    if (newType !== undefined) {
      if (
        newType !== ACCOUNT_TYPE.BLACK &&
        newType !== ACCOUNT_TYPE.GOLD &&
        newType !== ACCOUNT_TYPE.PLATINUM
      ) {
        res.status(400)
        throw new Error('Type deve ser um dos tipos válidos')
      }
    }

    if (newId !== undefined) {
      if (newId[0] !== 'a') {
        res.status(400)
        throw new Error('Id deve iniciar com a letra "a"')
      }
    }

    if (newOwnerName !== undefined) {
      if (newOwnerName.length < 2) {
        res.status(400)
        throw new Error('Nome deve possuir pelo menos dois caracteres')
      }
    }

    

    const account = accounts.find((account) => account.id === idParams)
    

    if (account) {
      account.id = newId || account.id
      account.ownerName = newOwnerName || account.ownerName
      account.type = newType || account.type
      account.balance = newBalance || account.balance 
    }

    res.status(200).send('Atualização realizada com sucesso')
  } catch (err) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (err instanceof Error) {
      return res.send(err.message)
    }
    res.send('Erro inesperado')
  }
})



