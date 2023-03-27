function buscarCarrosPorMarca(frota, marca) {
    if (marca === undefined) {
      return frota
    }
  
    return frota.filter(
      (carro) => {
        return carro.marca === marca
      }
    )
  }

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.listen(port, () => {
  console.log(`Servidor rodando na porta de conexão ${port}.`)
})
