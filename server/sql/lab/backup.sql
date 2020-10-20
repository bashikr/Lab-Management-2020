-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lab
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `lab`
--

/*!40000 DROP DATABASE IF EXISTS `lab`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lab` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `lab`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Book'),('CD'),('Computer'),('Drones'),('DVD'),('RaspberryPi'),('Tablet'),('VR');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoicenumber` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `userId` int NOT NULL,
  `delivered` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  `returned` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int DEFAULT '1',
  PRIMARY KEY (`invoicenumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `amount` int NOT NULL,
  `picturelink` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `productcode` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('Drone V60',2,'/img/lab/drone.png','This is a modern drone from the fifth generation','jf'),('Raspberry PI 4',20,'/img/lab/raspberry.png','Raspberry Pi 4 is the very useful for programmers','3'),('Statistic dataanalys',5,'/img/lab/book.png','This book is very good for programming','5522');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items2category`
--

DROP TABLE IF EXISTS `items2category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items2category` (
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `categoryId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  KEY `itemsId` (`itemsId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `items2category_ibfk_1` FOREIGN KEY (`itemsId`) REFERENCES `items` (`id`),
  CONSTRAINT `items2category_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items2category`
--

LOCK TABLES `items2category` WRITE;
/*!40000 ALTER TABLE `items2category` DISABLE KEYS */;
INSERT INTO `items2category` VALUES ('Total Website Creator 3 in 1','CD'),('DJI Mavic Air 2 drone Fly More Combo','Drones'),('Raspberry SC15184 Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth (2GB)','RaspberryPi'),('Science Fiction','CD'),('Rasor','Drones'),('Toshiba 123','Tablet'),('Toshiba 321','Tablet'),('MSI','Computer'),('LG','Computer'),('Mr Robot','DVD'),('Samsung future','VR'),('Statistic dataanalys','DVD'),('Drone V60','Drones'),('Raspberry PI 4','RaspberryPi');
/*!40000 ALTER TABLE `items2category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items2shelf`
--

DROP TABLE IF EXISTS `items2shelf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items2shelf` (
  `itemsId` varchar(100) COLLATE utf8_swedish_ci NOT NULL,
  `place` varchar(150) COLLATE utf8_swedish_ci NOT NULL,
  `amount` int DEFAULT NULL,
  KEY `itemsId` (`itemsId`),
  KEY `place` (`place`),
  CONSTRAINT `items2shelf_ibfk_1` FOREIGN KEY (`itemsId`) REFERENCES `items` (`id`),
  CONSTRAINT `items2shelf_ibfk_2` FOREIGN KEY (`place`) REFERENCES `shelf` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items2shelf`
--

LOCK TABLES `items2shelf` WRITE;
/*!40000 ALTER TABLE `items2shelf` DISABLE KEYS */;
INSERT INTO `items2shelf` VALUES ('Statistic dataanalys','C:101',4),('Drone V60','A:101',4),('Raspberry PI 4','B:101',4);
/*!40000 ALTER TABLE `items2shelf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `userId` int NOT NULL,
  `amount` int DEFAULT '1',
  `createds` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `reserved` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `orderd` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `returnedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delivered` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `itemsId` (`itemsId`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`itemsId`) REFERENCES `items` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserve`
--

DROP TABLE IF EXISTS `reserve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserve` (
  `reserveid` int NOT NULL AUTO_INCREMENT,
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `userId` int NOT NULL,
  `reservedate` timestamp NULL DEFAULT NULL,
  `reservequeue` int DEFAULT '0',
  PRIMARY KEY (`reserveid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserve`
--

LOCK TABLES `reserve` WRITE;
/*!40000 ALTER TABLE `reserve` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returned`
--

DROP TABLE IF EXISTS `returned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returned` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoicenumber` int NOT NULL,
  `orderId` int NOT NULL,
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `userId` int NOT NULL,
  `delivered` timestamp NULL DEFAULT NULL,
  `returndate` timestamp NULL DEFAULT NULL,
  `returnedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  `amount` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returned`
--

LOCK TABLES `returned` WRITE;
/*!40000 ALTER TABLE `returned` DISABLE KEYS */;
/*!40000 ALTER TABLE `returned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returnedaccepted`
--

DROP TABLE IF EXISTS `returnedaccepted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returnedaccepted` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoicenumber` int NOT NULL,
  `orderId` int NOT NULL,
  `itemsId` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `userId` int NOT NULL,
  `delivered` timestamp NULL DEFAULT NULL,
  `returndate` timestamp NULL DEFAULT NULL,
  `returnedAt` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `amount` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returnedaccepted`
--

LOCK TABLES `returnedaccepted` WRITE;
/*!40000 ALTER TABLE `returnedaccepted` DISABLE KEYS */;
/*!40000 ALTER TABLE `returnedaccepted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelf`
--

DROP TABLE IF EXISTS `shelf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelf` (
  `id` varchar(15) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelf`
--

LOCK TABLES `shelf` WRITE;
/*!40000 ALTER TABLE `shelf` DISABLE KEYS */;
INSERT INTO `shelf` VALUES ('A:101'),('B:101'),('C:101');
/*!40000 ALTER TABLE `shelf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) COLLATE utf8_swedish_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8_swedish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_swedish_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_swedish_ci NOT NULL,
  `created` date NOT NULL,
  `address` varchar(80) COLLATE utf8_swedish_ci NOT NULL,
  `postnumber` varchar(100) COLLATE utf8_swedish_ci NOT NULL,
  `city` varchar(25) COLLATE utf8_swedish_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_swedish_ci NOT NULL,
  `phonenumber` varchar(15) COLLATE utf8_swedish_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `role` varchar(100) COLLATE utf8_swedish_ci DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lab'
--
/*!50003 DROP FUNCTION IF EXISTS `order_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` FUNCTION `order_status`(
    createds TIMESTAMP,
    updated TIMESTAMP,
    reserved TIMESTAMP,
    deleted TIMESTAMP,
    orderd  TIMESTAMP,
    delivered TIMESTAMP
) RETURNS varchar(20) CHARSET utf8mb4
    NO SQL
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `accept_returned_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `accept_returned_item`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_to_lab` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `add_to_lab`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `change_user_role` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `change_user_role`(
    a_email VARCHAR(200),
    a_role VARCHAR(100)
)
BEGIN
UPDATE users AS u
SET u.role = a_role where u.email = a_email  AND u.role != "admin";
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_a_reserve` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `create_a_reserve`(
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `create_order`(
    a_item_id VARCHAR(100),
    a_user_id INT
)
BEGIN
    UPDATE orders AS r
    INNER JOIN users AS s
    ON s.id = r.userId
    SET r.createds = NOW(), r.orderd = NOW() WHERE s.id = a_user_id;
    INSERT INTO orders(itemsId, userId) VALUES(a_item_id, a_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_an_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `delete_an_item`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_an_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `delete_an_order`(
    a_id INT
)
BEGIN
    UPDATE orders AS r
    INNER JOIN users AS s
    ON s.id = r.userId
    SET r.deleted = NOW() WHERE s.id = a_id;

    DELETE FROM orders
    WHERE id = a_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `delete_user`(
    a_id INT
)
BEGIN
DELETE FROM users AS u where  u.id = a_id AND u.role != "admin";
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `invoice_to_return_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `invoice_to_return_table`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modify_an_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `modify_an_item`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `search_items`(
    search VARCHAR (200)
)
BEGIN
        SELECT * FROM items
        WHERE id LIKE search;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ship_the_ordered_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `ship_the_ordered_items`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_all_accepted_returns_with_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_all_accepted_returns_with_details`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_all_invoices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_all_invoices`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_all_items_information` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_all_items_information`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_all_returns_with_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_all_returns_with_details`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_all_returns_with_details_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_all_returns_with_details_by_id`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_current_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_current_user`(
    a_user_email VARCHAR(100)
)
BEGIN
    SELECT id from users
    WHERE email = a_user_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_item_from_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_item_from_category`(
    aid CHAR(20)
)
BEGIN
    SELECT itemsId FROM items2category
    WHERE `categoryId` = aid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_item_from_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_item_from_items`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_orders`()
BEGIN
SELECT *, o.id AS order_id,
        order_status(createds, updated, reserved, deleted, orderd, delivered) AS status,
        o.amount AS orderAmount
        FROM orders AS o
        INNER JOIN users AS u
        ON u.id = o.userId
        GROUP BY order_id
        ORDER BY u.first_name DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_orders_by_userId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_orders_by_userId`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_reservations_by_user_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_reservations_by_user_id`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_specific_invoice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_specific_invoice`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_specific_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`user`@`%` PROCEDURE `show_specific_order`(
    a_user_id INT
)
BEGIN
SELECT *, o.id AS order_id FROM orders AS o
    INNER JOIN users AS u
    ON u.id = o.userId
    WHERE u.id = a_user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-19  5:26:26
