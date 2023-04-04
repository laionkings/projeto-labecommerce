-- Active: 1680526913553@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

CREATE TABLE
    products(
        id TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

 SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%monitor%';

SELECT * FROM products WHERE name LIKE '%search_term%';


INSERT INTO users (name, email, password) VALUES ('John Doe', 'johndoe@example.com', 'password123');


SELECT * FROM produtos WHERE id = 123;

DELETE FROM usuarios WHERE id = 456;


UPDATE usuarios SET nome = 'Novo Nome', email = 'novoemail@example.com' WHERE id = 456;

UPDATE produtos SET nome = 'Novo Nome', preco = 99.99 WHERE id = 123;

SELECT * FROM usuarios ORDER BY email ASC;

SELECT * FROM produtos ORDER BY price ASC LIMIT 20 OFFSET 0;


SELECT * FROM produtos WHERE price BETWEEN 100.00 AND 300.00 ORDER BY price ASC;


INSERT INTO
    users(id, email, password)
VALUES (
        "1",
        "git@gmail.com",
        "50493847"
    ), (
        "2",
        "poniter@gmail.com",
        "60433847),
    (" 3 ", " thunder @gmail.com ", " 49583455 ");

    
