-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: backend_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(55) NOT NULL,
  `price` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `status` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_products`
--

LOCK TABLES `tbl_products` WRITE;
/*!40000 ALTER TABLE `tbl_products` DISABLE KEYS */;
INSERT INTO `tbl_products` VALUES (1,'laptop','45,000','Electronics',0,'2024-08-14 11:50:31',NULL),(2,'TV','25,000','Electronics- entertainment',0,'2024-08-14 11:50:31',NULL),(3,'Chair','25','Hardware',0,'2024-08-14 11:50:31','2024-08-14 17:39:26'),(5,'product_name','25','Hardware',1,'2024-08-14 17:49:01','2024-08-14 19:30:22'),(6,'hammer','99','Hardware',1,'2024-08-14 17:49:01','2024-08-14 19:30:22'),(8,'washin machine','45,000','Electronics',0,'2024-08-14 17:49:01',NULL),(9,'laptopp','85,000','Electronics',1,'2024-08-14 17:58:12',NULL),(10,'TV','25,000','Electronics- entertainment',1,'2024-08-14 17:58:12',NULL),(11,'sofa-set','25,00','furniture',0,'2024-08-14 17:58:12',NULL),(12,'washin machine','45,000','Electronics',0,'2024-08-14 17:58:12',NULL);
/*!40000 ALTER TABLE `tbl_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'Rahul Bantode','rahul@xyz.com','admin','8090897867','ebaaba27b32928a25f2ad6185fc0cc74','2024-08-14',NULL),(2,'yogesh chaudhary','kunal@xyz.com','user','9090909090','5a8d83dd3497a1765ab2e994b508ff87','2024-08-14','2024-08-14 19:00:03'),(3,'parag chaudhary','nitin@gmail.com','user','9090909090','ca7f39f8747a2dae7fb6021abee34794','2024-08-14','2024-08-14 19:00:03'),(7,'Mohit chaudhary','chirag@xyz.com','user','9090909090','da36f1dd5300dbb62671844db234824d','2024-08-14','2024-08-14 12:36:43'),(8,'Chetashri','chetashrig@xyz.com','user','8090897867','c8f838dc7eb0386bcd5bece601cb2d7c','2024-08-14',NULL),(10,'anand doijode','anand@xyz.com','user','8090897867','44961fba6242d6fc80b276473eed2e24','2024-08-14',NULL);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15  1:49:43
