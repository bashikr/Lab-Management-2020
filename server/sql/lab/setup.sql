DROP DATABASE IF EXISTS lab;

CREATE DATABASE IF NOT EXISTS lab;

USE lab;

SHOW DATABASES LIKE "%lab%";


CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'pass';

GRANT ALL PRIVILEGES ON lab.* TO 'user'@'%';


SHOW GRANTS FOR 'user'@'%';

-- SET foreign_key_checks = 1;
