INSERT INTO department (department_name)
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
