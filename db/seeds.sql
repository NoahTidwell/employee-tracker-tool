INSERT INTO department (department_name)
VALUES ("Engineering"),
("Sales"),
("Legal"),
("Management");

INSERT INTO roles (role_title, role_salary, department_id)
VALUES ("Backend Engineer", 60000, 1),
("Frontend Engineer", 55000, 1),
("Lead Engineer", 75000, 1),
("Sales Associate", 45000, 2),
("Head of Sales", 60000, 2),
("Attorny", 80000, 3),
("President", 100000, 4);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES ('Eric', 'Jin', 1),
('Vinay', 'Gupta', 2),
('Noah', 'Tidwell', 3),
('Mark', 'Houston', 4),
('John', 'Jacobs', 2);