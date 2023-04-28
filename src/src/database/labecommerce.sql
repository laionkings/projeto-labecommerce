-- Active: 1682691462783@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
);



CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
('Pr04', "iPhone 13", 5999.00, "SMARTPHONES"),
('Pr05', "Samsung Galaxy S21", 3999.00, "SMARTPHONES"),
('Pr06', "Xiaomi Redmi Note 10", 1399.00, "SMARTPHONES"),
('Pr07', "Motorola Moto G9", 899.00, "SMARTPHONES"),
('Pr08', "OnePlus 9 Pro", 4999.00, "SMARTPHONES");



SELECT * FROM users;


SELECT * FROM products;


SELECT * FROM products
WHERE name LIKE "%O";



INSERT INTO users (id, email, password)
VALUES ('04', "kingslaion@gmail.com", "102030prod");



INSERT INTO products (id, name, price, category)
VALUES ('09', "samsungpro", 3000, "galaxy");



SELECT * FROM products
WHERE id = 08;



DELETE FROM users
WHERE id = '05';


DELETE FROM products
WHERE id = '08';



UPDATE users SET password = "102030galaxy" WHERE id = '04';



UPDATE products SET name  = "samsung", category ="Smartphones" WHERE id = '08';


SELECT * FROM users
ORDER BY email ASC;



SELECT * FROM products
ORDER BY price ASC
LIMIT 20;



SELECT * FROM products
WHERE price >= 0.90 AND price <= 5.00
ORDER BY price ASC;



CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);



UPDATE purchases
SET delivered_at = datetime('now', 'localtime')
WHERE id = 'Pu01';


SELECT 
purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at,
users.id AS buyer_email
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;



CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id)
    REFERENCES purchases (id),
    FOREIGN KEY (product_id) 
    REFERENCES products (id)
);


SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;



INSERT INTO users (id, name, email, password) VALUES 
('Us001', 'Carlos', 'carlos@gmail.com', 'carlos102030'),
('Us002', 'Antonio', 'antonio@gmail.com', 'antonio102030'),
('Us003', 'Felipe', 'felipe@gmail.com', 'felipe102030');

SELECT * FROM users;
DROP TABLE users;


CREATE Table products(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL UNIQUE,
price REAL NOT NULL,
description TEXT NOT NULL,
imageUrl TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, imageUrl) VALUES 
('Pr004', 'IPHONE', 3500.00, 'O iPhone é um smartphone desenvolvido pela Apple Inc.', 'https://cdn.pixabay.com/photo/2016/06/30/17/39/iphone-1484663_960_720.jpg'),
('Pr005', 'SAMSUNG GALAXY', 2800.00, 'O Samsung Galaxy é uma linha de smartphones desenvolvida pela Samsung Electronics.', 'https://cdn.pixabay.com/photo/2015/02/01/00/46/samsung-619154_960_720.jpg'),
('Pr006', 'MOTOROLA MOTO G', 1200.00, 'O Motorola Moto G é um smartphone desenvolvido pela Motorola Mobility.', 'https://cdn.pixabay.com/photo/2017/09/06/17/54/motorola-moto-g-2724176_960_720.jpg'),
('Pr007', 'XIAOMI REDMI', 1800.00, 'O Xiaomi Redmi é uma linha de smartphones desenvolvida pela Xiaomi Corporation.', 'https://cdn.pixabay.com/photo/2018/08/08/19/20/xiaomi-redmi-3590962_960_720.jpg'),
('Pr008', 'LG VELVET', 2000.00, 'O LG Velvet é um smartphone desenvolvido pela LG Electronics.', 'https://cdn.pixabay.com/photo/2021/01/31/22/28/lg-velvet-5969303_960_720.jpg');

SELECT * FROM products;
DROP TABLE products;
--Recriando a tabela Purchases
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime()),
    paid INTEGER NOT NULL DEFAULT '0',
    FOREIGN KEY (buyer) REFERENCES users(id)
);

SELECT * FROM purchases;
DROP TABLE purchases;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT '1',
    FOREIGN KEY (purchase_id) 
    REFERENCES purchases(id),
    FOREIGN KEY (product_id) 
    REFERENCES products(id)
);


DROP TABLE purchases_products;