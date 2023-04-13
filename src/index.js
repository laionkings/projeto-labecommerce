const express = require('express');
const db = require('./models/db');

const app = express();

app.get('/:resource', async (req, res) => {
  try {
    const resource = req.params.resource;
    const data = await db(resource).select('*');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
