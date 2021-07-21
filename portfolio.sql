drop database if exists portfolio;
create database portfolio;
use portfolio;

create table `admin` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR(12)
);

create table `hardskill` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `image` text,
    PRIMARY KEY (`id`)
);

create table `project` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `image` text,
    `started_at` VARCHAR(12) NOT NULL,
    `ended_at` VARCHAR(12) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `link` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);