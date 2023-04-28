import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knexfile";
import {
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId,
} from "./database";
import { ProductCategory, TProduct, TPurchase, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

console.time();
console.log("Smartphone de qualidade");

console.table(getAllUsers());
console.table(getAllProducts());

console.log(createUser("03", "kingslaion@gmail.com", "laionpere"));
console.log(createProduct("03", "xiaomi", 800, ProductCategory.SMARTPHONE));
console.log(getProductById("03"));
console.log(queryProductsByName("xiaomi"));
console.log(createPurchase("01", "01", 2, 0.90));
console.log(getAllPurchasesFromUserId("02"));

console.timeEnd();

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await db<TUser>("users");
    res.status(200).send(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/products", async (_req: Request, res: Response) => {
  try {
    const products = await db<TProduct>("products");
    res.status(200).send(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q;
    const result = await db<TProduct>("products").where("name", "like", `%${q}%`);
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;
    if (typeof id !== "string") {
      throw new Error("'id' deve ser do tipo 'string'");
    }
    if (typeof email !== "string") {
      throw new Error("'email' deve ser do tipo 'string'");
    }
    if (typeof password !== "string") {
      throw new Error("'password' deve ser do tipo 'string'");
    }
    const idExist = await db<TUser>("users").where({ id });
    if (idExist.length > 0) {
      throw new Error("Já existe uma conta com esse id");
    }
    res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    if (typeof id !==
 "string") {
      throw new Error("'id' deve ser do tipo 'string'");
    }
    if (typeof name !== "string") {
      throw new Error("'name' deve ser do tipo 'string'");
    }
    if (typeof price !== "number") {
      throw new Error("'price' deve ser do tipo 'number'");
    }
    if (typeof description !== "string") {
      throw new Error("'description' deve ser do tipo 'string'");
    }
    const idExist = await db("products").select("*").where({ id });
    if (idExist.length > 0) {
      throw new Error("Já existe um produto com esse id");
    }
    await db("products").insert({ id, name, price, description, imageUrl });
    res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, totalPrice, createdAt, paid } = req.body;
    console.log(id, buyer, totalPrice, paid);
    if (!id || typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo 'string'");
    }
    if (isNaN(totalPrice)) {
      res.status(400);
      throw new Error("'o preço deve ser no formato de numeros'");
    }
    const idExist = await db.raw(`
          SELECT * FROM purchases WHERE id = "${id}";
        `);
    if (idExist.length) {
      res.status(400);
      throw new Error("Já existe um um produto com esse id");
    }
    const newPuchases = await db.raw(`
        INSERT INTO purchases(id, buyer, totalPrice, paid)
        VALUES ("${id}", "${buyer}", "${totalPrice}", "${paid}");`);
    res.status(201).send({ message: "Compra cadastrada com sucesso" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});


app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.raw('SELECT * FROM products WHERE id = ?', id);
    res.status(200).send(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



app.get("/users/:id/purchases", async (req, res) => {
  const userId = req.params.id;
  try {
    const userPurchases = await db.raw(`
      SELECT *
      FROM purchases
      WHERE buyer = '${userId}'
    `);
    res.status(200).send(userPurchases[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.select("*").from("users");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.select("*").from("products");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.name;
    const result = await db
      .select("*")
      .from("products")
      .where("name", "LIKE", `%${q}%`);
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});



app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(`Buscando informações da compra ${id}`);    
    const purchase = await db("purchases")
    .where({ id })
    .first();
    if (!purchase) {
      return res.status(404).send("Compra não encontrada");
    }    
    const buyer = await db("users")
    .where({ id: purchase.buyer })
    .first();
    if (!buyer) {
      return res.status(404).send("Comprador não encontrado");
    }    
    const products = await db("products")
      .join(
        "purchases_products",
        "purchases_products.product_id",
        "products.id"
      )
      .where("purchases_products.purchase_id", id);
    console.log(`Produtos encontrados: ${JSON.stringify(products)}`);    
    const infoPurchaseUser = {
      purchase_id: purchase.id,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      isPaid: purchase.paid,
      buyerId: buyer.id,
      email: buyer.email,
      name: buyer.name,
      productsList: products
    };
    res.status(200).send(infoPurchaseUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});


app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageUrl } = req.body;
    const updatedProduct = await db("products")
      .where({ id })
      .update({ name, price, description, imageUrl });
    if (updatedProduct === 0) {
      return res.status(404).send("Produto não encontrado");
    }
    res.status(200).send({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});


  app.delete('/purchases/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db('purchases')
        .where({ id })
        .del();
  
      if (result === 1) {
        res.status(200).send({ message: 'Pedido cancelado com sucesso' });
      } else {
        res.status(404).send({ error: 'Compra não encontrada' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Erro ao excluir compra' });
    }
  });
