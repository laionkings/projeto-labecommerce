"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.a = exports.product = exports.user = void 0;
const types_1 = require("./types");
exports.user = [
{
id: "01",
email: "celular1@gmail.com.br",
password: "senha123"
},
{
id: "02",
email: "smartphone1@gmail.com.br",
password: "senha456"
}
];
exports.product = [
{
id: "01",
name: "celular",
price: 1000,
category: types_1.ProductCategory.ELETRONICO
},
{
id: "02",
name: "smartphone",
price: 1500,
category: types_1.ProductCategory.ELETRONICO
}
];
exports.a = [
{
userId: "01",
productId: "01",
quantity: 1,
totalPrice: 1000
},
{
userId: "02",
productId: "01",
quantity: 2,
totalPrice: 2000
}
];
function createUser(id, email, password) {
exports.user.push({ id, email, password });
return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
return exports.user;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
exports.product.push({ id, name, price, category });
return "Produto criado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts() {
return exports.product;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
return exports.product.find((prod) => prod.id === idToSearch);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
return exports.product.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()));
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
exports.a.push({ userId, productId, quantity, totalPrice });
return "Compra realizada com sucesso";
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
return exports.a.filter((purchase) => purchase.userId === userIdToSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
