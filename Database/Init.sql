SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mindmapsdb` DEFAULT CHARACTER SET utf8 ;
USE `mindmapsdb` ;


-- -----------------------------------------------------
-- Table `mindmapsdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindmapsdb`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(2048) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mindmapsdb`.`mindmaps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindmapsdb`.`mindmaps` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `fullmaptext` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mindmapsdb`.`usermaps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindmapsdb`.`usermaps` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `map_id` BIGINT NOT NULL,
  `right` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usermap_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mindmapsdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usermap_mindmap`
    FOREIGN KEY (`map_id`)
    REFERENCES `mindmapsdb`.`mindmaps` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `mindmapsdb`.`link`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mindmapsdb`.`link` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nodeid` BIGINT NOT NULL,
  `map_id` BIGINT NOT NULL,
  `url` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_link_mindmap`
    FOREIGN KEY (`map_id`)
    REFERENCES `mindmapsdb`.`link` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;