USE lab;

SET NAMES 'utf8';

-- Drop tables

DROP TABLE IF EXISTS items2category;
DROP TABLE IF EXISTS items2shelf;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS shelf;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS returned;
DROP TABLE IF EXISTS returnedAccepted;
DROP TABLE IF EXISTS reserve;

--
-- Create table: items
--
CREATE TABLE items
(
    id VARCHAR(200) NOT NULL,
    amount INT NOT NULL,
    picturelink VARCHAR(50),
    description VARCHAR(300),
    productcode VARCHAR(50),
    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



DROP PROCEDURE IF EXISTS add_to_lab;
DELIMITER ;;
CREATE PROCEDURE add_to_lab(
    a_id VARCHAR(200),
    a_amount INT,
    a_picturelink VARCHAR(50),
    a_description VARCHAR(300),
    a_productcode VARCHAR(50),
    a_category_id VARCHAR(200),
    a_shelf_place VARCHAR(150),
    a_shelf_amount INT
)
BEGIN
    INSERT INTO items(id, amount, picturelink, description, productcode)
        VALUES(a_id, a_amount, a_picturelink, a_description, a_productcode);
    INSERT INTO items2category(itemsID, categoryId)
        SELECT a_id,a_category_id FROM Dual WHERE a_id=a_id;
    INSERT INTO items2shelf(itemsID, place, amount)
        SELECT a_id, a_shelf_place, a_shelf_amount FROM Dual WHERE a_id=a_id;
    COMMIT;
END
;;
DELIMITER ;



--
--
DROP PROCEDURE IF EXISTS modify_an_item;
DELIMITER ;;
CREATE PROCEDURE modify_an_item(
    a_id VARCHAR(200),
    a_amount INT,
    a_picturelink VARCHAR(50),
    a_description VARCHAR(300),
    a_productcode VARCHAR(50),
    a_category_id VARCHAR(200),
    a_shelf_place VARCHAR(150),
    a_shelf_amount INT
)
BEGIN
UPDATE items a 
    LEFT JOIN items2category b ON (a.id = b.itemsId)
    LEFT JOIN items2shelf c ON (a.id = c.itemsId)
    LEFT JOIN category ca ON (ca.id = b.categoryId)
SET
  a.amount = a_amount, a.picturelink = a_picturelink, a.description = a_description, a.productcode = a_productcode,
  b.categoryId = a_category_id,
  c.place = a_shelf_place, c.amount = a_shelf_amount
WHERE a.id = a_id AND b.itemsId = a_id AND c.itemsId = a_id;
END
;;
DELIMITER ;

-- CALL modify_an_item("fas", 1, "/img/lab/drone.png", "test modifying items", "5212", "CD", "C:111", 3);



--
-- Create table: users
--
CREATE TABLE users
(
    id  INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    `created` Date NOT NULL,
    address VARCHAR(80) NOT NULL,
    postnumber VARCHAR(100) NOT NULL,
    city VARCHAR(25) NOT NULL,
    country VARCHAR(20) NOT NULL,
    phonenumber VARCHAR(15) NOT NULL,
    birthday DATE,
    role VARCHAR(100) DEFAULT "user",
    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;


--
-- Create table: orders
--
CREATE TABLE orders
(
    id INT NOT NULL AUTO_INCREMENT,
    itemsId VARCHAR(200) NOT NULL,
    userId INT NOT NULL,
    amount INT DEFAULT 1,
    createds TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    reserved TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    orderd  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returnedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    delivered TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (itemsId) REFERENCES items(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: category
--
CREATE TABLE category
(
    id VARCHAR(200) NOT NULL,

    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: shelf
--
CREATE TABLE shelf
(
    id VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: items2category
--
CREATE TABLE items2category
(
    itemsId VARCHAR(200) NOT NULL,
    categoryId VARCHAR(200) NOT NULL,
    FOREIGN KEY (itemsId) REFERENCES items(id),
    FOREIGN KEY (categoryId) REFERENCES category(id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: items2shelf
--
CREATE TABLE items2shelf
(
    itemsId VARCHAR(100) NOT NULL,
    place VARCHAR(150) NOT NULL,
    amount INT,
    FOREIGN KEY (itemsId) REFERENCES items(id),
    FOREIGN KEY (place) REFERENCES shelf(id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: invoice
--
CREATE TABLE invoice
(
    invoicenumber INT NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL ,
    itemsId VARCHAR(200) NOT NULL,
    userId INT NOT NULL,
    delivered TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status boolean default false,
    returned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT DEFAULT 1,
    PRIMARY KEY (invoicenumber)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: reserve
--
CREATE TABLE reserve
(
    reserveid INT NOT NULL AUTO_INCREMENT,
    itemsId VARCHAR(200) NOT NULL,
    userId INT NOT NULL,
    reservedate TIMESTAMP DEFAULT NULL,
    reservequeue INT DEFAULT 0,
    PRIMARY KEY (reserveid)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: returned
--
CREATE TABLE returned
(
    id INT NOT NULL AUTO_INCREMENT,
    invoicenumber INT NOT NULL,
    orderId INT NOT NULL ,
    itemsId VARCHAR(200) NOT NULL,
    userId INT NOT NULL,
    delivered TIMESTAMP DEFAULT NULL,
    returndate TIMESTAMP DEFAULT NULL,
    returnedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status boolean default false,
    amount INT DEFAULT 1,
    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



--
-- Create table: returnedAccepted
--
CREATE TABLE returnedAccepted
(
    id INT NOT NULL AUTO_INCREMENT,
    invoicenumber INT NOT NULL,
    orderId INT NOT NULL ,
    itemsId VARCHAR(200) NOT NULL,
    userId INT NOT NULL,
    delivered TIMESTAMP DEFAULT NULL,
    returndate TIMESTAMP DEFAULT NULL,
    returnedAt TIMESTAMP DEFAULT NULL,
    status boolean default false,
    amount INT DEFAULT 1,
    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



-- change users roles
DROP PROCEDURE IF EXISTS change_user_role;
DELIMITER ;;
CREATE PROCEDURE change_user_role(
    a_email VARCHAR(200),
    a_role VARCHAR(100)
)
BEGIN
UPDATE users AS u
SET u.role = a_role where u.email = a_email  AND u.role != "admin";
END
;;
DELIMITER ;
-- CALL change_user_role("labmanagement2020@gmail.com", "admin");



-- deletes users
DROP PROCEDURE IF EXISTS delete_user;
DELIMITER ;;
CREATE PROCEDURE delete_user(
    a_id INT
)
BEGIN
DELETE FROM users AS u where  u.id = a_id AND u.role != "admin";
END
;;
DELIMITER ;
-- CALL delete_user(2);



--
-- Create procedure for show_item_from_category
--
DROP PROCEDURE IF EXISTS show_item_from_category;
DELIMITER ;;
CREATE PROCEDURE show_item_from_category(
    aid CHAR(20)
)
BEGIN
    SELECT itemsId FROM items2category
    WHERE `categoryId` = aid;
END
;;
DELIMITER ;

-- CALL show_item_from_category("Drones");



-- Show the products
DROP PROCEDURE IF EXISTS show_all_items_information;
DELIMITER ;;
CREATE PROCEDURE show_all_items_information()
BEGIN
    SELECT
        i.id AS id,
        GROUP_CONCAT(i_c.categoryId) AS category,
        i.amount AS totalAmount,
        i.picturelink AS picturelink,
        i.description AS description,
        i.productcode AS productcode,
        i_s.amount AS shelfAmount,
        i_s.place AS place
    FROM items AS i
        LEFT JOIN items2shelf AS i_s
            ON i.id = i_s.itemsId
        LEFT JOIN items2category AS i_c
            ON i.id = i_c.itemsId
    GROUP BY i.id
;
END
;;
DELIMITER ;
CALL show_all_items_information();



--
-- Create procedure for show_item_from_items
--
DROP PROCEDURE IF EXISTS show_item_from_items;
DELIMITER ;;
CREATE PROCEDURE show_item_from_items(
    aid CHAR(50)
)
BEGIN
     SELECT
        i.id AS id,
        GROUP_CONCAT(i_c.categoryId) AS category,
        i.amount AS totalAmount,
        i.picturelink AS picturelink,
        i.description AS description,
        i.productcode AS productcode,
        i_s.amount AS shelfAmount,
        i_s.place AS place
    FROM items AS i
        LEFT JOIN items2shelf AS i_s
            ON i.id = i_s.itemsId
        LEFT JOIN items2category AS i_c
            ON i.id = i_c.itemsId
    WHERE i.id = aid;
END
;;
DELIMITER ;
-- CALL show_item_from_items("Minecraft");



--
-- Function to show order status
--
DROP FUNCTION IF EXISTS order_status;
DELIMITER ;;
CREATE FUNCTION order_status(
    createds TIMESTAMP,
    updated TIMESTAMP,
    reserved TIMESTAMP,
    deleted TIMESTAMP,
    orderd  TIMESTAMP,
    delivered TIMESTAMP
)
RETURNS VARCHAR(20)
NOT DETERMINISTIC NO SQL
BEGIN
    IF delivered IS NOT NULL THEN
    RETURN "deliverd";
    ELSEIF orderd IS NOT NULL THEN
    RETURN "orderd";
    ELSEIF deleted IS NOT NULL THEN
    RETURN "deleted";
    ELSEIF reserved IS NOT NULL THEN
    RETURN "reserved";
    ELSEIF updated != createds THEN
    RETURN "updated";
    END IF;
    RETURN "createds";
END
;;
DELIMITER ;



--
-- Shows all orders for one user
--
DROP PROCEDURE IF EXISTS show_orders_by_userId;
DELIMITER ;;
CREATE PROCEDURE show_orders_by_userId(
    aid INT
)
BEGIN
SELECT *, o.id AS order_id,
        order_status(createds, updated, reserved, deleted, orderd, delivered) AS status,
        o.amount AS orderAmount,
        GROUP_CONCAT(i_c.categoryId) AS category,
        i.amount AS totalAmount,
        i.id AS productname,
        i.picturelink AS picturelink,
        i.description AS description,
        i.productcode AS productcode,
        i_s.amount AS shelfAmount,
        i_s.place AS place
        FROM items AS i
            LEFT JOIN orders AS o
                ON i.id = o.itemsId
            LEFT JOIN items2shelf AS i_s
                ON i.id = i_s.itemsId
            LEFT JOIN items2category AS i_c
                ON i.id = i_c.itemsId
            LEFT JOIN users AS u
                on o.userId = u.id
        WHERE u.id = aid
        GROUP BY order_id
        ORDER BY order_id DESC;
END
;;
DELIMITER ;
CALL show_orders_by_userId(2);



--
-- Shows all orders
--
DROP PROCEDURE IF EXISTS show_orders;
DELIMITER ;;
CREATE PROCEDURE show_orders()
BEGIN
SELECT *, o.id AS order_id,
        order_status(createds, updated, reserved, deleted, orderd, delivered) AS status,
        o.amount AS orderAmount
        FROM orders AS o
        INNER JOIN users AS u
        ON u.id = o.userId
        GROUP BY order_id
        ORDER BY u.first_name DESC;
END
;;
DELIMITER ;
-- CALL show_orders();



--
-- PROCEDURE to create an order
--
DROP PROCEDURE IF EXISTS create_order;
DELIMITER ;;
CREATE PROCEDURE create_order(
    a_item_id VARCHAR(100),
    a_user_id INT
)
BEGIN
    UPDATE orders AS r
    INNER JOIN users AS s
    ON s.id = r.userId
    SET r.createds = NOW(), r.orderd = NOW() WHERE s.id = a_user_id;
    INSERT INTO orders(itemsId, userId) VALUES(a_item_id, a_user_id);
END
;;
DELIMITER ;
-- CALL create_order("Total Website Creator 3 in 1", 3);



--
-- PROCEDURE to create a reserve
--
DROP PROCEDURE IF EXISTS create_a_reserve;
DELIMITER ;;
CREATE PROCEDURE create_a_reserve(
    a_item_id VARCHAR(100),
    a_user_id INT
)
BEGIN
    INSERT INTO reserve(itemsId, userId, reservedate, reservequeue) 
    values
    (
        a_item_id,
        a_user_id,
        (null),
        (reservequeue)
    );

    UPDATE reserve AS re
    INNER JOIN items AS i
        ON i.id = re.itemsId
    SET re.reservedate = NOW()
    WHERE re.userId = a_user_id and re.itemsId = a_item_id;


    IF EXISTS((select re.reservedate = NOW() from reserve as re WHERE re.itemsId = a_item_id)) THEN
    UPDATE reserve AS re
    SET re.reservequeue = re.reservequeue + 1
    WHERE re.itemsId = a_item_id;
    END IF ;

END
;;
DELIMITER ;
-- CALL create_a_reserve("Drone v30", 5);



--
-- Shows reserves by user id
--
DROP PROCEDURE IF EXISTS show_reservations_by_user_id;
DELIMITER ;;
CREATE PROCEDURE show_reservations_by_user_id(
    a_user_id INT
)
BEGIN
SELECT
    re.reserveid as reserveid,
    re.itemsId as itemsId,
    re.userId as userId,
    u.email as email,
    re.reservedate as reservedate,
    re.reservequeue as reservequeue
    FROM reserve AS re
    INNER JOIN users AS u
    ON u.id = re.userId
    WHERE u.id = a_user_id;
END
;;
DELIMITER ;
-- CALL show_reservations_by_user_id(5);



--
-- PROCEDURE to delete an order by order id
--
DROP PROCEDURE IF EXISTS delete_an_order;
DELIMITER ;;
CREATE PROCEDURE delete_an_order(
    a_id INT
)
BEGIN
    UPDATE orders AS r
    INNER JOIN users AS s
    ON s.id = r.userId
    SET r.deleted = NOW() WHERE s.id = a_id;

    DELETE FROM orders
    WHERE id = a_id;
END
;;
DELIMITER ;
-- CALL delete_an_order(80);



--
-- PROCEDURE to show the current user id
--
DROP PROCEDURE IF EXISTS show_current_user;
DELIMITER ;;
CREATE PROCEDURE show_current_user(
    a_user_email VARCHAR(100)
)
BEGIN
    SELECT id from users
    WHERE email = a_user_email;
END
;;
DELIMITER ;
-- CALL show_current_user("labmanagement2020@gmail.com");



DROP PROCEDURE IF EXISTS delete_an_item;
DELIMITER ;;
CREATE PROCEDURE delete_an_item(
    a_id VARCHAR(200)
)
BEGIN
    DELETE FROM items2category WHERE EXISTS (SELECT*
    FROM items
    WHERE items.id = items2category.itemsId);
    DELETE FROM items2shelf WHERE EXISTS (SELECT*
    FROM items
    WHERE items.id = items2shelf.itemsId);
    DELETE FROM orders WHERE EXISTS (SELECT*
    FROM items
    WHERE items.id = orders.itemsId);
    DELETE FROM items
    WHERE
        id = a_id;
END
;;
DELIMITER ;
-- CALL delete_an_item("C");
-- SHOW WARNINGS;



DROP PROCEDURE IF EXISTS search_items;
DELIMITER ;;
CREATE PROCEDURE search_items(
    search VARCHAR (200)
)
BEGIN
        SELECT * FROM items
        WHERE id LIKE search;
END
;;
DELIMITER ;
-- CALL search_items("Total Website Creator 3 in 1");
-- SHOW WARNINGS;



DROP PROCEDURE IF EXISTS ship_the_ordered_items;
DELIMITER ;;
CREATE PROCEDURE ship_the_ordered_items(
    a_user_id INT
)
BEGIN
UPDATE orders AS o
    INNER JOIN users AS u
    ON u.id = o.userId
SET o.delivered = NOW() WHERE u.id = a_user_id;

INSERT INTO invoice(orderId, itemsId, userId, delivered, amount)
    SELECT o.id AS orderId,
        o.itemsId as itemsId,
        u.id as userId,
        o.delivered as delivered,
        o.amount as amount
    FROM orders AS o
        LEFT JOIN users AS u
        ON  u.id = o.userId
    WHERE  o.userId = a_user_id;


    UPDATE orders AS o
        INNER JOIN items AS i
        ON i.id = o.itemsId
    SET i.amount = IF(i.amount > 0, i.amount - 1, i.amount)
    WHERE o.userId = a_user_id;

DELETE FROM orders where userId = a_user_id;
END
;;
DELIMITER ;
-- CALL ship_the_ordered_items(1);



--
-- Shows orders by user id
--
DROP PROCEDURE IF EXISTS show_specific_order;
DELIMITER ;;
CREATE PROCEDURE show_specific_order(
    a_user_id INT
)
BEGIN
SELECT *, o.id AS order_id FROM orders AS o
    INNER JOIN users AS u
    ON u.id = o.userId
    WHERE u.id = a_user_id;
END
;;
DELIMITER ;
-- CALL show_specific_order(1);



--
-- Shows orders by user id
--
DROP PROCEDURE IF EXISTS show_specific_invoice;
DELIMITER ;;
CREATE PROCEDURE show_specific_invoice(
    a_user_id INT
)
BEGIN
SELECT 
    i.invoicenumber as invoicenumber,
    i.amount as amount,
    i.orderId as orderId,
    i.userId as userId,
    u.email as email,
    i.itemsId as itemsId,
    i.delivered as delivered,
    DATE_ADD(i.delivered, INTERVAL 30 DAY) AS returndate
    
     FROM invoice AS i
    INNER JOIN users AS u
    ON u.id = i.userId
    WHERE u.id = a_user_id;
END
;;
DELIMITER ;
-- CALL show_specific_invoice(10);



--
-- Shows orders by user id
--
DROP PROCEDURE IF EXISTS show_all_invoices;
DELIMITER ;;
CREATE PROCEDURE show_all_invoices()
BEGIN
SELECT 
    i.invoicenumber as invoicenumber,
    i.amount as amount,
    i.orderId as orderId,
    i.userId as userId,
    u.email as email,
    u.first_name as first_name,
    u.last_name as last_name,
    i.itemsId as itemsId,
    i.delivered as delivered,
    DATE_ADD(i.delivered, INTERVAL 30 DAY) AS returndate
    FROM invoice AS i
        INNER JOIN users AS u
            ON u.id = i.userId;
END
;;
DELIMITER ;
-- CALL show_all_invoices();



DROP PROCEDURE IF EXISTS invoice_to_return_table;
DELIMITER ;;
CREATE PROCEDURE invoice_to_return_table(
    a_invoice_number INT
)
BEGIN
INSERT INTO returned(invoicenumber, orderId, itemsId, userId, delivered, returndate, returnedAt, status, amount)
    SELECT i.invoicenumber AS invoicenumber,
        i.orderId AS orderId,
        i.itemsId as itemsId,
        i.userId as userId,
        i.delivered as delivered,
        DATE_ADD(i.delivered, INTERVAL 30 DAY) AS returndate,
        i.returned as returnedAt,
        i.status as status,
        i.amount as amount
    FROM invoice AS i
    WHERE  i.invoicenumber = a_invoice_number;

UPDATE returned AS r
SET r.returnedAt = NOW() WHERE r.invoicenumber = a_invoice_number;

DELETE FROM invoice where invoicenumber = a_invoice_number;
END
;;
DELIMITER ;
-- CALL invoice_to_return_table(3);



DROP PROCEDURE IF EXISTS accept_returned_item;
DELIMITER ;;
CREATE PROCEDURE accept_returned_item(
    a_invoice_id INT,
    a_status INT
)
BEGIN
UPDATE returned AS r
SET r.status = a_status WHERE r.id= a_invoice_id;
    IF EXISTS(SELECT r.status FROM returned as r WHERE (r.status = 1 and r.id = a_invoice_id)) THEN
    UPDATE returned AS inv
        INNER JOIN items AS i
        ON i.id = inv.itemsId
    SET i.amount = i.amount + 1
    WHERE inv.id = a_invoice_id;

INSERT INTO returnedAccepted(invoicenumber, orderId, itemsId, userId, delivered, returndate, returnedAt, status, amount)
    SELECT i.invoicenumber AS invoicenumber,
        i.orderId AS orderId,
        i.itemsId as itemsId,
        i.userId as userId,
        i.delivered as delivered,
        i.returndate as returndate,
        i.returnedAt as returnedAt,
        i.status as status,
        i.amount as amount
    FROM returned AS i
        WHERE  i.id = a_invoice_id;

    DELETE FROM returned where id = a_invoice_id;

END IF;
END
;;
DELIMITER ;
-- CALL accept_returned_item(53,1);



--
-- Shows returned items by returned id
--
DROP PROCEDURE IF EXISTS show_all_returns_with_details_by_id;
DELIMITER ;;
CREATE PROCEDURE show_all_returns_with_details_by_id(
    a_id INT
)
BEGIN
SELECT
    r.id as id,
    r.invoicenumber as invoicenumber,
    r.amount as amount,
    r.orderId as orderId,
    r.userId as userId,
    u.email as email,
    u.first_name as first_name,
    u.last_name as last_name,
    r.itemsId as itemsId,
    r.delivered as delivered,
    r.returndate as returndate,
    r.returnedAt as returnedAt
    FROM returned AS r
        INNER JOIN users AS u
            ON u.id = r.userId
        where r.id = a_id;
END
;;
DELIMITER ;
-- CALL show_all_returns_with_details_by_id(68);



--
-- Shows returned items
--
DROP PROCEDURE IF EXISTS show_all_returns_with_details;
DELIMITER ;;
CREATE PROCEDURE show_all_returns_with_details()
BEGIN
SELECT 
    r.id as id,
    r.invoicenumber as invoicenumber,
    r.amount as amount,
    r.orderId as orderId,
    r.userId as userId,
    u.email as email,
    u.first_name as first_name,
    u.last_name as last_name,
    r.itemsId as itemsId,
    r.delivered as delivered,
    r.returndate as returndate,
    r.returnedAt as returnedAt
    FROM returned AS r
        INNER JOIN users AS u
        ON u.id = r.userId;
END
;;
DELIMITER ;
-- CALL show_all_returns_with_details();



--
-- Shows orders by user id
--
DROP PROCEDURE IF EXISTS show_all_accepted_returns_with_details;
DELIMITER ;;
CREATE PROCEDURE show_all_accepted_returns_with_details()
BEGIN
SELECT 
    r.id as id,
    r.invoicenumber as invoicenumber,
    r.amount as amount,
    r.orderId as orderId,
    r.userId as userId,
    u.email as email,
    u.first_name as first_name,
    u.last_name as last_name,
    r.itemsId as itemsId,
    r.delivered as delivered,
    r.returndate as returndate,
    r.returnedAt as returnedAt
    FROM returnedAccepted AS r
        INNER JOIN users AS u
        ON u.id = r.userId;
END
;;
DELIMITER ;
-- CALL show_all_accepted_returns_with_details();
