/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.4.28-MariaDB : Database - backends
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`backends` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `backends`;

/*Table structure for table `babies` */

DROP TABLE IF EXISTS `babies`;

CREATE TABLE `babies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mother_name` varchar(255) NOT NULL,
  `mother_age` int(11) NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `birth_date` date NOT NULL,
  `pregnancy_age` int(11) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `babies` */

insert  into `babies`(`id`,`mother_name`,`mother_age`,`gender`,`birth_date`,`pregnancy_age`,`height`,`weight`,`description`,`created_at`,`updated_at`) values 
(2,'Anggun',25,'P','2023-08-10',38,48.70,2.90,'Healthy baby girl','2023-08-11 00:26:16','2023-08-11 00:26:16'),
(4,'aadak',30,'L','2012-02-18',10,5.00,10.00,'obesitas','2023-08-11 03:56:28','2023-08-11 03:56:28');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2023_08_10_140112_create_babies_table',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
