-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Airport_Management_system
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Airport_Management_system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Airport_Management_system` DEFAULT CHARACTER SET utf8 ;
USE `Airport_Management_system` ;

-- -----------------------------------------------------
-- Table `Airport_Management_system`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`city` (
  `country_name` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `city_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`country_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airport` (
  `airport_name` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `country_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`airport_name`, `country_name`),
  INDEX `fk_airport_city_idx` (`country_name` ASC) VISIBLE,
  CONSTRAINT `fk_airport_city`
    FOREIGN KEY (`country_name`)
    REFERENCES `Airport_Management_system`.`city` (`country_name`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airline`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airline` (
  `airline_id` VARCHAR(50) NOT NULL,
  `airline_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`airline_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airport_contains_airlines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airport_contains_airlines` (
  `airport_name` VARCHAR(50) NOT NULL,
  `airline_id` VARCHAR(50) NOT NULL,
  INDEX `fk_airport_contains_airlines_airport1_idx` (`airport_name` ASC) VISIBLE,
  INDEX `fk_airport_contains_airlines_airline1_idx` (`airline_id` ASC) VISIBLE,
  PRIMARY KEY (`airport_name`, `airline_id`),
  CONSTRAINT `fk_airport_contains_airlines_airport1`
    FOREIGN KEY (`airport_name`)
    REFERENCES `Airport_Management_system`.`airport` (`airport_name`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_airport_contains_airlines_airline1`
    FOREIGN KEY (`airline_id`)
    REFERENCES `Airport_Management_system`.`airline` (`airline_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`flight_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`flight_schedule` (
  `flight_code` VARCHAR(50) NOT NULL,
  `source` VARCHAR(50) NOT NULL,
  `duration` INT NOT NULL,
  `destination` VARCHAR(50) NOT NULL,
  `flight_type` VARCHAR(50) NOT NULL,
  `departure` TIMESTAMP NOT NULL,
  `arrival` TIMESTAMP NOT NULL,
  `status` VARCHAR(50) NULL,
  PRIMARY KEY (`flight_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airline_operates_flight_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airline_operates_flight_schedule` (
  `airline_id` VARCHAR(50) NOT NULL,
  `flight_code` VARCHAR(50) NOT NULL,
  INDEX `fk_airline_operates_flight_schedule_airline1_idx` (`airline_id` ASC) VISIBLE,
  INDEX `fk_airline_operates_flight_schedule_flight_schedule1_idx` (`flight_code` ASC) VISIBLE,
  PRIMARY KEY (`airline_id`, `flight_code`),
  CONSTRAINT `fk_airline_operates_flight_schedule_airline1`
    FOREIGN KEY (`airline_id`)
    REFERENCES `Airport_Management_system`.`airline` (`airline_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_airline_operates_flight_schedule_flight_schedule1`
    FOREIGN KEY (`flight_code`)
    REFERENCES `Airport_Management_system`.`flight_schedule` (`flight_code`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`employee` (
  `employee_id` VARCHAR(50) NOT NULL,
  `f_name` VARCHAR(50) NOT NULL,
  `l_name` VARCHAR(50) NOT NULL,
  `sex` CHAR(1) NOT NULL,
  `salary` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `hire_date` DATE NOT NULL,
  `job_type` VARCHAR(50) NULL,
  PRIMARY KEY (`employee_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`authentication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`authentication` (
  `email` VARCHAR(100) NOT NULL,
  `employee_id` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`email`, `employee_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_authentication_employee1_idx` (`employee_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `fk_authentication_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`employee_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`employee_schedule` (
  `employee_id` VARCHAR(50) NOT NULL,
  `shift` VARCHAR(50) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  INDEX `fk_employee_schedule_employee1_idx` (`employee_id` ASC) VISIBLE,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `fk_employee_schedule_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`attendance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`attendance` (
  `employee_id` VARCHAR(50) NOT NULL,
  `shift` VARCHAR(50) NOT NULL,
  `job_type` VARCHAR(50) NOT NULL,
  `date` DATE NOT NULL DEFAULT now(),
  INDEX `fk_attendance_employee1_idx` (`employee_id` ASC) VISIBLE,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `fk_attendance_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airplane`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airplane` (
  `airplane_id` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `range` DECIMAL(10,2) NOT NULL,
  `capacity` INT NOT NULL DEFAULT 0,
  `maintainance` INT NULL,
  `status` VARCHAR(50) NULL,
  PRIMARY KEY (`airplane_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airline_operates_airplane`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airline_operates_airplane` (
  `airline_id` VARCHAR(50) NOT NULL,
  `airplane_id` VARCHAR(50) NOT NULL,
  INDEX `fk_airline_operates_airplane_airline1_idx` (`airline_id` ASC) VISIBLE,
  INDEX `fk_airline_operates_airplane_airplane1_idx` (`airplane_id` ASC) VISIBLE,
  PRIMARY KEY (`airline_id`, `airplane_id`),
  CONSTRAINT `fk_airline_operates_airplane_airline`
    FOREIGN KEY (`airline_id`)
    REFERENCES `Airport_Management_system`.`airline` (`airline_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_airline_operates_airplane_airplane`
    FOREIGN KEY (`airplane_id`)
    REFERENCES `Airport_Management_system`.`airplane` (`airplane_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`maintainance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`maintainance` (
  `airplane_id` VARCHAR(50) NOT NULL,
  `employee_id` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `schedule` VARCHAR(50) NULL,
  `work_order` VARCHAR(50) NULL,
  `equipement` VARCHAR(50) NULL,
  INDEX `fk_maintainance_airplane1_idx` (`airplane_id` ASC) VISIBLE,
  INDEX `fk_maintainance_employee1_idx` (`employee_id` ASC) VISIBLE,
  PRIMARY KEY (`airplane_id`, `employee_id`, `start_date`, `end_date`),
  CONSTRAINT `fk_maintainance_airplane1`
    FOREIGN KEY (`airplane_id`)
    REFERENCES `Airport_Management_system`.`airplane` (`airplane_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_maintainance_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airplane_needs_maintainance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airplane_needs_maintainance` (
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `airplane_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`start_date`, `end_date`, `airplane_id`),
  INDEX `fk_airplane_needs_maintainance_maintainance1_idx` (`start_date` ASC, `end_date` ASC) VISIBLE,
  INDEX `fk_airplane_needs_maintainance_airplane1_idx` (`airplane_id` ASC) VISIBLE,
  CONSTRAINT `fk_airplane_needs_maintainance_maintainance1`
    FOREIGN KEY (`start_date` , `end_date`)
    REFERENCES `Airport_Management_system`.`maintainance` (`start_date` , `end_date`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_airplane_needs_maintainance_airplane1`
    FOREIGN KEY (`airplane_id`)
    REFERENCES `Airport_Management_system`.`airplane` (`airplane_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`tickets` (
  `ticket_id` VARCHAR(50) NOT NULL,
  `flight_code` VARCHAR(50) NOT NULL,
  `source` VARCHAR(50) NULL,
  `price` DECIMAL(10,2) NULL,
  `destination` VARCHAR(50) NULL,
  `class` VARCHAR(50) NULL,
  `date_of_travel` DATE NULL,
  `seat_number` INT NULL,
  PRIMARY KEY (`ticket_id`),
  INDEX `fk_tickets_flight_schedule1_idx` (`flight_code` ASC) VISIBLE,
  CONSTRAINT `fk_tickets_flight_schedule1`
    FOREIGN KEY (`flight_code`)
    REFERENCES `Airport_Management_system`.`flight_schedule` (`flight_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`passenger`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`passenger` (
  `email` VARCHAR(100) NOT NULL,
  `passenger_id` VARCHAR(50) NOT NULL,
  `f_name` VARCHAR(50) NOT NULL,
  `l_name` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`email`, `passenger_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`employee_serve_passenger`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`employee_serve_passenger` (
  `passenger_id` VARCHAR(50) NOT NULL,
  `employee_id` VARCHAR(50) NOT NULL,
  INDEX `fk_employee_serve_passenger_passenger1_idx` (`passenger_id` ASC) VISIBLE,
  INDEX `fk_employee_serve_passenger_employee1_idx` (`employee_id` ASC) VISIBLE,
  PRIMARY KEY (`passenger_id`, `employee_id`),
  CONSTRAINT `fk_employee_serve_passenger_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `Airport_Management_system`.`passenger` (`passenger_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_serve_passenger_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`flightSchedule_contains_passenger`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`flightSchedule_contains_passenger` (
  `passenger_id` VARCHAR(50) NOT NULL,
  `flight_code` VARCHAR(50) NOT NULL,
  INDEX `fk_flightSchedule_contains_passenger_passenger1_idx` (`passenger_id` ASC) VISIBLE,
  INDEX `fk_flightSchedule_contains_passenger_flight_schedule1_idx` (`flight_code` ASC) VISIBLE,
  PRIMARY KEY (`passenger_id`, `flight_code`),
  CONSTRAINT `fk_flightSchedule_contains_passenger_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `Airport_Management_system`.`passenger` (`passenger_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_flightSchedule_contains_passenger_flight_schedule1`
    FOREIGN KEY (`flight_code`)
    REFERENCES `Airport_Management_system`.`flight_schedule` (`flight_code`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`passenger_books_and_cancels_tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`passenger_books_and_cancels_tickets` (
  `ticket_id` VARCHAR(50) NOT NULL,
  `passenger_id` VARCHAR(50) NOT NULL,
  INDEX `fk_passenger_books_and_cancels_tickets_tickets1_idx` (`ticket_id` ASC) VISIBLE,
  INDEX `fk_passenger_books_and_cancels_tickets_passenger1_idx` (`passenger_id` ASC) VISIBLE,
  PRIMARY KEY (`ticket_id`, `passenger_id`),
  CONSTRAINT `fk_passenger_books_and_cancels_tickets_tickets1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `Airport_Management_system`.`tickets` (`ticket_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_passenger_books_and_cancels_tickets_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `Airport_Management_system`.`passenger` (`passenger_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`ticket_payment_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`ticket_payment_detail` (
  `ticket_id` VARCHAR(50) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `payment_amount` DECIMAL(10,2) NOT NULL,
  `payment_date` DATE NOT NULL,
  INDEX `fk_ticket_payment_detail_tickets1_idx` (`ticket_id` ASC) VISIBLE,
  PRIMARY KEY (`ticket_id`),
  CONSTRAINT `fk_ticket_payment_detail_tickets1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `Airport_Management_system`.`tickets` (`ticket_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`baggage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`baggage` (
  `baggage_id` VARCHAR(50) NOT NULL,
  `passenger_id` VARCHAR(50) NOT NULL,
  `source` VARCHAR(50) NULL,
  `destination` VARCHAR(50) NULL,
  `status` VARCHAR(50) NULL,
  `weight` DECIMAL(10,2) NULL,
  PRIMARY KEY (`baggage_id`),
  INDEX `fk_baggage_passenger1_idx` (`passenger_id` ASC) VISIBLE,
  CONSTRAINT `fk_baggage_passenger1`
    FOREIGN KEY (`passenger_id`)
    REFERENCES `Airport_Management_system`.`passenger` (`passenger_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`baggage_payment_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`baggage_payment_detail` (
  `baggage_id` VARCHAR(50) NOT NULL,
  `weight` DECIMAL(10,2) NULL,
  `departure` DATE NULL,
  `arrival` DATE NULL,
  `payment_amount` DECIMAL(10,2) NULL,
  `payment_method` VARCHAR(50) NULL,
  INDEX `fk_baggage_payment_detail_baggage1_idx` (`baggage_id` ASC) VISIBLE,
  PRIMARY KEY (`baggage_id`),
  CONSTRAINT `fk_baggage_payment_detail_baggage1`
    FOREIGN KEY (`baggage_id`)
    REFERENCES `Airport_Management_system`.`baggage` (`baggage_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`airport_has_employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`airport_has_employee` (
  `employee_id` VARCHAR(50) NOT NULL,
  `airport_name` VARCHAR(50) NOT NULL,
  INDEX `fk_airport_has_employee_employee1_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_airport_has_employee_airport1_idx` (`airport_name` ASC) VISIBLE,
  PRIMARY KEY (`employee_id`, `airport_name`),
  CONSTRAINT `fk_airport_has_employee_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_airport_has_employee_airport1`
    FOREIGN KEY (`airport_name`)
    REFERENCES `Airport_Management_system`.`airport` (`airport_name`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Airport_Management_system`.`employee_control_baggage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Airport_Management_system`.`employee_control_baggage` (
  `employee_id` VARCHAR(50) NOT NULL,
  `baggage_id` VARCHAR(50) NOT NULL,
  INDEX `fk_employee_control_baggage_employee1_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_employee_control_baggage_baggage1_idx` (`baggage_id` ASC) VISIBLE,
  PRIMARY KEY (`employee_id`, `baggage_id`),
  CONSTRAINT `fk_employee_control_baggage_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Airport_Management_system`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_control_baggage_baggage1`
    FOREIGN KEY (`baggage_id`)
    REFERENCES `Airport_Management_system`.`baggage` (`baggage_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
