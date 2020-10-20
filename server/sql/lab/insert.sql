USE lab;

DELETE FROM category;
DELETE FROM shelf;
DELETE FROM items2category;

SET NAMES 'utf8';

SET FOREIGN_KEY_CHECKS=0;
--
-- Enable LOAD DATA LOCAL INFILE on the server.
--
SET GLOBAL local_infile = 1;
SHOW VARIABLES LIKE 'local_infile';



--
-- Insert into category.
--
LOAD DATA LOCAL INFILE '03_category.csv'
INTO TABLE category
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

SELECT * FROM category;



--
-- Insert into shelf.
--
LOAD DATA LOCAL INFILE '04_shelf.csv'
INTO TABLE shelf
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;
SELECT * FROM shelf;



--
-- Insert into items2category.
--
LOAD DATA LOCAL INFILE '05_items2category.csv'
INTO TABLE items2category
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES

(itemsId, categoryId)
;
SELECT * FROM items2category;



CALL add_to_lab("Statistic dataanalys", 5, "/img/lab/book.png", "This book is very good for programming", "5522", "DVD", "C:101", 4);
CALL add_to_lab("Drone V60", 2, "/img/lab/drone.png", "This is a modern drone from the fifth generation", "jf", "Drones", "A:101", 4);
CALL add_to_lab("Raspberry PI 4", 20, "/img/lab/raspberry.png", "Raspberry Pi 4 is the very useful for programmers", "3", "RaspberryPi", "B:101", 4);
