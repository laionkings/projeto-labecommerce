-- Active: 1680631140961@@127.0.0.1@3306
-- CREATE TABLES
CREATE TABLE users (
id TEXT PRIMARY KEY NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE products(
id TEXT NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL
);

CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT NOT NULL REFERENCES users(id)
);

CREATE TABLE purchases_products (
purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
PRIMARY KEY (purchase_id, product_id)
);

CREATE TABLE customers (
id TEXT PRIMARY KEY,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
address TEXT,
payment_info TEXT
);

CREATE TABLE produtos (
id INT PRIMARY KEY,
nome TEXT,
preco FLOAT
);

CREATE TABLE usuarios (
id INT PRIMARY KEY,
nome TEXT,
email TEXT,
senha TEXT
);

CREATE TABLE pedidos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
usuario_id INTEGER NOT NULL,
data_pedido DATE NOT NULL,
preco_total DECIMAL(10, 2) NOT NULL
);

-- INSERT DATA
INSERT INTO
users (id, email, password)
VALUES (
'1',
'johndoe@example.com',
'password123'
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('c001', 'p001', 5),
('c001', 'p002', 3),
('c002', 'p002', 2),
('c002', 'p003', 1),
('c003', 'p001', 2),
('c003', 'p003', 4);

INSERT INTO purchases (
id,
total_price,
paid,
delivered_at,
buyer_id
) VALUES (
'c001',
99.99,
1,
'2023-04-10T15:30:00Z',
'1'
);

INSERT INTO customers (id, name, email, address, payment_info)
VALUES (
'1',
'John Smith',
'johnsmith@example.com',
'123 Main St, Anytown USA',
'Visa ending in 1234'
);

INSERT INTO
produtos (id, nome, preco)
VALUES (
123,
'Produto de exemplo',
19.99
);

INSERT INTO usuarios (
id,
nome,
email,
senha
) VALUES (
1,
'João',
'joao@example.com',
'senha123'
);

INSERT INTO
pedidos (
usuario_id,
data_pedido,
preco_total
)
VALUES
(1, '2023-04-01', 123.45),
(1, '2023-04-02', 78.90),
(2, '2023-04-02', 167.89),
(2, '2023-04-03', 54.32),
(3, '2023-04-03', 99.99),
(3, '2023-04-04', 149.50),
(4, '2023-04-04', 87.60),
(4, '2023-04-05', 189.75);

-- SELECT DATA
SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM purchases;