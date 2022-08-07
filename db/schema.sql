DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (manager_id) REFERENCES employees (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

INSERT INTO department (dept_name)
VALUES ('Human Resources'),
('Engineering'),
('Financial'),
('IT');


INSERT INTO roles (title, salary, department_id)
VALUES ('PR Rep', 75000, 1),
('Developer', 105000, 2),
('CFO', 108000, 3),
('CTO', 550000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Foster', 1, NULL),
('Tim', 'Allen', 2, 1),
('Haley', 'Johnston', 4, NULL),
('Wendy', 'Bird', 3, 4);