-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- DROP DATABASE "kavak-task-list" -------------------------
DROP DATABASE IF EXISTS `kavak-task-list`;
-- ---------------------------------------------------------


-- CREATE DATABASE "kavak-task-list" -----------------------
CREATE DATABASE `kavak-task-list` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `kavak-task-list`;
-- ---------------------------------------------------------


-- CREATE TABLE "SequelizeData" --------------------------------
CREATE TABLE `SequelizeData` ( 
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `name` ),
	CONSTRAINT `name` UNIQUE( `name` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "SequelizeMeta" --------------------------------
CREATE TABLE `SequelizeMeta` ( 
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `name` ),
	CONSTRAINT `name` UNIQUE( `name` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "tasks" ----------------------------------------
CREATE TABLE `tasks` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`id_user` Int( 11 ) NULL,
	`name` VarChar( 254 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`order` Int( 11 ) NOT NULL,
	`expires_at` DateTime NOT NULL,
	`created_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` DateTime NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- -------------------------------------------------------------


-- CREATE TABLE "users" ----------------------------------------
CREATE TABLE `users` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`email` VarChar( 254 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
	`password` VarChar( 80 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`created_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` DateTime NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `email` UNIQUE( `email` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- -------------------------------------------------------------


-- Dump data of "SequelizeData" ----------------------------
LOCK TABLES `SequelizeData` WRITE;

INSERT INTO `SequelizeData`(`name`) VALUES 
( '20191031004634-add-test-users.js' );
UNLOCK TABLES;

-- ---------------------------------------------------------


-- Dump data of "SequelizeMeta" ----------------------------
LOCK TABLES `SequelizeMeta` WRITE;

INSERT INTO `SequelizeMeta`(`name`) VALUES 
( '20191031002004-create-table-users.js' ),
( '20191031033408-create-table-tasks.js' );
UNLOCK TABLES;

-- ---------------------------------------------------------


-- Dump data of "tasks" ------------------------------------
LOCK TABLES `tasks` WRITE;

INSERT INTO `tasks`(`id`,`id_user`,`name`,`order`,`expires_at`,`created_at`,`updated_at`,`deleted_at`) VALUES 
( '1', '2', 'Make commit', '1', '2019-12-01 06:00:00', '2019-10-31 06:04:29', '2019-10-31 06:04:29', NULL ),
( '2', '1', 'Make Init', '1', '2019-12-01 06:00:00', '2019-10-31 06:05:13', '2019-10-31 06:05:13', NULL );
UNLOCK TABLES;

-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
LOCK TABLES `users` WRITE;

INSERT INTO `users`(`id`,`email`,`password`,`created_at`,`updated_at`,`deleted_at`) VALUES 
( '1', 'jhoanegar@gmail.com', '$2b$10$ckJfuzhV16lo2nXEpqELNOwHTfWGRG3RTbDtYJpX/9zz4RDBW3qja', '2019-10-31 06:03:50', '2019-10-31 06:03:50', NULL ),
( '2', 'test@email.com', '$2b$10$ckJfuzhV16lo2nXEpqELNOwHTfWGRG3RTbDtYJpX/9zz4RDBW3qja', '2019-10-31 06:03:50', '2019-10-31 06:03:50', NULL );
UNLOCK TABLES;

-- ---------------------------------------------------------


-- CREATE INDEX "id_user" --------------------------------------
CREATE INDEX `id_user` USING BTREE ON `tasks`( `id_user` );
-- -------------------------------------------------------------


-- CREATE LINK "tasks_ibfk_1" ----------------------------------
ALTER TABLE `tasks`
	ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY ( `id_user` )
	REFERENCES `users`( `id` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


