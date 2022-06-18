use employee_db;

INSERT INTO department
    (name)
VALUES
    ('HR'),
    ('Dev'),
    ('Chief of Staff'),

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 70000, 1),
    ('CFO', 120000, 3),
    ('Senior Developer', 180000, 2),
    ('Web Developer', 90000, 2),

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Slim', 'Jim', 1, NULL),
    ('Tom', 'Jerry', 2, 1),
    ('Misty', 'Wristy', 3, NULL),
    ('Patty', 'Cake', 4, 3),