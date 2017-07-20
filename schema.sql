Use Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quanity INTEGER(20),
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products
    VALUES 
    (1,'Mona Lisa',499.99,200);
	(2,'The Last Supper',699.00,400); 
    (3,'The Creation Of Adam',2000,10); 
    (4,'Starry Night',399.99,150);
	(5,'The Scream',299.00,20); 
    (6,'The Persistence Of Memory',199,50); 
    (7,'Girl With A Pearl Earring',99,800); 
    (8,'The Night Watch',159.99,200);
	(9,'Self-Portrait Without Beard',799.00,40); 
    (10,'Guernica',4000,5); 

