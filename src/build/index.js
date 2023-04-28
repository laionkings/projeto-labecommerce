"use strict";
let __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
console.time();
console.log("Smartphones tops de linha");
console.table(database_1.user);
console.table(database_1.product);
console.log((0, database_1.createUser)("03", "kingslaion@gmail.com", "kings102030"));
console.table((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("03", "iPhone 13", 7999.99, types_1.ProductCategory.SMARTPHONE));
console.table((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)("03"));
console.log((0, database_1.queryProductsByName)("Samsung"));
console.log((0, database_1.createPurchase)("01", "01", 1, 7999.99));
console.log((0, database_1.getAllPurchasesFromUserId)("01"));
console.timeEnd();
app.listen(3003, () => {
console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
res.send("Pong!");
});
app.get('/users', (req, res) => {
res.status(200).send(database_1.user);
});
app.get('/products', (req, res) => {
res.status(200).send(database_1.product);
});
app.get('/products/search', (req, res) => {
const q = req.query.q;
const result = database_1.product.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
res.status(200).send(result);
});
app.post('/purchase', (req, res) => {
const userId = req.body.userId;
const productId = req.body.productId;
const quantity = req.body.quantity;
const totalPrice = req.body.totalPrice;
const newPurchase = {
userId,
productId,
quantity,
totalPrice
};
database_1.purchase.push(newPurchase);
res.status(201).send("Compra realizada com sucesso");
});
app.post('/users', (req, res) => {
const id = req.body.id;
const email = req.body.email;
const password = req.body.password;
const newUser = {
id,
email,
password
};
database_1.user.push(newUser);
res.status(201).send("Cadastro realizado com sucesso");
});
app.post('/products', (req, res) => {
const id = req.body.id;
const name = req.body.name;
const price = req.body.price;
const category = req.body.category;
const newProduct = {
id,
name,
price,
category
};
database_1.product.push(newProduct);
res.status(201).send("Produto cadastrado com sucesso");
});
