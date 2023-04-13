module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mydatabase'
    }
  }
  

const express = require('express')
const db = require('./models/db')

const app = express()

app.get('/product/search', async (req, res) => {
  try {
    const query = req.query.q
    const products = await db('products').where('name', 'like', `%${query}%`)
    res.status(200).json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
