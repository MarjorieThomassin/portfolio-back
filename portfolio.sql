drop database if exists portfolio;
create database portfolio;
use portfolio;

create table `admin` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

create table hardskill(
    `id` INT NOT NULL AUTO_INCREMENT,
    `skillName` VARCHAR(100) NOT NULL,
    `skillDescription` VARCHAR(400) NOT NULL,
    `imageSkill` text,
    PRIMARY KEY (`id`)
);

create table `project` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nameProject` VARCHAR(100) NOT NULL,
    `image` text,
    `startedAt` VARCHAR(100) NOT NULL,
    `endedAt` VARCHAR(100) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `link` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);