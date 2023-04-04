app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users;';
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  

  app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products;';
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  